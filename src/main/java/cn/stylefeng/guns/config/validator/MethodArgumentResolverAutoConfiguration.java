package cn.stylefeng.guns.config.validator;

import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * 自定义的GunsRequestResponseBodyMethodProcessor，放在所有resolvers之前
 *
 * @author fengshuonan
 * @date 2020/8/21 21:09
 */
@Configuration
@AutoConfigureBefore(ValidationAutoConfiguration.class)
public class MethodArgumentResolverAutoConfiguration {

    @Resource
    private RequestMappingHandlerAdapter adapter;

    /**
     * 自定义的spring参数校验器，重写主要为了保存一些在自定义validator中读不到的属性
     *
     * @author fengshuonan
     * @date 2020/8/12 20:18
     */
    @Bean
    public GunsValidator gunsValidator() {
        return new GunsValidator();
    }

    /**
     * 自定义的GunsRequestResponseBodyMethodProcessor，放在所有resolvers之前
     *
     * @author fengshuonan
     * @date 2020/12/16 18:34
     */
    @PostConstruct
    public void injectSelfMethodArgumentResolver() {
        List<HandlerMethodArgumentResolver> argumentResolvers = new ArrayList<>();
        argumentResolvers.add(new GunsValidatorRequestResponseBodyMethodProcessor(adapter.getMessageConverters()));
        argumentResolvers.addAll(Objects.requireNonNull(adapter.getArgumentResolvers()));
        adapter.setArgumentResolvers(argumentResolvers);
    }

}
