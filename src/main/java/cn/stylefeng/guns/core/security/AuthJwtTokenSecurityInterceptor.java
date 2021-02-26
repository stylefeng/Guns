package cn.stylefeng.guns.core.security;

import cn.hutool.core.util.StrUtil;
import cn.stylefeng.guns.core.security.base.BaseSecurityInterceptor;
import cn.stylefeng.roses.kernel.auth.api.AuthServiceApi;
import cn.stylefeng.roses.kernel.auth.api.exception.AuthException;
import cn.stylefeng.roses.kernel.auth.api.exception.enums.AuthExceptionEnum;
import cn.stylefeng.roses.kernel.scanner.api.pojo.resource.ResourceDefinition;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 鉴权的过滤器，用来鉴权token
 *
 * @author fengshuonan
 * @date 2020/12/15 22:45
 */
@Component
@Slf4j
public class AuthJwtTokenSecurityInterceptor extends BaseSecurityInterceptor {

    /**
     * 登陆服务Api
     */
    @Resource
    private AuthServiceApi authServiceApi;

    @Override
    public void filterAction(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, ResourceDefinition resourceDefinition, String token) {

        // 1. 获取当前请求的路径
        String requestURI = httpServletRequest.getRequestURI();

        // 2. 如果需要登录
        if (resourceDefinition.getRequiredLoginFlag()) {

            // token为空，返回用户校验失败
            if (StrUtil.isEmpty(token)) {
                throw new AuthException(AuthExceptionEnum.TOKEN_GET_ERROR);
            }

            // 3.校验token和用户会话信息是否正确
            authServiceApi.checkAuth(token, requestURI);
        }
    }

}
