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
package cn.stylefeng.guns.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.core.common.annotion.BussinessLog;
import cn.stylefeng.guns.core.common.annotion.Permission;
import cn.stylefeng.guns.core.common.constant.Const;
import cn.stylefeng.guns.core.common.constant.dictmap.MenuDict;
import cn.stylefeng.guns.core.common.constant.factory.ConstantFactory;
import cn.stylefeng.guns.core.common.exception.BizExceptionEnum;
import cn.stylefeng.guns.core.common.node.ZTreeNode;
import cn.stylefeng.guns.core.log.LogObjectHolder;
import cn.stylefeng.guns.modular.system.entity.Menu;
import cn.stylefeng.guns.modular.system.model.MenuDto;
import cn.stylefeng.guns.modular.system.service.MenuService;
import cn.stylefeng.guns.modular.system.warpper.MenuWarpper;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 菜单控制器
 *
 * @author fengshuonan
 * @Date 2017年2月12日21:59:14
 */
@Controller
@RequestMapping("/menu")
public class MenuController extends BaseController {

    private static String PREFIX = "/system/menu/";

    @Autowired
    private MenuService menuService;

    /**
     * 跳转到菜单列表列表页面
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "menu.html";
    }

    /**
     * 跳转到菜单列表列表页面
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @RequestMapping(value = "/menu_add")
    public String menuAdd() {
        return PREFIX + "menu_add.html";
    }

    /**
     * 跳转到菜单详情列表页面
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping(value = "/menu_edit")
    public String menuEdit(@RequestParam Long menuId) {
        if (ToolUtil.isEmpty(menuId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }

        //获取菜单当前信息，记录日志用
        Menu menu = this.menuService.selectById(menuId);
        LogObjectHolder.me().set(menu);

        return PREFIX + "menu_edit.html";
    }

    /**
     * 修该菜单
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping(value = "/edit")
    @BussinessLog(value = "修改菜单", key = "name", dict = MenuDict.class)
    @ResponseBody
    public ResponseData edit(MenuDto menu) {

        //设置父级菜单编号
        Menu resultMenu = this.menuService.menuSetPcode(menu);

        this.menuService.updateById(resultMenu);

        return SUCCESS_TIP;
    }

    /**
     * 获取菜单列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(@RequestParam(required = false) String menuName,
                       @RequestParam(required = false) String level,
                       @RequestParam(required = false) Long menuId) {
        List<Map<String, Object>> menus = this.menuService.selectMenus(menuName, level, menuId);
        return super.warpObject(new MenuWarpper(menus));
    }

    /**
     * 新增菜单
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping(value = "/add")
    @BussinessLog(value = "菜单新增", key = "name", dict = MenuDict.class)
    @ResponseBody
    public ResponseData add(MenuDto menu) {
        this.menuService.addMenu(menu);
        return SUCCESS_TIP;
    }

    /**
     * 删除菜单
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @Permission(Const.ADMIN_NAME)
    @RequestMapping(value = "/remove")
    @BussinessLog(value = "删除菜单", key = "menuId", dict = MenuDict.class)
    @ResponseBody
    public ResponseData remove(@RequestParam Long menuId) {
        if (ToolUtil.isEmpty(menuId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }

        //缓存菜单的名称
        LogObjectHolder.me().set(ConstantFactory.me().getMenuName(menuId));

        this.menuService.delMenuContainSubMenus(menuId);

        return SUCCESS_TIP;
    }

    /**
     * 查看菜单
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @RequestMapping(value = "/view/{menuId}")
    @ResponseBody
    public ResponseData view(@PathVariable Long menuId) {
        if (ToolUtil.isEmpty(menuId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }
        Menu menu = this.menuService.selectById(menuId);
        return ResponseData.success(menu);
    }

    /**
     * 获取菜单信息
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:53 PM
     */
    @RequestMapping(value = "/getMenuInfo")
    @ResponseBody
    public ResponseData getMenuInfo(@RequestParam Long menuId) {
        if (ToolUtil.isEmpty(menuId)) {
            throw new ServiceException(BizExceptionEnum.REQUEST_NULL);
        }

        Menu menu = this.menuService.selectById(menuId);

        MenuDto menuDto = new MenuDto();
        BeanUtil.copyProperties(menu, menuDto);

        //设置pid和父级名称
        menuDto.setPid(ConstantFactory.me().getMenuIdByCode(menuDto.getPcode()));
        menuDto.setPcodeName(ConstantFactory.me().getMenuNameByCode(menuDto.getPcode()));

        return ResponseData.success(menuDto);
    }

    /**
     * 获取菜单列表(首页用)
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:54 PM
     */
    @RequestMapping(value = "/menuTreeList")
    @ResponseBody
    public List<ZTreeNode> menuTreeList() {
        return this.menuService.menuTreeList();
    }

    /**
     * 获取菜单列表(选择父级菜单用)
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:54 PM
     */
    @RequestMapping(value = "/selectMenuTreeList")
    @ResponseBody
    public List<ZTreeNode> selectMenuTreeList() {
        List<ZTreeNode> roleTreeList = this.menuService.menuTreeList();
        roleTreeList.add(ZTreeNode.createParent());
        return roleTreeList;
    }

    /**
     * 获取角色的菜单列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:54 PM
     */
    @RequestMapping(value = "/menuTreeListByRoleId/{roleId}")
    @ResponseBody
    public List<ZTreeNode> menuTreeListByRoleId(@PathVariable Long roleId) {
        List<Long> menuIds = this.menuService.getMenuIdsByRoleId(roleId);
        if (ToolUtil.isEmpty(menuIds)) {
            return this.menuService.menuTreeList();
        } else {
            return this.menuService.menuTreeListByMenuIds(menuIds);
        }
    }

}
