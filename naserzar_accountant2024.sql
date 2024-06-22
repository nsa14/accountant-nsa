/*
 Navicat Premium Data Transfer

 Source Server         : nsa
 Source Server Type    : MySQL
 Source Server Version : 100428
 Source Host           : localhost:3306
 Source Schema         : naserzar_accountant2024

 Target Server Type    : MySQL
 Target Server Version : 100428
 File Encoding         : 65001

 Date: 22/06/2024 14:17:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `account_name` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `account_value` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `status` tinyint NOT NULL DEFAULT 0,
  `created_at` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (1, 1, 'aaaa', '[{\"id\":1,\"money\":\"55000\",\"title\":\"test\",\"date\":\"۱۴۰۳/۰۴/۰۲\",\"type\":\"add\"}]', 0, '2024-06-22');

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` tinyint NULL DEFAULT NULL COMMENT '0 : new\r\n1 : read',
  `forhim` tinyint NULL DEFAULT NULL COMMENT '0:all user\r\n1 : only user id send',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO `notification` VALUES (1, 'salam', 'welcome', 0, 0);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `phone` bigint NOT NULL,
  `password` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `created_at` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'ناصر', 9355241765, '88888888', '2024-06-22');

SET FOREIGN_KEY_CHECKS = 1;
