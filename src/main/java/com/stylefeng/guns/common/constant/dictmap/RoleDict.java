package com.stylefeng.guns.common.constant.dictmap;

import com.stylefeng.guns.common.constant.dictmap.base.AbstractDictMap;

/**
 * 角色的字典
 *
 * @author fengshuonan
 * @date 2017-05-06 15:01
 */
public class RoleDict extends AbstractDictMap {

    @Override
    public void init() {
        put("roleId","角色id");
        put("id","角色id");
        put("num","角色排序");
        put("pid","角色的父级");
        put("name","角色名称");
        put("deptid","部门id");
        put("tips","备注");
    }

    @Override
    protected void initBeWrapped() {
        putFieldWrapperMethodName("pid","getSingleRoleName");
        putFieldWrapperMethodName("deptid","getDeptName");
    }
}
