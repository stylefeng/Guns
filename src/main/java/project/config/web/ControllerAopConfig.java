//package project.config.web;
//
//import com.stylefeng.guns.core.intercept.SessionInterceptor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.EnableAspectJAutoProxy;
//
///**
// * 保留类，如果控制器需要些aop在这里写
// *
// * @author fengshuonan
// * @date 2016年11月12日 下午4:48:10
// */
//@Configuration
//@EnableAspectJAutoProxy
//public class ControllerAopConfig {
//
//    /**
//     * session的拦截器，用在非controller层调用session
//     */
//    @Bean
//    public SessionInterceptor sessionInterceptor() {
//        return new SessionInterceptor();
//    }
//
//}
