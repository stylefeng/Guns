#Guns
通用后台管理系统！代码设计简洁，清晰，拿来即用！整合主流的springmvc + mybatis-plus + beetl！

##功能简介
1. 用户管理
2. 角色管理
3. 菜单管理
4. 部门管理
4. 日志管理
5. 监控管理
6. 字典管理

##使用说明
1. 导入sql/guns.sql文件到数据库
2. 启动项目,管理员账号admin/密码111111

##所用框架
###前端
1. bootstrap
2. jquery
3. 表格框架bootstrap-table
4. 弹出层框架layer
5. 树形显示ztree
6. 图片上传框架webuploader

###后端
1. springmvc
2. mybatis
3. mybatis-plus
4. spring
5. 模板引擎beetl
6. 校验层框架hibernate-validator
7. 缓存框架ehcache

##项目特点
1. 零springxml配置，完全采用javabean方式配置spring，新思路，配置简洁，不易出错。详情请见com.stylefeng.guns.project.config包中具体类。
2. 完善的日志记录体系，可记录登录日志，业务操作日志，通过@BussinessLog注解和LogObjectHolder.me().set()方法，业务操作日志可具体记录哪个用户，执行了哪些业务，修改了哪些数据，详情请见@BussinessLog注解和LogObjectHolder类。
3. 利用beetl模板引擎对前台页面进行封装和拆分，使臃肿的html代码变得简洁，更加易维护。
4. 对常用js插件进行二次封装，使js代码变得简洁，更加易维护，具体请见webapp/static/js/common文件夹内js代码。
5. 利用ehcache框架对经常调用的查询进行缓存，提升运行速度，具体请见ConstantFactory类。
6. controller层采用map + warpper方式的返回结果，返回给前端更为灵活的数据，具体参见com.stylefeng.guns.modular.system.warpper包中具体类。

##零spring xml配置示例
以下配置示例仅列出部分spring配置，详情请见com.stylefeng.guns.project.config包中具体的配置类
###根配置
```
@Configuration
@ComponentScan(basePackages = {"com.stylefeng"}, excludeFilters = {
        @Filter(type = FilterType.ANNOTATION, value = EnableWebMvc.class)// 这个是为了不让扫描到springmvc的控制器
})
@EnableAspectJAutoProxy
@Import(value = {DataSourceConfig.class, ShiroConfig.class, DruidMonitorConfig.class, EhcacheConfig.class})
public class RootSpringConfig {

}
```
###数据源配置
```
@Configuration
@EnableTransactionManagement
@PropertySource("classpath:jdbc.properties")
public class DataSourceConfig implements EnvironmentAware {

    private Environment em;

    /**
     * spring和MyBatis整合
     */
    @Bean
    public MybatisSqlSessionFactoryBean sqlSessionFactory(DataSource dataSource, GlobalConfiguration globalConfig) {
        MybatisSqlSessionFactoryBean sqlSessionFactory = new MybatisSqlSessionFactoryBean();
        sqlSessionFactory.setDataSource(dataSource);
        sqlSessionFactory.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
        Resource[] classPathResources = ResKit.getClassPathResources("classpath*:com/stylefeng/guns/**/mapping/*.xml");
        sqlSessionFactory.setMapperLocations(classPathResources);

        //以下为mybatis-plus配置
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        paginationInterceptor.setDialectType("mysql");
        sqlSessionFactory.setPlugins(new Interceptor[]{paginationInterceptor});
        sqlSessionFactory.setGlobalConfig(globalConfig);
        return sqlSessionFactory;
    }
}
```

##零web.xml配置
```
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    // spring应用上下文
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{RootSpringConfig.class};
    }

    // springmvc 上下文
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

    // 将DispatcherServlet映射到"/"
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
```

###springmvc配置
```
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.stylefeng.guns.**.controller", "com.stylefeng.guns.common.controller"})
@EnableAspectJAutoProxy
@Import({ControllerAopConfig.class})
public class SpringMvcConfig extends WebMvcConfigurerAdapter {

    // beetl的视图解析器
    @Bean
    public BeetlSpringViewResolver beetlViewResolver() {
        BeetlSpringViewResolver beetlSpringViewResolver = new BeetlSpringViewResolver();
        beetlSpringViewResolver.setConfig(beetlConfiguration());
        beetlSpringViewResolver.setContentType("text/html;charset=UTF-8");
        beetlSpringViewResolver.setOrder(0);
        return beetlSpringViewResolver;
    }   
    
    // 配置静态资源的处理,对静态资源的请求转发到servlet容器中默认的servlet上(对静态资源的请求不做处理)
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}
```


##效果图
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233329_a0c40981_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233336_5784c639_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233347_f70e3c71_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233354_24c8da50_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233402_594a588a_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233410_6c4061e0_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233417_6e9ecf5e_551203.png "在这里输入图片标题")