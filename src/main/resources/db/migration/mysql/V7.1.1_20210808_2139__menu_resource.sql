CREATE TABLE `sys_menu_resource` (
  `menu_resource_id` bigint(20) NOT NULL COMMENT '主键',
  `business_type` int(11) NOT NULL COMMENT '绑定资源的类型，1：菜单，2：菜单下按钮',
  `business_id` bigint(20) NOT NULL COMMENT '菜单或按钮id',
  `resource_code` varchar(300) CHARACTER SET utf8 NOT NULL DEFAULT 'N' COMMENT '资源的编码',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`menu_resource_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC COMMENT='菜单资源绑定';