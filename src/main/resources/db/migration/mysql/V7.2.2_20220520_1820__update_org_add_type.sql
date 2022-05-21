SET FOREIGN_KEY_CHECKS = 0;

-- 组织机构增加一个类型
ALTER TABLE `hr_organization` ADD COLUMN `org_type` tinyint(4) NULL DEFAULT 1 COMMENT '组织机构类型：1-公司，2-部门' AFTER `status_flag`;

-- 拓展字段修改
DELETE FROM `sys_expand_field` WHERE `field_id` = 1509776920974225409;
INSERT INTO `sys_expand_field`(`field_id`, `expand_id`, `field_name`, `field_code`, `field_type`, `field_required`, `field_length`, `field_dict_type_code`, `list_show_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1527833053735546881, 1509151239135424513, '统一社会信用代码', 'socialNumber', 1, 'N', NULL, NULL, 'N', '2022-05-21 10:06:00', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_expand_field`(`field_id`, `expand_id`, `field_name`, `field_code`, `field_type`, `field_required`, `field_length`, `field_dict_type_code`, `list_show_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1527833220710789122, 1509151239135424513, '联系人', 'linkman', 1, 'N', NULL, NULL, 'N', '2022-05-21 10:06:40', 1339550467939639299, NULL, NULL);

-- 菜单增加机构管理
INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `antdv_front_type`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1527832618693947394, 1339550467939639304, '[-1],[1339550467939639304],', '机构管理', 'organization_manage', 'systemApp', 20.11, 1, NULL, NULL, NULL, 'N', '/organization', 'ApartmentOutlined', '/system/organization/organization', 0, NULL, NULL, 'Y', 3, 'N', '2022-05-21 10:04:17', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_menu`(`menu_id`, `menu_parent_id`, `menu_pids`, `menu_name`, `menu_code`, `app_code`, `menu_sort`, `status_flag`, `remark`, `layui_path`, `layui_icon`, `layui_visible`, `antdv_router`, `antdv_icon`, `antdv_component`, `antdv_link_open_type`, `antdv_link_url`, `antdv_active_url`, `antdv_visible`, `antdv_front_type`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1527852532272062466, 1339550467939639304, '[-1],[1339550467939639304],', '公司管理', 'company', 'systemApp', 20.12, 1, NULL, NULL, NULL, 'N', '/company', 'BankOutlined', '/system/company/company', 0, NULL, NULL, 'Y', 3, 'N', '2022-05-21 11:23:24', 1339550467939639299, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;