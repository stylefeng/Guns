package com.stylefeng.guns.core.config;

import com.stylefeng.guns.core.base.controller.GunsErrorView;
import com.stylefeng.guns.core.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.support.GenericConversionService;
import org.springframework.web.bind.support.ConfigurableWebBindingInitializer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.annotation.PostConstruct;
import java.util.Date;

@Configuration
public class DefaultWebConfig extends WebMvcConfigurationSupport {

    @Autowired
    private RequestMappingHandlerAdapter handlerAdapter;

    @Bean("error")
    public GunsErrorView error() {
        return new GunsErrorView();
    }

    @PostConstruct
    public void addConversionConfig() {
        ConfigurableWebBindingInitializer initializer = (ConfigurableWebBindingInitializer) handlerAdapter.getWebBindingInitializer();
        GenericConversionService genericConversionService = (GenericConversionService) initializer.getConversionService();
        genericConversionService.addConverter(new StringToDateConverter());
    }

    public class StringToDateConverter implements Converter<String, Date> {

        @Override
        public Date convert(String dateString) {
            return DateUtil.parseTime(dateString);
        }
    }
}


