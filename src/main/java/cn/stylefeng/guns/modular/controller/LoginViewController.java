package cn.stylefeng.guns.modular.controller;

import cn.stylefeng.roses.kernel.auth.api.AuthServiceApi;
import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.auth.api.pojo.auth.LoginRequest;
import cn.stylefeng.roses.kernel.auth.api.pojo.auth.LoginResponse;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.PostResource;
import cn.stylefeng.roses.kernel.rule.pojo.response.ResponseData;
import cn.stylefeng.roses.kernel.rule.pojo.response.SuccessResponseData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * 首页相关的界面渲染
 *
 * @author fengshuonan
 * @date 2020/12/27 16:23
 */
@Controller
@Slf4j
@ApiResource(name = "登录相关的接口")
public class LoginViewController {

    @Resource
    private AuthServiceApi authServiceApi;

    /**
     * 登录界面
     *
     * @author fengshuonan
     * @date 2020/12/27 17:10
     */
    @GetResource(name = "登录界面", path = "/login", requiredPermission = false, requiredLogin = false)
    public String login() {
        if (LoginContext.me().hasLogin()) {
            return "redirect:/";
        } else {
            return "/login.html";
        }
    }

    /**
     * 登录接口
     *
     * @author fengshuonan
     * @date 2020/12/27 17:10
     */
    @PostResource(name = "登录接口", path = "/loginAction", requiredPermission = false, requiredLogin = false)
    @ResponseBody
    public ResponseData loginAction(@RequestBody @Validated LoginRequest loginRequest) {
        LoginResponse loginResponse = authServiceApi.login(loginRequest);
        return new SuccessResponseData(loginResponse.getToken());
    }

    /**
     * 用户登出
     *
     * @return 登出成功
     * @author majianguo
     * @date 2020/12/4 上午9:05
     */
    @GetResource(name = "登出接口", path = "/logout", requiredPermission = false)
    @ResponseBody
    public ResponseData logoutPage() {
        authServiceApi.logout();
        return new SuccessResponseData();
    }

}
