/*
Navicat MySQL Data Transfer

Source Server         : 数据库
Source Server Version : 50621
Source Host           : 127.0.0.1:3306
Source Database       : guns

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2017-05-10 22:27:00
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _dept
-- ----------------------------
INSERT INTO `_dept` VALUES ('24', '1', '0', '总公司', '总公司', '', null);
INSERT INTO `_dept` VALUES ('25', '2', '24', '开发部', '开发部', '', null);
INSERT INTO `_dept` VALUES ('26', '3', '24', '运营部', '运营部', '', null);
INSERT INTO `_dept` VALUES ('27', '4', '24', '战略部', '战略部', '', null);

-- ----------------------------
-- Table structure for _dict
-- ----------------------------
DROP TABLE IF EXISTS `_dict`;
CREATE TABLE `_dict` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _dict
-- ----------------------------
INSERT INTO `_dict` VALUES ('5', '0', '0', '账号状态', null);
INSERT INTO `_dict` VALUES ('6', '1', '5', '启用', null);
INSERT INTO `_dict` VALUES ('7', '2', '5', '冻结', null);
INSERT INTO `_dict` VALUES ('8', '3', '5', '待审核', null);
INSERT INTO `_dict` VALUES ('9', '4', '5', '审核拒绝', null);
INSERT INTO `_dict` VALUES ('10', '5', '5', '已删除', null);
INSERT INTO `_dict` VALUES ('14', '0', '0', '性别', null);
INSERT INTO `_dict` VALUES ('15', '1', '14', '男', null);
INSERT INTO `_dict` VALUES ('16', '0', '0', '状态', null);
INSERT INTO `_dict` VALUES ('17', '1', '16', '启用', null);
INSERT INTO `_dict` VALUES ('18', '2', '16', '禁用', null);

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
  `userid` int(65) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `succeed` varchar(255) DEFAULT NULL,
  `message` text,
  `ip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _login_log
-- ----------------------------
INSERT INTO `_login_log` VALUES ('102', '登录日志', '1', '2017-05-10 21:31:48', '成功', null, '127.0.0.1');

-- ----------------------------
-- Table structure for _menu
-- ----------------------------
DROP TABLE IF EXISTS `_menu`;
CREATE TABLE `_menu` (
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
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _menu
-- ----------------------------
INSERT INTO `_menu` VALUES ('105', 'system', '0', '系统管理', 'fa-user', '', '2', '1', null, '1', '1');
INSERT INTO `_menu` VALUES ('106', 'mgr', 'system', '用户管理', null, '/mgr', '1', '2', null, '1', '0');
INSERT INTO `_menu` VALUES ('107', 'mgr_add', 'mgr', '添加用户', null, '/mgr/add', '1', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('108', 'mgr_edit', 'mgr', '修改用户', null, '/mgr/edit', '2', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('109', 'mgr_delete', 'mgr', '删除用户', null, '/mgr/delete', '3', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('110', 'mgr_reset', 'mgr', '重置密码', null, '/mgr/reset', '4', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('111', 'mgr_freeze', 'mgr', '冻结用户', null, '/mgr/freeze', '5', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('112', 'mgr_unfreeze', 'mgr', '解除冻结用户', null, '/mgr/unfreeze', '6', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('113', 'mgr_setRole', 'mgr', '分配角色', null, '/mgr/setRole', '7', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('114', 'role', 'system', '角色管理', null, '/role', '2', '2', null, '1', '0');
INSERT INTO `_menu` VALUES ('115', 'role_add', 'role', '添加角色', null, '/role/add', '1', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('116', 'role_edit', 'role', '修改角色', null, '/role/edit', '2', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('117', 'role_remove', 'role', '删除角色', null, '/role/remove', '3', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('118', 'role_setAuthority', 'role', '配置权限', null, '/role/setAuthority', '4', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('119', 'menu', 'system', '菜单管理', null, '/menu', '4', '2', null, '1', '0');
INSERT INTO `_menu` VALUES ('120', 'menu_add', 'menu', '添加菜单', null, '/menu/add', '1', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('121', 'menu_edit', 'menu', '修改菜单', null, '/menu/edit', '2', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('122', 'menu_remove', 'menu', '删除菜单', null, '/menu/remove', '3', '3', null, '1', '0');
INSERT INTO `_menu` VALUES ('128', 'log', 'system', '业务日志', null, '/log', '6', '2', null, '1', '0');
INSERT INTO `_menu` VALUES ('130', 'druid', 'system', '监控管理', null, '/druid', '7', '2', null, '1', null);
INSERT INTO `_menu` VALUES ('131', 'dept', 'system', '部门管理', null, '/dept', '3', '2', null, '1', null);
INSERT INTO `_menu` VALUES ('132', 'dict', 'system', '字典管理', null, '/dict', '4', '2', null, '1', null);
INSERT INTO `_menu` VALUES ('133', 'loginLog', 'system', '登录日志', null, '/loginLog', '6', '2', null, '1', null);
INSERT INTO `_menu` VALUES ('134', 'log_clean', 'log', '清空日志', null, '/log/delLog', '3', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('135', 'dept_add', 'dept', '添加部门', null, '/dept/add', '1', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('136', 'dept_update', 'dept', '修改部门', null, '/dept/update', '1', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('137', 'dept_delete', 'dept', '删除部门', null, '/dept/delete', '1', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('138', 'dict_add', 'dict', '添加字典', null, '/dict/add', '1', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('139', 'dict_update', 'dict', '修改字典', null, '/dict/update', '1', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('140', 'dict_delete', 'dict', '删除字典', null, '/dict/delete', '1', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('141', 'notice', 'system', '通知管理', null, '/notice', '9', '2', null, '1', null);
INSERT INTO `_menu` VALUES ('142', 'notice_add', 'notice', '添加通知', null, '/notice/add', '1', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('143', 'notice_update', 'notice', '修改通知', null, '/notice/update', '2', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('144', 'notice_delete', 'notice', '删除通知', null, '/notice/delete', '3', '3', null, '1', null);
INSERT INTO `_menu` VALUES ('145', 'hello', '0', '通知', 'fa-rocket', '/notice/hello', '1', '1', null, '1', null);

-- ----------------------------
-- Table structure for _notice
-- ----------------------------
DROP TABLE IF EXISTS `_notice`;
CREATE TABLE `_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '序列',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `type` int(11) DEFAULT NULL COMMENT '类型',
  `content` text COMMENT '内容',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `creater` int(11) DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _notice
-- ----------------------------
INSERT INTO `_notice` VALUES ('6', '你好', '10', '欢迎使用Guns管理系统!', '2017-01-11 08:53:20', '1');
INSERT INTO `_notice` VALUES ('8', '你好2', null, '欢迎使用Guns管护系统', '2017-05-10 19:28:57', '1');

-- ----------------------------
-- Table structure for _operation_log
-- ----------------------------
DROP TABLE IF EXISTS `_operation_log`;
CREATE TABLE `_operation_log` (
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
) ENGINE=InnoDB AUTO_INCREMENT=364 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _operation_log
-- ----------------------------
INSERT INTO `_operation_log` VALUES ('361', '业务日志', '清空业务日志', '1', 'com.stylefeng.guns.modular.system.controller.LogController', 'delLog', '2017-05-09 23:54:30', '成功', '无');
INSERT INTO `_operation_log` VALUES ('362', '业务日志', '修改菜单', '1', 'com.stylefeng.guns.modular.system.controller.MenuController', 'edit', '2017-05-10 22:06:02', '成功', '菜单id=105;;;字段名称:菜单排序号,旧值:1,新值:2');
INSERT INTO `_operation_log` VALUES ('363', '业务日志', '修改菜单', '1', 'com.stylefeng.guns.modular.system.controller.MenuController', 'edit', '2017-05-10 22:15:31', '成功', '菜单id=145;;;字段名称:url地址,旧值:/hello,新值:/notice/hello');

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
) ENGINE=InnoDB AUTO_INCREMENT=3193 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _relation
-- ----------------------------
INSERT INTO `_relation` VALUES ('3158', '105', '1');
INSERT INTO `_relation` VALUES ('3159', '106', '1');
INSERT INTO `_relation` VALUES ('3160', '107', '1');
INSERT INTO `_relation` VALUES ('3161', '108', '1');
INSERT INTO `_relation` VALUES ('3162', '109', '1');
INSERT INTO `_relation` VALUES ('3163', '110', '1');
INSERT INTO `_relation` VALUES ('3164', '111', '1');
INSERT INTO `_relation` VALUES ('3165', '112', '1');
INSERT INTO `_relation` VALUES ('3166', '113', '1');
INSERT INTO `_relation` VALUES ('3167', '114', '1');
INSERT INTO `_relation` VALUES ('3168', '115', '1');
INSERT INTO `_relation` VALUES ('3169', '116', '1');
INSERT INTO `_relation` VALUES ('3170', '117', '1');
INSERT INTO `_relation` VALUES ('3171', '118', '1');
INSERT INTO `_relation` VALUES ('3172', '119', '1');
INSERT INTO `_relation` VALUES ('3173', '120', '1');
INSERT INTO `_relation` VALUES ('3174', '121', '1');
INSERT INTO `_relation` VALUES ('3175', '122', '1');
INSERT INTO `_relation` VALUES ('3176', '128', '1');
INSERT INTO `_relation` VALUES ('3177', '134', '1');
INSERT INTO `_relation` VALUES ('3178', '130', '1');
INSERT INTO `_relation` VALUES ('3179', '131', '1');
INSERT INTO `_relation` VALUES ('3180', '135', '1');
INSERT INTO `_relation` VALUES ('3181', '136', '1');
INSERT INTO `_relation` VALUES ('3182', '137', '1');
INSERT INTO `_relation` VALUES ('3183', '132', '1');
INSERT INTO `_relation` VALUES ('3184', '138', '1');
INSERT INTO `_relation` VALUES ('3185', '139', '1');
INSERT INTO `_relation` VALUES ('3186', '140', '1');
INSERT INTO `_relation` VALUES ('3187', '133', '1');
INSERT INTO `_relation` VALUES ('3188', '141', '1');
INSERT INTO `_relation` VALUES ('3189', '142', '1');
INSERT INTO `_relation` VALUES ('3190', '143', '1');
INSERT INTO `_relation` VALUES ('3191', '144', '1');
INSERT INTO `_relation` VALUES ('3192', '145', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _role
-- ----------------------------
INSERT INTO `_role` VALUES ('1', '1', '0', '超级管理员', '24', 'administrator', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _user
-- ----------------------------
INSERT INTO `_user` VALUES ('1', 'admin', 'bfb6b46de0ad31442adbed56bb2adc4e', 'elv4a', '张三', '2017-05-05 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', '24', '1', '2016-01-29 08:49:53', '25');
INSERT INTO `_user` VALUES ('40', 'test1', 'ec813b86e5e47ecbb61d2902dbb956b5', '74jpt', 'test1', '2017-04-21 00:00:00', '2', 'sn93@qq.com', '11122233344', null, '14', '5', '2017-04-18 12:30:08', null);
INSERT INTO `_user` VALUES ('41', 'test', 'd716ce8bc61e286598f110441c6486f3', 'hb04u', 'testtest', '2017-04-29 00:00:00', '1', 'sn93@qq.com', '18201309300', null, '2', '5', '2017-04-18 12:36:57', null);
INSERT INTO `_user` VALUES ('42', 'test', '769021b0bfc90c120d96aa45159d4f45', 'syw87', 'test', '2017-05-02 00:00:00', '1', '', '', '3', '26', '5', '2017-05-04 12:47:21', null);
INSERT INTO `_user` VALUES ('43', 'test', 'bb352046708a83df21ee45d2ccfd0edb', '92azk', 'feng', '2017-05-13 00:00:00', '1', 'abc@123.com', '12312312312', null, '25', '5', '2017-05-05 22:48:44', null);
