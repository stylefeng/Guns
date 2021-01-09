package cn.stylefeng.guns.modular.menu;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 菜单按钮管理界面
 *
 * @author luojie
 * @date 2021/1/9 16:11
 */
@Controller
@Slf4j
@ApiResource(name = "菜单按钮管理界面")
public class MenuButtonViewController {

    /**
     * 菜单按钮管理首页
     *
     * @author luojie
     * @date 2021/1/9 16:13
     */
    @GetResource(name = "菜单管理首页", path = "/view/menuButton")
    public String menuIndex() {
        return "/modular/auth/menu/button.html";
    }

    /**
     * 新增菜单按钮界面
     *
     * @author luojie
     * @date 2021/1/9 13:56
     */
    @GetResource(name = "新增菜单按钮界面", path = "/view/menuButton/add")
    public String menuAdd() {
        return "/modular/auth/menu/button_add.html";
    }

    /**
     * 修改菜单按钮界面
     *
     * @author luojie
     * @date 2021/1/9 14:14
     */
    @GetResource(name = "修改菜单按钮界面", path = "/view/menuButton/edit")
    public String menuEdit() {
        return "/modular/auth/menu/button_edit.html";
    }

}
