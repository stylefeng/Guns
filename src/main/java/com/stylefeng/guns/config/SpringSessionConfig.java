package com.stylefeng.guns.config;

import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * spring session配置
 *
 * @author fengshuonan
 * @date 2017-07-13 21:05
 */
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800)  //session过期时间
public class SpringSessionConfig {


}
