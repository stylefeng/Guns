ALTER TABLE `sys_role` ADD COLUMN `role_system_flag` char(1) NULL COMMENT '是否是系统角色:Y-是,N-否';
ALTER TABLE `sys_role` ADD COLUMN `role_type_code` varchar(255) NULL COMMENT '字典:角色类型';
INSERT INTO `sys_role`(`role_id`, `role_name`, `role_code`, `role_sort`, `data_scope_type`, `status_flag`, `remark`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`, `role_system_flag`, `role_type_code`) VALUES (1339550467939639305, 'C端人员', 'c', 3.00, 10, 1, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'role_system');
INSERT INTO `sys_role`(`role_id`, `role_name`, `role_code`, `role_sort`, `data_scope_type`, `status_flag`, `remark`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`, `role_system_flag`, `role_type_code`) VALUES (1339550467939639306, 'B端人员', 'b', 4.00, 10, 1, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'role_system');
update sys_role set role_system_flag='Y';
update sys_role set role_type_code='role_system';