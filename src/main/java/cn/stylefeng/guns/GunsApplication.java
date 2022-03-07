package cn.stylefeng.guns;

import cn.stylefeng.roses.kernel.db.starter.GunsDataSourceAutoConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;

/**
 * SpringBoot方式启动类
 *
 * @author fengshuonan
 * @date 2020/12/1 17:50
 */
@Slf4j
@SpringBootApplication(scanBasePackages = {"cn.stylefeng"}, exclude = {FlywayAutoConfiguration.class, GunsDataSourceAutoConfiguration.class})
public class GunsApplication {

    public static void main(String[] args) {
        SpringApplication.run(GunsApplication.class, args);
        log.info(GunsApplication.class.getSimpleName() + " is success!");
    }

}

