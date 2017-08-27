/**
 * Copyright (c) 2015-2017, Chill Zhuang 庄骞 (smallchill@163.com).
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
package com.stylefeng.guns.core.shiro.check;

import com.stylefeng.guns.core.util.SpringContextHolder;

/**
 * 权限检查工厂
 */
public class PermissionCheckManager {
    private final static PermissionCheckManager me = new PermissionCheckManager();

    private ICheck defaultCheckFactory = SpringContextHolder.getBean(ICheck.class);

    public static PermissionCheckManager me() {
        return me;
    }

    private PermissionCheckManager() {
    }

    public PermissionCheckManager(ICheck checkFactory) {
        this.defaultCheckFactory = checkFactory;
    }

    public void setDefaultCheckFactory(ICheck defaultCheckFactory) {
        this.defaultCheckFactory = defaultCheckFactory;
    }

    public static boolean check(Object[] permissions) {
        return me.defaultCheckFactory.check(permissions);
    }

    public static boolean checkAll() {
        return me.defaultCheckFactory.checkAll();
    }
}
