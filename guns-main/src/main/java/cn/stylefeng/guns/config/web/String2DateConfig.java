package cn.stylefeng.guns.config.web;

import cn.hutool.core.date.DateUtil;
import cn.stylefeng.roses.core.util.ToolUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.support.GenericConversionService;
import org.springframework.web.bind.support.ConfigurableWebBindingInitializer;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.annotation.PostConstruct;
import java.util.Date;

/**
 * 默认的string to date的转化
 *
 * @author fengshuonan
 * @Date 2019/2/12 20:09
 */
@Configuration
public class String2DateConfig {

    @Autowired
    private RequestMappingHandlerAdapter handlerAdapter;

    /**
     * 默认时间转化器
     */
    @PostConstruct
    public void addConversionConfig() {
        ConfigurableWebBindingInitializer initializer = (ConfigurableWebBindingInitializer) handlerAdapter.getWebBindingInitializer();
        if ((initializer != null ? initializer.getConversionService() : null) != null) {
            GenericConversionService genericConversionService = (GenericConversionService) initializer.getConversionService();
            genericConversionService.addConverter(new StringToDateConverter());
        }
    }

    /**
     * 时间字符串转date的格式
     *
     * @author fengshuonan
     * @Date 2019/10/22 13:42
     */
    public static class StringToDateConverter implements Converter<String, Date> {
        @Override
        public Date convert(String dateString) {
            if (ToolUtil.isEmpty(dateString)) {
                return null;
            } else {
                return DateUtil.parse(dateString);
            }
        }
    }

}
