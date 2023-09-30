-- Adminer 4.8.1 MySQL 5.5.5-10.5.22-MariaDB-1:10.5.22+maria~ubu2004 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `isft` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `isft`;

DELIMITER ;;

DROP PROCEDURE IF EXISTS `usp_create_group`;;
CREATE DEFINER=`frix`@`%` PROCEDURE `usp_create_group`(IN `p_name` varchar(45))
BEGIN 
   INSERT INTO `group` (name) VALUES (p_name);
END;;

DROP PROCEDURE IF EXISTS `usp_create_user`;;
CREATE DEFINER=`frix`@`%` PROCEDURE `usp_create_user`(IN `p_nickname` varchar(45), IN `p_password` varchar(255), IN `p_name` varchar(45), IN `p_surname` varchar(45), IN `p_dni` varchar(45), IN `p_gender` varchar(45), IN `p_telephone` varchar(45))
BEGIN
  DECLARE v_user_id INT;
  DECLARE v_user_data_id INT;
  DECLARE v_result_code INT;
  DECLARE v_result_message TEXT;

  -- Inicializa el código y el mensaje de resultado
  SET v_result_code = 0;
  SET v_result_message = '';

  -- Intenta realizar la inserción de usuario
  INSERT INTO user (nickname, password, isActive) VALUES (p_nickname, p_password, 1);
  SET v_user_id = LAST_INSERT_ID();

  -- Comprueba si la inserción fue exitosa
  IF v_user_id > 0 THEN
    -- Intenta insertar datos de usuario
    INSERT INTO user_data (name, surname, dni, gender, telephone)
    VALUES (p_name, p_surname, p_dni, p_gender, p_telephone);
    SET v_user_data_id = LAST_INSERT_ID();

    -- Comprueba si la inserción de datos de usuario fue exitosa
    IF v_user_data_id > 0 THEN
      -- Intenta vincular datos de usuario y usuario
      INSERT INTO user_has_user_data (user_data_iduser_data, user_iduser)
      VALUES (v_user_data_id, v_user_id);

      -- Intenta vincular usuario a un grupo (cambia el valor '2' por el grupo deseado)
      INSERT INTO group_has_user (group_idgroup, user_iduser)
      VALUES (2, v_user_id);

      -- Configura el código de resultado como 1 (éxito)
      SET v_result_code = 1;
      SET v_result_message = 'Creación de usuario exitosa';
    ELSE
      -- Configura el código de resultado como 2 (error en la inserción de datos de usuario)
      SET v_result_code = 2;
      SET v_result_message = 'Error en la inserción de datos de usuario';
    END IF;
  ELSE
    -- Configura el código de resultado como 3 (error en la inserción de usuario)
    SET v_result_code = 3;
    SET v_result_message = 'Error en la inserción de usuario (repetición de usuario o dni)';
  END IF;

  -- Devuelve el código y el mensaje de resultado
  SELECT JSON_OBJECT('status', v_result_code, 'message', v_result_message) AS result;
END;;

DROP PROCEDURE IF EXISTS `usp_insert_user_in_group`;;
CREATE DEFINER=`frix`@`%` PROCEDURE `usp_insert_user_in_group`(IN `p_idgroup` int, IN `p_iduser` int)
BEGIN
  DECLARE v_group_has_user_id INT;
  
  SELECT group_has_user.idgroup_has_user INTO v_group_has_user_id
  FROM group_has_user 
  WHERE group_has_user.user_iduser = p_iduser;
  
  UPDATE group_has_user 
  SET group_has_user.group_idgroup = p_idgroup
  WHERE group_has_user.idgroup_has_user = v_group_has_user_id;
END;;

DROP PROCEDURE IF EXISTS `usp_is_user_authorized`;;
CREATE DEFINER=`frix`@`%` PROCEDURE `usp_is_user_authorized`(IN `p_iduser` tinyint, IN `p_path` varchar(45))
BEGIN
    DECLARE v_authorized BOOLEAN;

    SELECT EXISTS (
        SELECT 1
        FROM group_has_user AS gu
        INNER JOIN group_has_access AS ga ON gu.group_idgroup = ga.group_idgroup
        INNER JOIN access AS a ON ga.access_idaccess = a.idaccess
        WHERE gu.user_iduser = p_iduser
        AND a.path = p_path
    ) INTO v_authorized;

    SELECT JSON_OBJECT('authorized', v_authorized) AS result;
END;;

DROP PROCEDURE IF EXISTS `usp_read_group_by_id`;;
CREATE DEFINER=`frix`@`%` PROCEDURE `usp_read_group_by_id`(IN `p_groupid` int(11))
SELECT * 
FROM `group`
INNER JOIN group_has_user ON `group`.idgroup = group_has_user.group_idgroup
WHERE `group`.idgroup = p_groupid;;

DROP PROCEDURE IF EXISTS `usp_read_user_by_id`;;
CREATE DEFINER=`frix`@`%` PROCEDURE `usp_read_user_by_id`(IN `p_id` tinyint(11))
SELECT * FROM user_data WHERE user_data.iduser_data = p_id;;

