-- Adminer 4.8.1 MySQL 5.5.5-10.5.21-MariaDB-1:10.5.21+maria~ubu2004 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `isft` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `isft`;

DELIMITER ;;

DROP PROCEDURE IF EXISTS `usp_create_user`;;
CREATE PROCEDURE `usp_create_user`(IN `p_nickname` varchar(45), IN `p_password` varchar(255), IN `p_name` varchar(45), IN `p_surname` varchar(45), IN `p_dni` varchar(45), IN `p_gender` varchar(45), IN `p_telephone` varchar(45))
BEGIN
  DECLARE v_user_id INT;
  DECLARE v_user_data_id INT;

  INSERT INTO user (nickname, password, isActive) VALUES (p_nickname, p_password, 1);
  SET @v_user_id = LAST_INSERT_ID();

  INSERT INTO user_data (name, surname, dni, gender, telephone) VALUES (p_name, p_surname, p_dni, p_gender, p_telephone);
  SET @v_user_data_id = LAST_INSERT_ID();

  INSERT INTO user_has_user_data (user_data_iduser_data, user_iduser) VALUES (@v_user_data_id, @v_user_id);
  
  INSERT INTO group_has_user (group_idgroup, user_iduser) VALUES (2, @v_user_id);
END;;

DROP PROCEDURE IF EXISTS `usp_delete_user`;;
;;

DROP PROCEDURE IF EXISTS `usp_read_user`;;
;;

DROP PROCEDURE IF EXISTS `usp_update_user`;;
;;

DELIMITER ;

DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `idaccess` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`idaccess`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `idgroup` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idgroup`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `group` (`idgroup`, `name`) VALUES
(1,	'Nobody'),
(2,	'Guest');

DROP TABLE IF EXISTS `group_has_access`;
CREATE TABLE `group_has_access` (
  `group_idgroup` int(11) NOT NULL,
  `access_idaccess` int(11) NOT NULL,
  KEY `fk_group_has_access_group1_idx` (`group_idgroup`),
  KEY `fk_group_has_access_access1_idx` (`access_idaccess`),
  CONSTRAINT `group_has_access_ibfk_1` FOREIGN KEY (`access_idaccess`) REFERENCES `access` (`idaccess`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_has_access_ibfk_2` FOREIGN KEY (`group_idgroup`) REFERENCES `group` (`idgroup`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


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
(1,	2,	1),
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
(1,	'asd',	'688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6',	1),
(2,	'asdd',	'cc00113f2c36b6d0e501dd832771ce5db7b41c1d77edb22b5fde8baf1c5e449b',	1);

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
(1,	'asd',	'asd',	'asd',	'asd',	'asd'),
(2,	'asdd',	'asdd',	'asdd',	'asdd',	'asdd');

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

-- 2023-06-22 18:41:39
