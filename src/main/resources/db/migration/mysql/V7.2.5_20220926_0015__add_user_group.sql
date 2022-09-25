-- ----------------------------
-- Table structure for sys_user_group
-- ----------------------------
CREATE TABLE `sys_user_group`  (
  `user_group_id` bigint(20) NOT NULL COMMENT '用户组id',
  `user_group_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户分组标题简称',
  `user_group_detail_name` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组内选择项的合并',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`user_group_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户组' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_user_group_detail
-- ----------------------------
CREATE TABLE `sys_user_group_detail`  (
  `detail_id` bigint(20) NOT NULL COMMENT '详情id',
  `user_group_id` bigint(20) NULL DEFAULT NULL COMMENT '所属用户组id',
  `select_type` tinyint(4) NULL DEFAULT NULL COMMENT '授权对象类型：1-用户，2-部门，3-角色，4-职位，5-关系',
  `select_value` bigint(20) NULL DEFAULT NULL COMMENT '授权对象id值，例如：用户id，部门id',
  `select_value_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '授权对象名称，例如：张三，研发部，管理员等',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`detail_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户组详情' ROW_FORMAT = Dynamic;