package cn.stylefeng.guns.modular.log;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 登陆日志管理控制器界面渲染
 *
 * @param
 * @return
 * @author TSQ
 * @date 2021/1/5 14:42
 */
@Controller
@Slf4j
@ApiResource(name = "登陆日志管理相关的界面渲染", path = "loginLog")
public class LoginLogViewController {

    private String PREFIX = "/modular/system/log";

    /**
     * 登陆日志管理列表
     * 
     * @param 
     * @return 
     * @author TSQ
     * @date 2021/1/5 15:17
     */
    @GetResource(name="登陆日志管理列表" , path = "", requiredPermission = false ,requiredLogin = false)
    public String indexView(){
        return PREFIX + "/login_log.html";
    }

}
