package com.stylefeng.guns.core.config;

import com.stylefeng.guns.core.config.properties.DruidProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * 默认的配置
 *
 * @author fengshuonan
 * @date 2018-01-07 12:33
 */
@Configuration
@PropertySource("classpath:/default-config.properties")
public class DefaultProperties {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DruidProperties druidProperties() {
        return new DruidProperties();
    }

}
