package cn.stylefeng.guns.modular.system.service;

import cn.hutool.core.convert.Convert;
import cn.stylefeng.guns.core.common.node.ZTreeNode;
import cn.stylefeng.guns.modular.system.entity.Relation;
import cn.stylefeng.guns.modular.system.entity.Role;
import cn.stylefeng.guns.modular.system.mapper.RelationMapper;
import cn.stylefeng.guns.modular.system.mapper.RoleMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 角色表 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class RoleService extends ServiceImpl<RoleMapper, Role> {

    @Resource
    private RoleMapper roleMapper;

    @Resource
    private RelationMapper relationMapper;

    /**
     * 设置某个角色的权限
     *
     * @param roleId 角色id
     * @param ids    权限的id
     * @date 2017年2月13日 下午8:26:53
     */
    @Transactional
    public void setAuthority(Long roleId, String ids) {

        // 删除该角色所有的权限
        this.roleMapper.deleteRolesById(roleId);

        // 添加新的权限
        for (Long id : Convert.toLongArray(ids.split(","))) {
            Relation relation = new Relation();
            relation.setRoleId(roleId);
            relation.setMenuId(id);
            this.relationMapper.insert(relation);
        }
    }

    /**
     * 删除角色
     *
     * @author stylefeng
     * @Date 2017/5/5 22:24
     */
    @Transactional
    public void delRoleById(Long roleId) {
        //删除角色
        this.roleMapper.deleteById(roleId);

        // 删除该角色所有的权限
        this.roleMapper.deleteRolesById(roleId);
    }

    /**
     * 根据条件查询角色列表
     *
     * @return
     * @date 2017年2月12日 下午9:14:34
     */
    public List<Map<String, Object>> selectRoles(String condition) {
        return this.baseMapper.selectRoles(condition);
    }

    /**
     * 删除某个角色的所有权限
     *
     * @param roleId 角色id
     * @return
     * @date 2017年2月13日 下午7:57:51
     */
    public int deleteRolesById(Long roleId) {
        return this.baseMapper.deleteRolesById(roleId);
    }

    /**
     * 获取角色列表树
     *
     * @return
     * @date 2017年2月18日 上午10:32:04
     */
    public List<ZTreeNode> roleTreeList() {
        return this.baseMapper.roleTreeList();
    }

    /**
     * 获取角色列表树
     *
     * @return
     * @date 2017年2月18日 上午10:32:04
     */
    public List<ZTreeNode> roleTreeListByRoleId(String[] roleId) {
        return this.baseMapper.roleTreeListByRoleId(roleId);
    }

}
