CREATE TABLE `click_count`  (
  `click_count_id` bigint(20) NOT NULL COMMENT '主键id',
  `business_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '业务的分类标识',
  `business_key_id` bigint(20) NULL DEFAULT NULL COMMENT '业务的主键id',
  `click_count` bigint(20) NULL DEFAULT NULL COMMENT '点击次数',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  `tenant_id` bigint(20) NULL DEFAULT NULL COMMENT '租户id',
  PRIMARY KEY (`click_count_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户点击数量统计' ROW_FORMAT = Dynamic;

CREATE TABLE `click_status`  (
  `click_status_id` bigint(20) NOT NULL COMMENT '主键id',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户id',
  `business_key_id` bigint(20) NULL DEFAULT NULL COMMENT '业务的主键id',
  `business_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '业务的分类标识',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  `tenant_id` bigint(20) NULL DEFAULT NULL COMMENT '租户id',
  PRIMARY KEY (`click_status_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户点击状态' ROW_FORMAT = Dynamic;