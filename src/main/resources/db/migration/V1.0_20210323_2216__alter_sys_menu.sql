ALTER TABLE `sys_menu` ADD COLUMN `antdv_uid_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用于非菜单显示页面的重定向url设置' AFTER `antdv_link_url`;
