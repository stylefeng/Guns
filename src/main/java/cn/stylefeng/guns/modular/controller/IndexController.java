package cn.stylefeng.guns.modular.controller;

import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import cn.stylefeng.roses.kernel.rule.pojo.response.ResponseData;
import cn.stylefeng.roses.kernel.rule.pojo.response.SuccessResponseData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 首页接口
 *
 * @author fengshuonan
 * @date 2020/12/13 17:19
 */
@Controller
@Slf4j
@ApiResource(name = "首页接口")
public class IndexController {

    /**
     * 首页接口
     *
     * @author fengshuonan
     * @date 2020/12/13 17:19
     */
    @ResponseBody
    @GetResource(name = "首页接口", path = "/", requiredPermission = false, requiredLogin = false)
    public ResponseData logoutPage() {
        return new SuccessResponseData("欢迎使用Guns");
    }

    /**
     * 首页接口
     *
     * @author fengshuonan
     * @date 2020/12/13 17:19
     */
    @GetResource(name = "首页接口 view渲染", path = "/test")
    public String test() {
        return "/demos/test.html";
    }

    /**
     * 获取当前登录用户信息
     *
     * @return 用户登录可见的个人信息
     * @author huangyao
     * @date 2020/12/20 21:36
     */
    @GetResource(name = "获取当前登录用户信息", path = "/getLoginUserDetail")
    public ResponseData getLoginUserDetail() {
        return new SuccessResponseData(LoginContext.me().getLoginUser());
    }

    /**
     * 获取用户左侧菜单 todo
     *
     * @author fengshuonan
     * @date 2020/12/24 22:23
     */
    @GetResource(name = "获取用户左侧菜单", path = "/getLeftMenuTree")
    public ResponseData getLeftMenuTree() {
        return new SuccessResponseData();
    }

}
