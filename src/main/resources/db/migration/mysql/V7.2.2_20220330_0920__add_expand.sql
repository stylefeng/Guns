SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_expand
-- ----------------------------
CREATE TABLE `sys_expand`  (
  `expand_id` bigint(20) NOT NULL COMMENT '主键id',
  `expand_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '拓展业务名称',
  `expand_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '拓展业务唯一编码',
  `expand_status` tinyint(4) NULL DEFAULT NULL COMMENT '状态：1-启用，2-禁用',
  `primary_table_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '主业务表，例如：sys_user',
  `primary_field_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '业务主键id字段名，例如：user_id',
  `primary_field_camel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '业务主键id字段名驼峰法，例如：userId',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`expand_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '业务拓展' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_expand
-- ----------------------------
INSERT INTO `sys_expand` VALUES (1509151239135424513, '组织机构', 'org_expand', 1, 'hr_organization', 'org_id', 'orgId', '2022-03-30 20:51:09', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_expand` VALUES (1509775027464073218, '系统用户', 'user_expand', 1, 'sys_user', 'user_id', 'userId', '2022-04-01 14:09:51', 1339550467939639299, NULL, NULL);

-- ----------------------------
-- Table structure for sys_expand_data
-- ----------------------------
CREATE TABLE `sys_expand_data`  (
  `expand_data_id` bigint(20) NOT NULL COMMENT '主键id',
  `expand_id` bigint(20) NULL DEFAULT NULL COMMENT '拓展业务id',
  `primary_field_value` bigint(20) NULL DEFAULT NULL COMMENT '业务主键id',
  `expand_data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '拓展业务具体数据',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`expand_data_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '业务拓展-具体数据' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_expand_data
-- ----------------------------

-- ----------------------------
-- Table structure for sys_expand_field
-- ----------------------------
CREATE TABLE `sys_expand_field`  (
  `field_id` bigint(20) NOT NULL COMMENT '主键id',
  `expand_id` bigint(20) NOT NULL COMMENT '对应拓展业务的主键id',
  `field_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字段中文名称，例如：身份证号',
  `field_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字段英文名称，例如：idCard',
  `field_type` tinyint(4) NULL DEFAULT NULL COMMENT '字段类型：1-字符串类型，2-数字类型，3-字典类型',
  `field_required` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否必填：Y-必填，N-非必填',
  `field_length` int(11) NULL DEFAULT NULL COMMENT '属性值长度，用于数字类型',
  `field_dict_type_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典类型编码，用于字典类型',
  `list_show_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '列表是否显示：Y-显示，N-不显示',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`field_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '业务拓展-字段信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_expand_field
-- ----------------------------
INSERT INTO `sys_expand_field` VALUES (1509776920974225409, 1509151239135424513, '是否是公司', 'companyFlag', 3, 'N', NULL, 'yn', 'N', '2022-04-01 14:17:23', 1339550467939639299, '2022-04-01 14:30:53', 1339550467939639299);
INSERT INTO `sys_expand_field` VALUES (1509776979216330753, 1509775027464073218, '身份证号', 'idCard', 1, 'N', NULL, NULL, 'Y', '2022-04-01 14:17:37', 1339550467939639299, NULL, NULL);

-- 添加数据拓展应用
INSERT INTO `sys_app`(`app_id`, `app_name`, `app_code`, `app_icon`, `active_flag`, `status_flag`, `app_sort`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1508982167982678018, '字段拓展', 'fieldExpand', 'BarsOutlined', 'N', 1, 999, 'N', '2022-03-30 09:39:19', 1339550467939639299, NULL, NULL);

-- 添加菜单
INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1508982886328541185, -1, '[-1],', '数据设计', 'data_design', 'fieldExpand', 10.00, 1, NULL, NULL, NULL, 'N', '/expand/data/design', 'RadarChartOutlined', '', 0, NULL, NULL, 'Y', 'N', '2022-03-30 09:42:10', 1339550467939639299, '2022-03-30 09:48:17', 1339550467939639299);
INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1508983390106394626, 1508982886328541185, '[-1],[1508982886328541185],', '业务管理', 'business_list', 'fieldExpand', 11.00, 1, NULL, NULL, NULL, 'N', '/expand/business', 'AppstoreAddOutlined', '/expand/business/sys_expand', 0, NULL, NULL, 'Y', 'N', '2022-03-30 09:44:10', 1339550467939639299, '2022-03-30 09:46:11', 1339550467939639299);
INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1508983647087206402, 1508982886328541185, '[-1],[1508982886328541185],', '字段管理', 'field_manage', 'fieldExpand', 12.00, 1, NULL, NULL, NULL, 'N', '/expand/field/manage', 'BarsOutlined', '/expand/field/sys_expand_field', 0, NULL, NULL, 'Y', 'N', '2022-03-30 09:45:12', 1339550467939639299, '2022-03-30 09:47:51', 1339550467939639299);
INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1508984172092432385, -1, '[-1],', '数据查看', 'field_data_view', 'fieldExpand', 20.00, 1, NULL, NULL, NULL, 'N', '/expand/datalist', 'BarChartOutlined', '/expand/data/sys_expand_data', 0, NULL, NULL, 'Y', 'N', '2022-03-30 09:47:17', 1339550467939639299, '2022-03-30 10:16:00', 1339550467939639299);

SET FOREIGN_KEY_CHECKS = 1;
