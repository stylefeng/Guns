ALTER TABLE `sys_role`
MODIFY COLUMN `role_system_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否是系统角色:Y-是,N-否' AFTER `remark`,
MODIFY COLUMN `role_type_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典:角色类型' AFTER `role_system_flag`,
ADD COLUMN `admin_flag` char(1) NULL COMMENT '是否是管理员角色，管理员角色只能管理后台相关菜单' AFTER `remark`;