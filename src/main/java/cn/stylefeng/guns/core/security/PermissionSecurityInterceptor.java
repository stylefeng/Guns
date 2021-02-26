package cn.stylefeng.guns.core.security;

import cn.hutool.core.util.StrUtil;
import cn.stylefeng.guns.core.security.base.BaseSecurityInterceptor;
import cn.stylefeng.roses.kernel.auth.api.PermissionServiceApi;
import cn.stylefeng.roses.kernel.auth.api.exception.AuthException;
import cn.stylefeng.roses.kernel.auth.api.exception.enums.AuthExceptionEnum;
import cn.stylefeng.roses.kernel.scanner.api.pojo.resource.ResourceDefinition;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 权限校验的过滤器，用来校验用户有没有访问接口的权限
 *
 * @author fengshuonan
 * @date 2020/12/15 22:46
 */
@Component
@Slf4j
public class PermissionSecurityInterceptor extends BaseSecurityInterceptor {

    /**
     * 资源权限校验API
     */
    @Resource
    private PermissionServiceApi permissionServiceApi;

    @Override
    public void filterAction(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, ResourceDefinition resourceDefinition, String token) {

        // 1. 获取当前请求的路径
        String requestURI = httpServletRequest.getRequestURI();

        // 2. 如果需要鉴权
        if (resourceDefinition.getRequiredPermissionFlag()) {

            // token为空，返回用户校验失败
            if (StrUtil.isEmpty(token)) {
                throw new AuthException(AuthExceptionEnum.TOKEN_GET_ERROR);
            }

            // 3. 进行当前接口的权限校验
            permissionServiceApi.checkPermission(token, requestURI);
        }
    }

}
