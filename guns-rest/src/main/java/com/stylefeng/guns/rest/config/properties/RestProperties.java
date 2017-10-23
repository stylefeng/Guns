package com.stylefeng.guns.rest.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * 项目相关配置
 *
 * @author fengshuonan
 * @date 2017年10月23日16:44:15
 */
@Configuration
@ConfigurationProperties(prefix = RestProperties.REST_PREFIX)
public class RestProperties {

    public static final String REST_PREFIX = "rest";

    private boolean authOpen = true;

    private boolean signOpen = true;

    public boolean isAuthOpen() {
        return authOpen;
    }

    public void setAuthOpen(boolean authOpen) {
        this.authOpen = authOpen;
    }

    public boolean isSignOpen() {
        return signOpen;
    }

    public void setSignOpen(boolean signOpen) {
        this.signOpen = signOpen;
    }
}
