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
package cn.stylefeng.guns.core.common.constant.dictmap;

import cn.stylefeng.guns.core.common.constant.dictmap.base.AbstractDictMap;

/**
 * 用户的字典
 *
 * @author fengshuonan
 * @date 2017-05-06 15:01
 */
public class UserDict extends AbstractDictMap {

    @Override
    public void init() {
        put("userId", "账号");
        put("avatar", "头像");
        put("account", "账号");
        put("name", "名字");
        put("birthday", "生日");
        put("sex", "性别");
        put("email", "电子邮件");
        put("phone", "电话");
        put("roleid", "角色名称");
        put("deptId", "部门名称");
        put("roleIds", "角色名称集合");
    }

    @Override
    protected void initBeWrapped() {
        putFieldWrapperMethodName("sex", "getSexName");
        putFieldWrapperMethodName("deptId", "getDeptName");
        putFieldWrapperMethodName("roleid", "getSingleRoleName");
        putFieldWrapperMethodName("userId", "getUserAccountById");
        putFieldWrapperMethodName("roleIds", "getRoleName");
    }
}
