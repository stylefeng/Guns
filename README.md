<p align="center">
    <img src="https://images.gitee.com/uploads/images/2019/0109/214218_d2aa949b_551203.png" width="300">
    <br>      
    <br>      
    <p align="center">
        Guns是一个现代化的Java应用开发框架，基于主流技术Spring Boot2 + Vue3，Guns的核心理念是提高开发人员开发效率，降低企业信息化系统的开发成本。
        <br>
        <br>
        <a href="http://spring.io/projects/spring-boot">
            <img src="https://img.shields.io/badge/spring--boot-2.6.14-green.svg" alt="spring-boot">
        </a>
        <a href="http://mp.baomidou.com">
            <img src="https://img.shields.io/badge/mybatis--plus-3.5.3.1-blue.svg" alt="mybatis-plus">
        </a>  
        <a href="https://www.hutool.cn/">
            <img src="https://img.shields.io/badge/hutool-5.8.16-blue.svg" alt="hutool">
        </a>
        <a href="http://ibeetl.com/">
            <img src="https://img.shields.io/badge/beetl-3.3.1-yellow.svg" alt="beetl">
        </a>  
    </p>
</p>

-----------------------------------------------------------------------------------------------

## 官方网站

[https://www.javaguns.com/](https://www.javaguns.com/)

## 快速启动

### Guns v8前端启动

前端需要使用**Node 18**，请先安装node18，推荐使用yarn启动，具体启动方法如下：

```shell
# 安装依赖
yarn

# 启动前端项目
yarn run dev

# 打包
npm run build
```

### Guns v8后端启动

以下为后台启动的过程：

1. 在mysql数据库中创建guns数据库，推荐mysql 5.7或8版本。

2. 修改`application-local.yml`中的数据库连接配置连接到您的数据库。

3. 打开`ProjectStartApplication`运行main方法即可启动，注：新版无需运行sql初始化文件，因为集成了flyway会自动初始化表。

4. 初始化账号密码：admin/123456

## 扫码关注官方公众号和官方微信群

<table>
    <tr>
        <td>官方公众号</td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0415/104911_9bc924a5_551203.png" width="120"/></td>
        <td>扫码邀请入群</td>
        <td><img src="https://images.gitee.com/uploads/images/2019/0419/103622_d6e9fa5d_551203.png" width="120"/></td>
    </tr>
</table>

## 更新日志

### v8.1.2-2024年3月25日

1. 界面整体经过专业UI设计，更加现代化、美观，更新系统菜单和按钮相关的图标，采用iconfont库图标。
2. 用户信息增加一些常用字段，并增加用户绑定多机构功能。
3. 系统右上角增加用户多机构切换功能。
4. 系统右上角增加应用切换功能，使用应用可以为系统的菜单分类区分。
5. 优化了大部分代码，提升了系统性能。
6. 角色增加区分系统角色、业务角色、公司角色，让用户在多机构任职展示不同的权限控制。
7. 权限绑定支持上述3种角色的权限绑定。
8. 菜单界面重构，支持按应用区分多颗树的菜单，更加直观。
9. 增加安全策略功能，支持密码重试策略，次数配置，支持密码失效策略，口令最小长度等配置。
10. 优化首页常用功能的配置，可以快捷设置常用功能。
11. 怎么加独立的授权界面，可以给用户在不同机构绑定不同业务角色和公司角色。
12. 原有用户管理界面的绑定角色改为只绑定系统角色。
13. 增加独立的@DataScope注解，可以便捷设置用户权限。
14. 文档待更新，后续会陆续更新。

## Guns介绍

Guns是一个现代化的Java应用开发框架，基于主流技术**Spring Boot2 + Vue3 + Antd Vue**，Guns基于**插件化架构**，通过灵活组装插件，可以进行集成和拓展相关功能。

**Guns v8**已经发布，前后端代码以及核心包源码，均可在如下Gitee仓库可找到：

主项目：[https://gitee.com/stylefeng/guns](https://gitee.com/stylefeng/guns)

核心包：[https://gitee.com/stylefeng/roses](https://gitee.com/stylefeng/roses)

经过多年发展，Guns已在业界具有一定影响力。Guns技术架构可以直接应用到任何软件产品和技术公司自身的技术体系建设中，帮助企业解决**规范问题**，解决**复用问题**，解决**架构问题**。

![](.README_images/1b1ba389.png)

![](.README_images/52c5b334.png)

![](.README_images/52646809.png)

![](.README_images/c02c7be7.png)

![](.README_images/bc2943ac.png)

![](.README_images/aa8017f8.png)

![](.README_images/de43b7f6.png)

![](.README_images/636236e9.png)

![](.README_images/eb69a366.png)

![](.README_images/661559e2.png)

![](.README_images/7b64d9ed.png)

![](.README_images/179e4c7e.png)

![](.README_images/dd506aa8.png)

![](.README_images/d426da96.png)

![](.README_images/b85c2082.png)

![](.README_images/22cf3c25.png)

![](.README_images/6b9ba4e4.png)

![](.README_images/0bd3a450.png)

![](.README_images/a17a23f7.png)

![](.README_images/b391088e.png)

![](.README_images/9078821a.png)

![](.README_images/8a296f99.png)

![](.README_images/bfbf6bf2.png)

![](.README_images/31be2882.png)

![](.README_images/c9af0123.png)

![](.README_images/b95cf796.png)

![](.README_images/bb50dd3f.png)

![](.README_images/1c37b011.png)

![](.README_images/bf9c1bd9.png)

![](.README_images/f2d9af7f.png)

![](.README_images/7d48ba1a.png)

![](.README_images/64a95acf.png)

![](.README_images/9337d22b.png)

![](.README_images/ab06518c.png)

![](.README_images/5a327d3c.png)

## Guns功能列表

- 1.控制面板
- 2.用户管理
- 3.职位管理
- 4.机构管理
- 5.应用管理
- 6.角色管理
- 7.菜单管理
- 8.资源查看
- 9.系统配置
- 10.字典管理
- 11.在线用户
- 12.定时任务
- 13.文件管理
- 14.多数据源
- 15.操作日志
- 16.登录日志
- 17.通知管理
- 18.SQL监控
- 19.服务器信息
- 20.持续更新...

## Guns插件列表

Guns默认封装了很多功能插件，引用这些插件并使用相关接口，开箱即用，也可以以插件化方式拓展自定义的插件：

- 1.缓存插件（内存和Redis）
- 2.系统配置
- 3.多数据源插件
- 4.邮件插件
- 5.文件插件（minio、本地、阿里云、腾讯云）
- 6.groovy脚本
- 7.jwt插件
- 8.日志插件（文件、数据库）
- 9.excel导出
- 10.拼音转化
- 11.短信插件（阿里云、腾讯云）
- 12.websocket
- 13.定时任务
- 14.参数校验
- 15.wrapper包装
- 16.C端用户
- 17.Demo拦截器
- 18.消息插件
- 19.持续更新...

## Guns曾获荣誉

*Gitee GVP最有价值开源项目。*

*开源中国2018年度最受欢迎中国开源软件。*

*开源中国2019年度最受欢迎中国开源软件。*

*开源中国2020年度最受欢迎中国开源软件。*

*开源中国2021年度最受欢迎中国开源软件。*

*2021“科创中国”开源创新榜－－年度优秀开源产品。*

![1-4](.README_images/1-4.png)

![1-5](.README_images/1-5.png)