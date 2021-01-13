package cn.stylefeng.guns.modular.log;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 登录日志视图控制器
 *
 * @author chenjinlong
 * @date 2021/1/13 19:45
 */
@Controller
@Slf4j
@ApiResource(name = "登陆日志管理相关的界面渲染", path = "/view/loginLog")
public class LoginLogViewController {

    private String PREFIX = "/modular/system/log";

    /**
     * 登录日志-视图
     *
     * @param
     * @return
     * @author chenjinlong
     * @date 2021/1/13 19:44
     */
    @GetResource(name = "登录日志-视图", path = "")
    public String indexView() {
        return PREFIX + "/login_log.html";
    }

}
