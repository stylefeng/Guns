alter table sys_timers
    add params varchar(2000) null comment '参数' after cron;