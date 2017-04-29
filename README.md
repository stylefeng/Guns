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

##零spring xml配置
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
     * 扫描所有mybatis的接口
     *
     * @author fengshuonan
     */
    @Bean
    public MapperScannerConfigurer mappers() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setBasePackage("com.stylefeng.guns.modular.*.dao;com.stylefeng.guns.persistence.dao");
        mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
        return mapperScannerConfigurer;
    }

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

    /**
     * mybatis-plus的配置
     */
    @Bean
    public GlobalConfiguration globalConfig() {
        GlobalConfiguration globalConfig = new GlobalConfiguration();
        /**
         * AUTO->`0`("数据库ID自增")
         * INPUT->`1`(用户输入ID")
         * ID_WORKER->`2`("全局唯一ID")
         * UUID->`3`("全局唯一ID")
         */
        globalConfig.setIdType(1);
        globalConfig.setDbType("mysql");

        /**
         * 全局表为下划线命名设置
         */
        globalConfig.setDbColumnUnderline(false);

        return globalConfig;
    }

    /**
     * 事务管理, 声明式事务的开启
     */
    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        DataSourceTransactionManager manager = new DataSourceTransactionManager();
        manager.setDataSource(dataSource);
        return manager;
    }

    /**
     * 第三方数据库连接池的配置
     */
    @Bean(initMethod = "init")
    public DruidDataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUrl(em.getProperty("jdbc.url").trim());
        dataSource.setUsername(em.getProperty("jdbc.username").trim());
        dataSource.setPassword(em.getProperty("jdbc.password").trim());

        DataSourceConfigTemplate.config(dataSource);
        return dataSource;
    }

    @Override
    public void setEnvironment(Environment environment) {
        this.em = environment;
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

    // 通过重载这个方法可以对DispatcherServlt进行额外的配置
    @Override
    protected void customizeRegistration(Dynamic registration) {
        // 上传文件路径的配置
        registration.setMultipartConfig(new MultipartConfigElement("e:/tmp"));
    }

    // 这里注册的Filter只能过滤DispatherServlet
    @Override
    protected Filter[] getServletFilters() {
        return new Filter[]{};
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

//		 Apache Shiro
        FilterRegistration.Dynamic shiroFilter = servletContext.addFilter("shiroFilter", new DelegatingFilterProxy());
        shiroFilter.setInitParameter("targetFilterLifecycle", "true");
        shiroFilter.addMappingForUrlPatterns(null, false, "/*");

        // Encoding Filter
        FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encodingFilter",
                new CharacterEncodingFilter());
        encodingFilter.setInitParameter("encoding", "UTF-8");
        encodingFilter.setInitParameter("forceEncoding", "true");
        encodingFilter.addMappingForUrlPatterns(null, false, "/*");

        // 用来非Controller层获取HttpServletRequest
        servletContext.addListener(RequestContextListener.class);
        servletContext.addListener(ConfigListener.class);

        //防止xss攻击的filter
        FilterRegistration.Dynamic xssFilter = servletContext.addFilter("xssSqlFilter",
                new XssFilter());
        xssFilter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), false, "/*");

        super.onStartup(servletContext);
    }

    /**
     * 添加其他servlet
     *
     * @param servletContext
     */
    @Override
    protected void registerDispatcherServlet(ServletContext servletContext) {
        super.registerDispatcherServlet(servletContext);
        try {
            ServletRegistration.Dynamic dynamic = servletContext.addServlet("DruidStatView", StatViewServlet.class);
            dynamic.addMapping("/druid/*");
        } catch (Exception e) {
            e.printStackTrace();
        }
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

    // beetl的配置
    @Bean(initMethod = "init")
    public BeetlConfiguration beetlConfiguration() {
        BeetlConfiguration beetlConfiguration = new BeetlConfiguration();
        beetlConfiguration.setConfigFileResource(new ClassPathResource("beetl.properties"));
        return beetlConfiguration;
    }

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

    // 文件上传用的resolver
    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    // 校验器的配置
    @Bean
    public LocalValidatorFactoryBean validator(ReloadableResourceBundleMessageSource messageSource) {
        LocalValidatorFactoryBean localValidatorFactoryBean = new LocalValidatorFactoryBean();
        localValidatorFactoryBean.setProviderClass(HibernateValidator.class);
        localValidatorFactoryBean.setValidationMessageSource(messageSource);
        return localValidatorFactoryBean;
    }

    // 国际化消息资源文件配置(本系统中主要用于显示/错误消息定制)
    @Bean
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasenames("classpath:org/hibernate/validator/ValidationMessages");
        messageSource.setUseCodeAsDefaultMessage(false);
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setCacheSeconds(60);
        return messageSource;
    }

    // 配置全局的验证器实例
    @Override
    public Validator getValidator() {
        return this.validator(messageSource());
    }

    // 配置spring mvc的拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

    }

    // messageConverter
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(byteMsgConverter());
        converters.add(stringHttpMessageConverter());
        converters.add(fastJsonHttpMessageConverter());
        super.configureMessageConverters(converters);
    }

    @Bean
    public ByteArrayHttpMessageConverter byteMsgConverter() {
        return new ByteArrayHttpMessageConverter();
    }

    @Bean
    public StringHttpMessageConverter stringHttpMessageConverter() {
        StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter(
                Charset.forName("UTF-8"));
        List<MediaType> list = new ArrayList<MediaType>();
        list.add(MediaType.TEXT_PLAIN);
        stringHttpMessageConverter.setSupportedMediaTypes(list);
        return stringHttpMessageConverter;
    }

    @Bean
    public FastJsonHttpMessageConverter4 fastJsonHttpMessageConverter() {
        FastJsonHttpMessageConverter4 convert = new FastJsonHttpMessageConverter4();
        List<MediaType> list = new ArrayList<MediaType>();
        list.add(MediaType.TEXT_HTML);
        list.add(MediaType.APPLICATION_JSON_UTF8);
        convert.setSupportedMediaTypes(list);
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        fastJsonConfig.setFeatures(Feature.AllowArbitraryCommas, Feature.AllowUnQuotedFieldNames,
                Feature.DisableCircularReferenceDetect);
        fastJsonConfig.setSerializerFeatures(SerializerFeature.WriteMapNullValue,
                SerializerFeature.WriteNullStringAsEmpty);
        fastJsonConfig.setDateFormat("yyyy-MM-dd HH:mm:ss");
        convert.setFastJsonConfig(fastJsonConfig);
        return convert;
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