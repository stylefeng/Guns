package cn.stylefeng.guns.modular.system.service;

import cn.stylefeng.guns.core.common.node.MenuNode;
import cn.stylefeng.guns.core.common.node.ZTreeNode;
import cn.stylefeng.guns.modular.system.entity.Menu;
import cn.stylefeng.guns.modular.system.mapper.MenuMapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 菜单表 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class MenuService extends ServiceImpl<MenuMapper, Menu> {

    @Resource
    private MenuMapper menuMapper;

    /**
     * 删除菜单
     *
     * @author stylefeng
     * @Date 2017/5/5 22:20
     */
    @Transactional
    public void delMenu(Long menuId) {

        //删除菜单
        this.menuMapper.deleteById(menuId);

        //删除关联的relation
        this.menuMapper.deleteRelationByMenu(menuId);
    }

    /**
     * 删除菜单包含所有子菜单
     *
     * @author stylefeng
     * @Date 2017/6/13 22:02
     */
    @Transactional
    public void delMenuContainSubMenus(Long menuId) {

        Menu menu = menuMapper.selectById(menuId);

        //删除当前菜单
        delMenu(menuId);

        //删除所有子菜单
        Wrapper<Menu> wrapper = new EntityWrapper<>();
        wrapper = wrapper.like("PCODES", "%[" + menu.getCode() + "]%");
        List<Menu> menus = menuMapper.selectList(wrapper);
        for (Menu temp : menus) {
            delMenu(temp.getMenuId());
        }
    }

    /**
     * 根据条件查询菜单
     *
     * @return
     * @date 2017年2月12日 下午9:14:34
     */
    public List<Map<String, Object>> selectMenus(String condition, String level) {
        return this.baseMapper.selectMenus(condition, level);
    }

    /**
     * 根据条件查询菜单
     *
     * @return
     * @date 2017年2月12日 下午9:14:34
     */
    public List<Long> getMenuIdsByRoleId(Long roleId) {
        return this.baseMapper.getMenuIdsByRoleId(roleId);
    }

    /**
     * 获取菜单列表树
     *
     * @return
     * @date 2017年2月19日 下午1:33:51
     */
    public List<ZTreeNode> menuTreeList() {
        return this.baseMapper.menuTreeList();
    }

    /**
     * 获取菜单列表树
     *
     * @return
     * @date 2017年2月19日 下午1:33:51
     */
    public List<ZTreeNode> menuTreeListByMenuIds(List<Long> menuIds) {
        return this.baseMapper.menuTreeListByMenuIds(menuIds);
    }

    /**
     * 删除menu关联的relation
     *
     * @param menuId
     * @return
     * @date 2017年2月19日 下午4:10:59
     */
    public int deleteRelationByMenu(Long menuId) {
        return this.baseMapper.deleteRelationByMenu(menuId);
    }

    /**
     * 获取资源url通过角色id
     *
     * @param roleId
     * @return
     * @date 2017年2月19日 下午7:12:38
     */
    public List<String> getResUrlsByRoleId(Long roleId) {
        return this.baseMapper.getResUrlsByRoleId(roleId);
    }

    /**
     * 根据角色获取菜单
     *
     * @param roleIds
     * @return
     * @date 2017年2月19日 下午10:35:40
     */

    public List<MenuNode> getMenusByRoleIds(List<Long> roleIds) {
        return this.baseMapper.getMenusByRoleIds(roleIds);
    }

}
