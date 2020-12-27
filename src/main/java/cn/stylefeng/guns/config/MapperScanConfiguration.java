package cn.stylefeng.guns.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * 配置mapper包扫描
 *
 * @author fengshuonan
 * @date 2020/12/13 16:11
 */
@Configuration
@MapperScan(basePackages = {"cn.stylefeng.**.mapper"})
public class MapperScanConfiguration {

}
