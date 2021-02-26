package cn.stylefeng.guns.modular.system.index.controller;

import cn.stylefeng.guns.modular.system.index.service.IndexService;
import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import javax.annotation.Resource;

/**
 * 首页相关的界面渲染
 *
 * @author fengshuonan
 * @date 2020/12/27 16:23
 */
@Controller
@ApiResource(name = "首页相关的界面渲染")
public class IndexViewController {

    @Resource
    private IndexService indexService;

    /**
     * 首页界面
     *
     * @author fengshuonan
     * @date 2020/12/13 17:19
     */
    @GetResource(name = "首页界面", path = "/", requiredLogin = false, requiredPermission = false, viewFlag = true)
    public String indexView(Model model) {

        // 当前用户已经登录，跳转到首页
        if (LoginContext.me().hasLogin()) {
            model.addAllAttributes(indexService.createIndexRenderAttributes());
            return "/index.html";
        }

        // 当前用户没有登录，跳转到登录页面
        return "/login.html";
    }

    /**
     * 个人中心界面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:53
     */
    @GetResource(name = "个人中心界面", path = "/view/personal", requiredPermission = false)
    public String personal(Model model) {
        model.addAllAttributes(indexService.createPersonInfoRenderAttributes());
        return "/modular/system/index/personal_info.html";
    }

    /**
     * 锁屏界面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:34
     */
    @GetResource(name = "锁屏界面", path = "/view/lock", requiredPermission = false)
    public String lock() {
        return "/modular/system/index/lock_screen.html";
    }

    /**
     * 主题切换界面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:42
     */
    @GetResource(name = "主题切换界面", path = "/view/theme", requiredPermission = false)
    public String theme() {
        return "/modular/system/index/theme.html";
    }

    /**
     * 修改密码界面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:42
     */
    @GetResource(name = "修改密码界面", path = "/view/changePassword", requiredPermission = false)
    public String changePassword() {
        return "/modular/system/index/change_password.html";
    }

}
