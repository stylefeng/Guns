package cn.stylefeng.guns.core.security;

import cn.hutool.core.util.StrUtil;
import cn.stylefeng.roses.kernel.auth.api.AuthServiceApi;
import cn.stylefeng.roses.kernel.auth.api.PermissionServiceApi;
import cn.stylefeng.roses.kernel.auth.api.SessionManagerApi;
import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.auth.api.exception.AuthException;
import cn.stylefeng.roses.kernel.auth.api.exception.enums.AuthExceptionEnum;
import cn.stylefeng.roses.kernel.auth.api.expander.AuthConfigExpander;
import cn.stylefeng.roses.kernel.auth.api.pojo.payload.DefaultJwtPayload;
import cn.stylefeng.roses.kernel.rule.util.AntPathMatcherUtil;
import cn.stylefeng.roses.kernel.scanner.api.pojo.resource.ResourceDefinition;
import cn.stylefeng.roses.kernel.scanner.api.pojo.resource.ResourceUrlParam;
import cn.stylefeng.roses.kernel.sys.api.ResourceServiceApi;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Token和权限校验的综合过滤器
 *
 * @author fengshuonan
 * @since 2023/6/21 0:54
 */
@Component
@Slf4j
public class TokenAndPermissionInterceptor implements HandlerInterceptor {

    @Resource
    private ResourceServiceApi resourceServiceApi;

    @Resource
    private AuthServiceApi authServiceApi;

    @Resource
    private SessionManagerApi sessionManagerApi;

    @Resource
    private PermissionServiceApi permissionServiceApi;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        // 1. 获取当前请求的路径
        String requestURI = request.getRequestURI();
        requestURI = requestURI.replaceAll("/+", "/");

        // 2. 不需要权限过滤的资源，直接放行
        Boolean noneSecurityFlag = AntPathMatcherUtil.getAntMatchFLag(requestURI, request.getContextPath(),
                AuthConfigExpander.getNoneSecurityConfig());
        if (noneSecurityFlag) {
            return true;
        }

        // 3. 获取当前用户的token，可能为null
        String token = null;
        try {
            token = LoginContext.me().getToken();
        } catch (Exception e) {
            // 不做处理，因为本接口可能是不需要鉴权
        }

        // 4. 如果token不为空，则先判断是否登录过期了，过期了就直接打回，不过期不做处理
        if (StrUtil.isNotBlank(token)) {
            DefaultJwtPayload defaultJwtPayload = null;
            try {
                defaultJwtPayload = authServiceApi.validateToken(token);
            } catch (AuthException authException) {
                if (AuthExceptionEnum.AUTH_EXPIRED_ERROR.getErrorCode().equals(authException.getErrorCode())) {
                    throw authException;
                }
            }

            // 5. 刷新用户的session的过期时间
            sessionManagerApi.refreshSession(token);

            // 5.1 token没过期，但是session过期了，则从新进行会话创建操作，因为只有开启remember的用户才有这种情况
            if (defaultJwtPayload != null && !sessionManagerApi.haveSession(token)) {
                authServiceApi.createNewLoginInfo(token, defaultJwtPayload);
            }
        }

        // 6. 获取ResourceDefinition，可能为null
        ResourceUrlParam resourceUrlParam = new ResourceUrlParam();
        resourceUrlParam.setUrl(requestURI);
        ResourceDefinition resourceDefinition = resourceServiceApi.getResourceByUrl(resourceUrlParam);

        // 7. 资源找不到，则当前url不被权限控制，直接打回
        if (resourceDefinition == null) {
            throw new AuthException(AuthExceptionEnum.CANT_REQUEST_UN_OPEN_API, requestURI);
        }

        // 8. 执行token校验
        if (resourceDefinition.getRequiredLoginFlag()) {

            // token为空，返回用户校验失败
            if (StrUtil.isEmpty(token)) {
                throw new AuthException(AuthExceptionEnum.TOKEN_GET_ERROR);
            }

            // 校验token和用户会话信息是否正确
            authServiceApi.checkAuth(token, requestURI);
        }

        // 9. 执行权限校验
        if (resourceDefinition.getRequiredPermissionFlag()) {

            // token为空，返回用户校验失败
            if (StrUtil.isEmpty(token)) {
                throw new AuthException(AuthExceptionEnum.TOKEN_GET_ERROR);
            }

            // 进行当前接口的权限校验
            permissionServiceApi.checkPermission(token, requestURI);
        }

        return true;
    }

}
