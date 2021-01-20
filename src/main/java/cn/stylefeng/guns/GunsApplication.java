package cn.stylefeng.guns;

import io.micrometer.core.instrument.MeterRegistry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * SpringBoot方式启动类
 *
 * @author fengshuonan
 * @date 2020/12/1 17:50
 */
@Slf4j
@SpringBootApplication(scanBasePackages = {"cn.stylefeng"})
public class GunsApplication {

    public static void main(String[] args) {
        SpringApplication.run(GunsApplication.class, args);
        log.info(GunsApplication.class.getSimpleName() + " is success!");
    }
    @Bean
    MeterRegistryCustomizer<MeterRegistry> configurer(
            @Value("${spring.application.name}") String applicationName) {
        return (registry) -> registry.config().commonTags("application", applicationName);
    }
}

