# Guns V4.2

## 介绍
Guns基于SpringBoot,致力于做更简洁的后台管理系统,完美整合springmvc + shiro + mybatis-plus + beetl!Guns项目代码简洁,注释丰富,上手容易,同时Guns包含许多基础模块(用户管理,角色管理,部门管理,字典管理等10个模块),可以直接作为一个后台管理系统的脚手架! 2018目标 `更简洁`,`更规范`!

Guns v3.0新增rest api服务,提供对接服务端接口的支持,并利用jwt token鉴权机制给予客户端的访问权限,传输数据进行md5签名保证传输过程数据的安全性!

### Guns v4.2更新内容

> * 修复菜单折叠无法折叠子菜单的子菜单的bug！
> * 感谢Guns and Roses技术交流2群网友摇了摇头（931483459）提供的oracle版本的Guns，现在已上传到oracle分支

### Guns v4.0更新内容

> * guns-admin提供rest api服务，并以jwt方式鉴权，所有以`/gunsApi`开头的接口走这种鉴权方式，其他接口仍为shiro鉴权
> * spring boot升级到2.0版本！
> * 简化前端所有的html，js，css等资源文件，由11.8MB缩减为4.8MB！
> * 新增手动增加标签页的方法，Feng.newCrontab(href,menuName);
> * laydate时间插件和layer弹出层插件更新为官网最新，可以看着layui官网的文档直接开发啦！
> * 去掉animate动画效果，加快页面响应速度！
> * 修复登陆后重启应用造成404的bug！
> * 增强core模块的功能，拿来即用开发新的模块的后端管理系统！
> * 升级各个依赖包的版本！
> * 简化applicatioin.yml的配置，一些固定不变的配置写在core模块的default-config.properties！
> * 简化多数据源配置，简化mybatis-plus的配置！
> * 优化日志记录格式和策略，详情见logback-spring.xml！
> * 修复菜单折叠无法折叠子菜单的子菜单的bug！

此外，**更新Guns文档到《Guns技术文档 v2.0》**

## 最新Guns技术文档
Guns框架有作者在业余时间整理的技术文档,详情点击[查看详情](https://gitee.com/naan1993/guns/wikis/pages?title=Guns%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3&parent=)

## 最新Guns视频教程
Guns框架有作者在业余时间录制的视频教程,详情点击[教程介绍](https://gitee.com/naan1993/guns/wikis/pages?title=Guns%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B&parent=)

## 技术讨论 & [wiki地址](https://gitee.com/naan1993/guns/wikis/Home)
如果对项目有任何疑问或者建议,欢迎加入Guns技术交流1群:254550081，Guns技术交流2群：684163663，Guns技术交流3群：207434260(加之前先看下文档guns-admin/doc/Guns技术文档 v1.0.pdf)

## 管理系统功能
1.用户管理 2.角色管理 3.部门管理 4.菜单管理 5.字典管理 6.业务日志 7.登录日志 8.监控管理 9.通知管理 10.代码生成

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
}
```

## 业务日志记录
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
	<div class="wrapper wrapper-content">
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

## 独创mybatis数据范围拦截器,实现对数据权限的过滤
Guns的数据范围控制是指,对拥有相同角色的用户,根据部门的不同进行相应的数据筛选,如果部门不相同,那么有可能展示出的具体数据是不一致的.所以说Guns对数据范围控制是以部门id为单位来标识的,如何增加数据范围拦截呢?只需在相关的mapper接口的参数中增加一个DataScope对象即可,DataScope中有两个字段,scopeName用来标识sql语句中部门id的字段名称,例如deptiid或者id,另一个字段deptIds就是具体需要过滤的部门id的集合.拦截器原理如下:拦截mapper中包含DataScope对象的方法,获取其原始sql,并做一个包装限制部门id在deptIds范围内的数据进行展示.

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

## jwt token鉴权机制
jwt token鉴权机制是指若需要请求服务器接口,必须通过AuthController获取一个请求令牌(jwt token),持有jwt token的用户才可以访问服务器的其他资源,如果没有此令牌,则访问接口会直接忽略,请求获取jwt token时,需要携带credenceName和credenceCode(可以是账号密码,可以是手机号验证码等等),校验credenceName和credenceCode成功后,会颁发给客户端一个jwt token还有一个随机字符串,用于传输过程中对数据进行签名用,签名机制请见下面介绍.基于token的鉴权机制类似于http协议也是无状态的,它不需要在服务端去保留用户的认证信息或者会话信息.这就意味着基于token认证机制的应用不需要去考虑用户在哪一台服务器登录了,这就为应用的扩展提供了便利.

## 签名机制
签名机制是指客户端向服务端传输数据中,对传输数据进行md5加密,并且加密过程中利用Auth接口返回的随机字符串进行混淆加密,并把md5值同时附带给服务端,服务端通获取数据之后对数据再进行一次md5加密,若加密结果和客户端传来的数据一致,则认定客户端请求的数据是没有被篡改的,若不一致,则认为被加密的数据是被篡改的

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

## 曾获荣誉
![输入图片说明](https://gitee.com/uploads/images/2017/1015/151932_f1593f87_551203.jpeg "initpintu_副本_副本.jpg")