//package project.config.root;
//
//import org.springframework.context.annotation.*;
//import org.springframework.context.annotation.ComponentScan.Filter;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import project.config.EhcacheConfig;
//import project.config.KaptchaConfig;
//import com.stylefeng.guns.config.MybatisPlusConfig;
//import project.config.ShiroConfig;
//import project.config.web.monitor.DruidMonitorConfig;
//
///**
// * spring的根配置
// *
// * @author fengshuonan
// * @date 2016年11月12日 下午5:00:06
// */
//@Configuration
//@ComponentScan(basePackages = {"com.stylefeng"}, excludeFilters = {
//        @Filter(type = FilterType.ANNOTATION, value = EnableWebMvc.class)// 这个是为了不让扫描到springmvc的控制器
//})
//@EnableAspectJAutoProxy
//@Import(value = {MybatisPlusConfig.class, ShiroConfig.class, DruidMonitorConfig.class, EhcacheConfig.class, KaptchaConfig.class})
//public class RootSpringConfig {
//
//}
