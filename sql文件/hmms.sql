/*
Navicat MySQL Data Transfer

Source Server         : hmms
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : hmms

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-08-23 20:12:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `drug`
-- ----------------------------
DROP TABLE IF EXISTS `drug`;
CREATE TABLE `drug` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pinyinma` varchar(20) NOT NULL,
  `drugname` varchar(20) NOT NULL,
  `spec` varchar(20) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `lowwarning` int(20) NOT NULL,
  `csname` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of drug
-- ----------------------------
INSERT INTO `drug` VALUES ('1', 'gmy', '感冒药', '12粒', '粒', '20', '厂商1');
INSERT INTO `drug` VALUES ('2', 'xyy', '消炎药', '500毫升', '毫升', '500', '厂商2');
INSERT INTO `drug` VALUES ('3', 'aa', 'aa', 'aaa', '粒', '100000', 'aa');

-- ----------------------------
-- Table structure for `login`
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `type` varchar(10) NOT NULL,
  `ygzt` varchar(10) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '管理员', 'N');
INSERT INTO `login` VALUES ('2', 'double', '96e79218965eb72c92a549dd5a330112', '药品录入人员', 'N');
INSERT INTO `login` VALUES ('3', 'seller', '96e79218965eb72c92a549dd5a330112', '销售人员', 'N');
INSERT INTO `login` VALUES ('4', 'test', 'e10adc3949ba59abbe56e057f20f883e', '销售人员', 'N');
INSERT INTO `login` VALUES ('5', 'wqwq', 'e10adc3949ba59abbe56e057f20f883e', '销售人员', 'N');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '产品1', '200');

-- ----------------------------
-- Table structure for `retur`
-- ----------------------------
DROP TABLE IF EXISTS `retur`;
CREATE TABLE `retur` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pinyinma` varchar(20) NOT NULL,
  `drugname` varchar(20) NOT NULL,
  `pihao` varchar(20) NOT NULL,
  `pizhunwenhao` varchar(20) NOT NULL,
  `ramount` int(20) NOT NULL,
  `inprice` decimal(20,2) NOT NULL,
  `allprice` decimal(20,2) NOT NULL,
  `rtime` date NOT NULL,
  `operator` varchar(20) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of retur
-- ----------------------------
INSERT INTO `retur` VALUES ('4', 'gmy', '感冒药', '111', '1111', '100', '25.00', '2500.00', '2018-04-24', 'double', '药品购进太多了');
INSERT INTO `retur` VALUES ('7', 'gmy', '感冒药', '111', '1111', '200', '25.00', '5000.00', '2018-04-25', 'double', '上次退货数量不够');
INSERT INTO `retur` VALUES ('8', 'gmy', '感冒药', '111', '1111', '200', '25.00', '5000.00', '2018-04-30', 'double', '测试');
INSERT INTO `retur` VALUES ('9', 'aa', 'aa', 'aa', 'aa', '500', '25.00', '12500.00', '2018-05-18', 'double', '进货太多');

-- ----------------------------
-- Table structure for `ruku`
-- ----------------------------
DROP TABLE IF EXISTS `ruku`;
CREATE TABLE `ruku` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pinyinma` varchar(20) NOT NULL,
  `drugname` varchar(20) NOT NULL,
  `pihao` varchar(20) NOT NULL,
  `pizhunwenhao` varchar(20) NOT NULL,
  `spec` varchar(20) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `amount` int(20) NOT NULL,
  `inprice` decimal(20,2) NOT NULL,
  `sellprice` decimal(20,2) NOT NULL,
  `allprice` decimal(20,2) NOT NULL,
  `intime` date NOT NULL,
  `infrom` varchar(20) NOT NULL,
  `factory` varchar(20) NOT NULL,
  `producedate` date NOT NULL,
  `usefuldate` date NOT NULL,
  `operator` varchar(20) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `sfth` varchar(2) NOT NULL DEFAULT 'N' COMMENT '标记是否退货，默认为N，经过退货操作就该写为Y',
  `sfxs` varchar(2) NOT NULL DEFAULT 'N' COMMENT '是否销售的标志，默认为否，有销售则为是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ruku
-- ----------------------------
INSERT INTO `ruku` VALUES ('1', 'gmy', '感冒药', '111', '1111', '12粒', '粒', '1000', '25.00', '35.00', '25000.00', '2018-04-24', '成都', '厂商1', '2018-04-01', '2019-04-11', 'double', '打手把手啊', 'Y', 'Y');
INSERT INTO `ruku` VALUES ('2', 'xyy', '消炎药', '222', '22222', '500毫升', '毫升', '200', '100.00', '150.00', '20000.00', '2018-04-24', '大理', '厂商2', '2018-04-01', '2019-04-17', 'double', '打算', 'N', 'Y');
INSERT INTO `ruku` VALUES ('3', 'aa', 'aa', '111', '222', 'aaa', '粒', '501', '100.00', '120.00', '50100.00', '2018-04-25', '昆明', 'aa', '2018-04-01', '2019-04-18', 'double', '的地方是否', 'N', 'N');
INSERT INTO `ruku` VALUES ('4', 'aa', 'aa', 'aa', 'aa', 'aaa', '粒', '1000', '25.00', '35.00', '25000.00', '2018-05-18', 'aaa', 'aa', '2018-05-01', '2019-06-28', 'double', 'aa', 'Y', 'N');

-- ----------------------------
-- Table structure for `sell`
-- ----------------------------
DROP TABLE IF EXISTS `sell`;
CREATE TABLE `sell` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pinyinma` varchar(20) NOT NULL,
  `drugname` varchar(20) NOT NULL,
  `pihao` varchar(20) NOT NULL,
  `pizhunwenhao` varchar(20) NOT NULL,
  `samount` int(20) NOT NULL,
  `sellprice` decimal(20,2) NOT NULL,
  `allprice` decimal(20,2) NOT NULL,
  `stime` date NOT NULL,
  `operator` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sell
-- ----------------------------
INSERT INTO `sell` VALUES ('1', 'gmy', '感冒药', '111', '1111', '100', '35.00', '3500.00', '2018-04-24', 'seller');
INSERT INTO `sell` VALUES ('2', 'xyy', '消炎药', '222', '22222', '1', '150.00', '150.00', '2018-04-25', 'seller');
INSERT INTO `sell` VALUES ('3', 'xyy', '消炎药', '222', '22222', '2', '150.00', '300.00', '2018-04-25', 'seller');
INSERT INTO `sell` VALUES ('4', 'gmy', '感冒药', '111', '1111', '10', '35.00', '350.00', '2018-04-25', 'seller');
INSERT INTO `sell` VALUES ('5', 'gmy', '感冒药', '111', '1111', '10', '35.00', '350.00', '2018-04-25', 'seller');
INSERT INTO `sell` VALUES ('6', 'gmy', '感冒药', '111', '1111', '100', '35.00', '3500.00', '2018-05-17', 'seller');
INSERT INTO `sell` VALUES ('7', 'gmy', '感冒药', '111', '1111', '10', '35.00', '350.00', '2018-05-18', 'seller');

-- ----------------------------
-- Table structure for `zdfy`
-- ----------------------------
DROP TABLE IF EXISTS `zdfy`;
CREATE TABLE `zdfy` (
  `zdmc` varchar(20) NOT NULL,
  `zdz` varchar(20) NOT NULL,
  `sfxs` varchar(20) NOT NULL,
  `zdsm` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zdfy
-- ----------------------------
INSERT INTO `zdfy` VALUES ('员工类型', '管理员', 'Y', '字段说明');
INSERT INTO `zdfy` VALUES ('员工类型', '药品录入人员', 'Y', '说明');
INSERT INTO `zdfy` VALUES ('员工类型', '销售人员', 'Y', '销售人员');
INSERT INTO `zdfy` VALUES ('计量单位', '粒', 'Y', '说明');
INSERT INTO `zdfy` VALUES ('计量单位', '毫升', 'Y', '说明');
