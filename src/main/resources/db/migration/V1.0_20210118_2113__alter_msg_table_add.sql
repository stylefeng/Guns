ALTER TABLE `sys_message`
    add COLUMN `priority_level_test` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '优先级' AFTER `message_type`;