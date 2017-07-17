# Guns V2.4
新版Guns基于SpringBoot全面升级,完美整合springmvc + shiro + mybatis-plus + beetl!

在不用写xml配置(V1.0)的基础上进一步简化项目配置,让您更专注于业务开发!抛弃传统spring xml的配置方式,利用springboot + javabean方式配置spring,极大简化了pom.xml配置和spring配置.

Guns项目代码简洁,注释丰富,上手容易,同时Guns包含许多基础模块(用户管理,角色管理,部门管理,字典管理等10个模块),可以直接作为一个后台管理系统的脚手架.

## 鸣谢
1.[SpringBlade](http://git.oschina.net/smallc/SpringBlade)
2.[beetl](http://ibeetl.com/)
3.[mybatis-plus](http://git.oschina.net/baomidou/mybatis-plus)

## 感谢以下对Guns做出贡献的人
1.[Swifly](http://git.oschina.net/cyf783)
2.[liujiliang](liujiliang@chinasofti.com)
3.[poseidon-ocean](poseidon@163.com)
4.[扎西多顿](http://git.oschina.net/zhaping)
5.[ilaotan](http://git.oschina.net/xiaosheng12345)

## 技术讨论
如果对项目有任何疑问或者建议,欢迎加入Guns技术交流群:254550081(加之前请先看一遍readme文档)

## V2.4更新日志
1. 集成spring session,解决多机部署环境session共享问题
2. 增加logback日志配置，日志记录统一用slf4j记录
3. 修复linux下代码生成不兼容的问题
4. 修复用户管理点击父级部门查询不到相关用户的问题
5. 修复home图标点击不生效的问题
6. 增加添加菜单时，对编号和父级编号可能一致的判断
7. 修复添加一级菜单不生效的问题

### 如果不喜欢SpringBoot?
如果您不喜欢用SpringBoot,或者您是一个spring初学者,您可以切换到***[Guns V1.0(点击这里)](http://git.oschina.net/naan1993/guns/tree/v1.0/)***分支,
Guns V1.0基于spring的java bean方式配置项目,同样简洁易上手.

注:SpringBoot强大的Auto Config和统一的依赖管理极大的简化了spring配置和maven依赖,在不了解其都配置了哪些东西的基础上可能会对初学者有一定困扰,所以建议初学者先看Guns V1.0

## 功能简介
1. 用户管理
2. 角色管理
3. 部门管理
4. 菜单管理
5. 字典管理
6. 业务日志
7. 登录日志
8. 监控管理
9. 通知管理
10. 代码生成

## 使用说明
1. 导入sql/guns.sql文件到mysql数据库
2. 以maven方式导入项目到ide
3. 修改application.yml中的数据库相关的配置,改为您本机的数据库配置
4. 启动项目,管理员***账号admin/密码111111***

### 如何启动项目
Guns目前支持三种启动方式:
1. 在IDE里运行GunsApplication类中的main方法启动
2. 执行如下maven命令
```
clean package -Dmaven.test.skip=true
```
并从target目录中找到guns-1.0.0-SNAPSHOT.jar,并在jar包的目录下执行如下java命令
```
java -jar guns-1.0.0-SNAPSHOT.jar
```
3. 修改pom.xml中如下片段
```
<packaging>jar</packaging>
```
改为
```
<packaging>war</packaging>
```
并打包放入到tomcat中执行

### 注意
建议本项目用jdk1.8,经测试jdk1.7登录页面会导致css丢失

## 所用框架
### 前端
1. Bootstrap v3.3.6
2. jQuery v2.1.4 
3. bootstrap-table v1.11.1
4. layer v2.1
5. zTree core v3.5.28
6. WebUploader 0.1.5

### 后端
1. SpringBoot 1.5.3.RELEASE
2. MyBatis-Plus 2.0.8
3. MyBatis 3.4.4
4. Spring 4.3.8.RELEASE
5. Beetl 2.7.15
6. hibernate-validator 5.3.5.Final
7. Ehcache 3.3.1
8. Kaptcha 2.3.2
9. Fastjson 1.2.31
10. Shiro 1.4.0
11. Druid 1.0.31

## 项目包结构说明
```
├─main
│  │  
│  ├─java
│  │   │
│  │   ├─com.stylefeng.guns----------------项目主代码
│  │   │          │
│  │   │          ├─common----------------项目公用的部分(业务中经常调用的类,例如常量,异常,实体,注解,分页类,节点类)
│  │   │          │
│  │   │          ├─config----------------项目配置代码(例如mybtais-plus配置,ehcache配置等)
│  │   │          │
│  │   │          ├─core----------------项目运行的核心依靠(例如aop日志记录,拦截器,监听器,guns模板引擎,shiro权限检查等)
│  │   │          │
│  │   │          ├─modular----------------项目业务代码
│  │   │          │
│  │   │          ├─GunsApplication类----------------以main方法启动springboot的类
│  │   │          │
│  │   │          └─GunsServletInitializer类----------------用servlet容器启动springboot的核心类
│  │   │
│  │   └─generator----------------mybatis-plus Entity生成器
│  │
│  ├─resources----------------项目资源文件
│  │     │
│  │     ├─gunsTemplate----------------guns代码生成模板
│  │     │ 
│  │     ├─application.yml----------------springboot项目配置
│  │     │ 
│  │     └─ehcache.xml----------------ehcache缓存配置
│  │
│  └─webapp----------------web页面和静态资源存放的目录
│  
```
注:SpringBoot项目默认不支持将静态资源和模板(web页面)放到webapp目录,但是个人感觉resources目录只放项目的配置更加简洁,所以就将web页面继续放到webapp目录了.

## 项目特点
1. 基于SpringBoot,简化了大量项目配置和maven依赖,让您更专注于业务开发,独特的分包方式,代码多而不乱。
2. 完善的日志记录体系，可记录登录日志，业务操作日志(可记录操作前和操作后的数据)，异常日志到数据库，通过@BussinessLog注解和LogObjectHolder.me().set()方法，业务操作日志可具体记录哪个用户，执行了哪些业务，修改了哪些数据，并且日志记录为异步执行，详情请见@BussinessLog注解和LogObjectHolder,LogManager,LogAop类。
3. 利用beetl模板引擎对前台页面进行封装和拆分，使臃肿的html代码变得简洁，更加易维护。
4. 对常用js插件进行二次封装，使js代码变得简洁，更加易维护，具体请见webapp/static/js/common文件夹内js代码。
5. 利用ehcache框架对经常调用的查询进行缓存，提升运行速度，具体请见ConstantFactory类中@Cacheable标记的方法。
6. controller层采用map + warpper方式的返回结果，返回给前端更为灵活的数据，具体参见com.stylefeng.guns.modular.system.warpper包中具体类。
7. 防止XSS攻击,通过XssFilter类对所有的输入的非法字符串进行过滤以及替换。
8. 简单可用的代码生成体系，通过SimpleTemplateEngine可生成带有主页跳转和增删改查的通用控制器、html页面以及相关的js，还可以生成Service和Dao，并且这些生成项都为可选的，通过ContextConfig下的一些列xxxSwitch开关,可灵活控制生成模板代码，让您把时间放在真正的业务上。
9. 控制器层统一的异常拦截机制,利用@ControllerAdvice统一对异常拦截,具体见com.stylefeng.guns.core.aop.GlobalExceptionHandler类。
10. 页面统一的js key-value单例模式写法，每个页面生成一个唯一的全局变量，提高js的利用效率，并且有效防止多个人员开发引起的函数名/类名冲突，并且可以更好地去维护代码。

## 基于javabean方式的spring配置
Guns以简洁为核心,抛弃了传统的易错,臃肿xml配置,采用javabean的方式配置spring,简化了项目的配置,如下示例为配置mybatis-plus和数据源:
```
@Configuration
@MapperScan(basePackages = {"com.stylefeng.guns.modular.*.dao", "com.stylefeng.guns.common.persistence.dao"})
public class MybatisPlusConfig {

    @Autowired
    DruidProperties druidProperties;

    /**
     * mybatis-plus分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        paginationInterceptor.setDialectType(DBType.MYSQL.getDb());
        return paginationInterceptor;
    }

    /**
     * druid数据库连接池
     */
    @Bean(initMethod = "init")
    public DruidDataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        druidProperties.coinfig(dataSource);
        return dataSource;
    }
}
```

## 业务日志记录原理
日志记录采用aop(LogAop类)方式对所有包含@BussinessLog注解的方法进行aop切入，会记录下当前用户执行了哪些操作（即@BussinessLog value属性的内容），如果涉及到数据修改，会取当前http请求的所有requestParameters与LogObjectHolder类中缓存的Object对象的所有字段作比较（所以在编辑之前的获取详情接口中需要缓存被修改对象之前的字段信息），日志内容会异步存入数据库中（通过ScheduledThreadPoolExecutor类）。

## beetl对前台页面的拆分与包装
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

## 对js常用代码的封装
在webapp/static/js/common目录中，有对常用js代码的封装，例如Feng.js,其中Feng.info(),Feng.success(),Feng.error()三个方法，分别封装了普通提示，成功提示，错误提示的代码，简化了layer提示层插件的使用。

## 极简的图片上传方法
guns对web-upload进行二次封装,让图片的上传功能呢只用2行代码即可实现,如下
```
var avatarUp = new $WebUpload("avatar");
avatarUp.init();
```
具体实现请参考static/js/common/web-upload-object.js

## 独创controller层，map+warpper返回方式
map+warpper方式即为把controller层的返回结果使用BeanKit工具类把原有bean转化为Map的的形式(或者原有bean直接是map的形式)，再用单独写的一个包装类再包装一次这个map，使里面的参数更加具体，更加有含义，下面举一个例子，例如，在返回给前台一个性别时，数据库查出来1是男2是女，假如直接返回给前台，那么前台显示的时候还需要增加一次判断，并且前后端分离开发时又增加了一次交流和文档的成本，但是采用warpper包装的形式，可以直接把返回结果包装一下，例如动态增加一个字段sexName直接返回给前台性别的中文名称即可。

## swagger api管理使用说明
swagger会管理所有包含@ApiOperation注解的控制器方法，同时，可利用@ApiImplicitParams注解标记接口中的参数，具体用法请参考CodeController类中的用法。
```
 @ApiOperation("生成代码")
 @ApiImplicitParams({
         @ApiImplicitParam(name = "moduleName", value = "模块名称", required = true, dataType = "String"),
         @ApiImplicitParam(name = "bizChName", value = "业务名称", required = true, dataType = "String"),
         @ApiImplicitParam(name = "bizEnName", value = "业务英文名称", required = true, dataType = "String"),
         @ApiImplicitParam(name = "path", value = "项目生成类路径", required = true, dataType = "String")
 })
 @RequestMapping(value = "/generate", method = RequestMethod.POST)
```

## 常见问题答疑
1. 为何有的业务没有service层: 部分业务比较简单,所以就没写service层,写service是为了让复杂业务更有条理,更清晰.
2. 为何既有dao,又有mapper: mapper是mybatis-plus自动生成的,里边有许多mybatis-plus增强的方法,dao是自己写的业务,mybatis-plus自动生成代码时会覆盖mapper,所以就把自己写的dao分开了,生成代码的时候不影响
3. 为何分页是前端实现:部分页面因为数据量比较少,就直接用客户端分页了,日志页面的分页是采用服务端分页的,如果其他业务有特别需要,可以参考日志的写法

## 效果图
![输入图片说明](https://git.oschina.net/uploads/images/2017/0604/194616_36ed7fd6_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0604/194623_a0761bc3_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0604/194630_640dfd35_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0526/104015_bdb14c74_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0516/000735_b83c5c46_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0526/103734_bd3e8f6b_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0604/194539_f9bb482a_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0526/103746_6b4129ed_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0526/103755_7729b916_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0526/103801_b8216865_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0526/103807_20bfb868_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0526/103814_67e078bb_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0526/103822_58fd5d91_551203.png "在这里输入图片标题")
![输入图片说明](https://git.oschina.net/uploads/images/2017/0526/103827_d6218c74_551203.png "在这里输入图片标题")

