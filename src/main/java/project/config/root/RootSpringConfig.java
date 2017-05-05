package project.config.root;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;
import org.springframework.context.annotation.*;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import project.config.cache.EhcacheConfig;
import project.config.datasource.DataSourceConfig;
import project.config.shiro.ShiroConfig;
import project.config.web.monitor.DruidMonitorConfig;

import java.util.Properties;

/**
 * spring的根配置
 *
 * @author fengshuonan
 * @date 2016年11月12日 下午5:00:06
 */
@Configuration
@ComponentScan(basePackages = {"com.stylefeng"}, excludeFilters = {
        @Filter(type = FilterType.ANNOTATION, value = EnableWebMvc.class)// 这个是为了不让扫描到springmvc的控制器
})
@EnableAspectJAutoProxy
@Import(value = {DataSourceConfig.class, ShiroConfig.class, DruidMonitorConfig.class, EhcacheConfig.class})
public class RootSpringConfig {

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
