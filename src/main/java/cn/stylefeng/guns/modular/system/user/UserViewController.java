package cn.stylefeng.guns.modular.system.user;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 用户管理控制器
 *
 * @author chenjinlong
 * @date 2021/1/7 19:09
 */
@Controller
@ApiResource(name = "用户管理界面渲染")
public class UserViewController {

    /**
     * 用户管理-首页-视图
     *
     * @author chenjinlong
     * @date 2021/1/7 19:09
     */
    @GetResource(name = "用户管理-首页-视图", path = "/view/user")
    public String indexView() {
        return "/modular/system/user/user.html";
    }

    /**
     * 用户管理—新增-视图
     *
     * @author chenjinlong
     * @date 2021/1/7 19:09
     */
    @GetResource(name = "用户管理—新增-视图", path = "/view/user/addView")
    public String addView() {
        return "/modular/system/user/user_add.html";
    }

    /**
     * 用户管理_修改_视图
     *
     * @author chenjinlong
     * @date 2021/1/7 19:09
     */
    @GetResource(name = "用户管理-修改-视图", path = "/view/user/editView")
    public String editView() {
        return "/modular/system/user/user_edit.html";
    }

    /**
     * 用户管理-角色-视图
     *
     * @author chenjinlong
     * @date 2021/1/7 19:09
     */
    @GetResource(name = "用户管理-角色-视图", path = "/view/user/roleView")
    public String roleView() {
        return "/modular/system/user/user_role.html";
    }

    /**
     * 用户管理-注册-视图
     *
     * @author chenjinlong
     * @date 2021/1/7 19:09
     */
    @GetResource(name = "用户管理-注册-视图", path = "/register", requiredPermission = false, requiredLogin = false)
    public String registerView() {
        return "/register.html";
    }

    /**
     * 用户管理-找回密码-视图
     *
     * @author chenjinlong
     * @date 2021/1/7 19:09
     */
    @GetResource(name = "用户管理-找回密码-视图", path = "/forget", requiredPermission = false, requiredLogin = false)
    public String forgetView() {
        return "/forget.html";
    }

}
