package cn.stylefeng.guns.modular.system.log;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 登陆日志管理控制器界面渲染
 *
 * @author TSQ
 * @date 2021/1/5 14:42
 */
@Controller
@ApiResource(name = "登陆日志管理相关的界面渲染")
public class LoginLogViewController {

    /**
     * 登陆日志管理列表
     *
     * @author TSQ
     * @date 2021/1/5 15:17
     */
    @GetResource(name = "登陆日志管理列表", path = "/view/loginLog")
    public String indexView() {
        return "/modular/system/log/login_log.html";
    }

}
