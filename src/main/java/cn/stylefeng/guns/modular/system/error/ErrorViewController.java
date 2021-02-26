package cn.stylefeng.guns.modular.system.error;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

/**
 * 错误页面的跳转
 *
 * @author fengshuonan
 * @date 2021/1/1 21:20
 */
@Controller
@ApiResource(name = "错误页面的跳转")
public class ErrorViewController {

    /**
     * 跳转到session超时页面
     *
     * @author fengshuonan
     * @date 2021/1/1 21:21
     */
    @GetResource(name = "跳转到session超时页面", path = "/view/global/sessionError", requiredPermission = false, requiredLogin = false)
    public String errorPageInfo(Model model) {
        model.addAttribute("tips", "登陆超时，请您重新登陆！");
        return "/login.html";
    }

}
