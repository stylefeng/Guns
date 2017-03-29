package com.stylefeng.guns.common.constant.factory;

import com.stylefeng.guns.common.constant.state.*;
import com.stylefeng.guns.core.support.StrKit;
import com.stylefeng.guns.core.util.Convert;
import com.stylefeng.guns.core.util.SpringContextHolder;
import com.stylefeng.guns.core.util.ToolUtil;
import com.stylefeng.guns.persistence.dao.DeptMapper;
import com.stylefeng.guns.persistence.dao.RoleMapper;
import com.stylefeng.guns.persistence.model.Dept;
import com.stylefeng.guns.persistence.model.Role;

/**
 * 常量的生产工厂
 *
 * @author fengshuonan
 * @date 2017年2月13日 下午10:55:21
 */
public class ConstantFactory {

    private static RoleMapper roleMapper = SpringContextHolder.getBean(RoleMapper.class);
    private static DeptMapper deptMapper = SpringContextHolder.getBean(DeptMapper.class);


    /**
     * 通过角色ids获取角色名称
     */
    public static String getRoleName(String roleIds) {
        Integer[] roles = Convert.toIntArray(roleIds);
        StringBuilder sb = new StringBuilder();
        for (int role : roles) {
            Role roleObj = roleMapper.selectById(role);
            if (ToolUtil.isNotEmpty(roleObj) && ToolUtil.isNotEmpty(roleObj.getName())) {
                sb.append(roleObj.getName()).append(",");
            }
        }
        return StrKit.removeSuffix(sb.toString(), ",");
    }

    /**
     * 通过角色id获取角色名称
     */
    public static String getSingleRoleName(Integer roleId) {
        if (0 == roleId) {
            return "--";
        }
        Role roleObj = roleMapper.selectById(roleId);
        if (ToolUtil.isNotEmpty(roleObj) && ToolUtil.isNotEmpty(roleObj.getName())) {
            return roleObj.getName();
        }
        return "";
    }

    /**
     * 通过角色id获取角色英文名称
     */
    public static String getSingleRoleTip(Integer roleId) {
        if (0 == roleId) {
            return "--";
        }
        Role roleObj = roleMapper.selectById(roleId);
        if (ToolUtil.isNotEmpty(roleObj) && ToolUtil.isNotEmpty(roleObj.getName())) {
            return roleObj.getTips();
        }
        return "";
    }

    /**
     * 获取部门名称
     */
    public static String getDeptName(Integer deptId) {
        Dept dept = deptMapper.selectById(deptId);
        if (ToolUtil.isNotEmpty(dept) && ToolUtil.isNotEmpty(dept.getFullname())) {
            return dept.getFullname();
        }
        return "";
    }

    /**
     * 获取性别名称
     */
    public static String getSexName(Integer sex) {
        return Sex.valueOf(sex);
    }

    /**
     * 获取用户登录状态
     */
    public static String getStatusName(Integer status) {
        return ManagerStatus.valueOf(status);
    }

    /**
     * 获取菜单状态
     */
    public static String getMenuStatusName(Integer status) {
        return MenuStatus.valueOf(status);
    }

}
