package com.stylefeng.guns.config.web;

import com.stylefeng.guns.core.beetl.BeetlConfiguration;
import org.beetl.ext.spring.BeetlSpringViewResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * spring mvc配置类
 *
 * @author fengshuonan
 * @date 2016年11月12日 下午5:03:32
 */
@Configuration
public class SpringMvcConfig extends WebMvcConfigurerAdapter {

    // beetl的配置
    @Bean(initMethod = "init")
    public BeetlConfiguration beetlConfiguration() {
        BeetlConfiguration beetlConfiguration = new BeetlConfiguration();
        beetlConfiguration.setConfigFileResource(new ClassPathResource("beetl.properties"));
        return beetlConfiguration;
    }

    // beetl的视图解析器
    @Bean
    public BeetlSpringViewResolver beetlViewResolver() {
        BeetlSpringViewResolver beetlSpringViewResolver = new BeetlSpringViewResolver();
        beetlSpringViewResolver.setConfig(beetlConfiguration());
        beetlSpringViewResolver.setContentType("text/html;charset=UTF-8");
        beetlSpringViewResolver.setOrder(0);
        return beetlSpringViewResolver;
    }
}
