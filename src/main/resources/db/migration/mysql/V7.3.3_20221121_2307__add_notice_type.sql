ALTER TABLE `sys_notice`
    ADD COLUMN `notice_type` tinyint NULL DEFAULT 1 COMMENT '通知类型：1-普通通知，2-带url跳转链接' AFTER `notice_content`,
    ADD COLUMN `notice_url` varchar(500) NULL COMMENT '通知的完整跳转url' AFTER `notice_type`;