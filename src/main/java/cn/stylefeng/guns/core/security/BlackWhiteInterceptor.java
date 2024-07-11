package cn.stylefeng.guns.core.security;

import cn.stylefeng.roses.kernel.rule.util.HttpServletUtil;
import cn.stylefeng.roses.kernel.security.blackwhite.BlackWhiteValidateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 黑白名单的web拦截器·
 *
 * @author fengshuonan
 * @since 2024/7/11 10:11
 */
@Component
@Slf4j
public class BlackWhiteInterceptor implements HandlerInterceptor {

    @Resource
    private BlackWhiteValidateService blackWhiteValidateService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        // 校验黑白名单
        blackWhiteValidateService.totalValidate(HttpServletUtil.getRequestClientIp(request));

        return true;
    }

}
