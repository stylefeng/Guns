/*
Navicat MySQL Data Transfer

Source Server         : 数据库
Source Server Version : 50621
Source Host           : 127.0.0.1:3306
Source Database       : guns

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-06-01 21:42:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `simplename` varchar(45) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES ('24', '1', '0', '总公司', '总公司', '', null);
INSERT INTO `dept` VALUES ('25', '2', '24', '开发部', '开发部', '', null);
INSERT INTO `dept` VALUES ('26', '3', '24', '运营部', '运营部', '', null);
INSERT INTO `dept` VALUES ('27', '4', '24', '战略部', '战略部', '', null);

-- ----------------------------
-- Table structure for dict
-- ----------------------------
DROP TABLE IF EXISTS `dict`;
CREATE TABLE `dict` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dict
-- ----------------------------
INSERT INTO `dict` VALUES ('16', '0', '0', '状态', null);
INSERT INTO `dict` VALUES ('17', '1', '16', '启用', null);
INSERT INTO `dict` VALUES ('18', '2', '16', '禁用', null);
INSERT INTO `dict` VALUES ('22', '0', '0', '账号状态', null);
INSERT INTO `dict` VALUES ('23', '1', '22', '启用', null);
INSERT INTO `dict` VALUES ('24', '2', '22', '冻结', null);
INSERT INTO `dict` VALUES ('25', '3', '22', '已删除', null);
INSERT INTO `dict` VALUES ('29', '0', '0', '性别', null);
INSERT INTO `dict` VALUES ('30', '1', '29', '男', null);
INSERT INTO `dict` VALUES ('31', '2', '29', '女', null);

-- ----------------------------
-- Table structure for login_log
-- ----------------------------
DROP TABLE IF EXISTS `login_log`;
CREATE TABLE `login_log` (
  `id` int(65) NOT NULL AUTO_INCREMENT,
  `logname` varchar(255) DEFAULT NULL,
  `userid` int(65) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `succeed` varchar(255) DEFAULT NULL,
  `message` text,
  `ip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login_log
-- ----------------------------

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(65) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL COMMENT '菜单编号',
  `pcode` varchar(255) DEFAULT NULL COMMENT '菜单父编号',
  `name` varchar(255) DEFAULT NULL COMMENT '菜单名称',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `url` varchar(255) DEFAULT NULL COMMENT 'url地址',
  `num` int(65) DEFAULT NULL COMMENT '菜单排序号',
  `levels` int(65) DEFAULT NULL COMMENT '菜单层级',
  `tips` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` int(65) DEFAULT NULL COMMENT '菜单状态 :  1:启用   0:不启用',
  `isopen` int(11) DEFAULT NULL COMMENT '是否打开:    1:打开   0:不打开',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('105', 'system', '0', '系统管理', 'fa-user', '', '3', '1', null, '1', '1');
INSERT INTO `menu` VALUES ('106', 'mgr', 'system', '用户管理', '', '/mgr', '1', '2', null, '1', '0');
INSERT INTO `menu` VALUES ('107', 'mgr_add', 'mgr', '添加用户', null, '/mgr/add', '1', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('108', 'mgr_edit', 'mgr', '修改用户', null, '/mgr/edit', '2', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('109', 'mgr_delete', 'mgr', '删除用户', null, '/mgr/delete', '3', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('110', 'mgr_reset', 'mgr', '重置密码', null, '/mgr/reset', '4', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('111', 'mgr_freeze', 'mgr', '冻结用户', null, '/mgr/freeze', '5', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('112', 'mgr_unfreeze', 'mgr', '解除冻结用户', null, '/mgr/unfreeze', '6', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('113', 'mgr_setRole', 'mgr', '分配角色', null, '/mgr/setRole', '7', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('114', 'role', 'system', '角色管理', null, '/role', '2', '2', null, '1', '0');
INSERT INTO `menu` VALUES ('115', 'role_add', 'role', '添加角色', null, '/role/add', '1', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('116', 'role_edit', 'role', '修改角色', null, '/role/edit', '2', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('117', 'role_remove', 'role', '删除角色', null, '/role/remove', '3', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('118', 'role_setAuthority', 'role', '配置权限', null, '/role/setAuthority', '4', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('119', 'menu', 'system', '菜单管理', null, '/menu', '4', '2', null, '1', '0');
INSERT INTO `menu` VALUES ('120', 'menu_add', 'menu', '添加菜单', null, '/menu/add', '1', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('121', 'menu_edit', 'menu', '修改菜单', null, '/menu/edit', '2', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('122', 'menu_remove', 'menu', '删除菜单', null, '/menu/remove', '3', '3', null, '1', '0');
INSERT INTO `menu` VALUES ('128', 'log', 'system', '业务日志', null, '/log', '6', '2', null, '1', '0');
INSERT INTO `menu` VALUES ('130', 'druid', 'system', '监控管理', null, '/druid', '7', '2', null, '1', null);
INSERT INTO `menu` VALUES ('131', 'dept', 'system', '部门管理', null, '/dept', '3', '2', null, '1', null);
INSERT INTO `menu` VALUES ('132', 'dict', 'system', '字典管理', null, '/dict', '4', '2', null, '1', null);
INSERT INTO `menu` VALUES ('133', 'loginLog', 'system', '登录日志', null, '/loginLog', '6', '2', null, '1', null);
INSERT INTO `menu` VALUES ('134', 'log_clean', 'log', '清空日志', null, '/log/delLog', '3', '3', null, '1', null);
INSERT INTO `menu` VALUES ('135', 'dept_add', 'dept', '添加部门', null, '/dept/add', '1', '3', null, '1', null);
INSERT INTO `menu` VALUES ('136', 'dept_update', 'dept', '修改部门', null, '/dept/update', '1', '3', null, '1', null);
INSERT INTO `menu` VALUES ('137', 'dept_delete', 'dept', '删除部门', null, '/dept/delete', '1', '3', null, '1', null);
INSERT INTO `menu` VALUES ('138', 'dict_add', 'dict', '添加字典', null, '/dict/add', '1', '3', null, '1', null);
INSERT INTO `menu` VALUES ('139', 'dict_update', 'dict', '修改字典', null, '/dict/update', '1', '3', null, '1', null);
INSERT INTO `menu` VALUES ('140', 'dict_delete', 'dict', '删除字典', null, '/dict/delete', '1', '3', null, '1', null);
INSERT INTO `menu` VALUES ('141', 'notice', 'system', '通知管理', null, '/notice', '9', '2', null, '1', null);
INSERT INTO `menu` VALUES ('142', 'notice_add', 'notice', '添加通知', null, '/notice/add', '1', '3', null, '1', null);
INSERT INTO `menu` VALUES ('143', 'notice_update', 'notice', '修改通知', null, '/notice/update', '2', '3', null, '1', null);
INSERT INTO `menu` VALUES ('144', 'notice_delete', 'notice', '删除通知', null, '/notice/delete', '3', '3', null, '1', null);
INSERT INTO `menu` VALUES ('145', 'hello', '0', '通知', 'fa-rocket', '/notice/hello', '1', '1', null, '1', null);
INSERT INTO `menu` VALUES ('148', 'code', 'system', '代码生成', 'fa-user', '/code', '10', '2', null, '1', null);
INSERT INTO `menu` VALUES ('149', 'api_mgr', '0', '接口文档', 'fa-leaf', '/swagger-ui.html', '2', '1', null, '1', null);

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序列',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `type` int(11) DEFAULT NULL COMMENT '类型',
  `content` text COMMENT '内容',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `creater` int(11) DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES ('6', '世界', '10', '欢迎使用Guns管理系统', '2017-01-11 08:53:20', '1');
INSERT INTO `notice` VALUES ('8', '你好', null, '你好', '2017-05-10 19:28:57', '1');

-- ----------------------------
-- Table structure for operation_log
-- ----------------------------
DROP TABLE IF EXISTS `operation_log`;
CREATE TABLE `operation_log` (
  `id` int(65) NOT NULL AUTO_INCREMENT,
  `logtype` varchar(255) DEFAULT NULL,
  `logname` varchar(255) DEFAULT NULL,
  `userid` int(65) DEFAULT NULL,
  `classname` varchar(255) DEFAULT NULL,
  `method` text,
  `createtime` datetime DEFAULT NULL,
  `succeed` varchar(255) DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=448 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of operation_log
-- ----------------------------
INSERT INTO `operation_log` VALUES ('446', '业务日志', '清空业务日志', '1', 'com.stylefeng.guns.modular.system.controller.LogController', 'delLog', '2017-06-01 21:42:13', '成功', '主键id=null');
INSERT INTO `operation_log` VALUES ('447', '业务日志', '清空登录日志', '1', 'com.stylefeng.guns.modular.system.controller.LoginLogController', 'delLog', '2017-06-01 21:42:15', '成功', '主键id=null');

-- ----------------------------
-- Table structure for relation
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuid` int(11) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3300 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of relation
-- ----------------------------
INSERT INTO `relation` VALUES ('3263', '105', '1');
INSERT INTO `relation` VALUES ('3264', '106', '1');
INSERT INTO `relation` VALUES ('3265', '107', '1');
INSERT INTO `relation` VALUES ('3266', '108', '1');
INSERT INTO `relation` VALUES ('3267', '109', '1');
INSERT INTO `relation` VALUES ('3268', '110', '1');
INSERT INTO `relation` VALUES ('3269', '111', '1');
INSERT INTO `relation` VALUES ('3270', '112', '1');
INSERT INTO `relation` VALUES ('3271', '113', '1');
INSERT INTO `relation` VALUES ('3272', '114', '1');
INSERT INTO `relation` VALUES ('3273', '115', '1');
INSERT INTO `relation` VALUES ('3274', '116', '1');
INSERT INTO `relation` VALUES ('3275', '117', '1');
INSERT INTO `relation` VALUES ('3276', '118', '1');
INSERT INTO `relation` VALUES ('3277', '119', '1');
INSERT INTO `relation` VALUES ('3278', '120', '1');
INSERT INTO `relation` VALUES ('3279', '121', '1');
INSERT INTO `relation` VALUES ('3280', '122', '1');
INSERT INTO `relation` VALUES ('3281', '128', '1');
INSERT INTO `relation` VALUES ('3282', '134', '1');
INSERT INTO `relation` VALUES ('3283', '130', '1');
INSERT INTO `relation` VALUES ('3284', '131', '1');
INSERT INTO `relation` VALUES ('3285', '135', '1');
INSERT INTO `relation` VALUES ('3286', '136', '1');
INSERT INTO `relation` VALUES ('3287', '137', '1');
INSERT INTO `relation` VALUES ('3288', '132', '1');
INSERT INTO `relation` VALUES ('3289', '138', '1');
INSERT INTO `relation` VALUES ('3290', '139', '1');
INSERT INTO `relation` VALUES ('3291', '140', '1');
INSERT INTO `relation` VALUES ('3292', '133', '1');
INSERT INTO `relation` VALUES ('3293', '141', '1');
INSERT INTO `relation` VALUES ('3294', '142', '1');
INSERT INTO `relation` VALUES ('3295', '143', '1');
INSERT INTO `relation` VALUES ('3296', '144', '1');
INSERT INTO `relation` VALUES ('3297', '148', '1');
INSERT INTO `relation` VALUES ('3298', '145', '1');
INSERT INTO `relation` VALUES ('3299', '149', '1');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `deptid` int(11) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '1', '0', '超级管理员', '24', 'administrator', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'girl.gif', 'admin', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', '张三', '2017-05-05 00:00:00', '2', 'sn93@qq.com', '18200000000', '1', '27', '1', '2016-01-29 08:49:53', '25');
INSERT INTO `user` VALUES ('44', null, ' test', 'a5421443274a4d1f9eb938f7adc4478d', '4g4bn', 'test', '2017-05-01 00:00:00', '1', 'abc@123.com', '', '1', '26', '3', '2017-05-16 20:33:37', null);
