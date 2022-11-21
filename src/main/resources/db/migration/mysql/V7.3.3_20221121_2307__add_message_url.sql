ALTER TABLE `sys_message`
    ADD COLUMN `message_url` varchar(500) NULL COMMENT '消息跳转的URL' AFTER `message_type`;