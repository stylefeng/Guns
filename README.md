#Guns V1.0
不用写xml配置！独特的日志记录方式！包含用户角色，权限等模块的后台管理系统！整合springmvc + mybatis-plus + beetl！

## 鸣谢
1.[SpringBlade](http://git.oschina.net/smallc/SpringBlade)
2.[beetl](http://ibeetl.com/)
3.[mybatis-plus](http://git.oschina.net/baomidou/mybatis-plus)

##功能简介
1. 用户管理
2. 角色管理
3. 菜单管理
4. 部门管理
4. 日志管理
5. 监控管理
6. 字典管理
7. 通知管理
8. 代码生成

##使用说明
1. 导入sql/guns.sql文件到数据库
2. 以maven方式导入项目，并修改数据库文件（src/main/resources/dev/jdbc.properties）为本机数据库配置
3. 启动项目,管理员账号admin/密码111111

##所用框架
###前端
1. bootstrap
2. jquery
3. bootstrap-table
4. layer
5. ztree
6. webuploader

###后端
1. springmvc
2. mybatis
3. mybatis-plus
4. spring
5. beetl
6. hibernate-validator
7. ehcache

##项目特点
1. 零springxml配置，完全采用javabean方式配置spring，新思路，配置简洁，不易出错。详情请见com.stylefeng.guns.project.config包中具体类。
2. 完善的日志记录体系，可记录登录日志，业务操作日志，异常日志到数据库，通过@BussinessLog注解和LogObjectHolder.me().set()方法，业务操作日志可具体记录哪个用户，执行了哪些业务，修改了哪些数据，并且日志记录为异步执行，详情请见@BussinessLog注解和LogObjectHolder,LogManager,LogAop类。
3. 利用beetl模板引擎对前台页面进行封装和拆分，使臃肿的html代码变得简洁，更加易维护。
4. 对常用js插件进行二次封装，使js代码变得简洁，更加易维护，具体请见webapp/static/js/common文件夹内js代码。
5. 利用ehcache框架对经常调用的查询进行缓存，提升运行速度，具体请见ConstantFactory类中@Cacheable标记的方法。
6. controller层采用map + warpper方式的返回结果，返回给前端更为灵活的数据，具体参见com.stylefeng.guns.modular.system.warpper包中具体类。
7. 防止XSS攻击,通过XssFilter类对所有的输入的非法字符串进行过滤以及替换。
8. 简单可用的代码生成体系，通过SimpleTemplateEngine可生成带有主页跳转和增删改查的通用控制器、html页面以及相关的js。
9. 控制器层统一的异常拦截机制,利用@ControllerAdvice统一对异常拦截,具体见com.stylefeng.guns.core.aop.GlobalExceptionHandler类。

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

###零web.xml配置
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
##业务日志记录原理
日志记录采用aop(LogAop类)方式对所有包含@BussinessLog注解的方法进行aop切入，会记录下当前用户执行了哪些操作（即@BussinessLog value属性的内容），如果涉及到数据修改，会取当前http请求的所有requestParameters与LogObjectHolder类中缓存的Object对象的所有字段作比较（所以在编辑之前的获取详情接口中需要缓存被修改对象之前的字段信息），日志内容会异步存入数据库中（通过ScheduledThreadPoolExecutor类）。

##beetl对前台页面的拆分与包装
例如，把主页拆分成三部分，每个部分单独一个页面，更加便于维护
```
<!--左侧导航开始-->
    @include("/common/_tab.html"){}
<!--左侧导航结束-->

<!--右侧部分开始-->
    @include("/common/_right.html"){}
<!--右侧部分结束-->

<!--右侧边栏开始-->
    @include("/common/_theme.html"){}
<!--右侧边栏结束-->
```
以及对重复的html进行包装，使前端页面更加专注于业务实现，例如,把所有页面引用包进行提取
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="renderer" content="webkit" /><!-- 让360浏览器默认选择webkit内核 -->

<!-- 全局css -->
<link rel="shortcut icon" href="${ctxPath}/static/favicon.ico">
<!-- 全局js -->
<script src="${ctxPath}/static/js/jquery.min.js?v=2.1.4"></script>
<body class="gray-bg">
	<div class="wrapper wrapper-content animated fadeInRight">
		${layoutContent}
	</div>
	<script src="${ctxPath}/static/js/content.js?v=1.0.0"></script>
</body>
</html>
```
开发页面时，只需编写如下代码即可
```
@layout("/common/_container.html"){
<div class="row">
    <div class="col-sm-12">
        <div class="ibox float-e-margins">
            <div class="ibox-title">
                <h5>部门管理</h5>
            </div>
            <div class="ibox-content">
               //自定义内容
            </div>
        </div>
    </div>
</div>
<script src="${ctxPath}/static/modular/system/dept/dept.js"></script>
@}
```
以上beetl的用法请参考beetl说明文档。

##对js常用代码的封装
在webapp/static/js/common目录中，有对常用js代码的封装，例如Feng.js,其中Feng.info(),Feng.success(),Feng.error()三个方法，分别封装了普通提示，成功提示，错误提示的代码，简化了layer提示层插件的使用。

##极简的图片上传方法
guns对web-upload进行二次封装,让图片的上传功能呢只用2行代码即可实现,如下
```
var avatarUp = new $WebUpload("avatar");
avatarUp.init();
```
具体实现请参考static/js/common/web-upload-object.js

##controller层，map+warpper返回方式介绍
map+warpper方式即为把controller层的返回结果使用BeanKit工具类把原有bean转化为Map的的形式(或者原有bean直接是map的形式)，再用单独写的一个包装类再包装一次这个map，使里面的参数更加具体，更加有含义，下面举一个例子，例如，在返回给前台一个性别时，数据库查出来1是男2是女，假如直接返回给前台，那么前台显示的时候还需要增加一次判断，并且前后端分离开发时又增加了一次交流和文档的成本，但是采用warpper包装的形式，可以直接把返回结果包装一下，例如动态增加一个字段sexName直接返回给前台性别的中文名称即可。

##效果图
![输入图片说明](https://git.oschina.net/uploads/images/2017/0511/160059_b7a5d4d5_551203.jpeg "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0516/000735_b83c5c46_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0511/160110_5e4f6d40_551203.jpeg "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0511/160117_94443161_551203.jpeg "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0511/160123_d0e287a5_551203.jpeg "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0511/160129_beb6b25c_551203.jpeg "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0511/160134_2212be4d_551203.jpeg "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0511/160139_ef118391_551203.jpeg "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0511/160144_be4e3c3c_551203.jpeg "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0511/160154_1e2bf378_551203.jpeg "在这里输入图片标题")

##技术讨论
如果对项目有任何疑问或者建议,欢迎加入guns技术交流群:254550081