SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `visible`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_uid_url`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1339550467939639335, 1339550467939639317, '[-1],[1339550467939639317],', '多数据源', 'datasources', 'system', 'Y', 50.60, 1, NULL, '/view/datasource', 'layui-icon-star-fill', '/operation/datasource', 'ContainerOutlined', '/operation/datasource/datasource', 0, NULL, NULL, 'N', '2021-01-23 21:08:22', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `visible`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_uid_url`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1339550467939639336, 1339550467939639317, '[-1],[1339550467939639317],', '多语言配置', 'languages', 'system', 'Y', 50.70, 1, NULL, '/view/i18n', 'layui-icon-star-fill', '/operation/language', 'FileWordOutlined', '/operation/language/language', 0, NULL, NULL, 'N', '2021-01-23 21:17:23', 1339550467939639299, '2021-01-25 21:59:08', 1339550467939639299);

INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `visible`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_uid_url`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1339550467939639350, -1, '[-1],', '通知管理', 'notice', 'system', 'Y', 60.00, 1, NULL, '', 'layui-icon-tips', '/notice', 'BellOutlined', NULL, NULL, NULL, NULL, 'N', '2020-12-29 19:51:14', NULL, '2021-01-08 16:47:56', 1339550467939639299);

INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `visible`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_uid_url`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1339550467939639351, 1339550467939639350, '[-1],[1339550467939639350],', '通知发布', 'notice_update', 'system', 'Y', 60.10, 1, NULL, '/view/notice', NULL, '/notice/publish', 'NotificationOutlined', '/notice/publish/publish', NULL, NULL, NULL, 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);

INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `visible`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_uid_url`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1339550467939639352, 1339550467939639350, '[-1],[1339550467939639350],', '我的消息', 'notice_find', 'system', 'Y', 60.20, 1, NULL, '/view/message_list', NULL, '/notice/mynotice', 'MessageOutlined', '/notice/mynotice/mynotice', NULL, NULL, NULL, 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);

INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `visible`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_uid_url`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1339550467939639360, -1, '[-1],', '监控管理', 'monitor', 'system', 'Y', 70.00, 1, NULL, '', 'layui-icon-console', '/monitor', 'DashboardOutlined', NULL, NULL, NULL, NULL, 'N', '2020-12-29 19:51:14', NULL, '2021-01-08 16:48:52', 1339550467939639299);

INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `visible`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_uid_url`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1339550467939639361, 1339550467939639360, '[-1],[1339550467939639360],', 'SQL监控', 'monitor_druid', 'system', 'Y', 70.10, 1, NULL, '/view/monitor/druid', NULL, '/monitor/druid', 'DesktopOutlined', '/monitor/druid', NULL, NULL, NULL, 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);

INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `visible`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_uid_url`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1339550467939639362, 1339550467939639360, '[-1],[1339550467939639360],', '服务器信息', 'monitor_server', 'system', 'Y', 70.50, 1, NULL, '/view/monitor/systemInfo', NULL, '/monitor/server', 'DesktopOutlined', '/monitor/server', NULL, NULL, NULL, 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);

