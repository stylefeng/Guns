package project.config.web;

import org.beetl.ext.spring.BeetlSpringViewResolver;
import org.hibernate.validator.HibernateValidator;
import org.springframework.context.annotation.*;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import project.config.web.beetl.BeetlConfiguration;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

/**
 * spring mvc配置类
 *
 * @author fengshuonan
 * @date 2016年11月12日 下午5:03:32
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.stylefeng.guns.**.controller", "com.stylefeng.guns.common.controller"})
@EnableAspectJAutoProxy
@Import({ControllerAopConfig.class})
public class SpringMvcConfig extends WebMvcConfigurerAdapter {

    // beetl的配置
    @Bean(initMethod = "init")
    public BeetlConfiguration beetlConfiguration() {
        BeetlConfiguration beetlConfiguration = new BeetlConfiguration();
        beetlConfiguration.setConfigFileResource(new ClassPathResource("beetl.properties"));
        return beetlConfiguration;
    }

    // beetl的视图解析器
    @Bean
    public BeetlSpringViewResolver beetlViewResolver() {
        BeetlSpringViewResolver beetlSpringViewResolver = new BeetlSpringViewResolver();
        beetlSpringViewResolver.setConfig(beetlConfiguration());
        beetlSpringViewResolver.setContentType("text/html;charset=UTF-8");
        beetlSpringViewResolver.setOrder(0);
        return beetlSpringViewResolver;
    }

    // 配置静态资源的处理,对静态资源的请求转发到servlet容器中默认的servlet上(对静态资源的请求不做处理)
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    // 文件上传用的resolver
    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    // 校验器的配置
    @Bean
    public LocalValidatorFactoryBean validator(ReloadableResourceBundleMessageSource messageSource) {
        LocalValidatorFactoryBean localValidatorFactoryBean = new LocalValidatorFactoryBean();
        localValidatorFactoryBean.setProviderClass(HibernateValidator.class);
        localValidatorFactoryBean.setValidationMessageSource(messageSource);
        return localValidatorFactoryBean;
    }

    // 国际化消息资源文件配置(本系统中主要用于显示/错误消息定制)
    @Bean
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasenames("classpath:org/hibernate/validator/ValidationMessages");
        messageSource.setUseCodeAsDefaultMessage(false);
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setCacheSeconds(60);
        return messageSource;
    }

    // 配置全局的验证器实例
    @Override
    public Validator getValidator() {
        return this.validator(messageSource());
    }

    // 配置spring mvc的拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

    }



    @Bean
    public ByteArrayHttpMessageConverter byteMsgConverter() {
        return new ByteArrayHttpMessageConverter();
    }

    @Bean
    public StringHttpMessageConverter stringHttpMessageConverter() {
        StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter(
                Charset.forName("UTF-8"));
        List<MediaType> list = new ArrayList<MediaType>();
        list.add(MediaType.TEXT_PLAIN);
        stringHttpMessageConverter.setSupportedMediaTypes(list);
        return stringHttpMessageConverter;
    }



}
