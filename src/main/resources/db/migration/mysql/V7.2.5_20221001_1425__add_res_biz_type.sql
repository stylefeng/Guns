ALTER TABLE `sys_role_resource`
ADD COLUMN `resource_biz_type` tinyint(4) NULL DEFAULT 2 COMMENT '资源的业务类型：1-业务类，2-系统类' AFTER `resource_code`;