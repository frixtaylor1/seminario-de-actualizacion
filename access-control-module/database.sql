-- Adminer 4.8.1 MySQL 5.5.5-10.11.2-MariaDB-1:10.11.2+maria~ubu2204 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `isft` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;
USE `isft`;

DELIMITER ;;

DROP PROCEDURE IF EXISTS `usp_create_user`;;
CREATE PROCEDURE `usp_create_user`(IN `p_name` varchar(45), IN `p_surname` varchar(45), IN `p_dni` varchar(45), IN `p_gender` varchar(45), IN `p_telephone` varchar(45))
BEGIN
  DECLARE v_user_data_id INT;
  DECLARE v_user_id INT;
  
  -- Insertar datos en la tabla user_data y obtener el ID generado
  INSERT INTO user_data (name, surname, dni, gender, telephone)
  VALUES (p_name, p_surname, p_dni, p_gender, p_telephone);
  
  -- Obtener el ID generado para user_data
  SET v_user_data_id = LAST_INSERT_ID();
  
  -- Insertar datos en la tabla user
  INSERT INTO user (isActive)
  VALUES (1);
  
  -- Obtener el ID generado para user
  SET v_user_id = LAST_INSERT_ID();
  
  -- Insertar relación entre user y user_data en la tabla user_has_user_data
  INSERT INTO user_has_user_data (user_data_iduser_data, user_iduser)
  VALUES (v_user_data_id, v_user_id);
  
END;;

DROP PROCEDURE IF EXISTS `usp_delete_user`;;
CREATE PROCEDURE `usp_delete_user`(IN `p_dni` varchar(45))
BEGIN
  DECLARE v_user_id INT;

  -- Obtener el ID del usuario a partir del DNI
  SELECT iduser_data INTO v_user_id
  FROM user_data
  WHERE dni = p_dni;

  -- Eliminar el registro de la tabla user_has_user_data
  DELETE FROM user_has_user_data
  WHERE user_data_iduser_data = v_user_id;

  -- Eliminar el registro de la tabla user_data
  DELETE FROM user_data
  WHERE dni = p_dni;

  -- Eliminar el registro de la tabla user
  DELETE FROM user
  WHERE user.iduser = v_user_id;
END;;

DROP PROCEDURE IF EXISTS `usp_read_user`;;
CREATE PROCEDURE `usp_read_user`(IN `p_dni` varchar(45))
BEGIN
  SELECT JSON_OBJECT(
    'iduser_data', user_data.iduser_data,
    'name', user_data.name,
    'surname', user_data.surname,
    'dni', user_data.dni,
    'gender', user_data.gender,
    'telephone', user_data.telephone
  ) AS user_json
  FROM user_data
  WHERE user_data.dni = p_dni;
END;;

DROP PROCEDURE IF EXISTS `usp_update_user`;;
CREATE PROCEDURE `usp_update_user`(IN `p_id_dni` varchar(45), IN `p_name` varchar(45), IN `p_surname` varchar(45), IN `p_dni` varchar(45), IN `p_gender` varchar(45), IN `p_telephone` varchar(45))
UPDATE user_data
SET name = p_name, surname = p_surname, dni = p_dni, gender = p_gender, telephone = p_telephone
WHERE user_data.dni = p_id_dni;;

DELIMITER ;

DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `idaccess` int(11) NOT NULL AUTO_INCREMENT,
  `resource_idresource` int(11) NOT NULL,
  PRIMARY KEY (`idaccess`),
  KEY `fk_access_resource1_idx` (`resource_idresource`),
  CONSTRAINT `fk_access_resource1` FOREIGN KEY (`resource_idresource`) REFERENCES `resource` (`idresource`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `idgroup` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `isactive` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idgroup`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


DROP TABLE IF EXISTS `group_has_access`;
CREATE TABLE `group_has_access` (
  `group_idgroup` int(11) NOT NULL,
  `access_idaccess` int(11) NOT NULL,
  KEY `fk_group_has_access_group1_idx` (`group_idgroup`),
  KEY `fk_group_has_access_access1_idx` (`access_idaccess`),
  CONSTRAINT `fk_group_has_access_access1` FOREIGN KEY (`access_idaccess`) REFERENCES `access` (`idaccess`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_has_access_group1` FOREIGN KEY (`group_idgroup`) REFERENCES `group` (`idgroup`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


DROP TABLE IF EXISTS `group_has_user`;
CREATE TABLE `group_has_user` (
  `idgroup_has_user` int(11) NOT NULL,
  `group_idgroup` int(11) NOT NULL,
  `user_iduser` int(11) NOT NULL,
  PRIMARY KEY (`idgroup_has_user`),
  KEY `fk_group_has_user_group1_idx` (`group_idgroup`),
  KEY `fk_group_has_user_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_group_has_user_group1` FOREIGN KEY (`group_idgroup`) REFERENCES `group` (`idgroup`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_has_user_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `idresource` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `isactive` tinyint(4) NOT NULL,
  `data` varchar(255) NOT NULL,
  PRIMARY KEY (`idresource`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `isactive` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `user` (`iduser`, `isactive`) VALUES
(1,	1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `user_data` (`iduser_data`, `name`, `surname`, `dni`, `gender`, `telephone`) VALUES
(1,	'Kevin',	'Taylor',	'123213123',	'Male',	'545454545');

DROP TABLE IF EXISTS `user_has_user_data`;
CREATE TABLE `user_has_user_data` (
  `user_data_iduser_data` int(11) NOT NULL,
  `user_iduser` int(11) NOT NULL,
  UNIQUE KEY `user_data_iduser_data_UNIQUE` (`user_data_iduser_data`),
  UNIQUE KEY `user_iduser_UNIQUE` (`user_iduser`),
  KEY `fk_user_has_user_data_user_data1_idx` (`user_data_iduser_data`),
  KEY `fk_user_has_user_data_user1_idx` (`user_iduser`),
  CONSTRAINT `fk_user_has_user_data_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_data_user_data1` FOREIGN KEY (`user_data_iduser_data`) REFERENCES `user_data` (`iduser_data`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `user_has_user_data` (`user_data_iduser_data`, `user_iduser`) VALUES
(1,	1);

-- 2023-05-24 18:17:41
