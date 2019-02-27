package cn.stylefeng.guns.modular.system.service;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.core.common.constant.factory.ConstantFactory;
import cn.stylefeng.guns.core.common.constant.state.MenuStatus;
import cn.stylefeng.guns.core.common.exception.BizExceptionEnum;
import cn.stylefeng.guns.core.common.node.MenuNode;
import cn.stylefeng.guns.core.common.node.ZTreeNode;
import cn.stylefeng.guns.core.common.page.LayuiPageFactory;
import cn.stylefeng.guns.core.listener.ConfigListener;
import cn.stylefeng.guns.modular.system.entity.Menu;
import cn.stylefeng.guns.modular.system.mapper.MenuMapper;
import cn.stylefeng.guns.modular.system.model.MenuDto;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.RequestEmptyException;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
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
     * 添加菜单
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:59 PM
     */
    @Transactional
    public void addMenu(MenuDto menuDto) {

        if (ToolUtil.isOneEmpty(menuDto, menuDto.getCode(), menuDto.getName(), menuDto.getPid(), menuDto.getMenuFlag(), menuDto.getUrl())) {
            throw new RequestEmptyException();
        }

        //判断是否已经存在该编号
        String existedMenuName = ConstantFactory.me().getMenuNameByCode(menuDto.getCode());
        if (ToolUtil.isNotEmpty(existedMenuName)) {
            throw new ServiceException(BizExceptionEnum.EXISTED_THE_MENU);
        }

        //组装属性，设置父级菜单编号
        Menu resultMenu = this.menuSetPcode(menuDto);

        resultMenu.setStatus(MenuStatus.ENABLE.getCode());

        this.save(resultMenu);
    }

    /**
     * 更新菜单
     *
     * @author fengshuonan
     * @Date 2019/2/27 4:09 PM
     */
    @Transactional(rollbackFor = Exception.class)
    public void updateMenu(MenuDto menuDto) {

        //如果菜单为空
        if (menuDto == null || ToolUtil.isOneEmpty(menuDto.getMenuId(), menuDto.getCode())) {
            throw new RequestEmptyException();
        }

        //获取旧的菜单
        Long id = menuDto.getMenuId();
        Menu menu = this.getById(id);

        if (menu == null) {
            throw new RequestEmptyException();
        }

        //如果菜单编号修改了，则遍历该菜单的所有子菜单，把对应的编码改了
        if (!menu.getCode().equals(menuDto.getCode())) {
            this.updateSubMenuCodes(menu.getCode(), menuDto.getCode());
        }

        //设置父级菜单编号
        Menu resultMenu = this.menuSetPcode(menuDto);

        this.updateById(resultMenu);
    }

    /**
     * 更新所有子菜单的编码
     *
     * @param code    原编码
     * @param newCode 新编码
     * @author fengshuonan
     * @Date 2019/2/27 4:25 PM
     */
    @Transactional(rollbackFor = Exception.class)
    public void updateSubMenuCodes(String code, String newCode) {

        QueryWrapper<Menu> wrapper = new QueryWrapper<>();
        wrapper = wrapper.like("PCODES", "%[" + code + "]%");
        List<Menu> menus = menuMapper.selectList(wrapper);

        for (Menu menu : menus) {
            if (code.equals(menu.getPcode())) {
                menu.setPcode(newCode);
            }
            String pcodes = menu.getPcodes();
            String resultPcodes = pcodes.replaceFirst("\\[" + code + "\\]", "\\[" + newCode + "\\]");
            menu.setPcodes(resultPcodes);
            this.updateById(menu);
        }

    }

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
        QueryWrapper<Menu> wrapper = new QueryWrapper<>();
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
    public Page<Map<String, Object>> selectMenus(String condition, String level, Long menuId) {

        //获取menuId的code
        String code = "";
        if (menuId != null && menuId != 0L) {
            Menu menu = this.getById(menuId);
            code = menu.getCode();
        }

        Page page = LayuiPageFactory.defaultPage();

        return this.baseMapper.selectMenus(page, condition, level, menuId, code);
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
        List<MenuNode> menus = this.baseMapper.getMenusByRoleIds(roleIds);

        //给所有的菜单url加上ctxPath
        for (MenuNode menuItem : menus) {
            menuItem.setUrl(ConfigListener.getConf().get("contextPath") + menuItem.getUrl());
        }

        return menus;
    }

    /**
     * 根据code查询菜单
     *
     * @author fengshuonan
     * @Date 2018/12/20 21:54
     */
    public Menu selectByCode(String code) {
        Menu menu = new Menu();
        menu.setCode(code);
        QueryWrapper<Menu> queryWrapper = new QueryWrapper<>(menu);
        return this.baseMapper.selectOne(queryWrapper);
    }

    /**
     * 根据请求的父级菜单编号设置pcode和层级
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:54 PM
     */
    public Menu menuSetPcode(MenuDto menuParam) {

        Menu resultMenu = new Menu();
        BeanUtil.copyProperties(menuParam, resultMenu);

        if (ToolUtil.isEmpty(menuParam.getPid()) || menuParam.getPid().equals(0L)) {
            resultMenu.setPcode("0");
            resultMenu.setPcodes("[0],");
            resultMenu.setLevels(1);
        } else {
            Long pid = menuParam.getPid();
            Menu pMenu = this.getById(pid);
            Integer pLevels = pMenu.getLevels();
            resultMenu.setPcode(pMenu.getCode());

            //如果编号和父编号一致会导致无限递归
            if (menuParam.getCode().equals(menuParam.getPcode())) {
                throw new ServiceException(BizExceptionEnum.MENU_PCODE_COINCIDENCE);
            }

            resultMenu.setLevels(pLevels + 1);
            resultMenu.setPcodes(pMenu.getPcodes() + "[" + pMenu.getCode() + "],");
        }

        return resultMenu;
    }

    /**
     * 获取菜单树形列表
     *
     * @author fengshuonan
     * @Date 2019/2/23 22:02
     */
    public List<Map<String, Object>> selectMenuTree(String condition, String level) {
        List<Map<String, Object>> maps = this.baseMapper.selectMenuTree(condition, level);

        if (maps == null) {
            maps = new ArrayList<>();
        }

        //创建根节点
        Menu menu = new Menu();
        menu.setMenuId(-1L);
        menu.setName("根节点");
        menu.setCode("0");
        menu.setPcode("-2");

        maps.add(BeanUtil.beanToMap(menu));

        return maps;
    }

}
