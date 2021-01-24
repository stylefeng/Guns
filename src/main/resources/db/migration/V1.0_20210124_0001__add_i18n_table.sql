CREATE TABLE `sys_translation` (
  `tran_id` bigint(20) NOT NULL COMMENT '主键id',
  `tran_code` varchar(255) NOT NULL COMMENT '编码',
  `tran_name` varchar(255) NOT NULL COMMENT '多语言条例名称',
  `language` int(11) NOT NULL COMMENT '1:中文  2:英语',
  `tran_value` varchar(255) NOT NULL COMMENT '翻译的值',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`tran_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='多语言表';
