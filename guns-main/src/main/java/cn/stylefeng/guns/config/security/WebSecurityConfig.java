package cn.stylefeng.guns.config.security;

import cn.stylefeng.guns.sys.core.auth.entrypoint.JwtAuthenticationEntryPoint;
import cn.stylefeng.guns.sys.core.auth.filter.JwtAuthorizationTokenFilter;
import cn.stylefeng.guns.sys.core.auth.userdetail.JwtUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * spring security配置
 *
 * @author fengshuonan
 * @Date 2019/7/20 17:55
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Autowired
    private JwtUserDetailsServiceImpl jwtUserDetailsService;

    @Autowired
    private JwtAuthorizationTokenFilter authenticationTokenFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()

                //开启跨域
                .cors().and()

                //自定义退出
                .logout().disable()

                //禁用匿名用户
                //.anonymous().disable()

                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()

                // 全局不创建session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()

                .authorizeRequests()

                .antMatchers("/").permitAll()

                //获取验证码
                .antMatchers("/kaptcha").permitAll()

                //rest方式获取token入口
                //.antMatchers("/rest/login").permitAll()

                //oauth登录的接口
                //.antMatchers("/oauth/render/*").permitAll()
                //.antMatchers("/oauth/callback/*").permitAll()

                //单点登录接口
                //.antMatchers("/ssoLogin").permitAll()
                //.antMatchers("/sysTokenLogin").permitAll()

                // 登录接口放开过滤
                .antMatchers("/login").permitAll()

                // session登录失效之后的跳转
                .antMatchers("/global/sessionError").permitAll()

                // 图片预览 头像
                .antMatchers("/system/preview/*").permitAll()

                // 错误页面的接口
                .antMatchers("/error").permitAll()
                .antMatchers("/global/error").permitAll()

                // 测试多数据源的接口，可以去掉
                //.antMatchers("/tran/**").permitAll()

                //获取租户列表的接口
                //.antMatchers("/tenantInfo/listTenants").permitAll()

                .anyRequest().authenticated();

        httpSecurity
                .addFilterBefore(authenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        // disable page caching
        httpSecurity
                .headers()
                .frameOptions().sameOrigin()
                .cacheControl();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers(
                        HttpMethod.POST,
                        "/login"
                )

                // 静态资源放开过滤
                .and()
                .ignoring()
                .antMatchers(
                        HttpMethod.GET,
                        "/assets/**",
                        "/favicon.ico",
                        "/activiti-editor/**"
                );

    }
}
