//package project.config.web;
//
//import com.alibaba.druid.support.http.StatViewServlet;
//import com.stylefeng.guns.core.listener.ConfigListener;
//import com.stylefeng.guns.core.util.xss.XssFilter;
//import project.config.root.RootSpringConfig;
//import org.springframework.web.context.request.RequestContextListener;
//import org.springframework.web.filter.CharacterEncodingFilter;
//import org.springframework.web.filter.DelegatingFilterProxy;
//import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
//
//import javax.servlet.*;
//import javax.servlet.ServletRegistration.Dynamic;
//import java.util.EnumSet;
//
///**
// * tomcat启动初始化整个应用的类（代替了web.xml）
// *
// * @author fengshuonan
// * @date 2016年11月12日 下午5:00:31
// */
//public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
//
//    // spring应用上下文
//    @Override
//    protected Class<?>[] getRootConfigClasses() {
//        return new Class[]{RootSpringConfig.class};
//    }
//
//    // springmvc 上下文
//    @Override
//    protected Class<?>[] getServletConfigClasses() {
//        return new Class[]{SpringMvcConfig.class};
//    }
//
//    // 将DispatcherServlet映射到"/"
//    @Override
//    protected String[] getServletMappings() {
//        return new String[]{"/"};
//    }
//
//    // 通过重载这个方法可以对DispatcherServlt进行额外的配置
//    @Override
//    protected void customizeRegistration(Dynamic registration) {
//        // 上传文件临时路径的配置
//        String folder = System.getProperty("java.io.tmpdir");
//        registration.setMultipartConfig(new MultipartConfigElement(folder));
//    }
//
//    // 这里注册的Filter只能过滤DispatherServlet
//    @Override
//    protected Filter[] getServletFilters() {
//        return new Filter[]{};
//    }
//
//    @Override
//    public void onStartup(ServletContext servletContext) throws ServletException {
//
//        //Apache Shiro
//        FilterRegistration.Dynamic shiroFilter = servletContext.addFilter("shiroFilter", new DelegatingFilterProxy());
//        shiroFilter.setInitParameter("targetFilterLifecycle", "true");
//        shiroFilter.addMappingForUrlPatterns(null, false, "/*");
//
//        //Encoding Filter
//        FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encodingFilter",
//                new CharacterEncodingFilter());
//        encodingFilter.setInitParameter("encoding", "UTF-8");
//        encodingFilter.setInitParameter("forceEncoding", "true");
//        encodingFilter.addMappingForUrlPatterns(null, false, "/*");
//
//        //用来非Controller层获取HttpServletRequest
//        servletContext.addListener(RequestContextListener.class);
//        servletContext.addListener(ConfigListener.class);
//
//        //防止xss攻击的filter
//        FilterRegistration.Dynamic xssFilter = servletContext.addFilter("xssSqlFilter",
//                new XssFilter());
//        xssFilter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), false, "/*");
//
//        super.onStartup(servletContext);
//    }
//
//    /**
//     * 添加其他servlet
//     *
//     * @param servletContext
//     */
//    @Override
//    protected void registerDispatcherServlet(ServletContext servletContext) {
//        super.registerDispatcherServlet(servletContext);
//        try {
//            ServletRegistration.Dynamic dynamic = servletContext.addServlet("DruidStatView", StatViewServlet.class);
//            dynamic.addMapping("/druid/*");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