UPDATE `sys_menu` SET `menu_parent_id` = -1, `menu_pids` = '[-1],', `menu_name` = '主控面板', `menu_code` = 'blackboard', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 10.00, `status_flag` = 1, `remark` = NULL, `layui_path` = '', `layui_icon` = 'layui-icon-theme', `antdv_router` = '/dashboard', `antdv_icon` = 'home-outlined', `antdv_component` = NULL, `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-01-08 20:52:34', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639301;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639301, `menu_pids` = '[-1],[1339550467939639301],', `menu_name` = '工作台', `menu_code` = 'board_platform', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 10.10, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/dashboard/workplace', `layui_icon` = 'layui-icon-rate-solid', `antdv_router` = '/dashboard/workplace', `antdv_icon` = 'desktop-outlined', `antdv_component` = '/dashboard/workplace', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = 1339550467939639299, `update_time` = '2021-01-08 20:52:34', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639302;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639301, `menu_pids` = '[-1],[1339550467939639301],', `menu_name` = '分析页', `menu_code` = 'board_analyse', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 10.20, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/dashboard/analysis', `layui_icon` = NULL, `antdv_router` = '/dashboard/analysis', `antdv_icon` = 'bar-chart-outlined', `antdv_component` = '/dashboard/analysis', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-01-08 20:52:34', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639303;

UPDATE `sys_menu` SET `menu_parent_id` = -1, `menu_pids` = '[-1],', `menu_name` = '用户权限', `menu_code` = 'user_role', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 20.00, `status_flag` = 1, `remark` = NULL, `layui_path` = '#', `layui_icon` = 'layui-icon-template-1', `antdv_router` = '/orginfo', `antdv_icon` = 'setting-outlined', `antdv_component` = NULL, `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-02-19 22:17:55', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639304;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639304, `menu_pids` = '[-1],[1339550467939639304],', `menu_name` = '用户管理', `menu_code` = 'org_user', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 20.10, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/user', `layui_icon` = NULL, `antdv_router` = '/orginfo/user', `antdv_icon` = 'team-outlined', `antdv_component` = '/orginfo/user/user', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = NULL, `update_user` = NULL WHERE `menu_id` = 1339550467939639305;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639304, `menu_pids` = '[-1],[1339550467939639304],', `menu_name` = '职位管理', `menu_code` = 'org_position', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 20.20, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/position', `layui_icon` = '', `antdv_router` = '/orginfo/position', `antdv_icon` = 'SolutionOutlined', `antdv_component` = '/orginfo/position/position', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-02-19 22:27:51', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639307;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639304, `menu_pids` = '[-1],[1339550467939639304],', `menu_name` = '应用管理', `menu_code` = 'auth_app', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 20.30, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/app', `layui_icon` = '', `antdv_router` = '/orginfo/app', `antdv_icon` = 'AppstoreOutlined', `antdv_component` = '/orginfo/app/app', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-02-19 22:28:13', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639309;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639304, `menu_pids` = '[-1],[1339550467939639304],', `menu_name` = '菜单管理', `menu_code` = 'auth_menu', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 20.50, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/menu', `layui_icon` = '', `antdv_router` = '/orginfo/menu', `antdv_icon` = 'bars-outlined', `antdv_component` = '/orginfo/menu/menu', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-02-19 22:29:05', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639310;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639304, `menu_pids` = '[-1],[1339550467939639304],', `menu_name` = '角色管理', `menu_code` = 'auth_role', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 20.40, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/role', `layui_icon` = '', `antdv_router` = '/orginfo/role', `antdv_icon` = 'idcard-outlined', `antdv_component` = '/orginfo/role/role', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-02-19 22:28:36', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639311;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639304, `menu_pids` = '[-1],[1339550467939639304],', `menu_name` = '资源管理', `menu_code` = 'auth_resource', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 20.60, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/resource', `layui_icon` = '', `antdv_router` = '/orginfo/resource', `antdv_icon` = 'CompressOutlined', `antdv_component` = '/orginfo/resource/resource', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-02-19 22:29:13', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639312;

UPDATE `sys_menu` SET `menu_parent_id` = -1, `menu_pids` = '[-1],', `menu_name` = '基础数据', `menu_code` = 'base', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 40.00, `status_flag` = 1, `remark` = NULL, `layui_path` = '', `layui_icon` = 'layui-icon-component', `antdv_router` = '/basedata', `antdv_icon` = 'DatabaseOutlined', `antdv_component` = NULL, `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-01-08 16:47:41', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639313;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639313, `menu_pids` = '[-1],[1339550467939639313],', `menu_name` = '系统配置', `menu_code` = 'base_sysconfig', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 40.10, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/config', `layui_icon` = NULL, `antdv_router` = '/basedata/sysconfig', `antdv_icon` = 'RadarChartOutlined', `antdv_component` = '/basedata/sysconfig/sysconfig', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = NULL, `update_user` = NULL WHERE `menu_id` = 1339550467939639314;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639313, `menu_pids` = '[-1],[1339550467939639313],', `menu_name` = '字典管理', `menu_code` = 'base_dict', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 40.20, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/dictType', `layui_icon` = NULL, `antdv_router` = '/basedata/dict', `antdv_icon` = 'ContainerOutlined', `antdv_component` = '/basedata/dict/dict', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = NULL, `update_user` = NULL WHERE `menu_id` = 1339550467939639315;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639313, `menu_pids` = '[-1],[1339550467939639313],', `menu_name` = '接口文档', `menu_code` = 'base_apis', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 40.30, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/api', `layui_icon` = NULL, `antdv_router` = '/basedata/api', `antdv_icon` = 'ApiOutlined', `antdv_component` = '/basedata/api/api', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = NULL, `update_user` = NULL WHERE `menu_id` = 1339550467939639316;

UPDATE `sys_menu` SET `menu_parent_id` = -1, `menu_pids` = '[-1],', `menu_name` = '系统功能', `menu_code` = 'sys', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 50.00, `status_flag` = 1, `remark` = NULL, `layui_path` = '', `layui_icon` = 'layui-icon-set', `antdv_router` = '/operation', `antdv_icon` = 'ApartmentOutlined', `antdv_component` = NULL, `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = '2021-01-08 16:47:49', `update_user` = 1339550467939639299 WHERE `menu_id` = 1339550467939639317;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639317, `menu_pids` = '[-1],[1339550467939639317],', `menu_name` = '文件管理', `menu_code` = 'sys_file', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 50.10, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/file', `layui_icon` = NULL, `antdv_router` = '/operation/file', `antdv_icon` = 'FileOutlined', `antdv_component` = '/operation/file/file', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = NULL, `update_user` = NULL WHERE `menu_id` = 1339550467939639318;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639317, `menu_pids` = '[-1],[1339550467939639317],', `menu_name` = '操作日志', `menu_code` = 'operate_log', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 50.20, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/log', `layui_icon` = NULL, `antdv_router` = '/operation/operatelog', `antdv_icon` = 'HistoryOutlined', `antdv_component` = '/operation/operatelog/operatelog', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = NULL, `update_user` = NULL WHERE `menu_id` = 1339550467939639319;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639317, `menu_pids` = '[-1],[1339550467939639317],', `menu_name` = '在线用户', `menu_code` = 'sys_online', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 50.30, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/onlineUser', `layui_icon` = NULL, `antdv_router` = '/operation/online', `antdv_icon` = 'SolutionOutlined', `antdv_component` = '/operation/online/online', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = NULL, `update_user` = NULL WHERE `menu_id` = 1339550467939639320;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639317, `menu_pids` = '[-1],[1339550467939639317],', `menu_name` = '定时任务', `menu_code` = 'sys_timer', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 50.40, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/sysTimers', `layui_icon` = NULL, `antdv_router` = '/operation/timer', `antdv_icon` = 'CalculatorOutlined', `antdv_component` = '/operation/timer/timer', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = NULL, `update_user` = NULL WHERE `menu_id` = 1339550467939639321;

