/*
Navicat MySQL Data Transfer

Source Server         : 本地的
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : guns

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-03-29 18:57:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for _attach
-- ----------------------------
DROP TABLE IF EXISTS `_attach`;
CREATE TABLE `_attach` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` text,
  `status` int(11) DEFAULT NULL,
  `creater` int(11) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _attach
-- ----------------------------

-- ----------------------------
-- Table structure for _dept
-- ----------------------------
DROP TABLE IF EXISTS `_dept`;
CREATE TABLE `_dept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `simplename` varchar(45) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _dept
-- ----------------------------
INSERT INTO `_dept` VALUES ('1', '0', '0', '总公司', '总公司', null, '1');
INSERT INTO `_dept` VALUES ('2', '1', '1', '服务器', '服务器', null, '1');
INSERT INTO `_dept` VALUES ('14', '2', '1', '安卓', '安卓', null, '1');
INSERT INTO `_dept` VALUES ('15', '3', '1', '苹果', '服务器', null, '1');

-- ----------------------------
-- Table structure for _dict
-- ----------------------------
DROP TABLE IF EXISTS `_dict`;
CREATE TABLE `_dict` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _dict
-- ----------------------------
INSERT INTO `_dict` VALUES ('1', '101', '0', '0', '性别', null, '0');
INSERT INTO `_dict` VALUES ('2', '101', '1', '1', '男', null, '1');
INSERT INTO `_dict` VALUES ('3', '101', '2', '1', '女', null, '7');
INSERT INTO `_dict` VALUES ('5', '901', '0', '0', '账号状态', null, '0');
INSERT INTO `_dict` VALUES ('6', '901', '1', '5', '启用', null, '0');
INSERT INTO `_dict` VALUES ('7', '901', '2', '5', '冻结', null, '0');
INSERT INTO `_dict` VALUES ('8', '901', '3', '5', '待审核', null, '2');
INSERT INTO `_dict` VALUES ('9', '901', '4', '5', '审核拒绝', null, '0');
INSERT INTO `_dict` VALUES ('10', '901', '5', '5', '已删除', null, '3');
INSERT INTO `_dict` VALUES ('11', '902', '0', '0', '状态', null, '0');
INSERT INTO `_dict` VALUES ('12', '902', '1', '11', '启用', null, '0');
INSERT INTO `_dict` VALUES ('13', '902', '2', '11', '禁用', null, '0');

-- ----------------------------
-- Table structure for _generate
-- ----------------------------
DROP TABLE IF EXISTS `_generate`;
CREATE TABLE `_generate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `realpath` varchar(255) DEFAULT NULL,
  `packagename` varchar(255) DEFAULT NULL,
  `modelname` varchar(255) DEFAULT NULL,
  `tablename` varchar(255) DEFAULT NULL,
  `pkname` varchar(255) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _generate
-- ----------------------------
INSERT INTO `_generate` VALUES ('1', '测试', 'E:\\Workspaces\\blade\\SpringBlade', 'com.smallchill.gen', 'Notice', '_notice', 'id', null);

-- ----------------------------
-- Table structure for _login_log
-- ----------------------------
DROP TABLE IF EXISTS `_login_log`;
CREATE TABLE `_login_log` (
  `id` int(65) NOT NULL AUTO_INCREMENT,
  `logname` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `classname` varchar(255) DEFAULT NULL,
  `method` text,
  `createtime` datetime DEFAULT NULL,
  `succeed` varchar(255) DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _login_log
-- ----------------------------

-- ----------------------------
-- Table structure for _menu
-- ----------------------------
DROP TABLE IF EXISTS `_menu`;
CREATE TABLE `_menu` (
  `id` int(65) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL COMMENT '菜单编号',
  `pcode` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `num` int(65) DEFAULT NULL,
  `levels` int(65) DEFAULT NULL,
  `source` text,
  `path` varchar(255) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  `status` int(65) DEFAULT NULL,
  `isopen` varchar(255) DEFAULT NULL,
  `istemplate` varchar(255) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _menu
-- ----------------------------
INSERT INTO `_menu` VALUES ('105', 'system', '0', null, '系统管理', 'fa-user', '', '1', '1', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('106', 'mgr', 'system', null, '用户管理', null, '/mgr', '1', '2', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('107', 'mgr_add', 'mgr', null, '添加用户', null, '/mgr/add', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('108', 'mgr_edit', 'mgr', null, '修改用户', null, '/mgr/edit', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('109', 'mgr_delete', 'mgr', null, '删除用户', null, '/mgr/delete', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('110', 'mgr_reset', 'mgr', null, '重置密码', null, '/mgr/reset', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('111', 'mgr_freeze', 'mgr', null, '冻结用户', null, '/mgr/freeze', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('112', 'mgr_unfreeze', 'mgr', null, '解除冻结用户', null, '/mgr/unfreeze', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('113', 'mgr_setRole', 'mgr', null, '分配角色', null, '/mgr/setRole', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('114', 'role', 'system', null, '角色管理', null, '/role', '1', '2', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('115', 'role_add', 'role', null, '添加角色', null, '/role/add', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('116', 'role_edit', 'role', null, '修改角色', null, '/role/edit', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('117', 'role_remove', 'role', null, '删除角色', null, '/role/remove', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('118', 'role_setAuthority', 'role', null, '配置权限', null, '/role/setAuthority', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('119', 'menu', 'system', null, '菜单管理', null, '/menu', '1', '2', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('120', 'menu_add', 'menu', null, '添加菜单', null, '/menu/add', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('121', 'menu_edit', 'menu', null, '修改菜单', null, '/menu/edit', '1', '3', null, null, null, '1', null, null, null);
INSERT INTO `_menu` VALUES ('122', 'menu_remove', 'menu', null, '删除菜单', null, '/menu/remove', '1', '3', null, null, null, '1', null, null, null);

-- ----------------------------
-- Table structure for _notice
-- ----------------------------
DROP TABLE IF EXISTS `_notice`;
CREATE TABLE `_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序列',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `type` int(11) DEFAULT NULL COMMENT '类型',
  `content` text COMMENT '内容',
  `publishtime` datetime DEFAULT NULL COMMENT '发布时间',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `creater` int(11) DEFAULT NULL COMMENT '创建人',
  `pic` int(11) DEFAULT NULL COMMENT '图片',
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _notice
-- ----------------------------
INSERT INTO `_notice` VALUES ('6', '通知1', '10', '通知111', '2017-01-16 00:00:00', '2017-01-11 08:53:20', '1', null, '3');
INSERT INTO `_notice` VALUES ('7', '通知22222', '1', '123123123', '2017-02-02 00:00:00', '2017-01-12 16:22:10', '1', null, '1');
INSERT INTO `_notice` VALUES ('8', '123123', '10', '123123', '2017-02-07 00:00:00', '2017-02-20 12:38:46', '1', null, null);

-- ----------------------------
-- Table structure for _operation_log
-- ----------------------------
DROP TABLE IF EXISTS `_operation_log`;
CREATE TABLE `_operation_log` (
  `id` int(65) NOT NULL AUTO_INCREMENT,
  `logname` varchar(255) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `classname` varchar(255) DEFAULT NULL,
  `method` text,
  `createtime` datetime DEFAULT NULL,
  `succeed` varchar(255) DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _operation_log
-- ----------------------------
INSERT INTO `_operation_log` VALUES ('1', '异常日志', '1', null, 'Missing URI template variable \'tablePath\' for method parameter of type String', '2016-11-01 09:29:09', '0', null);

-- ----------------------------
-- Table structure for _parameter
-- ----------------------------
DROP TABLE IF EXISTS `_parameter`;
CREATE TABLE `_parameter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `para` text,
  `tips` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _parameter
-- ----------------------------
INSERT INTO `_parameter` VALUES ('1', '101', '100', '是否开启记录日志', '2', '1:是  2:否', '1', '7');

-- ----------------------------
-- Table structure for _relation
-- ----------------------------
DROP TABLE IF EXISTS `_relation`;
CREATE TABLE `_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuid` int(11) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2637 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _relation
-- ----------------------------
INSERT INTO `_relation` VALUES ('2600', '105', '1');
INSERT INTO `_relation` VALUES ('2601', '106', '1');
INSERT INTO `_relation` VALUES ('2602', '107', '1');
INSERT INTO `_relation` VALUES ('2603', '108', '1');
INSERT INTO `_relation` VALUES ('2604', '109', '1');
INSERT INTO `_relation` VALUES ('2605', '110', '1');
INSERT INTO `_relation` VALUES ('2606', '111', '1');
INSERT INTO `_relation` VALUES ('2607', '112', '1');
INSERT INTO `_relation` VALUES ('2608', '113', '1');
INSERT INTO `_relation` VALUES ('2609', '114', '1');
INSERT INTO `_relation` VALUES ('2610', '115', '1');
INSERT INTO `_relation` VALUES ('2611', '116', '1');
INSERT INTO `_relation` VALUES ('2612', '117', '1');
INSERT INTO `_relation` VALUES ('2613', '118', '1');
INSERT INTO `_relation` VALUES ('2614', '119', '1');
INSERT INTO `_relation` VALUES ('2615', '120', '1');
INSERT INTO `_relation` VALUES ('2616', '121', '1');
INSERT INTO `_relation` VALUES ('2617', '122', '1');

-- ----------------------------
-- Table structure for _role
-- ----------------------------
DROP TABLE IF EXISTS `_role`;
CREATE TABLE `_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `deptid` int(11) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _role
-- ----------------------------
INSERT INTO `_role` VALUES ('1', '1', '0', '超级管理员', '1', 'administrator', '1');
INSERT INTO `_role` VALUES ('9', '1', '1', '服务器研发', '2', 'server', null);
INSERT INTO `_role` VALUES ('10', '1', '1', '安卓研发', '14', 'android', null);
INSERT INTO `_role` VALUES ('11', '1', '1', 'IOS研发', '15', 'ios', null);
INSERT INTO `_role` VALUES ('12', '1', '1', '运营', '1', 'bussiness', null);

-- ----------------------------
-- Table structure for _role_ext
-- ----------------------------
DROP TABLE IF EXISTS `_role_ext`;
CREATE TABLE `_role_ext` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) DEFAULT NULL,
  `rolein` text,
  `roleout` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _role_ext
-- ----------------------------
INSERT INTO `_role_ext` VALUES ('27', '66', '1,44,49', '45');

-- ----------------------------
-- Table structure for _user
-- ----------------------------
DROP TABLE IF EXISTS `_user`;
CREATE TABLE `_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `salt` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `roleid` varchar(255) DEFAULT NULL,
  `deptid` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _user
-- ----------------------------
INSERT INTO `_user` VALUES ('1', 'admin', '13c12b0b12fc76d994d68478ff476e1a', 'u9oqh', '冯硕楠', '2017-02-13 00:00:00', '1', 'sn93@qq.com', '18201309300', '1', '1', '1', '2016-01-29 08:49:53', '25');
