# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.34)
# Database: naserzar_accountant2024
# Generation Time: 2024-07-02 20:18:23 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `account_name` text,
  `account_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;

INSERT INTO `account` (`id`, `user_id`, `account_name`, `account_value`, `created_at`, `status`)
VALUES
	(20,127,'milad','[{\"id\":2,\"money\":\"11111\",\"title\":\"11111\",\"fa_date\":\"\\u06f1\\u06f4\\u06f0\\u06f3\\/\\u06f0\\u06f4\\/\\u06f1\\u06f2\",\"type\":\"add\",\"created_at\":\"2024-07-02 18:19:34\"},{\"id\":20,\"money\":\"4444\",\"title\":\"4444\",\"fa_date\":\"\\u06f1\\u06f4\\u06f0\\u06f3\\/\\u06f0\\u06f4\\/\\u06f1\\u06f2\",\"type\":\"minus\",\"created_at\":\"2024-07-02 18:19:34\"}]','2024-07-02 19:36:02',1),
	(21,127,'nima','','2024-07-02 19:36:11',1);

/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table push_notification
# ------------------------------------------------------------

DROP TABLE IF EXISTS `push_notification`;

CREATE TABLE `push_notification` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET utf8 COLLATE utf8_persian_ci,
  `message` text CHARACTER SET utf8 COLLATE utf8_persian_ci,
  `send_status` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `push_notification` WRITE;
/*!40000 ALTER TABLE `push_notification` DISABLE KEYS */;

INSERT INTO `push_notification` (`id`, `title`, `message`, `send_status`, `created_at`)
VALUES
	(3,'aaaaa','hiiiiiii',0,'2024-07-02 17:39:54');

/*!40000 ALTER TABLE `push_notification` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` text,
  `phone` bigint(20) NOT NULL,
  `password` text,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `phone`, `password`, `created_at`)
VALUES
	(126,'a',9999999999,'88888888','2024-07-02'),
	(127,'aaa',3333333333,'33333333','2024-07-02');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
