package cn.stylefeng.guns.modular.system.menu;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 菜单管理界面
 *
 * @author fengshuonan
 * @date 2021/1/6 16:43
 */
@Controller
@ApiResource(name = "菜单管理界面")
public class MenuViewController {

    /**
     * 菜单管理首页
     *
     * @author fengshuonan
     * @date 2021/1/6 13:32
     */
    @GetResource(name = "菜单管理首页", path = "/view/menu")
    public String menuIndex() {
        return "/modular/system/menu/menu.html";
    }

    /**
     * 新增菜单界面
     *
     * @author fengshuonan
     * @date 2021/1/6 13:37
     */
    @GetResource(name = "新增菜单界面", path = "/view/menu/add")
    public String menuAdd() {
        return "/modular/system/menu/menu_add.html";
    }

    /**
     * 修改菜单界面
     *
     * @author fengshuonan
     * @date 2021/1/6 13:37
     */
    @GetResource(name = "修改菜单界面", path = "/view/menu/edit")
    public String menuEdit() {
        return "/modular/system/menu/menu_edit.html";
    }

}
