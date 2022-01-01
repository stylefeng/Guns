UPDATE `sys_config` SET `config_value` = concat(config_value, ',/sysTheme/add,/sysTheme/edit') WHERE `config_code` = 'SYS_XSS_URL_EXCLUSIONS';
