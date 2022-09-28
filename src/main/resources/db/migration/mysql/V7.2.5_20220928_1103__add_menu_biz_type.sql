ALTER TABLE `sys_menu` ADD COLUMN `menu_biz_type` tinyint(4) NULL DEFAULT 2 COMMENT '菜单的业务类型：1-系统类型，2-业务类型' AFTER `remark`;

UPDATE `sys_menu` SET menu_biz_type = 1;

ALTER TABLE `sys_resource` ADD COLUMN `resource_biz_type` tinyint NULL DEFAULT 2 COMMENT '资源的业务类型：1-系统类，2-业务类' AFTER `http_method`;