package cn.stylefeng.guns.modular.system.app;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 应用管理界面
 *
 * @author fengshuonan
 * @date 2021/1/6 13:32
 */
@Controller
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
        return "/modular/system/app/app.html";
    }

    /**
     * 新增应用界面
     *
     * @author fengshuonan
     * @date 2021/1/6 13:37
     */
    @GetResource(name = "新增应用界面", path = "/view/app/add")
    public String appAdd() {
        return "/modular/system/app/app_add.html";
    }

    /**
     * 编辑应用界面
     *
     * @author fengshuonan
     * @date 2021/1/6 13:37
     */
    @GetResource(name = "编辑应用界面", path = "/view/app/edit")
    public String appEdit() {
        return "/modular/system/app/app_edit.html";
    }

}
