ALTER TABLE `sys_user`
MODIFY COLUMN `real_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '姓名' AFTER `user_id`;