package cn.stylefeng.guns.modular.user;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 在线用户查看界面
 *
 * @author fengshuonan
 * @date 2021/1/11 22:02
 */
@Controller
@Slf4j
@ApiResource(name = "在线用户查看界面")
public class OnlineUserViewController {

    /**
     * 在线用户查看界面
     *
     * @author fengshuonan
     * @date 2021/1/11 22:03
     */
    @GetResource(name = "在线用户查看界面", path = "/view/onlineUser")
    public String onlineUser() {
        return "/modular/system/onlineUser/online_user.html";
    }

}
