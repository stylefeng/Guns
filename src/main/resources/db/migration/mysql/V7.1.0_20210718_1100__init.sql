SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for api_group
-- ----------------------------
CREATE TABLE `api_group`  (
  `group_id` bigint(20) NOT NULL COMMENT '资源分组主键',
  `group_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '分组名称',
  `group_pid` bigint(20) NULL DEFAULT NULL COMMENT '分组父ID',
  `group_pids` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '分组父ID集合',
  `group_sort` decimal(56, 2) NULL DEFAULT 99999.00 COMMENT '分组排序',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口分组' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_group
-- ----------------------------
INSERT INTO `api_group` VALUES (1000000000000000000, '顶级节点', -1, '[-1]', 0.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_group` VALUES (1399204023990620161, '用户管理', 1000000000000000000, '[-1],[1000000000000000000]', 0.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_group` VALUES (1399204049806561282, '授权角色界面用的', 1399204023990620161, '[-1],[1000000000000000000],[1399204023990620161]', 1.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_group` VALUES (1399204090214486017, '授权数据用的接口', 1399204023990620161, '[-1],[1000000000000000000],[1399204023990620161]', 2.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_group` VALUES (1401840671212630017, 'C端用户', 1000000000000000000, '[-1],[1000000000000000000]', 10.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_group` VALUES (1405820842689052674, 'C端用户（个人信息）', 1000000000000000000, '[-1],[1000000000000000000]', 50.00, NULL, NULL, '2021-06-18 17:33:09', 1339550467939639299);

-- ----------------------------
-- Table structure for api_resource
-- ----------------------------
CREATE TABLE `api_resource`  (
  `api_resource_id` bigint(20) NOT NULL COMMENT '接口信息主键',
  `group_id` bigint(20) NOT NULL COMMENT '资源分组数据主键',
  `request_method` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '请求方式：GET，POST',
  `api_alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '接口自定义名称，区别于sys_resource表的名称',
  `resource_code` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '资源唯一编码,关联sys_resource表的code',
  `last_request_header` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '上次接口调用的头信息',
  `last_request_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '上次接口调用的参数内容',
  `last_response_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '上次接口调用的响应内容',
  `resource_sort` decimal(56, 2) NULL DEFAULT 99999.00 COMMENT '资源排序',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建用户',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改用户',
  PRIMARY KEY (`api_resource_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_resource
-- ----------------------------
INSERT INTO `api_resource` VALUES (1399204183298674690, 1399204049806561282, 'POST', '授权角色', 'guns$sys_user$grant_role', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiI2OGUxYTBkNi1jNzA5LTQyNGQtOGQ3ZC0wMWY0MDIzY2ExNDMiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjMxMTU5ODQxNDksImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMjUxMTE4NCwiZXhwIjoxNjIzMTE1OTg0fQ.aDiwLDu_i9_FkC2OPMG23Ip1SdQlE9L5mFQ7a30dhyL-tzneiO-5OqLmRfjMi6C4on-Tn1CW_FHTQvkbdEO-2g\"}', '{&quot;grantRoleIdList&quot;:&quot;1&quot;,&quot;userId&quot;:&quot;1&quot;}', '{\"success\":false,\"code\":\"A1502\",\"message\":\"请求Json数据格式错误或Json字段格式转化问题\",\"data\":null,\"exceptionClazz\":null,\"exceptionTip\":null,\"exceptionPlace\":null}', 3.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399204183655190530, 1399204023990620161, 'POST', '用户管理-修改用户', 'guns$sys_user$edit', NULL, NULL, NULL, 9.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399204183705522178, 1399204023990620161, 'POST', '用户管理-修改用户状态', 'guns$sys_user$change_status', NULL, NULL, NULL, 10.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399204183814574082, 1399204090214486017, 'POST', '授权数据范围', 'guns$sys_user$grant_data', NULL, NULL, NULL, 2.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399204183860711425, 1399204023990620161, 'POST', '用户管理-重置密码', 'guns$sys_user$reset_pwd', NULL, NULL, NULL, 11.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399204184158507009, 1399204023990620161, 'POST', '用户管理-删除', 'guns$sys_user$delete', NULL, NULL, NULL, 12.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399204184200450049, 1399204049806561282, 'GET', '查询用户的所有角色（也可从登录接口获取角色）', 'guns$sys_user$own_role', NULL, NULL, NULL, 2.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399206240776753153, 1399204049806561282, 'GET', '获取所有角色列表', 'guns$sys_role$drop_down', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiIwZjllMWJlNS04MjVjLTQ5ZTQtOTM5Ni02YzVkNWQ0Y2MwM2QiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjMwNDk3NzcyMjMsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMjQ0NDk3NywiZXhwIjoxNjIzMDQ5Nzc3fQ.EK8txKDowuLvsqJzmiCvRPOsjgfsvDuIJhJHk3fObwehfxXzgXkb3vF6VcLVCSk-LvHrXNOxzLlqWQ0ZqV7RrA\"}', '{}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":[{\"id\":\"1339550467939639303\",\"name\":\"超级管理员\",\"code\":\"superAdmin\"},{\"id\":\"1339550467939639304\",\"name\":\"普通人员\",\"code\":\"normal\"},{\"id\":\"1339550467939639305\",\"name\":\"C端人员\",\"code\":\"c\"},{\"id\":\"1339550467939639306\",\"name\":\"B端人员\",\"code\":\"b\"}]}', 1.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399206928151875586, 1399204090214486017, 'GET', '获取授权数据列表', 'guns$hr_organization$user_bind_org_scope', NULL, NULL, NULL, 1.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399207529036255234, 1399204023990620161, 'GET', '左侧组织机构-获取组织机构树列表', 'guns$hr_organization$organization_tree', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiI0OWEwODgxOS05Y2UzLTQ5YTItYTZmZC00MDUyZjIzMmFhODkiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjMwNDk2MTEyMjUsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMjQ0NDgxMSwiZXhwIjoxNjIzMDQ5NjExfQ.Drgga3AmQ4382wlUOyihdXUbqYCQ-fipD7oVCjgadW48Ljjuq9IxbBe1gj7m_aGbtCWMNuaU1rNcIlnFgLNmAg\"}', '{}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":[{\"parentId\":\"-1\",\"title\":\"Guns总公司\",\"id\":\"1339554696976781407\",\"spread\":true,\"selected\":false,\"children\":[{\"parentId\":\"1339554696976781407\",\"title\":\"北京分公司\",\"id\":\"1339554696976781408\",\"spread\":true,\"selected\":false,\"children\":[{\"parentId\":\"1339554696976781408\",\"title\":\"北京东直门分公司\",\"id\":\"1339554696976781409\",\"spread\":true,\"selected\":false,\"children\":[],\"name\":\"北京东直门分公司\",\"value\":\"1339554696976781409\",\"nodeId\":\"1339554696976781409\",\"nodeParentId\":\"1339554696976781408\",\"disabled\":false}],\"name\":\"北京分公司\",\"value\":\"1339554696976781408\",\"nodeId\":\"1339554696976781408\",\"nodeParentId\":\"1339554696976781407\",\"disabled\":false}],\"name\":\"Guns总公司\",\"value\":\"1339554696976781407\",\"nodeId\":\"1339554696976781407\",\"nodeParentId\":\"-1\",\"disabled\":false}]}', 3.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399207670321385474, 1399204023990620161, 'POST', '左侧组织架构-新增', 'guns$hr_organization$add', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiI0OWEwODgxOS05Y2UzLTQ5YTItYTZmZC00MDUyZjIzMmFhODkiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjMwNDk2MTEyMjUsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMjQ0NDgxMSwiZXhwIjoxNjIzMDQ5NjExfQ.Drgga3AmQ4382wlUOyihdXUbqYCQ-fipD7oVCjgadW48Ljjuq9IxbBe1gj7m_aGbtCWMNuaU1rNcIlnFgLNmAg\"}', '{\"orgRemark\":\"1\",\"orgCode\":\"2\",\"orgSort\":\"3\",\"orgName\":\"4\",\"orgParentId\":\"5\"}', '{\"success\":false,\"code\":\"A1856\",\"message\":\"查询不到组织机构，错误的组织机构ID：5\",\"data\":null,\"exceptionClazz\":\"SystemModularException\",\"exceptionTip\":\"查询不到组织机构，错误的组织机构ID：5\",\"exceptionPlace\":\"cn.stylefeng.roses.kernel.system.modular.organization.service.impl.HrOrganizationServiceImpl.queryOrganization(HrOrganizationServiceImpl.java:390)\"}', 4.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399207702105821186, 1399204023990620161, 'POST', '左侧组织架构-删除', 'guns$hr_organization$delete', NULL, NULL, NULL, 6.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399207733097533442, 1399204023990620161, 'POST', '左侧组织架构-修改', 'guns$hr_organization$edit', NULL, NULL, NULL, 5.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399209982771204097, 1399204023990620161, 'GET', '用户管理-获取用户列表', 'guns$sys_user$page', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiIwZjllMWJlNS04MjVjLTQ5ZTQtOTM5Ni02YzVkNWQ0Y2MwM2QiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjMwNDk3NzcyMjMsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMjQ0NDk3NywiZXhwIjoxNjIzMDQ5Nzc3fQ.EK8txKDowuLvsqJzmiCvRPOsjgfsvDuIJhJHk3fObwehfxXzgXkb3vF6VcLVCSk-LvHrXNOxzLlqWQ0ZqV7RrA\"}', '{\"account\":\"\",\"statusFlag\":\"\",\"realName\":\"\"}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":{\"pageNo\":1,\"pageSize\":20,\"totalPage\":1,\"totalRows\":1,\"rows\":[{\"userId\":\"1339550467939639299\",\"account\":\"admin\",\"nickName\":\"超管\",\"realName\":\"管理员\",\"avatar\":\"10000\",\"birthday\":\"2020-12-01\",\"sex\":\"M\",\"email\":\"sn93@qq.com\",\"phone\":\"18200000000\",\"password\":null,\"tel\":\"123456\",\"orgId\":\"1339554696976781407\",\"positionId\":\"1339554696976781332\",\"positionName\":\"总监\",\"statusFlag\":1,\"grantRoleIdList\":null,\"superAdminFlag\":null}]}}', 7.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399210244432859137, 1399204023990620161, 'POST', '用户管理-添加用户', 'guns$sys_user$add', NULL, NULL, NULL, 8.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1399211324021542914, 1399204023990620161, 'GET', '用户管理-职位信息下拉', 'guns$hr_position$list', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiIwZjllMWJlNS04MjVjLTQ5ZTQtOTM5Ni02YzVkNWQ0Y2MwM2QiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjMwNDk3NzcyMjMsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMjQ0NDk3NywiZXhwIjoxNjIzMDQ5Nzc3fQ.EK8txKDowuLvsqJzmiCvRPOsjgfsvDuIJhJHk3fObwehfxXzgXkb3vF6VcLVCSk-LvHrXNOxzLlqWQ0ZqV7RrA\"}', '{}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":[{\"createTime\":\"2020-12-16 13:35:58\",\"createUser\":\"-1\",\"updateTime\":null,\"updateUser\":null,\"positionId\":\"1339554696976781332\",\"positionName\":\"总监\",\"positionCode\":\"zg\",\"positionSort\":1.00,\"statusFlag\":1,\"positionRemark\":\"\",\"delFlag\":\"N\",\"name\":\"总监\",\"value\":\"1339554696976781332\",\"children\":null,\"selected\":false,\"disabled\":false},{\"createTime\":\"2020-12-17 19:21:47\",\"createUser\":\"-1\",\"updateTime\":\"2020-12-17 20:45:43\",\"updateUser\":\"-1\",\"positionId\":\"1339554696976781333\",\"positionName\":\"总经理\",\"positionCode\":\"zjl\",\"positionSort\":2.00,\"statusFlag\":1,\"positionRemark\":\"\",\"delFlag\":\"N\",\"name\":\"总经理\",\"value\":\"1339554696976781333\",\"children\":null,\"selected\":false,\"disabled\":false},{\"createTime\":\"2020-12-17 20:02:16\",\"createUser\":\"-1\",\"updateTime\":null,\"updateUser\":null,\"positionId\":\"1339554696976781334\",\"positionName\":\"董事长\",\"positionCode\":\"dsz\",\"positionSort\":3.00,\"statusFlag\":1,\"positionRemark\":\"\",\"delFlag\":\"N\",\"name\":\"董事长\",\"value\":\"1339554696976781334\",\"children\":null,\"selected\":false,\"disabled\":false}]}', 13.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1402073728229052417, 1401840671212630017, 'POST', '重置密码', 'guns$customer$reset_password', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiJhYTNlMTgyMy0zNzNjLTQ1MWItYTZlNS04OWI5ODE1NTIwZTUiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjM3MjA3ODI2MTMsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMzExNTk4MiwiZXhwIjoxNjIzNzIwNzgyfQ.EP6HDALsFKQIfP92NHMlOOUPvVDk7OX7vka_E7sHWjwg9Z7k-HaQMS_wtCep5Psn2Nyy-BbBby9GqVclpPXT8A\"}', '{\"password\":\"123456\",\"verifyCode\":\"430706\",\"email\":\"sn93@qq.com\"}', '{\"success\":false,\"code\":\"B3106\",\"message\":\"邮箱验证码错误，请重新输入邮箱验证码\",\"data\":null,\"exceptionClazz\":\"CustomerException\",\"exceptionTip\":\"邮箱验证码错误，请重新输入邮箱验证码\",\"exceptionPlace\":\"cn.stylefeng.roses.kernel.customer.modular.service.impl.CustomerServiceImpl.resetPassword(CustomerServiceImpl.java:205)\"}', 5.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1402073683941396481, 1401840671212630017, 'POST', '找回密码-发送邮件', 'guns$customer$send_reset_pwd_email', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiI0YzFlMzYxZC1kMTBiLTRiMjYtYTkxNS0zMzQ1NWNhNGZkNmYiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjM4Mjk0NTQwNzQsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMzIyNDY1NCwiZXhwIjoxNjIzODI5NDU0fQ.bw_GRVQ_1TVcKnW54WA9LT6Q37AvV0uK5q8ZvKVFcW-xQj5b_kZFnaLBFHkZhtxJlVRpmswb4cqrqT1dX8sN0A\"}', '{\"email\":\"！！！！\"}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":null}', 4.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1401840767337689089, 1401840671212630017, 'GET', '激活用户', 'guns$customer$active', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiJhYTNlMTgyMy0zNzNjLTQ1MWItYTZlNS04OWI5ODE1NTIwZTUiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjM3MjA3ODI2MTMsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMzExNTk4MiwiZXhwIjoxNjIzNzIwNzgyfQ.EP6HDALsFKQIfP92NHMlOOUPvVDk7OX7vka_E7sHWjwg9Z7k-HaQMS_wtCep5Psn2Nyy-BbBby9GqVclpPXT8A\"}', '{\"verifyCode\":\"S4YF9QQACEDYGDEE7G3U49DCAAO1I\"}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":null}', 2.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1401840751835541505, 1401840671212630017, 'POST', '注册', 'guns$customer$reg', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiIzZmI4ODA5OC1kMzRkLTRiOWYtOTVhYy0yZGU3MTc4N2JhZWQiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjM4MDYwODczMTEsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMzIwMTI4NywiZXhwIjoxNjIzODA2MDg3fQ.7kCWIwDZw_Uo3PDTB3-ciU4eslnHkkfB-mm4MMp7q1CGMSpwJONZHcpTlq-n0Hy3_W3VHVVCDka87378WmI1rw\"}', '{\"nickName\":\"嘎嘎\",\"account\":\"abcd\",\"password\":\"123456\",\"email\":\"sn93@qq.com\"}', '{\"success\":false,\"code\":\"B3104\",\"message\":\"账号重复，请更换账号\",\"data\":null,\"exceptionClazz\":\"CustomerException\",\"exceptionTip\":\"账号重复，请更换账号\",\"exceptionPlace\":\"cn.stylefeng.roses.kernel.customer.modular.service.impl.CustomerServiceImpl.validateRepeat(CustomerServiceImpl.java:311)\"}', 1.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1402074659867856898, 1401840671212630017, 'POST', '删除注册用户', 'guns$customer_manage$delete', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiIzZmI4ODA5OC1kMzRkLTRiOWYtOTVhYy0yZGU3MTc4N2JhZWQiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjM4MDYwODczMTEsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMzIwMTI4NywiZXhwIjoxNjIzODA2MDg3fQ.7kCWIwDZw_Uo3PDTB3-ciU4eslnHkkfB-mm4MMp7q1CGMSpwJONZHcpTlq-n0Hy3_W3VHVVCDka87378WmI1rw\"}', '{\"customerId\":\"1402465414545412098\"}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":null}', 6.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1401840787965276162, 1401840671212630017, 'POST', '登录', 'guns$customer$login', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiI1MjBlOGJhMC04YzMzLTRkYWYtYmM5MC1kM2M5MTA1YWYxMzkiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjM4Mjg5NDEyNTcsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyMzIyNDE0MSwiZXhwIjoxNjIzODI4OTQxfQ.Yn5xYYwqVtvXIjzmkNc5J8y6vzT34obr_bsKyoN9cfXIXCut4qhq55s80BSvI320YfuXGyByofSejIr-wOJ2uA\"}', '{\"account\":\"sudie\",\"password\":\"123456\"}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":{\"loginUser\":{\"userId\":\"1402467874357907457\",\"account\":\"sudie\",\"superAdmin\":null,\"simpleUserInfo\":{\"nickName\":\"sudie\",\"realName\":null,\"avatar\":\"10000\",\"birthday\":null,\"sex\":null,\"email\":\"suewangyihe0@163.com\",\"phone\":null,\"tel\":null},\"simpleRoleInfoList\":null,\"organizationId\":null,\"positionId\":null,\"dataScopeTypeEnums\":null,\"dataScopeUserIds\":null,\"dataScopeOrganizationIds\":null,\"resourceUrls\":null,\"buttonCodes\":null,\"loginTime\":\"2021-06-09 15:35:52\",\"token\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjE0MDI0Njc4NzQzNTc5MDc0NTcsImFjY291bnQiOiJzdWRpZSIsInV1aWQiOiJiZDVmODBjMy1hZWIzLTQ5YjctYWI3YS04M2U0MTU1NjAyZjYiLCJyZW1lbWJlck1lIjp0cnVlLCJleHBpcmF0aW9uRGF0ZSI6MTYyMzgyODk1MjMyMiwiY2FUb2tlbiI6bnVsbCwib3RoZXJzIjpudWxsLCJzdWIiOiIxNDAyNDY3ODc0MzU3OTA3NDU3IiwiaWF0IjoxNjIzMjI0MTUyLCJleHAiOjE2MjM4Mjg5NTJ9.dmn_SMEc08hepTlnODaVvHs02l-s1ztmn5E1r7b-kVAh2AyiAAo90wXqKYc1hcqgWVJZ12opWHRxlC8Ki6c44g\",\"otherInfos\":null,\"wsUrl\":\"\",\"tranLanguageCode\":\"chinese\",\"tenantCode\":null},\"token\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjE0MDI0Njc4NzQzNTc5MDc0NTcsImFjY291bnQiOiJzdWRpZSIsInV1aWQiOiJiZDVmODBjMy1hZWIzLTQ5YjctYWI3YS04M2U0MTU1NjAyZjYiLCJyZW1lbWJlck1lIjp0cnVlLCJleHBpcmF0aW9uRGF0ZSI6MTYyMzgyODk1MjMyMiwiY2FUb2tlbiI6bnVsbCwib3RoZXJzIjpudWxsLCJzdWIiOiIxNDAyNDY3ODc0MzU3OTA3NDU3IiwiaWF0IjoxNjIzMjI0MTUyLCJleHAiOjE2MjM4Mjg5NTJ9.dmn_SMEc08hepTlnODaVvHs02l-s1ztmn5E1r7b-kVAh2AyiAAo90wXqKYc1hcqgWVJZ12opWHRxlC8Ki6c44g\",\"expireAt\":\"1623828952322\",\"ssoLogin\":null,\"ssoLoginCode\":null}}', 3.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1405791882135666690, 1401840671212630017, 'POST', '校验token是否正确', 'guns$login$validate_token', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiJkMTE0ZGE2OS1iZDcwLTQ3MzItOWE0Mi0wY2IzNTg0ZmY1MjIiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjQ2MDY2MDE2NDQsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyNDAwMTgwMSwiZXhwIjoxNjI0NjA2NjAxfQ.2iMhk-9afcuMSvdTHVEGoDSj6ESPACThLHtPo5aFw_QRpSCV_18i6-s6hcJ_CJLzfZ-E49Cz2wR6VdAn7mcRNw\"}', '{\"token\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiJkMTE0ZGE2OS1iZDcwLTQ3MzItOWE0Mi0wY2IzNTg0ZmY1MjIiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjQ2MDY2MDE2NDQsImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyNDAwMTgwMSwiZXhwIjoxNjI0NjA2NjAxfQ.2iMhk-9afcuMSvdTHVEGoDSj6ESPACThLHtPo5aFw_QRpSCV_18i6-s6hcJ_CJLzfZ-E49Cz2wR6VdAn7mcRNw\"}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":true}', 7.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1405821024314998786, 1405820842689052674, 'POST', '修改个人密码', 'guns$customer_info$update_password', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiI5NGRlMmUzMS05NTQyLTQ4NjAtOWJjOS03ZjIzZDhiOTZhZjEiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjQ2MTM5MTQ3MzksImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyNDAwOTExNCwiZXhwIjoxNjI0NjEzOTE0fQ.YViKkeCQkbXPr0tlzOOAdZwCkdzaP5_cNTYoW9CkvFUIqvnPzqhF5fwXhg1PZ3ZEpD3dPov3XydpI72IbNQc6Q\"}', '{\"customerId\":\"1405821429119860738\",\"newPassword\":\"1234567\",\"oldPassword\":\"123456\"}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":null}', 2.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1405821040807002114, 1405820842689052674, 'GET', '获取个人信息', 'guns$customer_info$get_person_info', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiI5NGRlMmUzMS05NTQyLTQ4NjAtOWJjOS03ZjIzZDhiOTZhZjEiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjQ2MTM5MTQ3MzksImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyNDAwOTExNCwiZXhwIjoxNjI0NjEzOTE0fQ.YViKkeCQkbXPr0tlzOOAdZwCkdzaP5_cNTYoW9CkvFUIqvnPzqhF5fwXhg1PZ3ZEpD3dPov3XydpI72IbNQc6Q\"}', '{\"customerId\":\"1405821429119860738\"}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":{\"customerId\":\"1405821429119860738\",\"account\":\"abcd\",\"nickName\":\"嘎嘎\",\"email\":\"sn93@qq.com\",\"telephone\":null,\"avatar\":\"10000\",\"avatarObjectUrl\":\"http://223.70.201.178:11080/sysFileInfo/previewByObjectName?fileBucket=customer-bucket&fileObjectName=defaultAvatar.png\",\"score\":0}}', 1.00, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource` VALUES (1405821056158154754, 1405820842689052674, 'POST', '修改个人头像', 'guns$customer_info$update_avatar', '{\"Authorization\":\"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjEzMzk1NTA0Njc5Mzk2MzkyOTksImFjY291bnQiOiJhZG1pbiIsInV1aWQiOiI5NGRlMmUzMS05NTQyLTQ4NjAtOWJjOS03ZjIzZDhiOTZhZjEiLCJyZW1lbWJlck1lIjpmYWxzZSwiZXhwaXJhdGlvbkRhdGUiOjE2MjQ2MTM5MTQ3MzksImNhVG9rZW4iOm51bGwsIm90aGVycyI6bnVsbCwic3ViIjoiMTMzOTU1MDQ2NzkzOTYzOTI5OSIsImlhdCI6MTYyNDAwOTExNCwiZXhwIjoxNjI0NjEzOTE0fQ.YViKkeCQkbXPr0tlzOOAdZwCkdzaP5_cNTYoW9CkvFUIqvnPzqhF5fwXhg1PZ3ZEpD3dPov3XydpI72IbNQc6Q\"}', '{\"customerId\":\"1405821429119860738\",\"avatar\":\"10000\"}', '{\"success\":true,\"code\":\"00000\",\"message\":\"请求成功\",\"data\":null}', 3.00, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for api_resource_field
-- ----------------------------
CREATE TABLE `api_resource_field`  (
  `field_id` bigint(20) NOT NULL COMMENT '字段主键',
  `api_resource_id` bigint(20) NOT NULL COMMENT '资源主键',
  `field_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '参数位置：request-请求参数，response-响应参数',
  `field_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字段名称，例如：邮箱',
  `field_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字段编码，例如：email',
  `field_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字段类型：string或file',
  `field_required` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否必填：Y-是，N-否',
  `field_validation_msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字段其他校验信息，后端校验注解内容',
  `field_sub_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字段子字段信息(Object和List会用到)',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`field_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '接口字段信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_resource_field
-- ----------------------------
INSERT INTO `api_resource_field` VALUES (1399243144142512130, 1399204184200450049, 'request', '主键', 'userId', 'string', 'Y', 'userId不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243144142512137, 1399204184200450049, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243144146706433, 1399204184200450049, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243144146706434, 1399204184200450049, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243144146706435, 1399204184200450049, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243485386891265, 1399204183298674690, 'request', '授权角色，角色id集合', 'grantRoleIdList', 'string', 'Y', '授权角色不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243485386891266, 1399204183298674690, 'request', '主键', 'userId', 'string', 'Y', 'userId不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243485386891275, 1399204183298674690, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243485391085570, 1399204183298674690, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243485391085571, 1399204183298674690, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243485391085572, 1399204183298674690, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243524414889986, 1399206240776753153, 'response', NULL, 'name', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243524419084289, 1399206240776753153, 'response', NULL, 'id', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243524419084290, 1399206240776753153, 'response', NULL, 'code', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243691155251203, 1399206928151875586, 'request', '用户id（作为查询条件）', 'userId', 'string', 'Y', '用户id不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243691155251210, 1399206928151875586, 'response', '父id，一级节点父id是0', 'parentId', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243691155251211, 1399206928151875586, 'response', '是否展开状态 不展开-false 展开-true', 'spread', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243691155251212, 1399206928151875586, 'response', '节点值', 'id', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243691155251213, 1399206928151875586, 'response', '是否选中', 'selected', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243691155251214, 1399206928151875586, 'response', '节点名称', 'title', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243691159445506, 1399206928151875586, 'response', '子节点的集合', 'children', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243776136044547, 1399204183814574082, 'request', '主键', 'userId', 'string', 'Y', 'userId不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243776136044553, 1399204183814574082, 'request', '授权数据范围，组织机构id集合', 'grantOrgIdList', 'string', 'Y', '授权数据不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243776136044559, 1399204183814574082, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243776140238850, 1399204183814574082, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243776140238851, 1399204183814574082, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243776140238852, 1399204183814574082, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243963394940932, 1399207529036255234, 'response', '是否选中', 'selected', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243963394940933, 1399207529036255234, 'response', '节点名称', 'title', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243963394940934, 1399207529036255234, 'response', '是否展开状态 不展开-false 展开-true', 'spread', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243963394940935, 1399207529036255234, 'response', '父id，一级节点父id是0', 'parentId', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243963394940936, 1399207529036255234, 'response', '节点值', 'id', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399243963394940937, 1399207529036255234, 'response', '子节点的集合', 'children', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399251954911301634, 1399207670321385474, 'request', '描述', 'orgRemark', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399251954915495938, 1399207670321385474, 'request', '组织编码', 'orgCode', 'string', 'Y', '组织编码不能为空，组织编码存在重复', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399251954915495940, 1399207670321385474, 'request', '排序', 'orgSort', 'string', 'Y', '排序不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399251954915495942, 1399207670321385474, 'request', '组织名称', 'orgName', 'string', 'Y', '组织名称不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399251954919690242, 1399207670321385474, 'request', '父id', 'orgParentId', 'string', 'Y', '父id不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399251954919690243, 1399207670321385474, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399251954919690244, 1399207670321385474, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399251954919690245, 1399207670321385474, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399251954923884546, 1399207670321385474, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196289302530, 1399207733097533442, 'request', '父id', 'orgParentId', 'string', 'Y', '父id不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196293496833, 1399207733097533442, 'request', '组织编码', 'orgCode', 'string', 'Y', '组织编码不能为空，组织编码存在重复', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196293496836, 1399207733097533442, 'request', '主键', 'orgId', 'string', 'Y', '主键不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196293496837, 1399207733097533442, 'request', '排序', 'orgSort', 'string', 'Y', '排序不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196293496840, 1399207733097533442, 'request', '描述', 'orgRemark', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196293496841, 1399207733097533442, 'request', '组织名称', 'orgName', 'string', 'Y', '组织名称不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196297691137, 1399207733097533442, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196297691138, 1399207733097533442, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196297691139, 1399207733097533442, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399252196297691140, 1399207733097533442, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253302490845188, 1399207702105821186, 'request', '主键', 'orgId', 'string', 'Y', '主键不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253302495039494, 1399207702105821186, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253302495039495, 1399207702105821186, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253302495039496, 1399207702105821186, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253302499233794, 1399207702105821186, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472750227458, 1399209982771204097, 'request', '账号', 'account', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472750227464, 1399209982771204097, 'request', '状态（字典 1正常 2冻结）', 'statusFlag', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472754421763, 1399209982771204097, 'request', '姓名', 'realName', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472754421769, 1399209982771204097, 'response', '姓名', 'realName', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472754421770, 1399209982771204097, 'response', '生日', 'birthday', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472754421771, 1399209982771204097, 'response', '用户所属机构的职务', 'positionId', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472754421772, 1399209982771204097, 'response', '性别（M-男，F-女）', 'sex', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472754421773, 1399209982771204097, 'response', '邮箱', 'email', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616065, 1399209982771204097, 'response', '手机', 'phone', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616066, 1399209982771204097, 'response', '主键', 'userId', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616067, 1399209982771204097, 'response', '职务名称', 'positionName', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616068, 1399209982771204097, 'response', '用户角色id', 'grantRoleIdList', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616069, 1399209982771204097, 'response', '账号', 'account', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616070, 1399209982771204097, 'response', '头像', 'avatar', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616071, 1399209982771204097, 'response', '密码', 'password', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616072, 1399209982771204097, 'response', '昵称', 'nickName', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616073, 1399209982771204097, 'response', '用户所属机构', 'orgId', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616074, 1399209982771204097, 'response', '电话', 'tel', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616075, 1399209982771204097, 'response', '状态', 'statusFlag', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253472758616076, 1399209982771204097, 'response', '是否是超级管理员，超级管理员可以拥有所有权限（Y-是，N-否）', 'superAdminFlag', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864703741953, 1399210244432859137, 'request', '姓名', 'realName', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864703741955, 1399210244432859137, 'request', '账号', 'account', 'string', 'Y', '账号不能为空，账号存在重复', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864707936258, 1399210244432859137, 'request', '生日', 'birthday', 'string', 'N', '生日格式不正确', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864712130561, 1399210244432859137, 'request', '邮箱', 'email', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864712130563, 1399210244432859137, 'request', '用户所属机构的职务', 'positionId', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864716324865, 1399210244432859137, 'request', '性别（M-男，F-女）', 'sex', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864716324866, 1399210244432859137, 'request', '昵称', 'nickName', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864716324871, 1399210244432859137, 'request', '用户所属机构', 'orgId', 'string', 'Y', '用户所属机构不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864716324872, 1399210244432859137, 'request', '手机', 'phone', 'string', 'N', '手机号码格式错误', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864720519172, 1399210244432859137, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864720519173, 1399210244432859137, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864724713473, 1399210244432859137, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399253864724713474, 1399210244432859137, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346453110785, 1399204183655190530, 'request', '邮箱', 'email', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346453110790, 1399204183655190530, 'request', '生日', 'birthday', 'string', 'N', '生日格式不正确', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346453110791, 1399204183655190530, 'request', '昵称', 'nickName', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346453110792, 1399204183655190530, 'request', '手机', 'phone', 'string', 'N', '手机号码格式错误', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346457305091, 1399204183655190530, 'request', '姓名', 'realName', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346457305092, 1399204183655190530, 'request', '账号', 'account', 'string', 'Y', '账号不能为空，账号存在重复', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346457305093, 1399204183655190530, 'request', '主键', 'userId', 'string', 'Y', 'userId不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346457305095, 1399204183655190530, 'request', '用户所属机构的职务', 'positionId', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346457305097, 1399204183655190530, 'request', '性别（M-男，F-女）', 'sex', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346457305098, 1399204183655190530, 'request', '用户所属机构', 'orgId', 'string', 'Y', '用户所属机构不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346457305100, 1399204183655190530, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346461499393, 1399204183655190530, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346461499394, 1399204183655190530, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399254346461499395, 1399204183655190530, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256493915787267, 1399204183705522178, 'request', '主键', 'userId', 'string', 'Y', 'userId不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256493915787271, 1399204183705522178, 'request', '状态（字典 1正常 2冻结）', 'statusFlag', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256493919981573, 1399204183705522178, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256493919981574, 1399204183705522178, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256493919981575, 1399204183705522178, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256493919981576, 1399204183705522178, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256655631372295, 1399204183860711425, 'request', '主键', 'userId', 'string', 'Y', 'userId不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256655635566603, 1399204183860711425, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256655639760898, 1399204183860711425, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256655639760899, 1399204183860711425, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399256655639760900, 1399204183860711425, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257163305734148, 1399204184158507009, 'request', '主键', 'userId', 'string', 'Y', 'userId不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257163305734154, 1399204184158507009, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257163305734155, 1399204184158507009, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257163305734156, 1399204184158507009, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257163305734157, 1399204184158507009, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257252166258695, 1399211324021542914, 'response', '职位编码', 'positionCode', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257252166258696, 1399211324021542914, 'response', '职位备注', 'positionRemark', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257252166258697, 1399211324021542914, 'response', '排序', 'positionSort', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257252166258698, 1399211324021542914, 'response', '职位名称', 'positionName', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257252166258699, 1399211324021542914, 'response', '删除标记：Y-已删除，N-未删除', 'delFlag', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257252170452994, 1399211324021542914, 'response', '主键', 'positionId', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1399257252170452995, 1399211324021542914, 'response', '状态：1-启用，2-禁用', 'statusFlag', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073728233246722, 1402073728229052417, 'request', '密码', 'password', 'string', 'Y', '密码，BCrypt不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073728233246724, 1402073728229052417, 'request', '邮箱或手机验证码', 'verifyCode', 'string', 'Y', '激活码不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073728233246725, 1402073728229052417, 'request', '邮箱', 'email', 'string', 'Y', '邮箱不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073728245829636, 1402073728229052417, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073728250023937, 1402073728229052417, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073728250023938, 1402073728229052417, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073728250023939, 1402073728229052417, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073683966562307, 1402073683941396481, 'request', '邮箱', 'email', 'string', 'Y', '邮箱不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073683966562315, 1402073683941396481, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073683966562316, 1402073683941396481, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073683966562317, 1402073683941396481, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073683966562318, 1402073683941396481, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073545764245516, 1401840767337689089, 'request', '邮箱或手机验证码', 'verifyCode', 'string', 'Y', '激活码不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073545764245517, 1401840767337689089, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073545764245518, 1401840767337689089, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073545764245519, 1401840767337689089, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073545768439809, 1401840767337689089, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073494031699972, 1401840751835541505, 'request', '昵称', 'nickName', 'string', 'Y', '昵称（显示名称）不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073494031699973, 1401840751835541505, 'request', '账号', 'account', 'string', 'Y', '账号不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073494031699974, 1401840751835541505, 'request', '密码', 'password', 'string', 'Y', '密码，BCrypt不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073494031699978, 1401840751835541505, 'request', '邮箱', 'email', 'string', 'Y', '邮箱不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073494031699981, 1401840751835541505, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073494031699982, 1401840751835541505, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073494031699983, 1401840751835541505, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073494031699984, 1401840751835541505, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402074659876245507, 1402074659867856898, 'request', '主键id', 'customerId', 'string', 'Y', '主键id不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402074659876245518, 1402074659867856898, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402074659880439809, 1402074659867856898, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402074659880439810, 1402074659867856898, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402074659880439811, 1402074659867856898, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073607345016836, 1401840787965276162, 'request', '账号', 'account', 'string', 'Y', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073607345016839, 1401840787965276162, 'request', '密码', 'password', 'string', 'Y', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073607345016841, 1401840787965276162, 'response', NULL, 'data', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073607345016842, 1401840787965276162, 'response', NULL, 'message', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073607345016843, 1401840787965276162, 'response', NULL, 'success', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1402073607345016844, 1401840787965276162, 'response', NULL, 'code', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405791882202775554, 1405791882135666690, 'request', NULL, 'token', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405791882202775555, 1405791882135666690, 'response', NULL, 'message', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405791882202775556, 1405791882135666690, 'response', NULL, 'success', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405791882202775557, 1405791882135666690, 'response', NULL, 'data', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405791882202775558, 1405791882135666690, 'response', NULL, 'code', 'string', 'N', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823399977263110, 1405821040807002114, 'request', '主键id', 'customerId', 'string', 'Y', '主键id不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823399985651721, 1405821040807002114, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823399985651722, 1405821040807002114, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823399985651723, 1405821040807002114, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823399985651724, 1405821040807002114, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823441484095489, 1405821024314998786, 'request', NULL, 'customerId', 'string', 'Y', '用户id不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823441484095490, 1405821024314998786, 'request', NULL, 'newPassword', 'string', 'Y', '新密码不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823441484095492, 1405821024314998786, 'request', NULL, 'oldPassword', 'string', 'Y', '原密码不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823441484095493, 1405821024314998786, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823441484095494, 1405821024314998786, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823441484095495, 1405821024314998786, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823441484095496, 1405821024314998786, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823465794281474, 1405821056158154754, 'request', NULL, 'customerId', 'string', 'Y', '用户id不能为空', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823465794281476, 1405821056158154754, 'request', NULL, 'avatar', 'string', 'Y', '用户头像', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823465794281478, 1405821056158154754, 'response', NULL, 'message', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823465794281479, 1405821056158154754, 'response', NULL, 'data', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823465794281480, 1405821056158154754, 'response', NULL, 'success', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `api_resource_field` VALUES (1405823465794281481, 1405821056158154754, 'response', NULL, 'code', 'string', 'N', '', NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for hr_organization
-- ----------------------------
CREATE TABLE `hr_organization`  (
  `org_id` bigint(20) NOT NULL COMMENT '主键',
  `org_parent_id` bigint(20) NOT NULL COMMENT '父id，一级节点父id是0',
  `org_pids` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '父ids',
  `org_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '组织名称',
  `org_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '组织编码',
  `org_sort` decimal(10, 2) NOT NULL COMMENT '排序',
  `status_flag` tinyint(4) NOT NULL COMMENT '状态：1-启用，2-禁用',
  `org_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '删除标记：Y-已删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`org_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '组织机构信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hr_organization
-- ----------------------------
INSERT INTO `hr_organization` VALUES (1339554696976781407, -1, '[-1],', 'Guns总公司', 'guns_level_one', 1.00, 1, NULL, 'N', NULL, NULL, NULL, NULL);
INSERT INTO `hr_organization` VALUES (1339554696976781408, 1339554696976781407, '[-1],[1339554696976781407],', '北京分公司', 'guns_beijing', 2.00, 1, NULL, 'N', NULL, NULL, NULL, NULL);
INSERT INTO `hr_organization` VALUES (1339554696976781409, 1339554696976781408, '[-1],[1339554696976781407],[1339554696976781408],', '北京东直门分公司', 'guns_beijing_dongzhimen', 3.00, 1, NULL, 'N', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for hr_position
-- ----------------------------
CREATE TABLE `hr_position`  (
  `position_id` bigint(20) NOT NULL COMMENT '主键',
  `position_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '职位名称',
  `position_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '职位编码',
  `position_sort` decimal(10, 2) NOT NULL COMMENT '排序',
  `status_flag` tinyint(4) NOT NULL DEFAULT 0 COMMENT '状态：1-启用，2-禁用',
  `position_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '删除标记：Y-已删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`position_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '职位信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hr_position
-- ----------------------------
INSERT INTO `hr_position` VALUES (1339554696976781332, '总监', 'zg', 1.00, 1, '', 'N', '2020-12-16 13:35:58', -1, NULL, NULL);
INSERT INTO `hr_position` VALUES (1339554696976781333, '总经理', 'zjl', 2.00, 1, '', 'N', '2020-12-17 19:21:47', -1, '2020-12-17 20:45:43', -1);
INSERT INTO `hr_position` VALUES (1339554696976781334, '董事长', 'dsz', 3.00, 1, '', 'N', '2020-12-17 20:02:16', -1, NULL, NULL);

-- ----------------------------
-- Table structure for sys_app
-- ----------------------------
CREATE TABLE `sys_app`  (
  `app_id` bigint(20) NOT NULL COMMENT '主键id',
  `app_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '应用名称',
  `app_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '编码',
  `active_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '是否默认激活：Y-是，N-否，激活的应用下的菜单会在首页默认展开',
  `status_flag` tinyint(4) NOT NULL COMMENT '状态：1-启用，2-禁用',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '是否删除：Y-已删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`app_id`) USING BTREE,
  UNIQUE INDEX `APP_CODE_UNIQUE`(`app_code`) USING BTREE COMMENT 'app编码唯一'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '系统应用' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_app
-- ----------------------------
INSERT INTO `sys_app` VALUES (1265476890672672821, '系统应用', 'system', 'Y', 1, 'N', '2020-03-25 19:07:00', 1265476890672672808, '2021-01-08 20:51:51', 1339550467939639299);

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
CREATE TABLE `sys_config`  (
  `config_id` bigint(20) NOT NULL COMMENT '主键',
  `config_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `config_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '属性编码',
  `config_value` varchar(3500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '属性值',
  `sys_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'Y' COMMENT '是否是系统参数：Y-是，N-否',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '备注',
  `status_flag` tinyint(4) NULL DEFAULT 1 COMMENT '状态：1-正常，2-停用',
  `group_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '常量所属分类的编码，来自于“常量的分类”字典',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否删除：Y-被删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`config_id`) USING BTREE,
  UNIQUE INDEX `code_unique`(`config_code`) USING BTREE COMMENT '配置编码唯一索引'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '参数配置' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, '系统配置是否已经初始化的标识', 'SYS_CONFIG_INIT_FLAG', 'false', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (2, 'JWT安全码', 'SYS_JWT_SECRET', '1928374650abcdef', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (3, 'JWT过期时间', 'SYS_JWT_TIMEOUT_SECONDS', '259200', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (4, 'Linux本地文件保存路径', 'SYS_LOCAL_FILE_SAVE_PATH_LINUX', '/tmp/tempFilePath', 'Y', NULL, 1, 'file_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (5, 'Windows本地文件保存路径', 'SYS_LOCAL_FILE_SAVE_PATH_WINDOWS', 'D:\\tempFilePath', 'Y', NULL, 1, 'file_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (6, '不需要过滤的url', 'SYS_NONE_SECURITY_URLS', '/assets/**,/login,/swagger-ui.html,/favicon.ico,/swagger-ui/**,', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (8, 'session过期时间', 'SYS_SESSION_EXPIRED_SECONDS', '3600', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (9, '账号单端登录限制', 'SYS_SINGLE_ACCOUNT_LOGIN_FLAG', 'false', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (10, '携带token的header头的名称', 'SYS_AUTH_HEADER_NAME', 'Authorization', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (11, '携带token的param传参的名称', 'SYS_AUTH_PARAM_NAME', 'token', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (12, '系统默认密码', 'SYS_DEFAULT_PASSWORD', '123456', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (14, '会话保存在cookie中时，cooke的name', 'SYS_SESSION_COOKIE_NAME', 'Authorization', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (15, 'beetl自动检查资源', 'RESOURCE_AUTO_CHECK', 'true', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (21, '系统发布版本', 'SYS_RELEASE_VERSION', '20210101', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (22, '多租户开关', 'SYS_TENANT_OPEN', 'false', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (23, '验证码开关', 'SYS_CAPTCHA_OPEN', 'false', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (24, '系统名称', 'SYS_SYSTEM_NAME', 'Guns快速开发平台', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (25, 'Beetl默认边界符开始', 'DELIMITER_STATEMENT_START', '@', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (26, 'Beetl边界符的结束', 'DELIMITER_STATEMENT_END', 'null', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (27, '自定义标签文件Root目录', 'RESOURCE_TAG_ROOT', 'common/tags', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (28, '自定义标签文件后缀', 'RESOURCE_TAG_SUFFIX', 'tag', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (29, '获取文件生成auth url的失效时间', 'SYS_DEFAULT_FILE_TIMEOUT_SECONDS', '3600', 'Y', NULL, 1, 'file_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (30, '服务默认部署的环境地址', 'SYS_SERVER_DEPLOY_HOST', 'http://localhost:8080', 'Y', NULL, 1, 'file_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (31, '系统默认头像Base64', 'SYS_DEFAULT_AVATAR_BASE64', 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAIBUlEQVR4Xu2dW2wUVRjH/7Ntt3dqse2WS0VNtwaM8aEFVEqEhAQflAehErxAvAZJ0Ghotw8++sC2jRpMhBg1AU2IVNAIGogkYChRgT4YRANTEFIlu9tCLbRdej1mtm4t3bZnZrtnZg7nmxdoOvNd/v/ffnN2OrujgTalFdCU7p6aBwGgOAQEAAGguAKKt08TgABQXAHF26cJQAAoroDi7dMEIAAUV0Dx9mkCEACKK6B4+zQBCADFFVC8fZoABIDiCijePk0AAkBxBRRvnyYAAaC4Aoq3TxOAAFBcAcXbpwlAACiugOLt0wQgAMwrECj1N4JhGzQ0BUN6rfkjaU/RCgR8/q0Adlj1xvQEqCvxP61p2B9vhDGsbYjoB0Q3RvH5CtSX+DczDTuT8cY0AAGf/xiAFePKOR4M6yv55dEeohWYiTcEgGh3bIhvFwCnACwe60djrcFQW5UN/VEKjgKB0vIzYFplMt6YmgD1peU1jGn7EupgqA1G9CZyyDkFAiV+Y1HemKw3XADqSspf0DRtz5QtjmjLgx0XWpyTQN3MgeKKanjYiZl4wwUgUOo/AYbqwtJBrNzQhSVPduPsj3k4+FExbnSmQwM7uT3cVq2uDc51Xu8rb2HQls0qGsJTWzrw0OM9lr3hA+DzRwAUV66+gZq68Fi3u9+Ziz9+yjV+7gyG9WLnZFA3c8Dn7wBQtPDRXmx692pS3pgBgBmRV228hlWbro8l+aqxBGcOF4z+zEaWqWuDg51rnpNG9qonurGu1nidjm5Hd8/G0T13x/4fDOvTepw0AM0NJWg98h8ADmpAqYHK1d2oqSMAlGXBcQBqSmkSOEFfc6g7ltZxADbMLUBZltcJDZTN2X5rAHuvEgAEgBsmwEtvdeE+/6CyZjjR+J96Bj57v9Adp4DX3vsL9z8cdUIHZXNe+jUbH7893x0A0ASwn0NXTQBaBNoPAC0C7dfcVRkJAFfZYX8xBID9mrsqIwHgKjvsL4YAsF9zV2UkAFxlh/3FEAD2a+6qjASAq+ywvxhpAUgr60P+m7/DUzBgXjXjniQN6P+5GL2f+hOOy6yOIHfjRUCL3bxkabt1eB769i9IOMZbdQ25z16Clm/xbxzDGvpPF01a5/gkOeuuwFvZiZ5PKjB0Md9SzcbO0gKQ8UA38reds9ywccDA2UL07FiYcGzui23IfOz/O2KsBJ8qpveRDuS9rFsJNbbvVDHHBzM0MLSIHixD9Nsyy3mkBcDoNK2sF56cIdNN56y/HDsm+v18RL++J+G47DXtyH6qHcPtuej78l5TcXkxtcxhpM2JwvjX7MaLSQCYVXLCfrxXSxyAwfMFuNn0oKksvJimgliskwBIRlUgdsqYblwSAA7fFCr6r4EEQOIrR+o1gNVBQAAQAHQKmMAATYBxgtAaQLI1gHdxJ9igB4immTobZK+/jHQTbwNT+S7AkzeE9EX/gA2krk56FwAg57lLyFoRMmX8xJ0Gz92Fmx8smvI6QCoByHv1ArxLOlNaJwEAID6uLSurAdFDZYh+k3jVTMQpwLgKaFwNtLwNa4h+Nz92hW+6jbew5eWVdg2QjFk8MZKJyTMgmZi8OmkCjJsAVsY1T9hkzCIARlVNycfDrVwISsYsAuAOug5AAIyayZtAPOhpDSD4OoAIUGkNQGuAMQZoAlj40y1vHCbzauUZkExMXp00AeITYE07WG86htpj3zJmeus/XoqBM6NffjR+i5vF+szHNK4sajlDGGgtQs+uioSYea/o8C7tgJWYRpCRzkwM/lY4aZ0EgLH4qT2HjIrRb7awuk11+9RMYg5eKMDNxsSbSGYS08xtXrwJxNNG2kWg0VjelvOxa+wjkSxen7f9fuj8LBjXDybbjJgY9GA4bC5m2rw+II2h/4c5k8bMWnUVGQu7wYY8GP47x3SdI13eWF9T1RkPZFxm1rzD6G/xmY49fkepAUiqYzroNgUIAMWBIAAIAPqWMJUZoAmgsvsyfzJIcd9S1j5NgJRJKWcgAkBO31JWtasAeH5pOhbM9qSsOQrEV+DK9RF88cvo5ysd/7Jo+qZQvmGp3sNV3xRKAKTaXn48VwFApwC+Yanew1WnACv3BKZaCFXjuWoRSADYj6GrAKBHxtgPgJHRNY+McaZ9yhpXwPG3gWSFswo4AgA9ONJZ02PZbXpwJD061gVeT1ZCYIrH+jY3+NB6ZJZxSEcwrJdMVz7/o2H08GiX2g9M9mDvU4cKcGxvIbpCGcYH/1qCIX35jACgx8e71n/wvGGMbWyItH0+IwCMg+tLy2sY0/YlBGKoDUb0JvdKdOdXNpU3msae2R5qa+YpwD0FxAMEfP5TABaPBdRYazDUVsVLQL8Xr0CCN8DpYFhfYiazFQCOAVgxLujxYFhfaSYJ7SNWgYDPn7Q3BIBYb2yJbgsA9SX+zUzDznhHGsPr2yP6Lls6pCTTKjDRG8awtiGiHzAjm+kJYAQL+PxbAewA8EYwrH9oJgHtY48CY95oaAqG9FqzWS0BYDYo7SePAgSAPF4JqZQAECKrPEEJAHm8ElIpASBEVnmCEgDyeCWkUgJAiKzyBCUA5PFKSKUEgBBZ5QlKAMjjlZBKCQAhssoTlACQxyshlRIAQmSVJygBII9XQiolAITIKk9QAkAer4RUSgAIkVWeoASAPF4JqZQAECKrPEEJAHm8ElIpASBEVnmCEgDyeCWkUgJAiKzyBCUA5PFKSKUEgBBZ5QlKAMjjlZBK/wWoX5T5KOBLqgAAAABJRU5ErkJggg==', 'Y', NULL, 1, 'file_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (32, '用于auth模块权限校验的jwt失效时间', 'SYS_AUTH_JWT_TIMEOUT_SECONDS', '604800', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (33, 'Druid监控界面的url映射', 'SYS_DRUID_URL_MAPPINGS', '/druid/*', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (34, 'Druid控制台账号', 'SYS_DRUID_ACCOUNT', 'admin', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (35, 'Druid控制台账号密码', 'SYS_DRUID_PASSWORD', '123456', 'Y', '默认是空串，为空会让程序自动创建一个随机密码', 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (36, 'Druid控制台的监控数据是否可以重置清零', 'SYS_DRUID_RESET_ENABLE', 'false', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (37, 'druid web url统计的拦截范围', 'SYS_DRUID_WEB_STAT_FILTER_URL_PATTERN', '/*', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (38, 'druid web url统计的排除拦截表达式', 'SYS_DRUID_WEB_STAT_FILTER_EXCLUSIONS', '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (39, 'druid web url统计的session统计开关', 'SYS_DRUID_WEB_STAT_FILTER_SESSION_STAT_ENABLE', 'false', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (40, 'druid web url统计的session名称', 'SYS_DRUID_WEB_STAT_FILTER_PRINCIPAL_SESSION_NAME', 'Authorization', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (41, 'druid web url统计的session最大监控数', 'SYS_DRUID_WEB_STAT_FILTER_SESSION_STAT_MAX_COUNT', '1000', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (42, 'druid web url统计的cookie名称', 'SYS_DRUID_WEB_STAT_FILTER_PRINCIPAL_COOKIE_NAME', 'Authorization', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (43, 'druid web url统计的是否开启监控单个url调用的sql列表', 'SYS_DRUID_WEB_STAT_FILTER_PROFILE_ENABLE', 'true', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (44, '阿里云短信的accessKeyId', 'SYS_ALIYUN_SMS_ACCESS_KEY_ID', '你的accessKeyId', 'Y', NULL, 1, 'sms_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (45, '阿里云短信的accessKeySecret', 'SYS_ALIYUN_SMS_ACCESS_KEY_SECRET', '你的secret', 'Y', NULL, 1, 'sms_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (46, '阿里云短信的签名', 'SYS_ALIYUN_SMS_SIGN_NAME', '签名名称', 'Y', NULL, 1, 'sms_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1350666094452482049, '获取XSS排除过滤的url范围', 'SYS_XSS_URL_EXCLUSIONS', '/sysNotice/add,/sysNotice/edit,/databaseInfo/add,/apiResource/record', 'Y', '', 1, 'sys_config', 'N', '2021-01-17 12:47:46', 1339550467939639299, '2021-03-04 22:14:14', 1339550467939639299);
INSERT INTO `sys_config` VALUES (1350666483050553346, 'beetl自定义支持HTML标签', 'HTML_TAG_FLAG', 'tag:', 'Y', '', 1, 'sys_config', 'N', '2021-01-17 12:49:18', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1356246056131649538, 'websocket的ws-url', 'WEB_SOCKET_WS_URL', 'ws://localhost:8080/webSocket/{token}', 'Y', '', 1, 'sys_config', 'N', '2021-02-01 22:20:32', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1367118984192843778, '邮件是否启用账号密码验证', 'SYS_EMAIL_ENABLE_AUTH', 'true', 'N', '', 1, 'java_mail_config', 'N', '2021-03-03 22:25:40', 1339550467939639299, '2021-03-03 22:25:43', 1339550467939639299);
INSERT INTO `sys_config` VALUES (1367119064924807169, '邮箱的账号', 'SYS_EMAIL_ACCOUNT', 'xxx@126.com', 'N', '', 1, 'java_mail_config', 'N', '2021-03-03 22:26:00', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1367119226749444098, '邮箱的密码或者授权码', 'SYS_EMAIL_PASSWORD', 'xxx', 'N', '', 1, 'java_mail_config', 'N', '2021-03-03 22:26:38', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1367119286195314689, '邮箱的发送方邮箱', 'SYS_EMAIL_SEND_FROM', 'xxx@126.com', 'Y', '', 1, 'java_mail_config', 'N', '2021-03-03 22:26:52', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1367119399810621441, '是否开启tls', 'SYS_EMAIL_START_TLS_ENABLE', 'true', 'N', '使用 STARTTLS安全连接，STARTTLS是对纯文本通信协议的扩展。它将纯文本连接升级为加密连接（TLS或SSL）， 而不是使用一个单独的加密通信端口。', 1, 'java_mail_config', 'N', '2021-03-03 22:27:19', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1367119457260003329, 'SSL安全连接', 'SYS_EMAIL_TLS_ENABLE', 'true', 'N', '', 1, 'java_mail_config', 'N', '2021-03-03 22:27:33', 1339550467939639299, '2021-03-03 22:28:33', 1339550467939639299);
INSERT INTO `sys_config` VALUES (1367119505888763905, '指定的端口连接到在使用指定的套接字工厂', 'SYS_EMAIL_SOCKET_FACTORY_PORT', '465', 'Y', '', 1, 'java_mail_config', 'N', '2021-03-03 22:27:45', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1367119568455196674, 'SMTP超时时长，单位毫秒', 'SYS_EMAIL_SMTP_TIMEOUT', '10000', 'N', '', 1, 'java_mail_config', 'N', '2021-03-03 22:28:00', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1367119662306942977, 'Socket连接超时值，单位毫秒，缺省值不超时', 'SYS_EMAIL_CONNECTION_TIMEOUT', '10000', 'N', 'Socket连接超时值，单位毫秒，缺省值不超时', 1, 'java_mail_config', 'N', '2021-03-03 22:28:22', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610114, 'smtp服务器地址', 'SYS_EMAIL_SMTP_HOST', 'smtp.126.com', 'N', NULL, 1, 'java_mail_config', 'N', '2021-06-09 16:55:01', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610125, '拖拽验证码开关', 'SYS_DRAG_CAPTCHA_OPEN', 'false', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610115, 'smtp服务端口', 'SYS_EMAIL_SMTP_PORT', '465', 'Y', NULL, 1, 'java_mail_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1350666094452482050, '获取XSS过滤的url范围', 'SYS_XSS_URL_INCLUDES', '/*', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (47, '短信发送验证码失效时间', 'SYS_SMS_VALIDATE_EXPIRED_SECONDS', '300', 'Y', NULL, 1, 'sms_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610200, 'auth认证用的jwt秘钥，用于校验登录token', 'SYS_AUTH_JWT_SECRET', 'hxim2q05g6wg6llsp24z', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610205, '解析sso传过来的token', 'SYS_AUTH_SSO_JWT_SECRET', 'aabbccdd', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610210, '解析sso加密的数据的秘钥，解密sso单点中jwt中payload的秘钥', 'SYS_AUTH_SSO_DECRYPT_DATA_SECRET', 'EDPpR/BQfEFJiXKgxN8Uno4OnNMGcIJW1F777yySCPA=', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610215, '获取是否开启sso远程会话校验', 'SYS_AUTH_SSO_SESSION_VALIDATE_SWITCH', 'false', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610220, 'sso会话校验，redis的host', 'SYS_AUTH_SSO_SESSION_VALIDATE_REDIS_HOST', 'localhost', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610225, 'sso会话校验，redis的port', 'SYS_AUTH_SSO_SESSION_VALIDATE_REDIS_PORT', '6379', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610230, 'sso会话校验，redis的密码', 'SYS_AUTH_SSO_SESSION_VALIDATE_REDIS_PASSWORD', '', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610235, 'sso会话校验，redis的数据库序号', 'SYS_AUTH_SSO_SESSION_VALIDATE_REDIS_DB_INDEX', '2', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610240, 'sso会话校验，redis的缓存前缀', 'SYS_AUTH_SSO_SESSION_VALIDATE_REDIS_CACHE_PREFIX', 'CA:USER:TOKEN:', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610245, 'sso服务器地址', 'SYS_AUTH_SSO_HOST', 'http://localhost:8888', 'Y', NULL, 1, 'auth_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610300, 'C端用户，注册邮件标题', 'CUSTOMER_REG_EMAIL_TITLE', '用户注册', 'Y', NULL, 1, 'customer_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610305, '获取注册邮件的内容模板', 'CUSTOMER_REG_EMAIL_CONTENT', '感谢您注册Guns官方论坛，请点击此激活链接激活您的账户：<a href=\"http://localhost:8080/customer/active?verifyCode={}\">http://localhost:8080/customer/active?verifyCode={} </a>', 'Y', NULL, 1, 'customer_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610310, '获取重置密码的邮件标题', 'CUSTOMER_RESET_PWD_EMAIL_TITLE', '用户校验', 'Y', NULL, 1, 'customer_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610315, '获取重置密码的邮件内容', 'CUSTOMER_RESET_PWD_EMAIL_CONTENT', '您的验证码是【{}】，此验证码用于修改登录密码，请不要泄露给他人，如果不是您本人操作，请忽略此邮件。', 'Y', NULL, 1, 'customer_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610320, '存放用户头像的bucket的名称', 'CUSTOMER_FILE_BUCKET', 'customer-bucket', 'Y', NULL, 1, 'customer_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610325, '存放用户头像的bucket的名称的过期时间', 'CUSTOMER_FILE_BUCKET_EXPIRED_SECONDS', '600', 'Y', NULL, 1, 'customer_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610330, '获取c端用户缓存的过期时间，用在加快获取速度', 'CUSTOMER_CACHE_EXPIRED_SECONDS', '3600', 'Y', NULL, 1, 'customer_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610335, '是否开启旧版密码校验', 'CUSTOMER_OPEN_OLD_PASSWORD_VALIDATE', 'false', 'Y', NULL, 1, 'customer_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610400, '是否开启demo演示', 'SYS_DEMO_ENV_FLAG', 'false', 'Y', NULL, 1, 'sys_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610405, '默认存储文件的bucket名称', 'SYS_FILE_DEFAULT_BUCKET', 'defaultBucket', 'Y', NULL, 1, 'file_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610410, '用于专门给文件鉴权用的jwt的密钥', 'SYS_DEFAULT_FILE_AUTH_JWT_SECRET', 'hxim2q05g6wg6llsp245', 'Y', NULL, 1, 'file_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610415, '日志记录的文件存储的位置（windows服务器）', 'SYS_LOG_FILE_SAVE_PATH_WINDOWS', 'd:/logfiles', 'Y', NULL, 1, 'file_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610420, '日志记录的文件存储的位置（linux和mac服务器）', 'SYS_LOG_FILE_SAVE_PATH_LINUX', '/tmp/logfiles', 'Y', NULL, 1, 'file_config', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_config` VALUES (1402549781675610500, 'AES秘钥，用在数据库数据加密', 'SYS_ENCRYPT_SECRET_KEY', 'Ux1dqQ22KxVjSYootgzMe776em8vWEGE', 'Y', NULL, 1, 'security_config', 'N', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_database_info
-- ----------------------------
CREATE TABLE `sys_database_info`  (
  `db_id` bigint(20) NOT NULL COMMENT '主键',
  `db_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '数据库名称（英文名称）',
  `jdbc_driver` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'jdbc的驱动类型',
  `jdbc_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'jdbc的url',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '数据库连接的账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '数据库连接密码',
  `schema_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '数据库的schema名称，每种数据库的schema意义都不同',
  `status_flag` tinyint(4) NULL DEFAULT NULL COMMENT '数据源状态：1-正常，2-无法连接',
  `error_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '连接失败原因',
  `remarks` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '备注，摘要',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否删除，Y-被删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`db_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '多数据源信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_database_info
-- ----------------------------
INSERT INTO `sys_database_info` VALUES (1399383361507803138, 'master', 'com.mysql.cj.jdbc.Driver', 'jdbc:mysql://localhost:3306/guns?autoReconnect=true&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=CONVERT_TO_NULL&useSSL=false&serverTimezone=CTT&nullCatalogMeansCurrent=true', 'root', '123456', NULL, 1, NULL, '主数据源，项目启动数据源！', 'N', '2021-05-31 23:12:47', NULL, '2021-05-31 23:13:00', -1);

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
CREATE TABLE `sys_dict`  (
  `dict_id` bigint(20) NOT NULL COMMENT '字典id',
  `dict_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典编码',
  `dict_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典名称',
  `dict_name_pinyin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字典名称首字母',
  `dict_encode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字典编码',
  `dict_type_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字典类型的编码',
  `dict_short_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字典简称',
  `dict_short_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字典简称的编码',
  `dict_parent_id` bigint(20) NOT NULL COMMENT '上级字典的id(如果没有上级字典id，则为-1)',
  `status_flag` tinyint(4) NOT NULL COMMENT '状态：(1-启用,2-禁用),参考 StatusEnum',
  `dict_sort` decimal(10, 2) NULL DEFAULT NULL COMMENT '排序，带小数点',
  `dict_pids` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '父id集合',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否删除，Y-被删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建用户id',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改用户id',
  PRIMARY KEY (`dict_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '字典' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES (1348235720908619802, 'M', '男', 'n', 'male', 'sex', NULL, NULL, -1, 1, 1.00, '[-1],', 'N', '2021-01-14 14:46:13', NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1348235720908619803, 'F', '女', 'n', 'female', 'sex', NULL, NULL, -1, 1, 2.00, '[-1],', 'N', '2021-01-14 14:46:13', NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1348235720908619804, '1', '启用', 'n', 'male', 'user_status', NULL, NULL, -1, 1, 1.00, '[-1],', 'N', '2021-01-14 14:46:13', NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1348235720908619805, '2', '禁用', 'n', 'female', 'user_status', NULL, NULL, -1, 1, 2.00, '[-1],', 'N', '2021-01-14 14:46:13', NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1348235720908619806, '3', '冻结', 'n', 'female', 'user_status', NULL, NULL, -1, 1, 2.00, '[-1],', 'N', '2021-01-14 14:46:13', NULL, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1350457799368257537, 'low', '低', 'd', NULL, 'priority_level', '低', '', -1, 1, 1.00, '-1', 'N', '2021-01-16 23:00:04', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1350457870780477442, 'middle', '中', 'z', NULL, 'priority_level', '中', '', -1, 1, 2.00, '-1', 'N', '2021-01-16 23:00:21', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1350457950417727489, 'high', '高', 'g', NULL, 'priority_level', '高', '', -1, 1, 3.00, '-1', 'N', '2021-01-16 23:00:40', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1353547360691851266, 'sys_config', '系统配置', 'xtpz', NULL, 'config_group', '', '', -1, 1, 1.00, '-1', 'N', '2021-01-25 11:36:53', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1353547405457657857, 'file_config', '文件配置', 'wjpz', NULL, 'config_group', '', '', -1, 1, 2.00, '-1', 'N', '2021-01-25 11:37:04', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1353547460558229506, 'auth_config', '鉴权配置', 'jqpz', NULL, 'config_group', '', '', -1, 1, 3.00, '-1', 'N', '2021-01-25 11:37:17', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1353547539293704194, 'sms_config', '短信配置', 'dxpz', NULL, 'config_group', '', '', -1, 1, 4.00, '-1', 'N', '2021-01-25 11:37:36', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1353998066804658177, 'chinese', '中文', 'zw', NULL, 'languages', '', '', -1, 1, 1.00, '-1', 'N', '2021-01-26 17:27:50', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1353998106784763906, 'english', 'english', 'yw', NULL, 'languages', '', '', -1, 1, 2.00, '-1', 'N', '2021-01-26 17:27:59', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1354040749627662337, 'role_system', '系统角色', 'xtjs', NULL, 'role_type', '', '', -1, 1, 1.00, '-1', 'N', '2021-01-26 20:17:26', 1339550467939639299, '2021-01-26 20:19:56', 1339550467939639299);
INSERT INTO `sys_dict` VALUES (1354040819219554305, 'role_c', 'C端角色', 'Cdjs', NULL, 'role_type', '', '', -1, 1, 2.00, '-1', 'N', '2021-01-26 20:17:43', 1339550467939639299, '2021-01-26 20:19:43', 1339550467939639299);
INSERT INTO `sys_dict` VALUES (1354041049981771778, 'role_b', 'B端角色', 'Bdjs', NULL, 'role_type', '', '', -1, 1, 3.00, '-1', 'N', '2021-01-26 20:18:38', 1339550467939639299, '2021-01-26 20:19:50', 1339550467939639299);
INSERT INTO `sys_dict` VALUES (1365251792270045186, 'Y', '是', 's', NULL, 'yn', NULL, NULL, -1, 1, 1.00, '[-1],', 'N', '2021-02-26 18:46:07', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1365251827812577282, 'N', '否', 'f', NULL, 'yn', NULL, NULL, -1, 1, 2.00, '[-1],', 'N', '2021-02-26 18:46:16', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1365252384094728193, 'com.mysql.cj.jdbc.Driver', 'com.mysql.cj.jdbc.Driver', 'com.mysql.cj.jdbc.Driver', NULL, 'jdbc_type', NULL, NULL, -1, 1, 1.00, '[-1],', 'N', '2021-02-26 18:48:28', 1339550467939639299, '2021-02-26 18:53:48', 1339550467939639299);
INSERT INTO `sys_dict` VALUES (1402549554864427010, 'java_mail_config', 'java邮件配置', 'javayjpz', NULL, 'config_group', NULL, NULL, -1, 1, 50.00, '[-1],', 'N', '2021-06-09 16:54:07', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict` VALUES (1402549554864427020, 'customer_config', 'C端用户配置', 'cdyhpz', NULL, 'config_group', NULL, NULL, -1, 1, 60.00, '[-1],', 'N', '2021-07-07 16:54:07', 1339550467939639299, NULL, NULL);

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
CREATE TABLE `sys_dict_type`  (
  `dict_type_id` bigint(20) NOT NULL COMMENT '字典类型id',
  `dict_type_class` int(11) NULL DEFAULT NULL COMMENT '字典类型： 1-业务类型，2-系统类型，参考 DictTypeClassEnum',
  `dict_type_bus_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字典类型业务编码',
  `dict_type_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字典类型编码',
  `dict_type_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字典类型名称',
  `dict_type_name_pinyin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字典类型名称首字母拼音',
  `dict_type_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '字典类型描述',
  `status_flag` tinyint(4) NULL DEFAULT NULL COMMENT '字典类型的状态：1-启用，2-禁用，参考 StatusEnum',
  `dict_type_sort` decimal(10, 2) NULL DEFAULT NULL COMMENT '排序，带小数点',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否删除：Y-被删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建用户id',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改用户id',
  PRIMARY KEY (`dict_type_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '字典类型' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
INSERT INTO `sys_dict_type` VALUES (1348235720908619811, 1, 'base', 'sex', '性别', 'xb', NULL, 1, 1.00, 'N', '2021-01-14 14:47:32', NULL, NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (1348235720908619812, 2, 'system', 'user_status', '用户状态', 'yhzt', NULL, 1, 2.00, 'N', '2021-01-14 14:47:32', NULL, NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (1350457656690618370, 1, 'notice', 'priority_level', '优先级', 'yxj', '', 1, 5.00, 'N', '2021-01-16 22:59:30', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (1353547215422132226, 2, '', 'config_group', '系统配置分组', 'xtpzfz', '系统配置分组', 1, 6.00, 'N', '2021-01-25 11:36:19', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (1353997993299480577, 2, '', 'languages', '语种', 'yz', 'i18n 多语言', 1, 7.00, 'N', '2021-01-26 17:27:32', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (1354040335406587906, 2, '', 'role_type', '角色类型', 'jslx', '', 1, 8.00, 'N', '2021-01-26 20:15:47', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (1365251549365317633, 1, NULL, 'yn', 'yn', 'yn', NULL, 1, 7.00, 'N', '2021-02-26 18:45:09', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (1365252142779641858, 1, NULL, 'jdbc_type', 'jdbc_type', 'jdbc_type', NULL, 1, 8.00, 'N', '2021-02-26 18:47:31', 1339550467939639299, NULL, NULL);

-- ----------------------------
-- Table structure for sys_file_info
-- ----------------------------
CREATE TABLE `sys_file_info`  (
  `file_id` bigint(20) NOT NULL COMMENT '文件主键id',
  `file_code` bigint(20) NOT NULL COMMENT '文件编码，本号升级的依据，解决一个文件多个版本问题，多次上传文件编码不变',
  `file_version` int(11) NOT NULL DEFAULT 1 COMMENT '文件版本，从1开始',
  `file_status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '当前状态：0-历史版,1-最新版',
  `file_location` tinyint(4) NOT NULL COMMENT '文件存储位置：1-阿里云，2-腾讯云，3-minio，4-本地',
  `file_bucket` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文件仓库（文件夹）',
  `file_origin_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文件名称（上传时候的文件全名）',
  `file_suffix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '文件后缀，例如.txt',
  `file_size_kb` bigint(20) NULL DEFAULT NULL COMMENT '文件大小kb为单位',
  `file_size_info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '文件大小信息，计算后的',
  `file_object_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '存储到bucket中的名称，主键id+.后缀',
  `file_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '存储路径',
  `secret_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '是否为机密文件，Y-是机密，N-不是机密',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否删除：Y-被删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`file_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '文件信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_file_info
-- ----------------------------
INSERT INTO `sys_file_info` VALUES (10000, -1, 1, '1', 4, 'defaultBucket', 'defaultAvatar.png', '.png', 12, '11.56 kB', '10000.png', NULL, 'Y', 'N', '2020-12-29 20:07:14', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
CREATE TABLE `sys_log`  (
  `log_id` bigint(20) NOT NULL COMMENT '主键',
  `log_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '日志的名称，一般为业务名称',
  `log_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '日志记录的内容',
  `app_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '服务名称，一般为spring.application.name',
  `request_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '当前用户请求的url',
  `request_params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'http或方法的请求参数体',
  `request_result` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'http或方法的请求结果',
  `server_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '当前服务器的ip',
  `client_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '客户端的ip',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户id',
  `http_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '请求http方法',
  `client_browser` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '客户浏览器标识',
  `client_os` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '客户操作系统',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '日志记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
CREATE TABLE `sys_login_log`  (
  `llg_id` bigint(20) NOT NULL COMMENT '主键',
  `llg_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '日志名称',
  `llg_succeed` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否执行成功',
  `llg_message` text CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '具体消息',
  `llg_ip_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录ip',
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户id',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`llg_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '登录记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
CREATE TABLE `sys_menu`  (
  `menu_id` bigint(20) NOT NULL COMMENT '主键',
  `menu_parent_id` bigint(20) NOT NULL COMMENT '父id，顶级节点的父id是-1',
  `menu_pids` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '父id集合，中括号包住，逗号分隔',
  `menu_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单的名称',
  `menu_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单的编码',
  `app_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '应用编码',
  `menu_sort` decimal(10, 2) NOT NULL DEFAULT 100.00 COMMENT '排序',
  `status_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态：1-启用，2-禁用',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `layui_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单的路径，适用于layui-beetl版本',
  `layui_icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单的图标，适用于layui-beetl版本',
  `layui_visible` char(1) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT 'Y' COMMENT '是否可见(layui版用)：Y-是，N-否',
  `antdv_router` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由地址，浏览器显示的URL，例如/menu，适用于antdvue版本',
  `antdv_icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'icon-default' COMMENT '图标，适用于antdvue版本',
  `antdv_component` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '前端组件名，适用于antdvue版本',
  `antdv_link_open_type` tinyint(4) NULL DEFAULT 0 COMMENT '外部链接打开方式：1-内置打开外链，2-新页面外链，适用于antdvue版本',
  `antdv_link_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '外部链接地址，适用于antdvue版本',
  `antdv_uid_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用于非菜单显示页面的重定向url设置',
  `antdv_visible` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Y' COMMENT '是否可见(分离版用)：Y-是，N-否',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否删除：Y-被删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '系统菜单' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1339550467939639301, -1, '[-1],', '主控面板', 'blackboard', 'system', 10.00, 1, NULL, '', 'layui-icon-theme', 'Y', '/dashboard', 'home-outlined', NULL, NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-01-08 20:52:34', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639302, 1339550467939639301, '[-1],[1339550467939639301],', '工作台', 'board_platform', 'system', 10.10, 1, NULL, '/view/dashboard/workplace', 'layui-icon-rate-solid', 'Y', '/dashboard/workplace', 'desktop-outlined', '/dashboard/workplace', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', 1339550467939639299, '2021-01-08 20:52:34', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639303, 1339550467939639301, '[-1],[1339550467939639301],', '分析页', 'board_analyse', 'system', 10.20, 1, NULL, '/view/dashboard/analysis', NULL, 'Y', '/dashboard/analysis', 'bar-chart-outlined', '/dashboard/analysis', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-01-08 20:52:34', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639304, -1, '[-1],', '系统用户', 'user_role', 'system', 20.00, 1, NULL, '#', 'layui-icon-template-1', 'Y', '/orginfo', 'setting-outlined', NULL, 0, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-05-31 21:49:59', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639305, 1339550467939639304, '[-1],[1339550467939639304],', '用户管理', 'org_user', 'system', 20.10, 1, NULL, '/view/user', NULL, 'Y', '/orginfo/user', 'team-outlined', '/orginfo/user/user', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639307, 1339550467939639304, '[-1],[1339550467939639304],', '职位管理', 'org_position', 'system', 20.20, 1, NULL, '/view/position', '', 'Y', '/orginfo/position', 'SolutionOutlined', '/orginfo/position/position', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-02-19 22:27:51', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639309, 1399362846198013953, '[-1],[1399362846198013953],', '应用管理', 'auth_app', 'system', 20.30, 1, NULL, '/view/app', '', 'Y', '/authority/app', 'AppstoreOutlined', '/orginfo/app/app', 0, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-05-31 21:55:45', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639310, 1399362846198013953, '[-1],[1399362846198013953],', '菜单管理', 'auth_menu', 'system', 20.50, 1, NULL, '/view/menu', '', 'Y', '/authority/menu', 'bars-outlined', '/orginfo/menu/menu', 0, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-05-31 21:55:56', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639311, 1399362846198013953, '[-1],[1399362846198013953],', '角色管理', 'auth_role', 'system', 20.40, 1, NULL, '/view/role', '', 'Y', '/authority/role', 'idcard-outlined', '/orginfo/role/role', 0, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-05-31 21:55:52', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639312, 1399362846198013953, '[-1],[1399362846198013953],', '资源查看', 'auth_resource', 'system', 20.60, 1, NULL, '/view/resource', '', 'Y', '/authority/resource', 'CompressOutlined', '/orginfo/resource/resource', 0, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-05-31 21:56:02', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639313, -1, '[-1],', '基础数据', 'base', 'system', 40.00, 1, NULL, '', 'layui-icon-component', 'Y', '/basedata', 'DatabaseOutlined', NULL, NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-01-08 16:47:41', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639314, 1339550467939639313, '[-1],[1339550467939639313],', '系统配置', 'base_sysconfig', 'system', 40.10, 1, NULL, '/view/config', NULL, 'Y', '/basedata/sysconfig', 'RadarChartOutlined', '/basedata/sysconfig/sysconfig', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639315, 1339550467939639313, '[-1],[1339550467939639313],', '字典管理', 'base_dict', 'system', 40.20, 1, NULL, '/view/dictType', NULL, 'Y', '/basedata/dict', 'ContainerOutlined', '/basedata/dict/dict', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639316, 1399365117052919810, '[-1],[1399365117052919810],', '在线调试', 'base_apis', 'system', 40.30, 1, NULL, '/view/api', NULL, 'Y', '/online/action', 'ApiOutlined', '/basedata/api/api', 0, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-05-31 22:02:17', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639317, -1, '[-1],', '系统功能', 'sys', 'system', 50.00, 1, NULL, '', 'layui-icon-set', 'Y', '/operation', 'ApartmentOutlined', NULL, NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-01-08 16:47:49', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639318, 1339550467939639317, '[-1],[1339550467939639317],', '文件管理', 'sys_file', 'system', 50.50, 1, NULL, '/view/file', NULL, 'Y', '/operation/file', 'FileOutlined', '/operation/file/file', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639319, 1399366927557795841, '[-1],[1399366927557795841],', '操作日志', 'operate_log', 'system', 50.10, 1, NULL, '/view/log', NULL, 'Y', '/log/operatelog', 'HistoryOutlined', '/log/operatelog/operatelog', 0, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-05-31 22:14:44', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639320, 1339550467939639317, '[-1],[1339550467939639317],', '在线用户', 'sys_online', 'system', 50.30, 1, NULL, '/view/onlineUser', NULL, 'Y', '/operation/online', 'SolutionOutlined', '/operation/online/online', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639321, 1339550467939639317, '[-1],[1339550467939639317],', '定时任务', 'sys_timer', 'system', 50.40, 1, NULL, '/view/sysTimers', NULL, 'Y', '/operation/timer', 'CalculatorOutlined', '/operation/timer/timer', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639334, 1399366927557795841, '[-1],[1399366927557795841],', '登录日志', 'login_log', 'system', 50.20, 1, NULL, '/view/loginLog', NULL, 'Y', '/log/loginlog', 'UserSwitchOutlined', '/log/loginlog/loginlog', 0, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-05-31 22:14:54', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639335, 1339550467939639317, '[-1],[1339550467939639317],', '多数据源', 'datasources', 'system', 50.60, 1, NULL, '/view/datasource', 'layui-icon-star-fill', 'Y', '/operation/datasource', 'ContainerOutlined', '/operation/datasource/datasource', 0, NULL, NULL, 'Y', 'N', '2021-01-23 21:08:22', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639336, 1339550467939639317, '[-1],[1339550467939639317],', '多语言配置', 'languages', 'system', 50.70, 1, NULL, '/view/i18n', 'layui-icon-star-fill', 'Y', '/operation/language', 'FileWordOutlined', '/operation/language/language', 0, NULL, NULL, 'N', 'N', '2021-01-23 21:17:23', 1339550467939639299, '2021-01-25 21:59:08', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639350, -1, '[-1],', '通知管理', 'notice', 'system', 60.00, 1, NULL, '', 'layui-icon-tips', 'Y', '/notice', 'BellOutlined', NULL, NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-01-08 16:47:56', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639351, 1339550467939639350, '[-1],[1339550467939639350],', '通知发布', 'notice_update', 'system', 60.10, 1, NULL, '/view/notice', NULL, 'Y', '/notice/publish', 'NotificationOutlined', '/notice/publish/publish', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639352, 1339550467939639350, '[-1],[1339550467939639350],', '我的消息', 'notice_find', 'system', 60.20, 1, NULL, '/view/message_list', NULL, 'Y', '/notice/mynotice', 'MessageOutlined', '/notice/mynotice/mynotice', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639360, -1, '[-1],', '监控管理', 'monitor', 'system', 70.00, 1, NULL, '', 'layui-icon-console', 'Y', '/monitor', 'DashboardOutlined', NULL, NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-01-08 16:48:52', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639361, 1339550467939639360, '[-1],[1339550467939639360],', 'SQL监控', 'monitor_druid', 'system', 70.10, 1, NULL, '/view/monitor/druid', NULL, 'Y', '/monitor/druid', 'DesktopOutlined', 'http://localhost:8080/druid', 1, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, '2021-05-05 21:42:08', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1339550467939639362, 1339550467939639360, '[-1],[1339550467939639360],', '服务器信息', 'monitor_server', 'system', 70.50, 1, NULL, '/view/monitor/systemInfo', NULL, 'Y', '/monitor/server', 'DesktopOutlined', '/monitor/server', NULL, NULL, NULL, 'Y', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1339550467939639390, -1, '[-1],', '个人信息', 'personal_info', 'system', 80.00, 1, NULL, '', NULL, 'N', '/personal/info', '', '/personal/info', NULL, NULL, NULL, 'N', 'N', '2020-12-29 19:51:14', NULL, NULL, NULL);
INSERT INTO `sys_menu` VALUES (1399362846198013953, -1, '[-1],', '应用权限', 'authority', 'system', 30.00, 1, NULL, '#', 'layui-icon-share', 'Y', '/authority', 'SlidersOutlined', NULL, 0, NULL, NULL, 'Y', 'N', '2021-05-31 21:51:16', 1339550467939639299, '2021-05-31 22:17:21', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1399365117052919810, -1, '[-1],', '在线接口', 'online_api', 'system', 40.00, 1, NULL, '', 'layui-icon-senior', 'Y', '/online', 'YuqueOutlined', NULL, 0, NULL, NULL, 'Y', 'N', '2021-05-31 22:00:18', 1339550467939639299, '2021-05-31 22:17:49', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1399366406616850433, 1399365117052919810, '[-1],[1399365117052919810],', '接口整理', 'api_group', 'system', 20.00, 1, NULL, '', 'layui-icon-senior', 'N', '/online/group', 'CopyOutlined', '/basedata/api/group/api-group', 0, NULL, NULL, 'Y', 'N', '2021-05-31 22:05:25', 1339550467939639299, '2021-05-31 22:17:38', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1399366927557795841, -1, '[-1],', '日志查看', 'log_manager', 'system', 60.00, 1, NULL, '', 'layui-icon-read', 'Y', '/log', 'DotChartOutlined', NULL, 0, NULL, NULL, 'Y', 'N', '2021-05-31 22:07:29', 1339550467939639299, '2021-05-31 22:18:08', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1412617944147038209, -1, '[-1],', '数据迁移', 'migration', 'system', 998.00, 1, NULL, NULL, NULL, 'N', '/migration', 'SlidersOutlined', '', 0, NULL, NULL, 'Y', 'N', '2021-07-07 11:42:18', 1339550467939639299, '2021-07-07 11:43:01', 1339550467939639299);
INSERT INTO `sys_menu` VALUES (1412618684643020802, 1412617944147038209, '[-1],[1412617944147038209],', '数据迁移中心', 'migration_list', 'system', 1.00, 1, NULL, NULL, NULL, 'N', '/migration/list', 'HddOutlined', '/migration/migration-list', 0, NULL, NULL, 'Y', 'N', '2021-07-07 11:45:14', 1339550467939639299, NULL, NULL);

-- ----------------------------
-- Table structure for sys_menu_button
-- ----------------------------
CREATE TABLE `sys_menu_button`  (
  `button_id` bigint(20) NOT NULL COMMENT '主键',
  `menu_id` bigint(20) NOT NULL COMMENT '菜单id，按钮需要挂在菜单下',
  `button_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '按钮的名称',
  `button_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '按钮的编码',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否删除：Y-被删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`button_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '菜单下的按钮' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu_button
-- ----------------------------
INSERT INTO `sys_menu_button` VALUES (1347753823522807838, 1339550467939639311, '角色管理_新增角色', 'BUTTON_ROLE_ADD', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu_button` VALUES (1347753823522807839, 1339550467939639311, '角色管理_修改角色', 'BUTTON_ROLE_EDIT', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu_button` VALUES (1347753823522807840, 1339550467939639311, '角色管理_删除角色', 'BUTTON_ROLE_DELETE', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu_button` VALUES (1347753823522807841, 1339550467939639311, '角色管理_分配菜单和按钮', 'BUTTON_ROLE_ASSIGN_MENU_BUTTON', 'N', NULL, NULL, NULL, NULL);
INSERT INTO `sys_menu_button` VALUES (1347753823522807842, 1339550467939639311, '角色管理_分配资源', 'BUTTON_ROLE_ASSIGN_RESOURCE', 'N', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_message
-- ----------------------------
CREATE TABLE `sys_message`  (
  `message_id` bigint(20) NOT NULL COMMENT '主键',
  `receive_user_id` bigint(20) NULL DEFAULT NULL COMMENT '接收用户id',
  `send_user_id` bigint(20) NULL DEFAULT NULL COMMENT '发送用户id',
  `message_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '消息标题',
  `message_content` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '消息内容',
  `message_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '消息类型',
  `priority_level` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '优先级',
  `message_send_time` datetime(0) NULL DEFAULT NULL COMMENT '消息发送时间',
  `business_id` bigint(20) NULL DEFAULT NULL COMMENT '业务id',
  `business_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '业务类型(根据业务id和业务类型可以确定业务数据)',
  `read_flag` tinyint(4) NULL DEFAULT 0 COMMENT '阅读状态：0-未读，1-已读',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'N' COMMENT '是否删除：Y-被删除，N-未删除',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '系统消息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
CREATE TABLE `sys_notice`  (
  `notice_id` bigint(20) NOT NULL COMMENT '主键',
  `notice_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '通知标题',
  `notice_summary` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '通知摘要',
  `notice_content` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '通知内容',
  `priority_level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '优先级',
  `notice_begin_time` datetime(0) NULL DEFAULT NULL COMMENT '开始时间',
  `notice_end_time` datetime(0) NULL DEFAULT NULL COMMENT '结束时间',
  `notice_scope` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '通知范围（用户id字符串）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'N' COMMENT '是否删除：Y-被删除，N-未删除',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '通知管理' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_resource
-- ----------------------------
CREATE TABLE `sys_resource`  (
  `resource_id` bigint(20) NOT NULL COMMENT '资源id',
  `app_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '应用编码',
  `resource_code` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '资源编码',
  `resource_name` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '资源名称',
  `project_code` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目编码，一般为spring.application.name',
  `class_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类名称',
  `method_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '方法名称',
  `modular_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源模块编码，一般为控制器类名排除Controller',
  `modular_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源模块名称，一般为控制器名称',
  `ip_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源初始化的服务器ip地址',
  `view_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否是视图类型：Y-是，N-否\r\n如果是视图类型，url需要以 \'/view\' 开头，\r\n视图类型的接口会渲染出html界面，而不是json数据，\r\n视图层一般会在前后端不分离项目出现',
  `url` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源url',
  `http_method` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'http请求方法',
  `required_login_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否需要登录：Y-是，N-否',
  `required_permission_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否需要鉴权：Y-是，N-否',
  `validate_groups` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '需要进行参数校验的分组',
  `param_field_descriptions` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '接口参数的字段描述',
  `response_field_descriptions` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '接口返回结果的字段描述',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`resource_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '资源' ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
CREATE TABLE `sys_role`  (
  `role_id` bigint(20) NOT NULL COMMENT '主键id',
  `role_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `role_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色编码',
  `role_sort` decimal(10, 2) NOT NULL COMMENT '序号',
  `data_scope_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '数据范围类型：10-仅本人数据，20-本部门数据，30-本部门及以下数据，40-指定部门数据，50-全部数据',
  `status_flag` tinyint(4) NOT NULL DEFAULT 0 COMMENT '状态：1-启用，2-禁用',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否删除：Y-已删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  `role_system_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否是系统角色:Y-是,N-否',
  `role_type_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字典:角色类型',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '系统角色' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1339550467939639303, '超级管理员', 'superAdmin', 1.00, 50, 1, '备注', 'N', '2020-12-17 20:41:25', -1, '2020-12-17 20:41:30', -1, 'Y', 'role_system');
INSERT INTO `sys_role` VALUES (1339550467939639304, '普通人员', 'normal', 2.00, 10, 1, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'role_system');
INSERT INTO `sys_role` VALUES (1339550467939639305, 'C端人员', 'c', 3.00, 10, 1, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'role_system');
INSERT INTO `sys_role` VALUES (1339550467939639306, 'B端人员', 'b', 4.00, 10, 1, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'role_system');

-- ----------------------------
-- Table structure for sys_role_data_scope
-- ----------------------------
CREATE TABLE `sys_role_data_scope`  (
  `role_data_scope_id` bigint(20) NOT NULL COMMENT '主键',
  `role_id` bigint(20) NOT NULL COMMENT '角色id',
  `organization_id` bigint(20) NOT NULL COMMENT '机构id',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`role_data_scope_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '角色数据范围' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
CREATE TABLE `sys_role_menu`  (
  `role_menu_id` bigint(20) NOT NULL COMMENT '主键',
  `role_id` bigint(20) NOT NULL COMMENT '角色id',
  `menu_id` bigint(20) NOT NULL COMMENT '菜单id',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`role_menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '角色菜单关联' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (1363826117961592834, 1339550467939639304, 1339550467939639301, '2021-02-22 20:21:00', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1363826117965787137, 1339550467939639304, 1339550467939639302, '2021-02-22 20:21:00', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1363826117965787138, 1339550467939639304, 1339550467939639303, '2021-02-22 20:21:00', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1363826117965787139, 1339550467939639304, 1339550467939639322, '2021-02-22 20:21:00', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1363826117965787140, 1339550467939639304, 1339550467939639323, '2021-02-22 20:21:00', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1363826117965787141, 1339550467939639304, 1339550467939639324, '2021-02-22 20:21:00', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966721, 1339550467939639303, 1339550467939639301, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966722, 1339550467939639303, 1339550467939639302, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966723, 1339550467939639303, 1339550467939639303, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966724, 1339550467939639303, 1339550467939639304, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966725, 1339550467939639303, 1339550467939639305, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966726, 1339550467939639303, 1339550467939639307, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966727, 1339550467939639303, 1339550467939639313, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966728, 1339550467939639303, 1339550467939639314, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966729, 1339550467939639303, 1339550467939639315, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966730, 1339550467939639303, 1339550467939639317, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966731, 1339550467939639303, 1339550467939639318, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966732, 1339550467939639303, 1339550467939639320, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966733, 1339550467939639303, 1339550467939639321, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966734, 1339550467939639303, 1339550467939639335, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966735, 1339550467939639303, 1339550467939639336, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966736, 1339550467939639303, 1339550467939639350, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966737, 1339550467939639303, 1339550467939639351, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966738, 1339550467939639303, 1339550467939639352, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966739, 1339550467939639303, 1339550467939639360, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966740, 1339550467939639303, 1339550467939639361, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923079966741, 1339550467939639303, 1339550467939639362, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355329, 1339550467939639303, 1339550467939639390, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355330, 1339550467939639303, 1399362846198013953, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355331, 1339550467939639303, 1339550467939639309, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355332, 1339550467939639303, 1339550467939639310, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355333, 1339550467939639303, 1339550467939639311, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355334, 1339550467939639303, 1339550467939639312, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355335, 1339550467939639303, 1399365117052919810, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355336, 1339550467939639303, 1339550467939639316, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355337, 1339550467939639303, 1399366406616850433, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355338, 1339550467939639303, 1399366927557795841, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355339, 1339550467939639303, 1339550467939639319, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (1399386923088355340, 1339550467939639303, 1339550467939639334, '2021-05-31 23:26:56', 1339550467939639299, NULL, NULL);

-- ----------------------------
-- Table structure for sys_role_menu_button
-- ----------------------------
CREATE TABLE `sys_role_menu_button`  (
  `role_button_id` bigint(20) NOT NULL COMMENT '主键',
  `role_id` bigint(20) NOT NULL COMMENT '角色id',
  `button_id` bigint(20) NOT NULL COMMENT '按钮id',
  `button_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '按钮编码',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`role_button_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '角色按钮关联' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu_button
-- ----------------------------
INSERT INTO `sys_role_menu_button` VALUES (1348235720929591297, 1339550467939639303, 1347753823522807838, 'BUTTON_ROLE_ADD', '2021-01-10 19:50:20', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu_button` VALUES (1348235720929591298, 1339550467939639303, 1347753823522807839, 'BUTTON_ROLE_EDIT', '2021-01-10 19:50:20', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu_button` VALUES (1348235720933785602, 1339550467939639303, 1347753823522807840, 'BUTTON_ROLE_DELETE', '2021-01-10 19:50:20', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu_button` VALUES (1348235720933785603, 1339550467939639303, 1347753823522807841, 'BUTTON_ROLE_ASSIGN_MENU_BUTTON', '2021-01-10 19:50:20', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_menu_button` VALUES (1348235720933785604, 1339550467939639303, 1347753823522807842, 'BUTTON_ROLE_ASSIGN_RESOURCE', '2021-01-10 19:50:20', 1339550467939639299, NULL, NULL);

-- ----------------------------
-- Table structure for sys_role_resource
-- ----------------------------
CREATE TABLE `sys_role_resource`  (
  `role_resource_id` bigint(20) NOT NULL COMMENT '主键',
  `role_id` bigint(20) NOT NULL COMMENT '角色id',
  `resource_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '资源编码',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`role_resource_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '角色资源关联' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_resource
-- ----------------------------
INSERT INTO `sys_role_resource` VALUES (1363832802742673410, 1339550467939639304, 'guns$sys_notice$delete', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802742673411, 1339550467939639304, 'guns$sys_notice$edit', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802742673412, 1339550467939639304, 'guns$sys_notice$list', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802742673413, 1339550467939639304, 'guns$sys_notice$detail', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802742673414, 1339550467939639304, 'guns$sys_notice$add', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802742673415, 1339550467939639304, 'guns$sys_notice$page', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802742673416, 1339550467939639304, 'guns$notice_view$role_add', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802742673417, 1339550467939639304, 'guns$notice_view$role_index', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802742673418, 1339550467939639304, 'guns$notice_view$role_edit', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802742673419, 1339550467939639304, 'guns$sys_user$get_user_tree', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802751062018, 1339550467939639304, 'guns$sys_message$detail', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802751062019, 1339550467939639304, 'guns$sys_message$delete', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802751062020, 1339550467939639304, 'guns$sys_message$all_message_read_flag', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802751062021, 1339550467939639304, 'guns$sys_message$send_message', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802751062022, 1339550467939639304, 'guns$sys_message$page', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802751062023, 1339550467939639304, 'guns$sys_message$batch_update_read_flag', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802751062024, 1339550467939639304, 'guns$sys_message$msg_un_read', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802751062025, 1339550467939639304, 'guns$sys_message$list', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1363832802751062026, 1339550467939639304, 'guns$web_socket$get_ws_url', '2021-02-22 20:47:34', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706121203714, 1339550467939639303, 'guns$api_view$api_index', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706125398017, 1339550467939639303, 'guns$hr_organization$user_bind_org_scope', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706125398018, 1339550467939639303, 'guns$hr_organization$organization_tree', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706125398019, 1339550467939639303, 'guns$hr_organization$update_status', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706125398020, 1339550467939639303, 'guns$hr_organization$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706125398021, 1339550467939639303, 'guns$hr_organization$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706125398022, 1339550467939639303, 'guns$hr_organization$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706125398023, 1339550467939639303, 'guns$hr_organization$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706129592322, 1339550467939639303, 'guns$hr_organization$role_bind_org_scope', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706129592323, 1339550467939639303, 'guns$hr_organization$role_bind_org_scope_antdv', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706129592324, 1339550467939639303, 'guns$hr_organization$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706129592325, 1339550467939639303, 'guns$hr_organization$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706129592326, 1339550467939639303, 'guns$file_view$details', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706129592327, 1339550467939639303, 'guns$file_view$file_index', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706129592328, 1339550467939639303, 'guns$menu_view$menu_add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706129592329, 1339550467939639303, 'guns$menu_view$menu_edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786625, 1339550467939639303, 'guns$menu_view$menu_index', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786626, 1339550467939639303, 'guns$message_view$view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786627, 1339550467939639303, 'guns$message_view$message', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786628, 1339550467939639303, 'guns$message_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786629, 1339550467939639303, 'guns$timers_view$edit_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786630, 1339550467939639303, 'guns$timers_view$add_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786631, 1339550467939639303, 'guns$timers_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786632, 1339550467939639303, 'guns$log_manager$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786633, 1339550467939639303, 'guns$log_manager$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786634, 1339550467939639303, 'guns$log_manager$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706133786635, 1339550467939639303, 'guns$log_manager$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980930, 1339550467939639303, 'guns$sys_menu_button$batch_delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980931, 1339550467939639303, 'guns$sys_menu_button$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980932, 1339550467939639303, 'guns$sys_menu_button$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980933, 1339550467939639303, 'guns$sys_menu_button$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980934, 1339550467939639303, 'guns$sys_menu_button$page_list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980935, 1339550467939639303, 'guns$sys_menu_button$add_system_default_button', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980936, 1339550467939639303, 'guns$sys_menu_button$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980937, 1339550467939639303, 'guns$dict_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980938, 1339550467939639303, 'guns$dict_view$add_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980939, 1339550467939639303, 'guns$dict_view$edit_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980940, 1339550467939639303, 'guns$dict_view$add_config_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980941, 1339550467939639303, 'guns$config_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980942, 1339550467939639303, 'guns$config_view$edit_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706137980943, 1339550467939639303, 'guns$config_view$add_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175234, 1339550467939639303, 'guns$sys_role$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175235, 1339550467939639303, 'guns$sys_role$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175236, 1339550467939639303, 'guns$sys_role$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175237, 1339550467939639303, 'guns$sys_role$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175238, 1339550467939639303, 'guns$sys_role$grant_resource', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175239, 1339550467939639303, 'guns$sys_role$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175240, 1339550467939639303, 'guns$sys_role$grant_data', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175241, 1339550467939639303, 'guns$sys_role$grant_menu_and_button', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175242, 1339550467939639303, 'guns$sys_role$get_role_data_scope', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175243, 1339550467939639303, 'guns$sys_role$drop_down', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175244, 1339550467939639303, 'guns$sys_role$get_role_menus', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175245, 1339550467939639303, 'guns$data_source_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175246, 1339550467939639303, 'guns$data_source_view$add_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706142175247, 1339550467939639303, 'guns$dict$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369537, 1339550467939639303, 'guns$dict$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369538, 1339550467939639303, 'guns$dict$get_config_group_page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369539, 1339550467939639303, 'guns$dict$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369540, 1339550467939639303, 'guns$dict$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369541, 1339550467939639303, 'guns$dict$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369542, 1339550467939639303, 'guns$dict$get_languages_page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369543, 1339550467939639303, 'guns$dict$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369544, 1339550467939639303, 'guns$dict$get_dict_tree_list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369545, 1339550467939639303, 'guns$api$get_resource_detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369546, 1339550467939639303, 'guns$api$get_tree', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369547, 1339550467939639303, 'guns$api_resource$record', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369548, 1339550467939639303, 'guns$api_resource$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369549, 1339550467939639303, 'guns$api_resource$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706146369550, 1339550467939639303, 'guns$api_resource$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563842, 1339550467939639303, 'guns$api_resource$all_field', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563843, 1339550467939639303, 'guns$api_resource$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563844, 1339550467939639303, 'guns$api_resource$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563845, 1339550467939639303, 'guns$api_resource$reset', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563846, 1339550467939639303, 'guns$api_resource$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563847, 1339550467939639303, 'guns$online_user$online_user_list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563848, 1339550467939639303, 'guns$online_user$remove_session', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563849, 1339550467939639303, 'guns$test_multi_tran$test_success', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563850, 1339550467939639303, 'guns$test_multi_tran$test_fail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563851, 1339550467939639303, 'guns$app_view$app_add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563852, 1339550467939639303, 'guns$app_view$app_edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563853, 1339550467939639303, 'guns$app_view$app_index', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563854, 1339550467939639303, 'guns$dict_type$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706150563855, 1339550467939639303, 'guns$dict_type$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758145, 1339550467939639303, 'guns$dict_type$update_status', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758146, 1339550467939639303, 'guns$dict_type$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758147, 1339550467939639303, 'guns$dict_type$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758148, 1339550467939639303, 'guns$dict_type$get_translation_detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758149, 1339550467939639303, 'guns$dict_type$get_config_dict_type_detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758150, 1339550467939639303, 'guns$dict_type$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758151, 1339550467939639303, 'guns$dict_type$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758152, 1339550467939639303, 'guns$kaptcha$captcha', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758153, 1339550467939639303, 'guns$user_view$forget_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758154, 1339550467939639303, 'guns$user_view$role_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758155, 1339550467939639303, 'guns$user_view$register_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758156, 1339550467939639303, 'guns$user_view$add_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758157, 1339550467939639303, 'guns$user_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758158, 1339550467939639303, 'guns$user_view$edit_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758159, 1339550467939639303, 'guns$resource$get_lateral_tree_children', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758160, 1339550467939639303, 'guns$resource$page_list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758161, 1339550467939639303, 'guns$resource$get_menu_resource_list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758162, 1339550467939639303, 'guns$resource$get_lateral_tree', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758163, 1339550467939639303, 'guns$sys_login_log$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706154758164, 1339550467939639303, 'guns$sys_login_log$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146753, 1339550467939639303, 'guns$sys_login_log$delete_all', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146754, 1339550467939639303, 'guns$dict_type_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146755, 1339550467939639303, 'guns$dict_type_view$edit_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146756, 1339550467939639303, 'guns$dict_type_view$add_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146757, 1339550467939639303, 'guns$hr_position$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146758, 1339550467939639303, 'guns$hr_position$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146759, 1339550467939639303, 'guns$hr_position$update_status', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146760, 1339550467939639303, 'guns$hr_position$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146761, 1339550467939639303, 'guns$hr_position$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146762, 1339550467939639303, 'guns$hr_position$batch_delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146763, 1339550467939639303, 'guns$hr_position$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146764, 1339550467939639303, 'guns$hr_position$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706163146765, 1339550467939639303, 'guns$monitor_status$get_system_info', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341057, 1339550467939639303, 'guns$sys_menu$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341058, 1339550467939639303, 'guns$sys_menu$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341059, 1339550467939639303, 'guns$sys_menu$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341060, 1339550467939639303, 'guns$sys_menu$layui_list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341061, 1339550467939639303, 'guns$sys_menu$layui_select_parent_menu_tree_list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341062, 1339550467939639303, 'guns$sys_menu$tree', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341063, 1339550467939639303, 'guns$sys_menu$get_left_menus_antdv', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341064, 1339550467939639303, 'guns$sys_menu$menu_and_button_tree', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341065, 1339550467939639303, 'guns$sys_menu$menu_and_button_tree_children', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341066, 1339550467939639303, 'guns$sys_menu$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341067, 1339550467939639303, 'guns$sys_menu$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341068, 1339550467939639303, 'guns$common_view$common_tree_select', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341069, 1339550467939639303, 'guns$sys_message$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341070, 1339550467939639303, 'guns$sys_message$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341071, 1339550467939639303, 'guns$sys_message$all_message_read_flag', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341072, 1339550467939639303, 'guns$sys_message$send_message', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341073, 1339550467939639303, 'guns$sys_message$batch_update_read_flag', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341074, 1339550467939639303, 'guns$sys_message$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341075, 1339550467939639303, 'guns$sys_message$msg_un_read', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341076, 1339550467939639303, 'guns$sys_message$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341077, 1339550467939639303, 'guns$role_view$role_assign_api', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341078, 1339550467939639303, 'guns$role_view$role_assign_menu_button', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341079, 1339550467939639303, 'guns$role_view$role_edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341080, 1339550467939639303, 'guns$role_view$role_add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341081, 1339550467939639303, 'guns$role_view$role_index', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341082, 1339550467939639303, 'guns$role_view$role_edit_data_scope', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341083, 1339550467939639303, 'guns$dashboard_view$platform', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341084, 1339550467939639303, 'guns$dashboard_view$analyse', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341085, 1339550467939639303, 'guns$log_view$detail_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341086, 1339550467939639303, 'guns$log_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341087, 1339550467939639303, 'guns$sys_app$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706167341088, 1339550467939639303, 'guns$sys_app$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729666, 1339550467939639303, 'guns$sys_app$set_as_default', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729667, 1339550467939639303, 'guns$sys_app$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729668, 1339550467939639303, 'guns$sys_app$get_top_app_list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729669, 1339550467939639303, 'guns$sys_app$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729670, 1339550467939639303, 'guns$sys_app$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729671, 1339550467939639303, 'guns$sys_app$update_status', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729672, 1339550467939639303, 'guns$sys_app$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729673, 1339550467939639303, 'guns$api_group$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729674, 1339550467939639303, 'guns$api_group$peers_tree', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729675, 1339550467939639303, 'guns$api_group$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729676, 1339550467939639303, 'guns$api_group$group_tree', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729677, 1339550467939639303, 'guns$api_group$edit_tree_sort', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729678, 1339550467939639303, 'guns$api_group$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729679, 1339550467939639303, 'guns$api_group$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729680, 1339550467939639303, 'guns$api_group$tree', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729681, 1339550467939639303, 'guns$api_group$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729682, 1339550467939639303, 'guns$api_group$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729683, 1339550467939639303, 'guns$sys_file_info$private_preview', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706175729684, 1339550467939639303, 'guns$sys_file_info$public_preview', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923969, 1339550467939639303, 'guns$sys_file_info$tinymce_upload', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923970, 1339550467939639303, 'guns$sys_file_info$private_packaging_download', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923971, 1339550467939639303, 'guns$sys_file_info$public_packaging_download', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923972, 1339550467939639303, 'guns$sys_file_info$version_back', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923973, 1339550467939639303, 'guns$sys_file_info$file_info_list_page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923974, 1339550467939639303, 'guns$sys_file_info$preview_by_bucket_name_object_name', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923975, 1339550467939639303, 'guns$sys_file_info$get_file_info_list_by_file_ids', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923976, 1339550467939639303, 'guns$sys_file_info$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923977, 1339550467939639303, 'guns$sys_file_info$update', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923978, 1339550467939639303, 'guns$sys_file_info$private_download', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923979, 1339550467939639303, 'guns$sys_file_info$upload', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923980, 1339550467939639303, 'guns$sys_file_info$public_download', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923981, 1339550467939639303, 'guns$sys_file_info$delete_really', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923982, 1339550467939639303, 'guns$test_single_tran$test_fail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923983, 1339550467939639303, 'guns$test_single_tran$test_success', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923984, 1339550467939639303, 'guns$login$get_current_login_user_info', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923985, 1339550467939639303, 'guns$login$login', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706179923986, 1339550467939639303, 'guns$login$login_api', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118274, 1339550467939639303, 'guns$login$login_with_token', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118275, 1339550467939639303, 'guns$login$logout_page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118276, 1339550467939639303, 'guns$demo$encode', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118277, 1339550467939639303, 'guns$demo$render_success', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118278, 1339550467939639303, 'guns$online_user_view$online_user', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118279, 1339550467939639303, 'guns$resource_view$resource_detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118280, 1339550467939639303, 'guns$resource_view$resource_index', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118281, 1339550467939639303, 'guns$personal_info$update_avatar', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118282, 1339550467939639303, 'guns$personal_info$update_pwd', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118283, 1339550467939639303, 'guns$personal_info$update_info', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118284, 1339550467939639303, 'guns$sys_user$grant_role', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706184118285, 1339550467939639303, 'guns$sys_user$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312577, 1339550467939639303, 'guns$sys_user$selector', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312578, 1339550467939639303, 'guns$sys_user$own_data', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312579, 1339550467939639303, 'guns$sys_user$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312580, 1339550467939639303, 'guns$sys_user$change_status', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312581, 1339550467939639303, 'guns$sys_user$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312582, 1339550467939639303, 'guns$sys_user$grant_data', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312583, 1339550467939639303, 'guns$sys_user$reset_pwd', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312584, 1339550467939639303, 'guns$sys_user$batch_delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312585, 1339550467939639303, 'guns$sys_user$current_user_info', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312586, 1339550467939639303, 'guns$sys_user$get_user_tree', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312587, 1339550467939639303, 'guns$sys_user$export', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312588, 1339550467939639303, 'guns$sys_user$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312589, 1339550467939639303, 'guns$sys_user$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312590, 1339550467939639303, 'guns$sys_user$own_role', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312591, 1339550467939639303, 'guns$sys_user$register', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312592, 1339550467939639303, 'guns$sys_config$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312593, 1339550467939639303, 'guns$sys_config$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706188312594, 1339550467939639303, 'guns$sys_config$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506882, 1339550467939639303, 'guns$sys_config$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506883, 1339550467939639303, 'guns$sys_config$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506884, 1339550467939639303, 'guns$sys_config$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506885, 1339550467939639303, 'guns$sys_timers$start', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506886, 1339550467939639303, 'guns$sys_timers$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506887, 1339550467939639303, 'guns$sys_timers$get_action_classes', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506888, 1339550467939639303, 'guns$sys_timers$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506889, 1339550467939639303, 'guns$sys_timers$del', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506890, 1339550467939639303, 'guns$sys_timers$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506891, 1339550467939639303, 'guns$sys_timers$stop', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506892, 1339550467939639303, 'guns$sys_timers$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506893, 1339550467939639303, 'guns$sys_timers$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506894, 1339550467939639303, 'guns$menu_button_view$menu_index', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506895, 1339550467939639303, 'guns$menu_button_view$menu_edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506896, 1339550467939639303, 'guns$menu_button_view$menu_add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506897, 1339550467939639303, 'guns$database_info$find_page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706192506898, 1339550467939639303, 'guns$database_info$find_list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706196701185, 1339550467939639303, 'guns$database_info$del', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706196701186, 1339550467939639303, 'guns$database_info$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706196701187, 1339550467939639303, 'guns$database_info$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706196701188, 1339550467939639303, 'guns$database_info$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706196701189, 1339550467939639303, 'guns$notice_view$role_add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706196701190, 1339550467939639303, 'guns$notice_view$role_index', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706196701191, 1339550467939639303, 'guns$notice_view$role_edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706196701192, 1339550467939639303, 'guns$data_center_view$export_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706196701193, 1339550467939639303, 'guns$data_center_view$import_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895490, 1339550467939639303, 'guns$sms_sender$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895491, 1339550467939639303, 'guns$sms_sender$send_message', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895492, 1339550467939639303, 'guns$sms_sender$validate_message', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895493, 1339550467939639303, 'guns$monitor$druid_info', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895494, 1339550467939639303, 'guns$monitor$system_info', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895495, 1339550467939639303, 'guns$translation_view$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895496, 1339550467939639303, 'guns$translation_view$add_translation_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895497, 1339550467939639303, 'guns$translation_view$index', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895498, 1339550467939639303, 'guns$translation_view$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895499, 1339550467939639303, 'guns$login_view$login', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895500, 1339550467939639303, 'guns$web_socket$get_ws_url', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895501, 1339550467939639303, 'guns$organization_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895502, 1339550467939639303, 'guns$organization_view$edit_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895503, 1339550467939639303, 'guns$organization_view$add_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895504, 1339550467939639303, 'guns$login_log_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895505, 1339550467939639303, 'guns$position_view$add_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895506, 1339550467939639303, 'guns$position_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895507, 1339550467939639303, 'guns$position_view$edit_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895508, 1339550467939639303, 'guns$user_translation$get_all_languages', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895509, 1339550467939639303, 'guns$user_translation$change_user_translation', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706200895510, 1339550467939639303, 'guns$user_translation$get_user_translation', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284097, 1339550467939639303, 'guns$translation$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284098, 1339550467939639303, 'guns$translation$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284099, 1339550467939639303, 'guns$translation$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284100, 1339550467939639303, 'guns$translation$page', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284101, 1339550467939639303, 'guns$translation$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284102, 1339550467939639303, 'guns$translation$delete_tran_language', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284103, 1339550467939639303, 'guns$index_view$lock', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284104, 1339550467939639303, 'guns$index_view$personal', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284105, 1339550467939639303, 'guns$index_view$theme', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284106, 1339550467939639303, 'guns$index_view$change_password', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284107, 1339550467939639303, 'guns$index_view$index_view', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284108, 1339550467939639303, 'guns$error_view$error_page_info', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284109, 1339550467939639303, 'guns$sys_notice$delete', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284110, 1339550467939639303, 'guns$sys_notice$edit', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284111, 1339550467939639303, 'guns$sys_notice$list', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284112, 1339550467939639303, 'guns$sys_notice$detail', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284113, 1339550467939639303, 'guns$sys_notice$add', '2021-05-31 23:26:05', -1, NULL, NULL);
INSERT INTO `sys_role_resource` VALUES (1399386706209284114, 1339550467939639303, 'guns$sys_notice$page', '2021-05-31 23:26:05', -1, NULL, NULL);

-- ----------------------------
-- Table structure for sys_sms
-- ----------------------------
CREATE TABLE `sys_sms`  (
  `sms_id` bigint(20) NOT NULL COMMENT '主键',
  `phone_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '手机号',
  `validate_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '短信验证码',
  `template_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '短信模板编号',
  `biz_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '业务id',
  `status_flag` tinyint(4) NULL DEFAULT NULL COMMENT '发送状态：1-未发送，2-发送成功，3-发送失败，4-失效',
  `source` int(11) NULL DEFAULT NULL COMMENT '来源：1-app，2-pc，3-其他',
  `invalid_time` datetime(0) NULL DEFAULT NULL COMMENT '短信失效截止时间',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`sms_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '短信发送记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_timers
-- ----------------------------
CREATE TABLE `sys_timers`  (
  `timer_id` bigint(20) NOT NULL COMMENT '定时器id',
  `timer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '任务名称',
  `action_class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '执行任务的class的类名（实现了TimerAction接口的类的全称）',
  `cron` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '定时任务表达式',
  `params` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '参数',
  `job_status` int(11) NULL DEFAULT NULL COMMENT '状态：1-运行，2-停止',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否删除：Y-被删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`timer_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '定时任务' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_timers
-- ----------------------------
INSERT INTO `sys_timers` VALUES (1355878268976271362, '定时刷新服务器状态', 'cn.stylefeng.roses.kernel.monitor.system.holder.SystemHardwareInfoHolder', '0 0/1 * * * ? ', NULL, 1, '每1分钟执行一次，刷新服务器状态', 'N', '2021-01-31 21:59:05', 1339550467939639299, '2021-01-31 22:00:23', 1339550467939639299);
INSERT INTO `sys_timers` VALUES (1385068954897223681, '定时检测数据源的链接状态', 'cn.stylefeng.roses.kernel.dsctn.modular.timer.DataSourceStatusCheckTimer', '0/30 * * * * ? ', '', 1, '', 'N', '2021-04-22 11:12:27', 1339550467939639299, NULL, NULL);
-- ----------------------------
-- Table structure for sys_translation
-- ----------------------------
CREATE TABLE `sys_translation`  (
  `tran_id` bigint(20) NOT NULL COMMENT '主键id',
  `tran_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '编码',
  `tran_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '多语言条例名称',
  `tran_language_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '语种字典',
  `tran_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '翻译的值',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`tran_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '多语言' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_translation
-- ----------------------------
INSERT INTO `sys_translation` VALUES (1355348835513200642, 'MENU_BLACKBOARD', '菜单_主控面板', 'chinese', '主控面板', '2021-01-30 10:55:18', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355348835513200643, 'MENU_BLACKBOARD', '菜单_主控面板', 'english', 'dashboard', '2021-01-30 10:55:18', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355348956036526081, 'MENU_BOARD_PLATFORM', '菜单_工作台', 'chinese', '工作台', '2021-01-30 10:55:47', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355348956036526082, 'MENU_BOARD_PLATFORM', '菜单_工作台', 'english', 'platform', '2021-01-30 10:55:47', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355352667639050242, 'MENU_BOARD_ANALYSE', '菜单_分析页', 'chinese', '分析页', '2021-01-30 11:10:32', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355352667639050243, 'MENU_BOARD_ANALYSE', '菜单_分析页', 'english', 'analyse', '2021-01-30 11:10:32', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355352795519184897, 'MENU_ORG', '菜单_组织机构', 'chinese', '组织机构', '2021-01-30 11:11:02', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355352795519184898, 'MENU_ORG', '菜单_组织机构', 'english', 'organiztion', '2021-01-30 11:11:02', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354480979275777, 'MENU_ORG_USER', '菜单_用户管理', 'chinese', '用户管理', '2021-01-30 11:17:44', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354480979275778, 'MENU_ORG_USER', '菜单_用户管理', 'english', 'users', '2021-01-30 11:17:44', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354599871016962, 'MENU_ORG_MAIN', '菜单_机构管理', 'chinese', '机构管理', '2021-01-30 11:18:13', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354599871016963, 'MENU_ORG_MAIN', '菜单_机构管理', 'english', 'organization', '2021-01-30 11:18:13', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354696272900097, 'MENU_ORG_POSITION', '菜单_职位管理', 'chinese', '职位管理', '2021-01-30 11:18:36', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354696272900098, 'MENU_ORG_POSITION', '菜单_职位管理', 'english', 'position', '2021-01-30 11:18:36', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354785196339201, 'MENU_AUTH', '菜单_权限管理', 'chinese', '权限管理', '2021-01-30 11:18:57', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354785196339202, 'MENU_AUTH', '菜单_权限管理', 'english', 'authority', '2021-01-30 11:18:57', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354906436890626, 'MENU_AUTH_APP', '菜单_应用管理', 'chinese', '应用管理', '2021-01-30 11:19:26', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355354906436890627, 'MENU_AUTH_APP', '菜单_应用管理', 'english', 'apps', '2021-01-30 11:19:26', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355090189348866, 'MENU_AUTH_MENU', '菜单_菜单管理', 'chinese', '菜单管理', '2021-01-30 11:20:09', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355090189348867, 'MENU_AUTH_MENU', '菜单_菜单管理', 'english', 'menus', '2021-01-30 11:20:09', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355153632391170, 'MENU_AUTH_ROLE', '菜单_角色管理', 'chinese', '角色管理', '2021-01-30 11:20:25', 1339550467939639299, '2021-01-30 11:21:33', 1339550467939639299);
INSERT INTO `sys_translation` VALUES (1355355153632391171, 'MENU_AUTH_ROLE', '菜单_角色管理', 'english', 'roles', '2021-01-30 11:20:25', 1339550467939639299, '2021-01-30 11:21:33', 1339550467939639299);
INSERT INTO `sys_translation` VALUES (1355355326739705858, 'MENU_AUTH_RESOURCE', '菜单_资源管理', 'chinese', '资源管理', '2021-01-30 11:21:06', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355326739705859, 'MENU_AUTH_RESOURCE', '菜单_资源管理', 'english', 'resource', '2021-01-30 11:21:06', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355406259515393, 'MENU_BASE', '菜单_基础数据', 'chinese', '基础数据', '2021-01-30 11:21:25', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355406259515394, 'MENU_BASE', '菜单_基础数据', 'english', 'base data', '2021-01-30 11:21:25', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355520512356354, 'MENU_BASE_SYSCONFIG', '菜单_系统配置', 'chinese', '系统配置', '2021-01-30 11:21:52', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355520512356355, 'MENU_BASE_SYSCONFIG', '菜单_系统配置', 'english', 'config', '2021-01-30 11:21:52', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355620575866882, 'MENU_BASE_DICT', '菜单_字典管理', 'chinese', '字典管理', '2021-01-30 11:22:16', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355620575866883, 'MENU_BASE_DICT', '菜单_字典管理', 'english', 'dict', '2021-01-30 11:22:16', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355711239942145, 'MENU_BASE_APIS', '菜单_接口文档', 'chinese', '接口文档', '2021-01-30 11:22:38', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355711239942146, 'MENU_BASE_APIS', '菜单_接口文档', 'english', 'apis', '2021-01-30 11:22:38', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355878345207809, 'MENU_SYS', '菜单_系统功能', 'chinese', '系统功能', '2021-01-30 11:23:17', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355355878345207810, 'MENU_SYS', '菜单_系统功能', 'english', 'system', '2021-01-30 11:23:17', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356005545865218, 'MENU_SYS_FILE', '菜单_文件管理', 'chinese', '文件管理', '2021-01-30 11:23:48', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356005545865219, 'MENU_SYS_FILE', '菜单_文件管理', 'english', 'file', '2021-01-30 11:23:48', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356091415851010, 'MENU_OPERATE_LOG', '菜单_操作日志', 'chinese', '操作日志', '2021-01-30 11:24:08', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356091415851011, 'MENU_OPERATE_LOG', '菜单_操作日志', 'english', 'operate log', '2021-01-30 11:24:08', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356171220873218, 'MENU_LOGIN_LOG', '菜单_登录日志', 'chinese', '登录日志', '2021-01-30 11:24:27', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356171220873219, 'MENU_LOGIN_LOG', '菜单_登录日志', 'english', 'login log', '2021-01-30 11:24:27', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356268293844993, 'MENU_SYS_ONLINE', '菜单_在线用户', 'chinese', '在线用户', '2021-01-30 11:24:50', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356268293844994, 'MENU_SYS_ONLINE', '菜单_在线用户', 'english', 'login user', '2021-01-30 11:24:50', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356371410808833, 'MENU_SYS_TIMER', '菜单_定时任务', 'chinese', '定时任务', '2021-01-30 11:25:15', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356371410808834, 'MENU_SYS_TIMER', '菜单_定时任务', 'english', 'timers', '2021-01-30 11:25:15', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356481783918593, 'MENU_DATASOURCES', '菜单_多数据源', 'chinese', '多数据源', '2021-01-30 11:25:41', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356481783918594, 'MENU_DATASOURCES', '菜单_多数据源', 'english', 'datasources', '2021-01-30 11:25:41', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356554374737921, 'MENU_LANGUAGES', '菜单_多语言配置', 'chinese', '多语言配置', '2021-01-30 11:25:59', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356554374737922, 'MENU_LANGUAGES', '菜单_多语言配置', 'english', 'languages', '2021-01-30 11:25:59', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356772600180738, 'MENU_NOTICE', '菜单_通知管理', 'chinese', '通知管理', '2021-01-30 11:26:51', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356772600180739, 'MENU_NOTICE', '菜单_通知管理', 'english', 'notice', '2021-01-30 11:26:51', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356847015522305, 'MENU_NOTICE_UPDATE', '菜单_通知发布', 'chinese', '通知发布', '2021-01-30 11:27:08', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356847015522306, 'MENU_NOTICE_UPDATE', '菜单_通知发布', 'english', 'notice deploy', '2021-01-30 11:27:08', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356922198421505, 'MENU_NOTICE_FIND', '菜单_我的消息', 'chinese', '我的消息', '2021-01-30 11:27:26', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356922198421506, 'MENU_NOTICE_FIND', '菜单_我的消息', 'english', 'my notice', '2021-01-30 11:27:26', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356997855277058, 'MENU_MONITOR', '菜单_监控管理', 'chinese', '监控管理', '2021-01-30 11:27:44', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355356997855277059, 'MENU_MONITOR', '菜单_监控管理', 'english', 'monitor', '2021-01-30 11:27:44', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355357305746550786, 'MENU_MONITOR_DRUID', '菜单_SQL监控', 'chinese', 'SQL监控', '2021-01-30 11:28:58', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355357305746550787, 'MENU_MONITOR_DRUID', '菜单_SQL监控', 'english', 'druid monitor', '2021-01-30 11:28:58', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355357401196326913, 'MENU_MONITOR_SERVER', '菜单_服务器信息', 'chinese', '服务器信息', '2021-01-30 11:29:20', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355357401196326914, 'MENU_MONITOR_SERVER', '菜单_服务器信息', 'english', 'server info', '2021-01-30 11:29:20', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355363229903204353, 'MENU_CHANGE_PASSWORD', '菜单_修改密码', 'chinese', '修改密码', '2021-01-30 11:52:30', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355363229903204354, 'MENU_CHANGE_PASSWORD', '菜单_修改密码', 'english', 'change password', '2021-01-30 11:52:30', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355363314489733122, 'MENU_PERSONAL', '菜单_个人中心', 'chinese', '个人中心', '2021-01-30 11:52:50', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355363314489733123, 'MENU_PERSONAL', '菜单_个人中心', 'english', 'personal', '2021-01-30 11:52:50', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355363436573339649, 'MENU_LOGOUT', '菜单_退出', 'chinese', '退出', '2021-01-30 11:53:19', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355363436573339650, 'MENU_LOGOUT', '菜单_退出', 'english', 'logout', '2021-01-30 11:53:19', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388566909333506, 'FIELD_BASIC_INFO', '个人中心_选项卡_基本信息', 'chinese', '基本信息', '2021-01-30 13:33:11', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388566909333507, 'FIELD_BASIC_INFO', '个人中心_选项卡_基本信息', 'english', 'basic info', '2021-01-30 13:33:11', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388672819703810, 'FIELD_OTHER', '个人中心_选项卡_其他', 'chinese', '其他', '2021-01-30 13:33:36', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388672819703811, 'FIELD_OTHER', '个人中心_选项卡_其他', 'english', 'others', '2021-01-30 13:33:36', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388784606294017, 'FIELD_ACCOUNT', '个人中心_字段_账号', 'chinese', '账号', '2021-01-30 13:34:03', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388784606294018, 'FIELD_ACCOUNT', '个人中心_字段_账号', 'english', 'account', '2021-01-30 13:34:03', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388873777197057, 'FIELD_SEX', '个人中心_字段_性别', 'chinese', '性别', '2021-01-30 13:34:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388873777197058, 'FIELD_SEX', '个人中心_字段_性别', 'english', 'sex', '2021-01-30 13:34:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388954651766786, 'FIELD_EMAIL', '个人中心_字段_邮箱', 'chinese', '邮箱', '2021-01-30 13:34:43', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355388954651766787, 'FIELD_EMAIL', '个人中心_字段_邮箱', 'english', 'email', '2021-01-30 13:34:43', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355389060402753538, 'FIELD_NAME', '个人中心_字段_姓名', 'chinese', '姓名', '2021-01-30 13:35:09', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355389060402753539, 'FIELD_NAME', '个人中心_字段_姓名', 'english', 'name', '2021-01-30 13:35:09', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355389141315072001, 'FIELD_BIRTHDAY', '个人中心_字段_生日', 'chinese', '生日', '2021-01-30 13:35:28', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355389141315072002, 'FIELD_BIRTHDAY', '个人中心_字段_生日', 'english', 'birthday', '2021-01-30 13:35:28', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355389290334498817, 'FIELD_PHONE', '个人中心_字段_电话', 'chinese', '电话', '2021-01-30 13:36:03', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355389290334498818, 'FIELD_PHONE', '个人中心_字段_电话', 'english', 'phone', '2021-01-30 13:36:03', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355389380272959489, 'BTN_UPDATE_INFO', '个人中心_按钮_更新基本信息', 'chinese', '更新基本信息', '2021-01-30 13:36:25', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355389380272959490, 'BTN_UPDATE_INFO', '个人中心_按钮_更新基本信息', 'english', 'update', '2021-01-30 13:36:25', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355391961791590402, 'TITLE_CHANGE_PASSWORD', '修改密码_标题_修改密码', 'chinese', '修改密码', '2021-01-30 13:46:40', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355391961791590403, 'TITLE_CHANGE_PASSWORD', '修改密码_标题_修改密码', 'english', 'change password', '2021-01-30 13:46:40', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392062836568065, 'FIELD_OLD_PASSWORD', '修改密码_字段_旧密码', 'chinese', '旧密码', '2021-01-30 13:47:04', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392062836568066, 'FIELD_OLD_PASSWORD', '修改密码_字段_旧密码', 'english', 'old password', '2021-01-30 13:47:04', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392146118668290, 'FIELD_NEW_PASSWORD', '修改密码_字段_新密码', 'chinese', '新密码', '2021-01-30 13:47:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392146118668291, 'FIELD_NEW_PASSWORD', '修改密码_字段_新密码', 'english', 'new password', '2021-01-30 13:47:24', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392231485337601, 'FIELD_REPEAT_PASSWORD', '修改密码_字段_重复密码', 'chinese', '重复密码', '2021-01-30 13:47:45', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392231485337602, 'FIELD_REPEAT_PASSWORD', '修改密码_字段_重复密码', 'english', 'repeat password', '2021-01-30 13:47:45', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392328214376450, 'BTN_SAVE', '按钮_保存', 'chinese', '保存', '2021-01-30 13:48:08', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392328214376451, 'BTN_SAVE', '按钮_保存', 'english', 'save', '2021-01-30 13:48:08', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392385093332993, 'BTN_CANCEL', '按钮_取消', 'chinese', '取消', '2021-01-30 13:48:21', 1339550467939639299, NULL, NULL);
INSERT INTO `sys_translation` VALUES (1355392385093332994, 'BTN_CANCEL', '按钮_取消', 'english', 'cancel', '2021-01-30 13:48:21', 1339550467939639299, NULL, NULL);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
CREATE TABLE `sys_user`  (
  `user_id` bigint(20) NOT NULL COMMENT '主键',
  `real_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `nick_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `account` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账号',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码，加密方式为BCrypt',
  `avatar` bigint(20) NULL DEFAULT NULL COMMENT '头像，存的为文件id',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `sex` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '性别：M-男，F-女',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机',
  `tel` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `super_admin_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '是否是超级管理员：Y-是，N-否',
  `status_flag` tinyint(4) NOT NULL DEFAULT 1 COMMENT '状态：1-正常，2-冻结',
  `last_login_ip` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最后登陆IP',
  `last_login_time` datetime(0) NULL DEFAULT NULL COMMENT '最后登陆时间',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '删除标记：Y-已删除，N-未删除',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '系统用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1339550467939639299, '管理员', '超管', 'admin', '$2a$10$N/mL91CVAlcuZmW8/m4Fb..BSsimGqhfwpHtIGH3h8NYI41rXhhIq', 10000, '2020-12-01', 'M', 'sn93@qq.com', '18200000000', '123456', 'Y', 1, '127.0.0.1', '2021-05-31 23:12:59', 'N', '2020-12-17 20:40:31', -1, '2021-05-31 23:12:59', -1);

-- ----------------------------
-- Table structure for sys_user_data_scope
-- ----------------------------
CREATE TABLE `sys_user_data_scope`  (
  `user_data_scope_id` bigint(20) NOT NULL COMMENT '主键',
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `org_id` bigint(20) NOT NULL COMMENT '机构id',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`user_data_scope_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '用户数据范围' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_user_org
-- ----------------------------
CREATE TABLE `sys_user_org`  (
  `user_org_id` bigint(20) NOT NULL COMMENT '企业员工主键id',
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `org_id` bigint(20) NOT NULL COMMENT '所属机构id',
  `position_id` bigint(20) NULL DEFAULT NULL COMMENT '职位id',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '添加时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '添加人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`user_org_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '用户组织机构关联' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_org
-- ----------------------------
INSERT INTO `sys_user_org` VALUES (1339554696976781405, 1339550467939639299, 1339554696976781407, 1339554696976781332, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
CREATE TABLE `sys_user_role`  (
  `user_role_id` bigint(20) NOT NULL COMMENT '主键',
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `role_id` bigint(20) NOT NULL COMMENT '角色id',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`user_role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '用户角色关联' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1339554696976781379, 1339550467939639299, 1339550467939639303, '2020-12-17 20:57:31', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for toc_customer
-- ----------------------------
CREATE TABLE `toc_customer`  (
  `customer_id` bigint(20) NOT NULL COMMENT '主键id',
  `account` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账号',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码，BCrypt',
  `nick_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称（显示名称）',
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `telephone` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机',
  `verify_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '邮箱或手机验证码',
  `verified_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'N' COMMENT '是否已经邮箱或手机验证通过：Y-通过，N-未通过',
  `avatar` bigint(20) NULL DEFAULT NULL COMMENT '用户头像（文件表id）',
  `avatar_object_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像的文件全名',
  `score` int(11) NULL DEFAULT NULL COMMENT '用户积分',
  `status_flag` tinyint(4) NULL DEFAULT NULL COMMENT '用户状态：1-启用，2-禁用',
  `secret_key` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '用户秘钥，用在调用会员校验等',
  `member_expire_time` datetime(0) NULL DEFAULT NULL COMMENT '会员截止日期，到期时间',
  `last_login_ip` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '上次登录ip',
  `last_login_time` datetime(0) NULL DEFAULT NULL COMMENT '上次登录时间',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` bigint(20) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`customer_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = 'C端用户表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
