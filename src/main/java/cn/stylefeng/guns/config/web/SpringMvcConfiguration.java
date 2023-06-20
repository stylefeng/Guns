package cn.stylefeng.guns.config.web;

import cn.stylefeng.guns.core.error.CustomErrorAttributes;
import cn.stylefeng.guns.core.security.TokenAndPermissionInterceptor;
import cn.stylefeng.roses.kernel.wrapper.field.jackson.CustomJacksonIntrospector;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

/**
 * spring mvc的配置
 *
 * @author fengshuonan
 * @since 2020/4/11 10:23
 */
@Configuration
@Import({cn.hutool.extra.spring.SpringUtil.class})
public class SpringMvcConfiguration implements WebMvcConfigurer {

    @Resource
    private TokenAndPermissionInterceptor tokenAndPermissionInterceptor;

    /**
     * 重写系统的默认错误提示
     *
     * @author fengshuonan
     * @since 2020/12/16 15:36
     */
    @Bean
    public CustomErrorAttributes gunsErrorAttributes() {
        return new CustomErrorAttributes();
    }

    /**
     * json自定义序列化工具,long转string
     *
     * @author fengshuonan
     * @since 2020/12/13 17:16
     */
    @Bean
    public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {
        return jacksonObjectMapperBuilder -> {
            jacksonObjectMapperBuilder.serializerByType(Long.class, ToStringSerializer.instance)
                    .serializerByType(Long.TYPE, ToStringSerializer.instance);
            jacksonObjectMapperBuilder.annotationIntrospector(new CustomJacksonIntrospector());
        };
    }

    /**
     * 配置项目拦截器
     *
     * @author fengshuonan
     * @since 2020/12/18 9:43
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenAndPermissionInterceptor);
    }

    /**
     * 静态资源映射
     *
     * @author fengshuonan
     * @since 2021/1/16 21:45
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**").addResourceLocations("classpath:/assets/");
        registry.addResourceHandler("/guns-devops/**").addResourceLocations("classpath:/guns-devops/");
    }

}
