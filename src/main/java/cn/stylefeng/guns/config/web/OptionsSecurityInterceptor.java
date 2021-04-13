package cn.stylefeng.guns.config.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 跨域拦截器
 *
 * @author fengshuonan
 * @date 2021/4/13 18:24
 */
@Component
@Slf4j
public class OptionsSecurityInterceptor implements HandlerInterceptor {

    /**
     * 添加跨域允许的header
     *
     * @author fengshuonan
     * @date 2021/4/13 18:24
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        return true;
    }

}