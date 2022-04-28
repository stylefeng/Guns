ALTER TABLE `sys_menu` ADD COLUMN `antdv_front_type` tinyint(4) NULL DEFAULT NULL COMMENT '前台还是后台菜单：1-前台，2-后台，3-前后台都显示' AFTER `antdv_visible`;

update sys_menu set antdv_front_type = 3;