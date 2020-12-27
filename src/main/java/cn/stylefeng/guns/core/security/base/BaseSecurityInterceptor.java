package cn.stylefeng.guns.core.security.base;

import cn.stylefeng.roses.kernel.auth.api.context.LoginContext;
import cn.stylefeng.roses.kernel.auth.api.expander.AuthConfigExpander;
import cn.stylefeng.roses.kernel.resource.api.pojo.resource.ResourceDefinition;
import cn.stylefeng.roses.kernel.resource.api.pojo.resource.ResourceUrlParam;
import cn.stylefeng.roses.kernel.rule.util.AntPathMatcherUtil;
import cn.stylefeng.roses.kernel.system.ResourceServiceApi;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 基础的Filter，一般用在权限过滤
 *
 * @author fengshuonan
 * @date 2020/12/15 22:50
 */
@Slf4j
public abstract class BaseSecurityInterceptor implements HandlerInterceptor {

    @Resource
    private ResourceServiceApi resourceServiceApi;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        // 1. 获取当前请求的路径
        String requestURI = request.getRequestURI();

        // 2. 不需要权限过滤的资源，直接放行
        Boolean noneSecurityFlag = AntPathMatcherUtil.getAntMatchFLag(requestURI, AuthConfigExpander.getNoneSecurityConfig());
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

        // 4. 获取ResourceDefinition，可能为null
        ResourceUrlParam resourceUrlParam = new ResourceUrlParam();
        resourceUrlParam.setUrl(requestURI);
        ResourceDefinition resourceDefinition = resourceServiceApi.getResourceByUrl(resourceUrlParam);

        // 5. 资源找不到，则当前url不被权限控制，直接放行
        if (resourceDefinition == null) {
            return true;
        }

        // 6.执行真正过滤器业务，如果拦截器执行不成功会抛出异常
        this.filterAction(request, response, resourceDefinition, token);

        return true;
    }

    /**
     * 过滤器的具体业务执行逻辑
     *
     * @author fengshuonan
     * @date 2020/12/15 22:52
     */
    public abstract void filterAction(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, ResourceDefinition resourceDefinition, String token);

}
