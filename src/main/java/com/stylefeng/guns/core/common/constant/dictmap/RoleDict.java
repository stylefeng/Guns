package com.stylefeng.guns.core.common.constant.dictmap;

import com.stylefeng.guns.core.common.constant.dictmap.base.AbstractDictMap;

/**
 * 角色的字典
 *
 * @author fengshuonan
 * @date 2017-05-06 15:01
 */
public class RoleDict extends AbstractDictMap {

    @Override
    public void init() {
        put("roleId","角色名称");
        put("num","角色排序");
        put("pid","角色的父级");
        put("name","角色名称");
        put("deptid","部门名称");
        put("tips","备注");
        put("ids","资源名称");
    }

    @Override
    protected void initBeWrapped() {
        putFieldWrapperMethodName("pid","getSingleRoleName");
        putFieldWrapperMethodName("deptid","getDeptName");
        putFieldWrapperMethodName("roleId","getSingleRoleName");
        putFieldWrapperMethodName("ids","getMenuNames");
    }
}
