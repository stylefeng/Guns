package com.stylefeng.guns;

import com.alibaba.druid.support.http.StatViewServlet;
import com.stylefeng.guns.core.listener.ConfigListener;
import com.stylefeng.guns.core.util.xss.XssFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.web.context.request.RequestContextListener;

import javax.servlet.*;
import java.util.EnumSet;

/**
 * Guns Web程序启动类
 *
 * @author fengshuonan
 * @date 2017-05-21 9:43
 */
public class GunsServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(GunsApplication.class);
    }

}
