ALTER TABLE `sys_message`
    MODIFY COLUMN `priority_level` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '优先级' AFTER `message_type`;