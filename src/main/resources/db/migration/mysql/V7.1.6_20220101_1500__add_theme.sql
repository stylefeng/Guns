-- ----------------------------
-- Table structure for sys_theme
-- ----------------------------
CREATE TABLE `sys_theme`  (
  `theme_id` bigint(20) NOT NULL COMMENT '主键',
  `theme_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主题名称',
  `theme_value` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主题属性，json格式',
  `template_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主题模板id',
  `status_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '是否启用：Y-启用，N-禁用',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`theme_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统主题' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_theme
-- ----------------------------
INSERT INTO `sys_theme`(`theme_id`, `theme_name`, `theme_value`, `template_id`, `status_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1477272515573542913, 'Guns后台管理系统默认主题', '{\"themeId\":\"1477272515573542913\",\"themeName\":\"Guns后台管理系统默认主题\",\"templateId\":\"1477171926286020610\",\"GUNS_MGR_LOGIN_BACKGROUND_IMG\":\"1479751422149074948\",\"GUNS_MGR_BEI_URL\":\"https://beian.miit.gov.cn/\",\"GUNS_MGR_LOGO\":\"1479753047148322818\",\"GUNS_MGR_NAME\":\"Guns Tech.\",\"GUNS_MGR_FAVICON\":\"1479753047148322818\",\"GUNS_MGR_FOOTER_TEXT\":\"stylefeng开源技术 javaguns.com\",\"GUNS_MGR_BEI_NO\":\"京ICP备001-1\"}', '1477171926286020610', 'Y', '2022-01-01 21:36:29', 1339550467939639299, '2022-01-01 23:22:12', 1339550467939639299);

-- ----------------------------
-- Table structure for sys_theme_template
-- ----------------------------
CREATE TABLE `sys_theme_template`  (
  `template_id` bigint(20) NOT NULL COMMENT '主键',
  `template_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主题名称',
  `template_code` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主题编码',
  `template_type` tinyint(4) NOT NULL COMMENT '主题类型：1-系统类型，2-业务类型',
  `status_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '启用状态：Y-启用，N-禁用',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`template_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统主题-模板' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_theme_template
-- ----------------------------
INSERT INTO `sys_theme_template` VALUES (1477171926286020610, 'Guns后台管理系统模板', 'GUNS_PLATFORM', 1, 'Y', '2022-01-01 14:56:46', 1339550467939639299, '2022-01-01 15:11:27', 1339550467939639299);

-- ----------------------------
-- Table structure for sys_theme_template_field
-- ----------------------------
CREATE TABLE `sys_theme_template_field`  (
  `field_id` bigint(20) NOT NULL COMMENT '主键',
  `field_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '属性名称',
  `field_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '属性编码',
  `field_type` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '属性展示类型（字典维护），例如：图片，文本等类型',
  `field_required` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否必填：Y-必填，N-非必填',
  `field_length` int(11) NULL DEFAULT NULL COMMENT '属性值长度',
  `field_description` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '属性描述',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`field_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统主题-模板属性' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_theme_template_field
-- ----------------------------
INSERT INTO `sys_theme_template_field` VALUES (1473949204011819009, '平台名称', 'GUNS_MGR_NAME', 'string', 'Y', 10, 'Guns后台管理系统左上角名称', '2021-12-23 17:30:50', 1339550467939639299, '2022-01-01 14:30:42', 1339550467939639299);
INSERT INTO `sys_theme_template_field` VALUES (1473949858369380354, '登录页背景图片', 'GUNS_MGR_LOGIN_BACKGROUND_IMG', 'file', 'Y', NULL, 'Guns后台管理系统登录页图片', '2021-12-23 17:33:26', 1339550467939639299, '2022-01-01 14:32:14', 1339550467939639299);
INSERT INTO `sys_theme_template_field` VALUES (1473950190365319169, '平台LOGO', 'GUNS_MGR_LOGO', 'file', 'Y', NULL, 'Guns后台管理系统左上角logo', '2021-12-23 17:34:45', 1339550467939639299, '2022-01-01 14:46:07', 1339550467939639299);
INSERT INTO `sys_theme_template_field` VALUES (1473950675281387521, '浏览器Icon', 'GUNS_MGR_FAVICON', 'file', 'Y', NULL, 'Guns后台管理系统标签栏图标', '2021-12-23 17:36:40', 1339550467939639299, '2022-01-01 14:46:56', 1339550467939639299);
INSERT INTO `sys_theme_template_field` VALUES (1473951200521494529, '页脚文字', 'GUNS_MGR_FOOTER_TEXT', 'string', 'Y', 100, 'Guns后台管理系统页脚文字', '2021-12-23 17:38:46', 1339550467939639299, '2022-01-01 14:48:08', 1339550467939639299);
INSERT INTO `sys_theme_template_field` VALUES (1473951616827138050, '备案号', 'GUNS_MGR_BEI_NO', 'string', 'N', 100, 'Guns后台管理系统底部备案号', '2021-12-23 17:40:25', 1339550467939639299, '2022-01-01 14:48:46', 1339550467939639299);
INSERT INTO `sys_theme_template_field` VALUES (1477170929413206017, '备案号跳转链接', 'GUNS_MGR_BEI_URL', 'string', 'N', 200, 'Guns后台管理系统备案号跳转到的链接', '2022-01-01 14:52:49', 1339550467939639299, '2022-01-01 14:55:28', 1339550467939639299);

-- ----------------------------
-- Table structure for sys_theme_template_rel
-- ----------------------------
CREATE TABLE `sys_theme_template_rel`  (
  `relation_id` bigint(20) NOT NULL COMMENT '主键',
  `template_id` bigint(20) NOT NULL COMMENT '模板主键id',
  `field_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '属性编码',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`relation_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '系统主题-模板配置关联关系' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_theme_template_rel
-- ----------------------------
INSERT INTO `sys_theme_template_rel` VALUES (1477175606452236290, 1477171926286020610, 'GUNS_MGR_NAME', '2022-01-01 15:11:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_theme_template_rel` VALUES (1477175606519345154, 1477171926286020610, 'GUNS_MGR_LOGIN_BACKGROUND_IMG', '2022-01-01 15:11:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_theme_template_rel` VALUES (1477175606519345155, 1477171926286020610, 'GUNS_MGR_LOGO', '2022-01-01 15:11:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_theme_template_rel` VALUES (1477175606586454017, 1477171926286020610, 'GUNS_MGR_FAVICON', '2022-01-01 15:11:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_theme_template_rel` VALUES (1477175606653562881, 1477171926286020610, 'GUNS_MGR_FOOTER_TEXT', '2022-01-01 15:11:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_theme_template_rel` VALUES (1477175606720671746, 1477171926286020610, 'GUNS_MGR_BEI_NO', '2022-01-01 15:11:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_theme_template_rel` VALUES (1477175606787780610, 1477171926286020610, 'GUNS_MGR_BEI_URL', '2022-01-01 15:11:24', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1472812560315629569, -1, '[-1],', '主题功能', 'theme', 'systemApp', 100.00, 1, NULL, NULL, NULL, 'Y', '/themeManage', 'SlackOutlined', '', 0, NULL, NULL, 'Y', 'N', '2021-12-20 14:14:13', 1339550467939639299, '2021-12-20 14:15:29', 1339550467939639299);
INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1472814801600692226, 1472812560315629569, '[-1],[1472812560315629569],', '主题管理', 'theme_manage', 'systemApp', 15.00, 1, NULL, NULL, NULL, 'Y', '/themeManage/theme', 'PictureOutlined', '/orginfo/theme/theme', 0, NULL, NULL, 'Y', 'N', '2021-12-20 14:23:07', 1339550467939639299, '2021-12-20 14:24:58', 1339550467939639299);
INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1472815202244804610, 1472812560315629569, '[-1],[1472812560315629569],', '主题模板', 'theme_template', 'systemApp', 16.00, 1, NULL, NULL, NULL, 'Y', '/themeManage/template', 'ShopOutlined', '/orginfo/theme/template', 0, NULL, NULL, 'Y', 'N', '2021-12-20 14:24:43', 1339550467939639299, '2021-12-20 14:24:53', 1339550467939639299);
INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1475271836221173761, 1472812560315629569, '[-1],[1472812560315629569],', '主题属性', 'theme_field', 'systemApp', 18.00, 1, NULL, NULL, NULL, 'Y', '/themeManage/themeField', 'CopyOutlined', '/orginfo/theme/field', 0, NULL, NULL, 'Y', 'N', '2021-12-27 09:06:30', 1339550467939639299, '2021-12-27 09:06:56', 1339550467939639299);

SET FOREIGN_KEY_CHECKS = 1;