DROP PROCEDURE IF EXISTS `usp_read_user_by_nickname`;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_read_user_by_nickname`(IN `p_nickname` varchar(45))
BEGIN
  DECLARE v_userid INT;

  SELECT iduser INTO v_userid FROM user WHERE nickname = p_nickname;

  SELECT JSON_OBJECT('name', user_data.name, 'surname', user_data.surname, 'dni', user_data.dni, 'gender', user_data.gender, 'telephone', user_data.telephone)
  FROM user_data
  WHERE user_data.iduser_data = v_userid;
END;;

DROP PROCEDURE IF EXISTS `usp_signin`;;
CREATE DEFINER=`frix`@`%` PROCEDURE `usp_signin`(IN `p_nickname` varchar(45), IN `p_password` varchar(255))
BEGIN
    DECLARE v_iduser INT;
    DECLARE v_validated BOOLEAN;

    SELECT user.iduser, user.password = p_password INTO v_iduser, v_validated
    FROM user
    WHERE user.nickname = p_nickname;

    -- Construye el JSON de respuesta
    SELECT JSON_OBJECT('validated', v_validated, 'iduser', CASE WHEN v_validated THEN v_iduser ELSE NULL END) AS result;
END;;

DROP PROCEDURE IF EXISTS `usp_update_group_by_id`;;
CREATE DEFINER=`frix`@`%` PROCEDURE `usp_update_group_by_id`(IN `p_groupid` tinyint, IN `p_name` varchar(45))
BEGIN 
  UPDATE `group`
    SET `group`.name = p_name
    WHERE `group`.idgroup = p_groupid; 
END;;

DELIMITER ;

DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `idaccess` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`idaccess`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `access` (`idaccess`, `path`, `name`) VALUES
(1,	'/getUserInfo',	'get user information');

DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `idgroup` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idgroup`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `group` (`idgroup`, `name`) VALUES
(1,	'Nobody'),
(2,	'Guest'),
(3,	'Preceptoria');

DROP TABLE IF EXISTS `group_has_access`;
CREATE TABLE `group_has_access` (
  `group_idgroup` int(11) NOT NULL,
  `access_idaccess` int(11) NOT NULL,
  KEY `fk_group_has_access_group1_idx` (`group_idgroup`),
  KEY `fk_group_has_access_access1_idx` (`access_idaccess`),
  CONSTRAINT `group_has_access_ibfk_1` FOREIGN KEY (`access_idaccess`) REFERENCES `access` (`idaccess`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_has_access_ibfk_2` FOREIGN KEY (`group_idgroup`) REFERENCES `group` (`idgroup`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `group_has_access` (`group_idgroup`, `access_idaccess`) VALUES
(3,	1),
(2,	1);

DROP TABLE IF EXISTS `group_has_user`;
CREATE TABLE `group_has_user` (
  `idgroup_has_user` int(11) NOT NULL AUTO_INCREMENT,
  `group_idgroup` int(11) NOT NULL,
  `user_iduser` int(11) NOT NULL,
  PRIMARY KEY (`idgroup_has_user`),
  KEY `fk_group_has_user_group1_idx` (`group_idgroup`),
  KEY `fk_group_has_user_user1_idx` (`user_iduser`),
  CONSTRAINT `group_has_user_ibfk_1` FOREIGN KEY (`group_idgroup`) REFERENCES `group` (`idgroup`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_has_user_ibfk_2` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `group_has_user` (`idgroup_has_user`, `group_idgroup`, `user_iduser`) VALUES
(1,	3,	1),
(2,	2,	2);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isactive` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `user` (`iduser`, `nickname`, `password`, `isactive`) VALUES
(1,	'dev',	'123456',	1),
(2,	'frixtaylor',	'84fc991dc6609d3b8216eb98ee11853c9f0af857f80f822e953e6e1baf20d064',	1);

DELIMITER ;;

CREATE TRIGGER `ut_check_user_fields` BEFORE INSERT ON `user` FOR EACH ROW
BEGIN
  IF NEW.nickname IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se permiten valores nulos en los campos';
  END IF;
END;;

DELIMITER ;

DROP TABLE IF EXISTS `user_data`;
CREATE TABLE `user_data` (
  `iduser_data` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `dni` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `telephone` varchar(45) NOT NULL,
  PRIMARY KEY (`iduser_data`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `user_data` (`iduser_data`, `name`, `surname`, `dni`, `gender`, `telephone`) VALUES
(1,	'kev',	'Tay',	'123123',	'Male',	'123123'),
(2,	'Kevin',	'Taylor',	'40932413',	'Male',	'2233399843');

DELIMITER ;;

CREATE TRIGGER `ut_check_user_data_fields` BEFORE INSERT ON `user_data` FOR EACH ROW
BEGIN
  IF NEW.name IS NULL OR NEW.surname IS NULL OR NEW.dni IS NULL OR NEW.gender IS NULL OR NEW.telephone IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se permiten valores nulos en los campos';
  END IF;
END;;

DELIMITER ;

DROP TABLE IF EXISTS `user_has_user_data`;
CREATE TABLE `user_has_user_data` (
  `user_data_iduser_data` int(11) NOT NULL,
  `user_iduser` int(11) NOT NULL,
  UNIQUE KEY `user_data_iduser_data_UNIQUE` (`user_data_iduser_data`),
  UNIQUE KEY `user_iduser_UNIQUE` (`user_iduser`),
  KEY `fk_user_has_user_data_user_data1_idx` (`user_data_iduser_data`),
  KEY `fk_user_has_user_data_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_user_has_user_data_user_data1` FOREIGN KEY (`user_data_iduser_data`) REFERENCES `user_data` (`iduser_data`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `user_has_user_data_ibfk_2` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `user_has_user_data` (`user_data_iduser_data`, `user_iduser`) VALUES
(1,	1),
(2,	2);

-- 2023-09-08 20:21:07
