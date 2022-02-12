SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_statistics_count
-- ----------------------------
CREATE TABLE `sys_statistics_count`  (
  `stat_count_id` bigint(20) NOT NULL COMMENT '主键ID',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户id',
  `stat_url_id` bigint(20) NULL DEFAULT NULL COMMENT '访问的地址',
  `stat_count` int(11) NULL DEFAULT NULL COMMENT '访问的次数',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`stat_count_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '常用功能的统计次数' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_statistics_url
-- ----------------------------
CREATE TABLE `sys_statistics_url`  (
  `stat_url_id` bigint(20) NOT NULL COMMENT '主键ID',
  `stat_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '被统计名称',
  `stat_menu_id` bigint(20) NULL DEFAULT NULL COMMENT '被统计菜单ID',
  `stat_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '被统计的URL',
  `always_show` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否常驻显示，Y-是，N-否',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`stat_url_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '常用功能列表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_statistics_url
-- ----------------------------
INSERT INTO `sys_statistics_url` VALUES (1492345345508683778, '个人信息', '1339550467939639390', '/sysUser/currentUserInfo', 'Y', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683779, '用户管理', '1339550467939639305', '/sysUser/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683780, '职位管理', '1339550467939639307', '/hrPosition/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683781, '应用管理', '1339550467939639309', '/sysApp/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683782, '角色管理', '1339550467939639311', '/sysRole/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683783, '菜单管理', '1339550467939639310', '/sysMenu/list', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683784, '系统配置', '1339550467939639314', '/sysConfig/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683785, '字典管理', '1339550467939639315', '/dict/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683786, '在线用户', '1339550467939639320', '/sysUser/onlineUserList', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683787, '定时任务', '1339550467939639321', '/sysTimers/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683788, '文件管理', '1339550467939639318', '/sysFileInfo/fileInfoListPage', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683789, '多数据源', '1339550467939639335', '/databaseInfo/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683790, '操作日志', '1339550467939639319', '/logManager/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683791, '登录日志', '1339550467939639334', '/loginLog/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683792, '通知发布', '1339550467939639351', '/sysNotice/page', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_statistics_url` VALUES (1492345345508683793, '我的消息', '1339550467939639352', '/sysMessage/page', 'N', NULL, NULL, NULL, NULL);

INSERT INTO `sys_timers`(`timer_id`, `timer_name`, `action_class`, `cron`, `params`, `job_status`, `remark`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1492358213574615041, '常用功能统计', 'cn.stylefeng.roses.kernel.system.modular.home.timer.InterfaceStatisticsTimer', '0/30 * * * * ? ', NULL, 1, '定时常用功能统计刷新到数据库', 'N', '2022-02-12 12:41:39', 1339550467939639299, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