UPDATE `sys_menu` SET `menu_parent_id` = 1339550467939639317, `menu_pids` = '[-1],[1339550467939639317],', `menu_name` = '登录日志', `menu_code` = 'login_log', `app_code` = 'system', `visible` = 'Y', `menu_sort` = 50.50, `status_flag` = 1, `remark` = NULL, `layui_path` = '/view/loginLog', `layui_icon` = NULL, `antdv_router` = '/system/loginlog', `antdv_icon` = 'UserSwitchOutlined', `antdv_component` = '/operation/loginlog/loginlog', `antdv_link_open_type` = NULL, `antdv_link_url` = NULL, `antdv_uid_url` = NULL, `del_flag` = 'N', `create_time` = '2020-12-29 19:51:14', `create_user` = NULL, `update_time` = NULL, `update_user` = NULL WHERE `menu_id` = 1339550467939639334;

DELETE FROM `sys_menu` WHERE `menu_id` = 1339550467939639322;

DELETE FROM `sys_menu` WHERE `menu_id` = 1339550467939639323;

DELETE FROM `sys_menu` WHERE `menu_id` = 1339550467939639324;

DELETE FROM `sys_menu` WHERE `menu_id` = 1339550467939639325;

DELETE FROM `sys_menu` WHERE `menu_id` = 1339550467939639326;

DELETE FROM `sys_menu` WHERE `menu_id` = 1339550467939639330;

DELETE FROM `sys_menu` WHERE `menu_id` = 1352966403623342082;

DELETE FROM `sys_menu` WHERE `menu_id` = 1352968673144459265;

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412737130498, 1339550467939639303, 1339550467939639301, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519105, 1339550467939639303, 1339550467939639302, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519106, 1339550467939639303, 1339550467939639303, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519107, 1339550467939639303, 1339550467939639304, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519108, 1339550467939639303, 1339550467939639305, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519109, 1339550467939639303, 1339550467939639307, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519110, 1339550467939639303, 1339550467939639309, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519111, 1339550467939639303, 1339550467939639310, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519112, 1339550467939639303, 1339550467939639311, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519113, 1339550467939639303, 1339550467939639312, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519114, 1339550467939639303, 1339550467939639313, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519115, 1339550467939639303, 1339550467939639314, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519116, 1339550467939639303, 1339550467939639315, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519117, 1339550467939639303, 1339550467939639316, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519118, 1339550467939639303, 1339550467939639317, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412745519119, 1339550467939639303, 1339550467939639318, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907714, 1339550467939639303, 1339550467939639319, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907715, 1339550467939639303, 1339550467939639320, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907716, 1339550467939639303, 1339550467939639321, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907717, 1339550467939639303, 1339550467939639334, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907718, 1339550467939639303, 1339550467939639335, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907719, 1339550467939639303, 1339550467939639336, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907720, 1339550467939639303, 1339550467939639350, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907721, 1339550467939639303, 1339550467939639351, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907722, 1339550467939639303, 1339550467939639352, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907723, 1339550467939639303, 1339550467939639360, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907724, 1339550467939639303, 1339550467939639361, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

INSERT INTO `sys_role_menu`(`role_menu_id`, `role_id`, `menu_id`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1377572412753907725, 1339550467939639303, 1339550467939639362, '2021-04-01 18:43:52', 1339550467939639299, NULL, NULL);

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720900231170;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720900231171;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720900231172;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720900231173;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720900231174;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720900231175;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720900231176;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720900231177;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720900231178;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619778;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619779;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619780;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619781;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619782;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619783;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619784;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619785;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619786;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619787;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619788;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619789;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619790;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619791;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619792;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619793;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619794;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619795;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619796;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619797;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619798;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619799;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619800;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619801;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1348235720908619802;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1352966446510100482;

DELETE FROM `sys_role_menu` WHERE `role_menu_id` = 1352968718384222221;

SET FOREIGN_KEY_CHECKS = 1;