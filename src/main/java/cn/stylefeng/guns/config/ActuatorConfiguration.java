package cn.stylefeng.guns.config;

import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 监控埋点配置
 *
 * @author fengshuonan
 * @date 2021/1/21 22:07
 */
@Configuration
public class ActuatorConfiguration {

    /**
     * 应用名称
     */
    @Value("${spring.application.name}")
    private String applicationName;

    @Bean
    public MeterRegistryCustomizer<MeterRegistry> configurer() {
        return (registry) -> registry.config().commonTags("application", applicationName);
    }

}
