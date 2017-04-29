#Guns
极简代码设计，容易上手的后台管理系统！拿来即用！整合主流的springmvc + mybatis-plus + beetl！

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


##效果图
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233329_a0c40981_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233336_5784c639_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233347_f70e3c71_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233354_24c8da50_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233402_594a588a_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233410_6c4061e0_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0429/233417_6e9ecf5e_551203.png "在这里输入图片标题")