ALTER TABLE `sys_app` ADD COLUMN `devops_flag` char(1) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT 'N' COMMENT '是否是devops应用：Y-是，N-否' AFTER `app_sort`;
update `sys_app` set devops_flag = 'N';