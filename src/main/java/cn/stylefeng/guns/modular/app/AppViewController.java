package cn.stylefeng.guns.modular.app;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 应用管理界面
 *
 * @author fengshuonan
 * @date 2021/1/6 13:32
 */
@Controller
@Slf4j
@ApiResource(name = "应用管理界面")
public class AppViewController {

    /**
     * 应用管理首页
     *
     * @author fengshuonan
     * @date 2021/1/6 13:32
     */
    @GetResource(name = "应用管理首页", path = "/view/app")
    public String appIndex() {
        return "/modular/auth/app/app.html";
    }

    /**
     * 新增角色界面
     *
     * @author fengshuonan
     * @date 2021/1/6 13:37
     */
    @GetResource(name = "新增角色界面", path = "/view/app/add")
    public String appAdd() {
        return "/modular/auth/app/app_add.html";
    }

    /**
     * 编辑角色界面
     *
     * @author fengshuonan
     * @date 2021/1/6 13:37
     */
    @GetResource(name = "编辑角色界面", path = "/view/app/edit")
    public String appEdit() {
        return "/modular/auth/app/app_edit.html";
    }

}
