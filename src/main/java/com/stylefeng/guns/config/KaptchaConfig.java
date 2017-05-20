package com.stylefeng.guns.config;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

/**
 * 验证码生成的配置
 *
 * @author fengshuonan
 * @date 2017-05-20 22:03
 */
@Configuration
public class KaptchaConfig {

    @Bean
    public DefaultKaptcha kaptcha(){
        Properties properties = new Properties();
        properties.put("kaptcha.border","no");
        properties.put("kaptcha.border.color","105,179,90");
        properties.put("kaptcha.textproducer.font.color","blue");
        properties.put("kaptcha.image.width","125");
        properties.put("kaptcha.image.height","45");
        properties.put("kaptcha.textproducer.font.size","45");
        properties.put("kaptcha.session.key","code");
        properties.put("kaptcha.textproducer.char.length","4");
        properties.put("kaptcha.textproducer.font.names","宋体,楷体,微软雅黑");
        Config config = new Config(properties);
        DefaultKaptcha defaultKaptcha = new DefaultKaptcha();
        defaultKaptcha.setConfig(config);
        return defaultKaptcha;
    }
}
