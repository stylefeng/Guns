DROP DATABASE IF EXISTS guns;
CREATE DATABASE IF NOT EXISTS guns DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

USE guns;

/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : guns

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 08/12/2018 12:00:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for code_dbinfo
-- ----------------------------
DROP TABLE IF EXISTS `code_dbinfo`;
CREATE TABLE `code_dbinfo`  (
  `DB_ID` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `NAME` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '别名',
  `DB_DRIVER` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '数据库驱动',
  `DB_URL` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '数据库地址',
  `DB_USER_NAME` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '数据库账户',
  `DB_PASSWORD` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '连接密码',
  `DB_TYPE` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '数据库类型(字典)',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `UPDATE_TIME` datetime(0) DEFAULT NULL COMMENT '修改时间',
  `CREATE_USER` bigint(20) DEFAULT NULL COMMENT '创建用户',
  `UPDATE_USER` bigint(20) DEFAULT NULL COMMENT '修改用户',
  PRIMARY KEY (`DB_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '数据库链接信息' ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `DEPT_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `PID` bigint(20) DEFAULT NULL COMMENT '父部门id',
  `PIDS` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '父级ids',
  `SIMPLE_NAME` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '简称',
  `FULL_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '全称',
  `DESCRIPTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '描述',
  `VERSION` int(11) DEFAULT NULL COMMENT '版本（乐观锁保留字段）',
  `SORT` int(11) DEFAULT NULL COMMENT '排序',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `UPDATE_TIME` datetime(0) DEFAULT NULL COMMENT '修改时间',
  `CREATE_USER` bigint(20) DEFAULT NULL COMMENT '创建人',
  `UPDATE_USER` bigint(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`DEPT_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '部门表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES (24, 0, '[0],', '总公司', '总公司', '', NULL, 1, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dept` VALUES (25, 24, '[0],[24],', '开发部', '开发部', '', NULL, 2, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dept` VALUES (26, 24, '[0],[24],', '运营部', '运营部', '', NULL, 3, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dept` VALUES (27, 24, '[0],[24],', '战略部', '战略部', '', NULL, 4, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `DICT_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `PID` bigint(20) DEFAULT NULL COMMENT '父级字典id',
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '字典名称',
  `CODE` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '字典的编码',
  `DESCRIPTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '字典描述',
  `SORT` int(11) DEFAULT NULL COMMENT '排序',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `UPDATE_TIME` datetime(0) DEFAULT NULL COMMENT '修改时间',
  `CREATE_USER` bigint(20) DEFAULT NULL COMMENT '创建人',
  `UPDATE_USER` bigint(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`DICT_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES (50, 0, '性别', 'SEX', NULL, 0, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (51, 50, '男', 'M', NULL, 1, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (52, 50, '女', 'F', NULL, 2, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (53, 0, '状态', 'STATUS', NULL, 0, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (54, 53, '启用', 'ENABLE', NULL, 1, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (55, 53, '禁用', 'DISABLE', NULL, 2, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (56, 0, '账号状态', 'ACCOUNT_STATUS', NULL, 0, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (57, 56, '启用', 'ENABLE', NULL, 1, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (58, 56, '冻结', 'FREEZE', NULL, 2, NULL, NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (59, 56, '已删除', 'DELETED', NULL, 3, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_file_info
-- ----------------------------
DROP TABLE IF EXISTS `sys_file_info`;
CREATE TABLE `sys_file_info`  (
  `FILE_ID` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键id',
  `FILE_DATA` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT 'base64编码的文件',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `UPDATE_TIME` datetime(0) DEFAULT NULL COMMENT '修改时间',
  `CREATE_USER` bigint(20) DEFAULT NULL COMMENT '创建用户',
  `UPDATE_USER` bigint(20) DEFAULT NULL COMMENT '修改用户',
  PRIMARY KEY (`FILE_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '文件信息表\r\n' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_file_info
-- ----------------------------
INSERT INTO `sys_file_info` VALUES ('1', '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', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log`  (
  `LOGIN_LOG_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `LOG_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '日志名称',
  `USER_ID` bigint(20) DEFAULT NULL COMMENT '管理员id',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `SUCCEED` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '是否执行成功',
  `MESSAGE` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '具体消息',
  `IP_ADDRESS` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '登录ip',
  PRIMARY KEY (`LOGIN_LOG_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '登录记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_login_log
-- ----------------------------
INSERT INTO `sys_login_log` VALUES (1, '登录失败日志', NULL, '2018-12-08 11:37:15', '成功', '账号:admin,账号被冻结', '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (2, '登录失败日志', NULL, '2018-12-08 11:37:36', '成功', '账号:sn91@qq.com,账号密码错误', '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (3, '登录失败日志', NULL, '2018-12-08 11:42:11', '成功', '账号:admin,账号密码错误', '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (4, '登录日志', 1, '2018-12-08 11:42:18', '成功', NULL, '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (5, '退出日志', 1, '2018-12-08 11:42:33', '成功', NULL, '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (6, '登录日志', 1, '2018-12-08 11:42:37', '成功', NULL, '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (7, '退出日志', 1, '2018-12-08 11:47:42', '成功', NULL, '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (8, '登录日志', 1, '2018-12-08 11:49:01', '成功', NULL, '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (9, '退出日志', 1, '2018-12-08 11:51:16', '成功', NULL, '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (10, '登录日志', 1, '2018-12-08 11:51:22', '成功', NULL, '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (11, '退出日志', 1, '2018-12-08 11:54:17', '成功', NULL, '0:0:0:0:0:0:0:1');
INSERT INTO `sys_login_log` VALUES (12, '登录日志', 1, '2018-12-08 11:57:55', '成功', NULL, '0:0:0:0:0:0:0:1');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `MENU_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `CODE` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单编号',
  `PCODE` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单父编号',
  `PCODES` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '当前菜单的所有父菜单编号',
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单名称',
  `ICON` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单图标',
  `URL` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'url地址',
  `SORT` int(65) DEFAULT NULL COMMENT '菜单排序号',
  `LEVELS` int(65) DEFAULT NULL COMMENT '菜单层级',
  `MENU_FLAG` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '是否是菜单(字典)',
  `DESCRIPTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `STATUS` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'ENABLE' COMMENT '菜单状态(字典)',
  `NEW_PAGE_FLAG` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '是否打开新页面的标识(字典)',
  `OPEN_FLAG` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '是否打开(字典)',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `UPDATE_TIME` datetime(0) DEFAULT NULL COMMENT '修改时间',
  `CREATE_USER` bigint(20) DEFAULT NULL COMMENT '创建人',
  `UPDATE_USER` bigint(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`MENU_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 173 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '菜单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (105, 'system', '0', '[0],', '系统管理', 'fa-user', '#', 30, 1, 'Y', NULL, '1', NULL, '1', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (106, 'mgr', 'system', '[0],[system],', '用户管理', '', '/mgr', 1, 2, 'Y', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (107, 'mgr_add', 'mgr', '[0],[system],[mgr],', '添加用户', NULL, '/mgr/add', 1, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (108, 'mgr_edit', 'mgr', '[0],[system],[mgr],', '修改用户', NULL, '/mgr/edit', 2, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (109, 'mgr_delete', 'mgr', '[0],[system],[mgr],', '删除用户', NULL, '/mgr/delete', 3, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (110, 'mgr_reset', 'mgr', '[0],[system],[mgr],', '重置密码', NULL, '/mgr/reset', 4, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (111, 'mgr_freeze', 'mgr', '[0],[system],[mgr],', '冻结用户', NULL, '/mgr/freeze', 5, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (112, 'mgr_unfreeze', 'mgr', '[0],[system],[mgr],', '解除冻结用户', NULL, '/mgr/unfreeze', 6, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (113, 'mgr_setRole', 'mgr', '[0],[system],[mgr],', '分配角色', NULL, '/mgr/setRole', 7, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (114, 'role', 'system', '[0],[system],', '角色管理', NULL, '/role', 2, 2, 'Y', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (115, 'role_add', 'role', '[0],[system],[role],', '添加角色', NULL, '/role/add', 1, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (116, 'role_edit', 'role', '[0],[system],[role],', '修改角色', NULL, '/role/edit', 2, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (117, 'role_remove', 'role', '[0],[system],[role],', '删除角色', NULL, '/role/remove', 3, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (118, 'role_setAuthority', 'role', '[0],[system],[role],', '配置权限', NULL, '/role/setAuthority', 4, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (119, 'menu', 'system', '[0],[system],', '菜单管理', NULL, '/menu', 4, 2, 'Y', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (120, 'menu_add', 'menu', '[0],[system],[menu],', '添加菜单', NULL, '/menu/add', 1, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (121, 'menu_edit', 'menu', '[0],[system],[menu],', '修改菜单', NULL, '/menu/edit', 2, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (122, 'menu_remove', 'menu', '[0],[system],[menu],', '删除菜单', NULL, '/menu/remove', 3, 3, 'N', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (128, 'log', 'system', '[0],[system],', '业务日志', NULL, '/log', 6, 2, 'Y', NULL, '1', NULL, '0', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (130, 'druid', 'system', '[0],[system],', '监控管理', NULL, '/druid', 7, 2, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (131, 'dept', 'system', '[0],[system],', '部门管理', NULL, '/dept', 3, 2, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (132, 'dict', 'system', '[0],[system],', '字典管理', NULL, '/dict', 4, 2, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (133, 'loginLog', 'system', '[0],[system],', '登录日志', NULL, '/loginLog', 6, 2, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (134, 'log_clean', 'log', '[0],[system],[log],', '清空日志', NULL, '/log/delLog', 3, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (135, 'dept_add', 'dept', '[0],[system],[dept],', '添加部门', NULL, '/dept/add', 1, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (136, 'dept_update', 'dept', '[0],[system],[dept],', '修改部门', NULL, '/dept/update', 1, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (137, 'dept_delete', 'dept', '[0],[system],[dept],', '删除部门', NULL, '/dept/delete', 1, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (138, 'dict_add', 'dict', '[0],[system],[dict],', '添加字典', NULL, '/dict/add', 1, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (139, 'dict_update', 'dict', '[0],[system],[dict],', '修改字典', NULL, '/dict/update', 1, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (140, 'dict_delete', 'dict', '[0],[system],[dict],', '删除字典', NULL, '/dict/delete', 1, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (141, 'notice', 'system', '[0],[system],', '通知管理', NULL, '/notice', 9, 2, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (142, 'notice_add', 'notice', '[0],[system],[notice],', '添加通知', NULL, '/notice/add', 1, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (143, 'notice_update', 'notice', '[0],[system],[notice],', '修改通知', NULL, '/notice/update', 2, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (144, 'notice_delete', 'notice', '[0],[system],[notice],', '删除通知', NULL, '/notice/delete', 3, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (145, 'hello', 'system_message', '[0],[system_message],', '系统消息', 'fa-rocket', '/notice/hello', 1, 2, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (148, 'code', 'dev_tools', '[0],[dev_tools],', '代码生成', 'fa-code', '/code', 3, 2, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (149, 'api_mgr', 'dev_tools', '[0],[dev_tools],', '接口文档', 'fa-leaf', '/swagger-ui.html', 2, 2, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (150, 'to_menu_edit', 'menu', '[0],[system],[menu],', '菜单编辑跳转', '', '/menu/menu_edit', 4, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (151, 'menu_list', 'menu', '[0],[system],[menu],', '菜单列表', '', '/menu/list', 5, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (152, 'to_dept_update', 'dept', '[0],[system],[dept],', '修改部门跳转', '', '/dept/dept_update', 4, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (153, 'dept_list', 'dept', '[0],[system],[dept],', '部门列表', '', '/dept/list', 5, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (154, 'dept_detail', 'dept', '[0],[system],[dept],', '部门详情', '', '/dept/detail', 6, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (155, 'to_dict_edit', 'dict', '[0],[system],[dict],', '修改菜单跳转', '', '/dict/dict_edit', 4, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (156, 'dict_list', 'dict', '[0],[system],[dict],', '字典列表', '', '/dict/list', 5, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (157, 'dict_detail', 'dict', '[0],[system],[dict],', '字典详情', '', '/dict/detail', 6, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (158, 'log_list', 'log', '[0],[system],[log],', '日志列表', '', '/log/list', 2, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (159, 'log_detail', 'log', '[0],[system],[log],', '日志详情', '', '/log/detail', 3, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (160, 'del_login_log', 'loginLog', '[0],[system],[loginLog],', '清空登录日志', '', '/loginLog/delLoginLog', 1, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (161, 'login_log_list', 'loginLog', '[0],[system],[loginLog],', '登录日志列表', '', '/loginLog/list', 2, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (162, 'to_role_edit', 'role', '[0],[system],[role],', '修改角色跳转', '', '/role/role_edit', 5, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (163, 'to_role_assign', 'role', '[0],[system],[role],', '角色分配跳转', '', '/role/role_assign', 6, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (164, 'role_list', 'role', '[0],[system],[role],', '角色列表', '', '/role/list', 7, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (165, 'to_assign_role', 'mgr', '[0],[system],[mgr],', '分配角色跳转', '', '/mgr/role_assign', 8, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (166, 'to_user_edit', 'mgr', '[0],[system],[mgr],', '编辑用户跳转', '', '/mgr/user_edit', 9, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (167, 'mgr_list', 'mgr', '[0],[system],[mgr],', '用户列表', '', '/mgr/list', 10, 3, 'N', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (171, 'dev_tools', '0', '[0],', '开发工具', 'fa-code', '#', 20, 1, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (172, 'system_message', '0', '[0],', '系统消息', 'fa-rocket', '#', 10, 1, 'Y', NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `NOTICE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `TITLE` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '标题',
  `CONTENT` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '内容',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `CREATE_USER` bigint(20) DEFAULT NULL COMMENT '创建人',
  `UPDATE_TIME` datetime(0) DEFAULT NULL COMMENT '修改时间',
  `UPDATE_USER` bigint(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`NOTICE_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '通知表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
INSERT INTO `sys_notice` VALUES (6, '世界', '欢迎使用Guns管理系统', '2017-01-11 08:53:20', 1, NULL, NULL);
INSERT INTO `sys_notice` VALUES (8, '你好', '你好', '2017-05-10 19:28:57', 1, NULL, NULL);

-- ----------------------------
-- Table structure for sys_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_operation_log`;
CREATE TABLE `sys_operation_log`  (
  `OPERATION_LOG_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `LOG_TYPE` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '日志类型(字典)',
  `LOG_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '日志名称',
  `USER_ID` bigint(65) DEFAULT NULL COMMENT '用户id',
  `CLASS_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '类名称',
  `METHOD` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '方法名称',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `SUCCEED` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '是否成功(字典)',
  `MESSAGE` text CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '备注',
  PRIMARY KEY (`OPERATION_LOG_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '操作日志' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_operation_log
-- ----------------------------
INSERT INTO `sys_operation_log` VALUES (1, '异常日志', '', 1, NULL, NULL, '2018-12-08 11:59:58', '失败', 'org.springframework.web.method.annotation.MethodArgumentTypeMismatchException: Failed to convert value of type \'java.lang.String\' to required type \'java.lang.Integer\'; nested exception is java.lang.NumberFormatException: For input string: \"undefined\"\r\n	at org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver.resolveArgument(AbstractNamedValueMethodArgumentResolver.java:131)\r\n	at org.springframework.web.method.support.HandlerMethodArgumentResolverComposite.resolveArgument(HandlerMethodArgumentResolverComposite.java:124)\r\n	at org.springframework.web.method.support.InvocableHandlerMethod.getMethodArgumentValues(InvocableHandlerMethod.java:161)\r\n	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:131)\r\n	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:102)\r\n	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:877)\r\n	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:783)\r\n	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\r\n	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:991)\r\n	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:925)\r\n	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:974)\r\n	at org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:866)\r\n	at javax.servlet.http.HttpServlet.service(HttpServlet.java:635)\r\n	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:851)\r\n	at javax.servlet.http.HttpServlet.service(HttpServlet.java:742)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:61)\r\n	at org.apache.shiro.web.servlet.AdviceFilter.executeChain(AdviceFilter.java:108)\r\n	at org.apache.shiro.web.servlet.AdviceFilter.doFilterInternal(AdviceFilter.java:137)\r\n	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)\r\n	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:66)\r\n	at org.apache.shiro.web.servlet.AbstractShiroFilter.executeChain(AbstractShiroFilter.java:449)\r\n	at org.apache.shiro.web.servlet.AbstractShiroFilterT1.call(AbstractShiroFilter.java:365)\r\n	at org.apache.shiro.subject.support.SubjectCallable.doCall(SubjectCallable.java:90)\r\n	at org.apache.shiro.subject.support.SubjectCallable.call(SubjectCallable.java:83)\r\n	at org.apache.shiro.subject.support.DelegatingSubject.execute(DelegatingSubject.java:387)\r\n	at org.apache.shiro.web.servlet.AbstractShiroFilter.doFilterInternal(AbstractShiroFilter.java:362)\r\n	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at cn.stylefeng.roses.core.xss.XssFilter.doFilter(XssFilter.java:31)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at com.alibaba.druid.support.http.WebStatFilter.doFilter(WebStatFilter.java:123)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:99)\r\n	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.springframework.web.filter.HttpPutFormContentFilter.doFilterInternal(HttpPutFormContentFilter.java:109)\r\n	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.springframework.web.filter.HiddenHttpMethodFilter.doFilterInternal(HiddenHttpMethodFilter.java:81)\r\n	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:200)\r\n	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:198)\r\n	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)\r\n	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:496)\r\n	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:140)\r\n	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:81)\r\n	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:87)\r\n	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)\r\n	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:803)\r\n	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66)\r\n	at org.apache.coyote.AbstractProtocolTConnectionHandler.process(AbstractProtocol.java:790)\r\n	at org.apache.tomcat.util.net.NioEndpointTSocketProcessor.doRun(NioEndpoint.java:1459)\r\n	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)\r\n	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)\r\n	at java.util.concurrent.ThreadPoolExecutorTWorker.run(ThreadPoolExecutor.java:624)\r\n	at org.apache.tomcat.util.threads.TaskThreadTWrappingRunnable.run(TaskThread.java:61)\r\n	at java.lang.Thread.run(Thread.java:748)\r\nCaused by: java.lang.NumberFormatException: For input string: \"undefined\"\r\n	at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)\r\n	at java.lang.Integer.parseInt(Integer.java:580)\r\n	at java.lang.Integer.valueOf(Integer.java:766)\r\n	at org.springframework.util.NumberUtils.parseNumber(NumberUtils.java:210)\r\n	at org.springframework.beans.propertyeditors.CustomNumberEditor.setAsText(CustomNumberEditor.java:115)\r\n	at org.springframework.beans.TypeConverterDelegate.doConvertTextValue(TypeConverterDelegate.java:466)\r\n	at org.springframework.beans.TypeConverterDelegate.doConvertValue(TypeConverterDelegate.java:439)\r\n	at org.springframework.beans.TypeConverterDelegate.convertIfNecessary(TypeConverterDelegate.java:192)\r\n	at org.springframework.beans.TypeConverterDelegate.convertIfNecessary(TypeConverterDelegate.java:99)\r\n	at org.springframework.beans.TypeConverterSupport.doConvert(TypeConverterSupport.java:73)\r\n	at org.springframework.beans.TypeConverterSupport.convertIfNecessary(TypeConverterSupport.java:52)\r\n	at org.springframework.validation.DataBinder.convertIfNecessary(DataBinder.java:692)\r\n	at org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver.resolveArgument(AbstractNamedValueMethodArgumentResolver.java:123)\r\n	... 71 more\r\n');
INSERT INTO `sys_operation_log` VALUES (2, '异常日志', '', 1, NULL, NULL, '2018-12-08 12:00:06', '失败', 'org.springframework.web.method.annotation.MethodArgumentTypeMismatchException: Failed to convert value of type \'java.lang.String\' to required type \'java.lang.Integer\'; nested exception is java.lang.NumberFormatException: For input string: \"undefined\"\r\n	at org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver.resolveArgument(AbstractNamedValueMethodArgumentResolver.java:131)\r\n	at org.springframework.web.method.support.HandlerMethodArgumentResolverComposite.resolveArgument(HandlerMethodArgumentResolverComposite.java:124)\r\n	at org.springframework.web.method.support.InvocableHandlerMethod.getMethodArgumentValues(InvocableHandlerMethod.java:161)\r\n	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:131)\r\n	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:102)\r\n	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:877)\r\n	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:783)\r\n	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\r\n	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:991)\r\n	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:925)\r\n	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:974)\r\n	at org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:866)\r\n	at javax.servlet.http.HttpServlet.service(HttpServlet.java:635)\r\n	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:851)\r\n	at javax.servlet.http.HttpServlet.service(HttpServlet.java:742)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:61)\r\n	at org.apache.shiro.web.servlet.AdviceFilter.executeChain(AdviceFilter.java:108)\r\n	at org.apache.shiro.web.servlet.AdviceFilter.doFilterInternal(AdviceFilter.java:137)\r\n	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)\r\n	at org.apache.shiro.web.servlet.ProxiedFilterChain.doFilter(ProxiedFilterChain.java:66)\r\n	at org.apache.shiro.web.servlet.AbstractShiroFilter.executeChain(AbstractShiroFilter.java:449)\r\n	at org.apache.shiro.web.servlet.AbstractShiroFilterT1.call(AbstractShiroFilter.java:365)\r\n	at org.apache.shiro.subject.support.SubjectCallable.doCall(SubjectCallable.java:90)\r\n	at org.apache.shiro.subject.support.SubjectCallable.call(SubjectCallable.java:83)\r\n	at org.apache.shiro.subject.support.DelegatingSubject.execute(DelegatingSubject.java:387)\r\n	at org.apache.shiro.web.servlet.AbstractShiroFilter.doFilterInternal(AbstractShiroFilter.java:362)\r\n	at org.apache.shiro.web.servlet.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:125)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at cn.stylefeng.roses.core.xss.XssFilter.doFilter(XssFilter.java:31)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at com.alibaba.druid.support.http.WebStatFilter.doFilter(WebStatFilter.java:123)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:99)\r\n	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.springframework.web.filter.HttpPutFormContentFilter.doFilterInternal(HttpPutFormContentFilter.java:109)\r\n	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.springframework.web.filter.HiddenHttpMethodFilter.doFilterInternal(HiddenHttpMethodFilter.java:81)\r\n	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:200)\r\n	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107)\r\n	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\r\n	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\r\n	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:198)\r\n	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)\r\n	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:496)\r\n	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:140)\r\n	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:81)\r\n	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:87)\r\n	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)\r\n	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:803)\r\n	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66)\r\n	at org.apache.coyote.AbstractProtocolTConnectionHandler.process(AbstractProtocol.java:790)\r\n	at org.apache.tomcat.util.net.NioEndpointTSocketProcessor.doRun(NioEndpoint.java:1459)\r\n	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)\r\n	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)\r\n	at java.util.concurrent.ThreadPoolExecutorTWorker.run(ThreadPoolExecutor.java:624)\r\n	at org.apache.tomcat.util.threads.TaskThreadTWrappingRunnable.run(TaskThread.java:61)\r\n	at java.lang.Thread.run(Thread.java:748)\r\nCaused by: java.lang.NumberFormatException: For input string: \"undefined\"\r\n	at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)\r\n	at java.lang.Integer.parseInt(Integer.java:580)\r\n	at java.lang.Integer.valueOf(Integer.java:766)\r\n	at org.springframework.util.NumberUtils.parseNumber(NumberUtils.java:210)\r\n	at org.springframework.beans.propertyeditors.CustomNumberEditor.setAsText(CustomNumberEditor.java:115)\r\n	at org.springframework.beans.TypeConverterDelegate.doConvertTextValue(TypeConverterDelegate.java:466)\r\n	at org.springframework.beans.TypeConverterDelegate.doConvertValue(TypeConverterDelegate.java:439)\r\n	at org.springframework.beans.TypeConverterDelegate.convertIfNecessary(TypeConverterDelegate.java:192)\r\n	at org.springframework.beans.TypeConverterDelegate.convertIfNecessary(TypeConverterDelegate.java:99)\r\n	at org.springframework.beans.TypeConverterSupport.doConvert(TypeConverterSupport.java:73)\r\n	at org.springframework.beans.TypeConverterSupport.convertIfNecessary(TypeConverterSupport.java:52)\r\n	at org.springframework.validation.DataBinder.convertIfNecessary(DataBinder.java:692)\r\n	at org.springframework.web.method.annotation.AbstractNamedValueMethodArgumentResolver.resolveArgument(AbstractNamedValueMethodArgumentResolver.java:123)\r\n	... 71 more\r\n');

-- ----------------------------
-- Table structure for sys_relation
-- ----------------------------
DROP TABLE IF EXISTS `sys_relation`;
CREATE TABLE `sys_relation`  (
  `RELATION_ID` bigint(20) NOT NULL COMMENT '主键',
  `MENU_ID` bigint(20) DEFAULT NULL COMMENT '菜单id',
  `ROLE_ID` bigint(20) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`RELATION_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色和菜单关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_relation
-- ----------------------------
INSERT INTO `sys_relation` VALUES (3377, 105, 5);
INSERT INTO `sys_relation` VALUES (3378, 106, 5);
INSERT INTO `sys_relation` VALUES (3379, 107, 5);
INSERT INTO `sys_relation` VALUES (3380, 108, 5);
INSERT INTO `sys_relation` VALUES (3381, 109, 5);
INSERT INTO `sys_relation` VALUES (3382, 110, 5);
INSERT INTO `sys_relation` VALUES (3383, 111, 5);
INSERT INTO `sys_relation` VALUES (3384, 112, 5);
INSERT INTO `sys_relation` VALUES (3385, 113, 5);
INSERT INTO `sys_relation` VALUES (3386, 114, 5);
INSERT INTO `sys_relation` VALUES (3387, 115, 5);
INSERT INTO `sys_relation` VALUES (3388, 116, 5);
INSERT INTO `sys_relation` VALUES (3389, 117, 5);
INSERT INTO `sys_relation` VALUES (3390, 118, 5);
INSERT INTO `sys_relation` VALUES (3391, 119, 5);
INSERT INTO `sys_relation` VALUES (3392, 120, 5);
INSERT INTO `sys_relation` VALUES (3393, 121, 5);
INSERT INTO `sys_relation` VALUES (3394, 122, 5);
INSERT INTO `sys_relation` VALUES (3395, 150, 5);
INSERT INTO `sys_relation` VALUES (3396, 151, 5);
INSERT INTO `sys_relation` VALUES (3792, 105, 1);
INSERT INTO `sys_relation` VALUES (3793, 106, 1);
INSERT INTO `sys_relation` VALUES (3794, 107, 1);
INSERT INTO `sys_relation` VALUES (3795, 108, 1);
INSERT INTO `sys_relation` VALUES (3796, 109, 1);
INSERT INTO `sys_relation` VALUES (3797, 110, 1);
INSERT INTO `sys_relation` VALUES (3798, 111, 1);
INSERT INTO `sys_relation` VALUES (3799, 112, 1);
INSERT INTO `sys_relation` VALUES (3800, 113, 1);
INSERT INTO `sys_relation` VALUES (3801, 165, 1);
INSERT INTO `sys_relation` VALUES (3802, 166, 1);
INSERT INTO `sys_relation` VALUES (3803, 167, 1);
INSERT INTO `sys_relation` VALUES (3804, 114, 1);
INSERT INTO `sys_relation` VALUES (3805, 115, 1);
INSERT INTO `sys_relation` VALUES (3806, 116, 1);
INSERT INTO `sys_relation` VALUES (3807, 117, 1);
INSERT INTO `sys_relation` VALUES (3808, 118, 1);
INSERT INTO `sys_relation` VALUES (3809, 162, 1);
INSERT INTO `sys_relation` VALUES (3810, 163, 1);
INSERT INTO `sys_relation` VALUES (3811, 164, 1);
INSERT INTO `sys_relation` VALUES (3812, 119, 1);
INSERT INTO `sys_relation` VALUES (3813, 120, 1);
INSERT INTO `sys_relation` VALUES (3814, 121, 1);
INSERT INTO `sys_relation` VALUES (3815, 122, 1);
INSERT INTO `sys_relation` VALUES (3816, 150, 1);
INSERT INTO `sys_relation` VALUES (3817, 151, 1);
INSERT INTO `sys_relation` VALUES (3818, 128, 1);
INSERT INTO `sys_relation` VALUES (3819, 134, 1);
INSERT INTO `sys_relation` VALUES (3820, 158, 1);
INSERT INTO `sys_relation` VALUES (3821, 159, 1);
INSERT INTO `sys_relation` VALUES (3822, 130, 1);
INSERT INTO `sys_relation` VALUES (3823, 131, 1);
INSERT INTO `sys_relation` VALUES (3824, 135, 1);
INSERT INTO `sys_relation` VALUES (3825, 136, 1);
INSERT INTO `sys_relation` VALUES (3826, 137, 1);
INSERT INTO `sys_relation` VALUES (3827, 152, 1);
INSERT INTO `sys_relation` VALUES (3828, 153, 1);
INSERT INTO `sys_relation` VALUES (3829, 154, 1);
INSERT INTO `sys_relation` VALUES (3830, 132, 1);
INSERT INTO `sys_relation` VALUES (3831, 138, 1);
INSERT INTO `sys_relation` VALUES (3832, 139, 1);
INSERT INTO `sys_relation` VALUES (3833, 140, 1);
INSERT INTO `sys_relation` VALUES (3834, 155, 1);
INSERT INTO `sys_relation` VALUES (3835, 156, 1);
INSERT INTO `sys_relation` VALUES (3836, 157, 1);
INSERT INTO `sys_relation` VALUES (3837, 133, 1);
INSERT INTO `sys_relation` VALUES (3838, 160, 1);
INSERT INTO `sys_relation` VALUES (3839, 161, 1);
INSERT INTO `sys_relation` VALUES (3840, 141, 1);
INSERT INTO `sys_relation` VALUES (3841, 142, 1);
INSERT INTO `sys_relation` VALUES (3842, 143, 1);
INSERT INTO `sys_relation` VALUES (3843, 144, 1);
INSERT INTO `sys_relation` VALUES (3844, 171, 1);
INSERT INTO `sys_relation` VALUES (3845, 148, 1);
INSERT INTO `sys_relation` VALUES (3846, 149, 1);
INSERT INTO `sys_relation` VALUES (3847, 172, 1);
INSERT INTO `sys_relation` VALUES (3848, 145, 1);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `ROLE_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `PID` bigint(20) DEFAULT NULL COMMENT '父角色id',
  `NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '角色名称',
  `DESCRIPTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '提示',
  `SORT` int(11) DEFAULT NULL COMMENT '序号',
  `VERSION` int(11) DEFAULT NULL COMMENT '乐观锁',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `UPDATE_TIME` datetime(0) DEFAULT NULL COMMENT '修改时间',
  `CREATE_USER` bigint(20) DEFAULT NULL COMMENT '创建用户',
  `UPDATE_USER` bigint(20) DEFAULT NULL COMMENT '修改用户',
  PRIMARY KEY (`ROLE_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, 0, '超级管理员', 'administrator', 1, 1, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role` VALUES (5, 1, '临时', 'temp', 2, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `USER_ID` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `AVATAR` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '头像',
  `ACCOUNT` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '账号',
  `PASSWORD` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '密码',
  `SALT` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'md5密码盐',
  `NAME` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '名字',
  `BIRTHDAY` datetime(0) DEFAULT NULL COMMENT '生日',
  `SEX` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '性别(字典)',
  `EMAIL` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '电子邮件',
  `PHONE` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '电话',
  `ROLE_ID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '角色id(多个逗号隔开)',
  `DEPT_ID` bigint(20) DEFAULT NULL COMMENT '部门id(多个逗号隔开)',
  `STATUS` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '状态(字典)',
  `CREATE_TIME` datetime(0) DEFAULT NULL COMMENT '创建时间',
  `CREATE_USER` bigint(20) DEFAULT NULL COMMENT '创建人',
  `UPDATE_TIME` datetime(0) DEFAULT NULL COMMENT '更新时间',
  `UPDATE_USER` bigint(20) DEFAULT NULL COMMENT '更新人',
  `VERSION` int(11) DEFAULT NULL COMMENT '乐观锁',
  PRIMARY KEY (`USER_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, '1', 'admin', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, 'ENABLE', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (2, '1', 'test1', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '2', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (3, '1', 'test2', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (4, '1', 'test3', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (5, '1', 'test4', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (6, '1', 'test5', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (7, '1', 'test6', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '2', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (8, '1', 'test7', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '2', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (9, '1', 'test8', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (10, '1', 'test9', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '2', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (11, '1', 'test10', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (12, '1', 'test11', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (13, '1', 'test12', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (14, '1', 'test13', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (15, '1', 'test14', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (16, '1', 'test15', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (17, '1', 'test16', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (18, '1', 'test17', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (19, '1', 'test18', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (20, '1', 'test19', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (21, '1', 'test20', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (22, '1', 'test21', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);
INSERT INTO `sys_user` VALUES (23, '1', 'test22', 'ecfadcde9305f8891bcfe5a1e28c253e', '8pgby', 'stylefeng', '2018-11-16 00:00:00', '1', 'sn93@qq.com', '18200000000', '1', 27, '1', '2016-01-29 08:49:53', NULL, NULL, NULL, 25);

SET FOREIGN_KEY_CHECKS = 1;
