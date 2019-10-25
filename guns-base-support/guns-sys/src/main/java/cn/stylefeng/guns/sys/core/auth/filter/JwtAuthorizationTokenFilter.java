package cn.stylefeng.guns.sys.core.auth.filter;

import cn.stylefeng.guns.base.auth.jwt.JwtTokenUtil;
import cn.stylefeng.guns.sys.core.auth.cache.SessionManager;
import cn.stylefeng.roses.core.util.ToolUtil;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static cn.stylefeng.guns.base.consts.ConstantsContext.getTokenHeaderName;

/**
 * jwt token过滤器
 *
 * @author fengshuonan
 * @Date 2019/7/20 21:33
 */
@Component
public class JwtAuthorizationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private SessionManager sessionManager;

    public JwtAuthorizationTokenFilter() {
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        //过滤静态资源
        String[] regs = {"/assets/**", "/favicon.ico", "/activiti-editor/**"};
        for (String reg : regs) {
            if (new AntPathMatcher().match(reg, request.getServletPath())) {
                chain.doFilter(request, response);
                return;
            }
        }

        //权限校验的头部
        String tokenHeader = getTokenHeaderName();
        final String requestHeader = request.getHeader(tokenHeader);

        String username = null;
        String authToken = null;

        // 1.从cookie中获取token
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (tokenHeader.equals(cookie.getName())) {
                    authToken = cookie.getValue();
                }
            }
        }

        // 2.如果cookie中没有token，则从header中获取token
        if (ToolUtil.isEmpty(authToken)) {
            if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
                authToken = requestHeader.substring(7);
            }
        }

        // 3.通过token获取用户名
        if (ToolUtil.isNotEmpty(authToken)) {
            try {
                username = JwtTokenUtil.getJwtPayLoad(authToken).getAccount();
            } catch (IllegalArgumentException | JwtException e) {
                //请求token为空或者token不正确，忽略，并不是所有接口都要鉴权
            }
        }

        // 4.如果账号不为空，并且没有设置security上下文，就设置上下文
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            //从缓存中拿userDetails
            UserDetails userDetails = sessionManager.getSession(authToken);
            if (userDetails == null) {

                //删除cookies
                Cookie[] tempCookies = request.getCookies();
                for (Cookie cookie : tempCookies) {
                    if (tokenHeader.equals(cookie.getName())) {
                        Cookie temp = new Cookie(cookie.getName(), "");
                        temp.setMaxAge(0);
                        response.addCookie(temp);
                    }
                }

                //跳转到登录超时
                request.getRequestDispatcher("/global/sessionError").forward(request, response);

                return;
            }

            //创建当前登录上下文
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        chain.doFilter(request, response);
    }
}
