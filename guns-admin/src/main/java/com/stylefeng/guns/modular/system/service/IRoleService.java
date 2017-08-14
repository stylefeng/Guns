package com.stylefeng.guns.modular.system.service;

/**
 * 角色相关业务
 *
 * @author fengshuonan
 * @Date 2017年1月10日 下午9:11:57
 */
public interface IRoleService {

    /**
     * 设置某个角色的权限
     *
     * @param roleId 角色id
     * @param ids    权限的id
     * @date 2017年2月13日 下午8:26:53
     */
    void setAuthority(Integer roleId, String ids);

    /**
     * 删除角色
     *
     * @author stylefeng
     * @Date 2017/5/5 22:24
     */
    void delRoleById(Integer roleId);
}
