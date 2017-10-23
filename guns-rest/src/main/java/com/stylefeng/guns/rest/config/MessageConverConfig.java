package com.stylefeng.guns.rest.config;

import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter4;
import com.stylefeng.guns.core.config.DefaultFastjsonConfig;
import com.stylefeng.guns.rest.config.properties.RestProperties;
import com.stylefeng.guns.rest.modular.auth.converter.WithSignMessageConverter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 签名校验messageConverter
 *
 * @author fengshuonan
 * @date 2017-08-25 16:04
 */
@Configuration
public class MessageConverConfig {

    @Bean
    @ConditionalOnProperty(prefix = RestProperties.REST_PREFIX, name = "sign-open", havingValue = "true", matchIfMissing = true)
    public WithSignMessageConverter withSignMessageConverter() {
        WithSignMessageConverter withSignMessageConverter = new WithSignMessageConverter();
        DefaultFastjsonConfig defaultFastjsonConfig = new DefaultFastjsonConfig();
        withSignMessageConverter.setFastJsonConfig(defaultFastjsonConfig.fastjsonConfig());
        withSignMessageConverter.setSupportedMediaTypes(defaultFastjsonConfig.getSupportedMediaType());
        return withSignMessageConverter;
    }

    @Bean
    @ConditionalOnProperty(prefix = RestProperties.REST_PREFIX, name = "sign-open", havingValue = "false")
    public FastJsonHttpMessageConverter4 fastJsonHttpMessageConverter4() {
        FastJsonHttpMessageConverter4 FastJsonHttpMessageConverter4 = new FastJsonHttpMessageConverter4();
        DefaultFastjsonConfig defaultFastjsonConfig = new DefaultFastjsonConfig();
        FastJsonHttpMessageConverter4.setFastJsonConfig(defaultFastjsonConfig.fastjsonConfig());
        FastJsonHttpMessageConverter4.setSupportedMediaTypes(defaultFastjsonConfig.getSupportedMediaType());
        return FastJsonHttpMessageConverter4;
    }
}
