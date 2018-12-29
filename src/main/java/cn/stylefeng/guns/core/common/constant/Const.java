/**
 * Copyright 2018-2020 stylefeng & fengshuonan (https://gitee.com/stylefeng)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cn.stylefeng.guns.core.common.constant;

import cn.hutool.core.collection.CollectionUtil;

import java.util.List;

/**
 * 系统常量
 *
 * @author fengshuonan
 * @date 2017年2月12日 下午9:42:53
 */
public interface Const {

    /**
     * 系统默认的管理员密码
     */
    String DEFAULT_PWD = "111111";

    /**
     * 管理员角色的名字
     */
    String ADMIN_NAME = "administrator";

    /**
     * 管理员id
     */
    Long ADMIN_ID = 1L;

    /**
     * 超级管理员角色id
     */
    Long ADMIN_ROLE_ID = 1L;

    /**
     * 接口文档的菜单名
     */
    String API_MENU_NAME = "接口文档";

    /**
     * 不需要权限验证的资源表达式
     */
    List<String> NONE_PERMISSION_RES = CollectionUtil.newLinkedList("/assets/**", "/gunsApi/**", "/login", "/global/sessionError", "/kaptcha", "/error", "/global/error");

}
