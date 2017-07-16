package com.stylefeng.guns.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * spring session配置
 *
 * @author fengshuonan
 * @date 2017-07-13 21:05
 */
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800)  //session过期时间
@ConditionalOnProperty(prefix = "guns", name = "spring-session-open", havingValue = "true")
public class SpringSessionConfig {


}
