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

    private final Logger logger = LoggerFactory.getLogger(GunsServletInitializer.class);

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

        //用来非Controller层获取HttpServletRequest
        servletContext.addListener(RequestContextListener.class);
        servletContext.addListener(ConfigListener.class);
        logger.info("初始化ConfigListener成功!");

        //防止xss攻击的filter
        FilterRegistration.Dynamic xssFilter = servletContext.addFilter("xssSqlFilter",
                new XssFilter());
        xssFilter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), false, "/*");
        logger.info("初始化XssFilter成功!");

        try {
            ServletRegistration.Dynamic dynamic = servletContext.addServlet("DruidStatView", StatViewServlet.class);
            dynamic.addMapping("/druid/*");
        } catch (Exception e) {
            logger.error("初始化druid监控出错!", e);
        }
        logger.info("初始化DruidMonitor成功!");

        super.onStartup(servletContext);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(GunsApplication.class);
    }

}
