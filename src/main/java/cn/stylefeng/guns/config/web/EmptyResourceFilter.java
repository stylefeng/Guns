package cn.stylefeng.guns.config.web;

import cn.hutool.core.io.resource.ResourceUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

/**
 * 资源文件为空的过滤，针对css样式无法加载的问题
 *
 * @author fengshuonan
 * @since 2024-04-23 16:12
 */
public class EmptyResourceFilter implements Filter {

    /**
     * 需要做缓存的资源，key是请求资源路径，value是否有空的资源文件，空的资源文件会直接返回空
     */
    private static final Map<String, Boolean> NEED_TO_CACHE_FLAG = new HashMap<>();

    /**
     * 资源样式前缀
     */
    public static final String GUNS_DEVOPS_ASSETS_PREFIX = "/guns-devops/assets";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        // 1. 获取请求类
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;

        // 2. 获取请求的路径，例如：/guns-devops/assets/css/style.css
        String requestURI = httpServletRequest.getRequestURI();

        // 3. 获取资源文件前缀，如果是资源文件前缀，则直接返回空
        if (requestURI.startsWith(GUNS_DEVOPS_ASSETS_PREFIX)) {

            // 先判断是否需要缓存
            Boolean urlHasEmpty = NEED_TO_CACHE_FLAG.get(requestURI);
            if (urlHasEmpty != null) {
                if (urlHasEmpty) {
                    this.doEmptyResourceReturn(response);
                } else {
                    chain.doFilter(request, response);
                }
                return;
            }

            // 获取资源文件路径
            String resourcePath = StrUtil.removePrefix(requestURI, "/");
            URL resource = ResourceUtil.getResource(resourcePath);

            // 1. 资源文件不存在，直接返回，直接走404的逻辑
            if (resource == null) {
                chain.doFilter(request, response);

                // 缓存一下结果
                NEED_TO_CACHE_FLAG.put(requestURI, false);

                return;
            }

            // 2. 资源文件存在，但是内容为空，直接返回空字符串
            String content = ResourceUtil.readUtf8Str(resourcePath);
            if (ObjectUtil.isEmpty(content)) {
                doEmptyResourceReturn(response);

                // 缓存一下结果
                NEED_TO_CACHE_FLAG.put(requestURI, true);
            }

            // 3. 资源文件存在，内容不为空，直接返回内容
            else {
                chain.doFilter(request, response);

                // 缓存一下结果
                NEED_TO_CACHE_FLAG.put(requestURI, false);
            }

            return;
        }

        chain.doFilter(request, response);
    }

    /**
     * 给http请求响应空字符串
     *
     * @author fengshuonan
     * @since 2024-04-23 18:23
     */
    private void doEmptyResourceReturn(ServletResponse response) throws IOException {
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        httpServletResponse.getWriter().write("");
    }

    @Override
    public void destroy() {
        // Cleanup code
    }
}
