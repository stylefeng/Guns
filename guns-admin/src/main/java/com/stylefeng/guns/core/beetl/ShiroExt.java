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
package com.stylefeng.guns.core.beetl;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.beetl.core.GroupTemplate;

import com.stylefeng.guns.core.shiro.ShiroUser;

public class ShiroExt {
    private static final String NAMES_DELIMETER = ",";

    /**
     * 获取当前 Subject
     *
     * @return Subject
     */
    protected static Subject getSubject() {
        return SecurityUtils.getSubject();
    }

    /**
     * 获取封装的 ShiroUser
     *
     * @return ShiroUser
     */
    public ShiroUser getUser() {
        if (isGuest()) {
            return null;
        } else {
            return (ShiroUser) getSubject().getPrincipals().getPrimaryPrincipal();
        }
    }

    /**
     * 验证当前用户是否属于该角色？,使用时与lacksRole 搭配使用
     *
     * @param roleName 角色名
     * @return 属于该角色：true，否则false
     */
    public boolean hasRole(String roleName) {
        return getSubject() != null && roleName != null
                && roleName.length() > 0 && getSubject().hasRole(roleName);
    }

    /**
     * 与hasRole标签逻辑相反，当用户不属于该角色时验证通过。
     *
     * @param roleName 角色名
     * @return 不属于该角色：true，否则false
     */
    public boolean lacksRole(String roleName) {
        return !hasRole(roleName);
    }

    /**
     * 验证当前用户是否属于以下任意一个角色。
     *
     * @param roleNames 角色列表
     * @return 属于:true,否则false
     */
    public boolean hasAnyRoles(String roleNames) {
        boolean hasAnyRole = false;
        Subject subject = getSubject();
        if (subject != null && roleNames != null && roleNames.length() > 0) {
            for (String role : roleNames.split(NAMES_DELIMETER)) {
                if (subject.hasRole(role.trim())) {
                    hasAnyRole = true;
                    break;
                }
            }
        }
        return hasAnyRole;
    }

    /**
     * 验证当前用户是否属于以下所有角色。
     *
     * @param roleNames 角色列表
     * @return 属于:true,否则false
     */
    public boolean hasAllRoles(String roleNames) {
        boolean hasAllRole = true;
        Subject subject = getSubject();
        if (subject != null && roleNames != null && roleNames.length() > 0) {
            for (String role : roleNames.split(NAMES_DELIMETER)) {
                if (!subject.hasRole(role.trim())) {
                    hasAllRole = false;
                    break;
                }
            }
        }
        return hasAllRole;
    }

    /**
     * 验证当前用户是否拥有指定权限,使用时与lacksPermission 搭配使用
     *
     * @param permission 权限名
     * @return 拥有权限：true，否则false
     */
    public boolean hasPermission(String permission) {
        return getSubject() != null && permission != null
                && permission.length() > 0
                && getSubject().isPermitted(permission);
    }

    /**
     * 与hasPermission标签逻辑相反，当前用户没有制定权限时，验证通过。
     *
     * @param permission 权限名
     * @return 拥有权限：true，否则false
     */
    public boolean lacksPermission(String permission) {
        return !hasPermission(permission);
    }

    /**
     * 已认证通过的用户。不包含已记住的用户，这是与user标签的区别所在。与notAuthenticated搭配使用
     *
     * @return 通过身份验证：true，否则false
     */
    public boolean authenticated() {
        return getSubject() != null && getSubject().isAuthenticated();
    }

    /**
     * 未认证通过用户，与authenticated标签相对应。与guest标签的区别是，该标签包含已记住用户。。
     *
     * @return 没有通过身份验证：true，否则false
     */
    public boolean notAuthenticated() {
        return !authenticated();
    }

    /**
     * 认证通过或已记住的用户。与guset搭配使用。
     *
     * @return 用户：true，否则 false
     */
    public boolean isUser() {
        return getSubject() != null && getSubject().getPrincipal() != null;
    }

    /**
     * 验证当前用户是否为“访客”，即未认证（包含未记住）的用户。用user搭配使用
     *
     * @return 访客：true，否则false
     */
    public boolean isGuest() {
        return !isUser();
    }

    /**
     * 输出当前用户信息，通常为登录帐号信息。
     *
     * @return 当前用户信息
     */
    public String principal() {
        if (getSubject() != null) {
            Object principal = getSubject().getPrincipal();
            return principal.toString();
        }
        return "";
    }

    public static void main(String[] args) {
        GroupTemplate gt = new GroupTemplate();
        gt.registerFunctionPackage("shiro", new ShiroExt());

    }
}
