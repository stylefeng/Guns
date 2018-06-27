package com.stylefeng.guns.core.config;

import com.stylefeng.guns.core.datasource.DruidProperties;
import com.stylefeng.guns.core.mutidatasource.config.MutiDataSourceProperties;
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

    @Bean
    @ConfigurationProperties(prefix = "guns.muti-datasource")
    public MutiDataSourceProperties mutiDataSourceProperties() {
        return new MutiDataSourceProperties();
    }
}
