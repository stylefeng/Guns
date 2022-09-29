INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `antdv_front_type`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1575396079602528258, 1399362846198013953, '[-1],[1399362846198013953],', '后台权限', 'sysadmin_power', 'systemApp', 20.42, 1, NULL, NULL, NULL, 'Y', '/authority/adminPower', 'UserAddOutlined', '/system/sys-admin-power/index', 0, NULL, NULL, 'Y', 2, 'N', '2022-09-29 16:04:29', 1339550467939639299, '2022-09-29 17:39:55', 1339550467939639299);

UPDATE `sys_menu` SET `menu_name` = '前台权限' WHERE `menu_id` = 1538775070967664642;

UPDATE `sys_menu` SET `antdv_front_type` = 2 WHERE `app_code` = 'systemApp';
UPDATE `sys_menu` SET `antdv_front_type` = 1 WHERE `menu_id` = 1339550467939639301;
UPDATE `sys_menu` SET `antdv_front_type` = 1 WHERE `menu_id` = 1339550467939639302;
UPDATE `sys_menu` SET `antdv_front_type` = 1 WHERE `menu_id` = 1339550467939639303;
UPDATE `sys_menu` SET `antdv_front_type` = 1 WHERE `menu_id` = 1339550467939639350;
UPDATE `sys_menu` SET `antdv_front_type` = 1 WHERE `menu_id` = 1339550467939639351;
UPDATE `sys_menu` SET `antdv_front_type` = 1 WHERE `menu_id` = 1339550467939639352;

-- 个人中心前后台都显示
UPDATE `sys_menu` SET `antdv_front_type` = 3 WHERE `menu_id` = 1339550467939639390;
