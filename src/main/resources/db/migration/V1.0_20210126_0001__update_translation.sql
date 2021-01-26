INSERT INTO `sys_dict` (`dict_id`, `dict_code`, `dict_name`, `dict_name_pinyin`, `dict_encode`, `dict_type_code`, `dict_short_name`, `dict_short_code`, `dict_parent_id`, `status_flag`, `dict_sort`, `dict_pids`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1353998066804658177, 'chinese', '中文', 'zw', NULL, 'languages', '', '', -1, 1, 1.00, '-1', 'N', '2021-01-26 17:27:50', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` (`dict_id`, `dict_code`, `dict_name`, `dict_name_pinyin`, `dict_encode`, `dict_type_code`, `dict_short_name`, `dict_short_code`, `dict_parent_id`, `status_flag`, `dict_sort`, `dict_pids`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1353998106784763906, 'english', '英文', 'yw', NULL, 'languages', '', '', -1, 1, 2.00, '-1', 'N', '2021-01-26 17:27:59', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict_type` (`dict_type_id`, `dict_type_class`, `dict_type_bus_code`, `dict_type_code`, `dict_type_name`, `dict_type_name_pinyin`, `dict_type_desc`, `status_flag`, `dict_type_sort`, `del_flag`, `create_time`, `create_user`, `update_time`, `update_user`) VALUES (1353997993299480577, 2, '', 'languages', '语种', 'yz', 'i18n 多语言', 1, 7.00, 'N', '2021-01-26 17:27:32', 1339550467939639299, NULL, NULL);

ALTER TABLE `sys_translation` CHANGE COLUMN `language` `tran_language_code` varchar(255) NOT NULL COMMENT '语种字典';

update sys_translation set tran_language_code='chinese' where tran_language_code='1';
update sys_translation set tran_language_code='english' where tran_language_code='2';
