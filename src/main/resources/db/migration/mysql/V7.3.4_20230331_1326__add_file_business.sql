CREATE TABLE `sys_file_business`  (
  `file_business_id` bigint(20) NOT NULL COMMENT '主键id',
  `business_id` bigint(20) NULL DEFAULT NULL COMMENT '业务主键id',
  `file_id` bigint(20) NULL DEFAULT NULL COMMENT '关联文件表的id',
  `download_count` int(11) NULL DEFAULT 0 COMMENT '下载次数',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  `tenant_id` bigint(20) NULL DEFAULT NULL COMMENT '租户id',
  PRIMARY KEY (`file_business_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '业务关联的文件' ROW_FORMAT = Dynamic;
