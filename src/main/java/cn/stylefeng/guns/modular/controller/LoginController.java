package cn.stylefeng.guns.modular.controller;

import cn.stylefeng.roses.kernel.auth.api.AuthServiceApi;
import cn.stylefeng.roses.kernel.auth.api.pojo.auth.LoginRequest;
import cn.stylefeng.roses.kernel.auth.api.pojo.auth.LoginResponse;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.PostResource;
import cn.stylefeng.roses.kernel.rule.pojo.response.ResponseData;
import cn.stylefeng.roses.kernel.rule.pojo.response.SuccessResponseData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 登录登出控制器
 *
 * @author majianguo
 * @date 2020/12/3 下午6:15
 */
@RestController
@Slf4j
@ApiResource(name = "登陆登出管理")
public class LoginController {

    @Resource
    private AuthServiceApi authServiceApi;

    /**
     * 用户登陆
     *
     * @param loginRequest 用户帐号和密码
     * @return 登陆成功返回token以及用户信息
     * @author majianguo
     * @date 2020/12/4 上午9:05
     */
    @PostResource(name = "登陆", path = "/login", requiredLogin = false, requiredPermission = false)
    public ResponseData doAuth(@RequestBody @Validated LoginRequest loginRequest) {
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
    @GetResource(name = "登出", path = "/logout", requiredPermission = false)
    public ResponseData logoutPage() {
        authServiceApi.logout();
        return new SuccessResponseData();
    }

}
