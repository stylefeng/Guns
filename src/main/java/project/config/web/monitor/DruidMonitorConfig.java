package project.config.web.monitor;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.spring.stat.BeanTypeAutoProxyCreator;
import com.alibaba.druid.support.spring.stat.DruidStatInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * druid监控配置
 *
 * Created by fsn on 2017/3/9.
 */
@Configuration
public class DruidMonitorConfig {

    @Bean
    public DruidStatInterceptor druidStatInterceptor(){
        return new DruidStatInterceptor();
    }

    @Bean
    public BeanTypeAutoProxyCreator beanTypeAutoProxyCreator(){
        BeanTypeAutoProxyCreator beanTypeAutoProxyCreator = new BeanTypeAutoProxyCreator();
        beanTypeAutoProxyCreator.setTargetBeanType(DruidDataSource.class);
        beanTypeAutoProxyCreator.setInterceptorNames("druidStatInterceptor");
        return beanTypeAutoProxyCreator;
    }
}
