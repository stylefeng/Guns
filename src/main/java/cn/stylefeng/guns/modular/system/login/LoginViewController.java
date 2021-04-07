package cn.stylefeng.guns.modular.system.login;

import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 登录相关的界面渲染
 *
 * @author fengshuonan
 * @date 2020/12/27 16:23
 */
@Controller
@ApiResource(name = "登录相关的接口")
public class LoginViewController {

    /**
     * 登录界面
     *
     * @author fengshuonan
     * @date 2020/12/27 17:10
     */
    @GetResource(name = "登录界面", path = "/view/login", requiredPermission = false, requiredLogin = false)
    public String login() {
        if (LoginContext.me().hasLogin()) {
            return "redirect:/";
        } else {
            return "/login.html";
        }
    }

}
