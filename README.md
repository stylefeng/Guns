#Guns


## 感谢
1.[SpringBlade](http://git.oschina.net/smallc/SpringBlade)

## 内置功能

1.	用户管理
2.	角色管理
3.	菜单管理
4.	字典管理
5.	部门管理
6.	附件管理
7.	参数管理
8.	连接池监视
9.	日志管理
10.	代码生成

## 技术选型

1、后端

* 核心框架：Spring Framework
* 安全框架：Apache Shiro
* 视图框架：Spring MVC
* 服务端验证：Blade Validator
* 任务调度：Spring Task
* 持久层框架：beetlsql
* 模板引擎：beetl
* 数据库连接池：Alibaba Druid
* 缓存框架：Ehcache
* 日志管理：SLF4J、LOGBACKUP
* 工具类：Apache Commons、FastJson、EASYPOI、BladeToolBox

2、前端

* JS框架：jQuery
* CSS框架：Twitter Bootstrap
* 客户端验证：JQuery-html5Validate
* 富文本：KindEcitor
* 数据表格：jqGrid
* 树结构控件：jQuery zTree
* 弹出层：Layer
* 日期控件： LayDate
* 图表控件：echarts

## 后台界面
![后台界面](http://git.oschina.net/uploads/images/2016/1216/101843_390413c3_474499.png "后台界面")
![后台界面](http://git.oschina.net/uploads/images/2016/1216/101859_f8602cd4_474499.png "后台界面")
![后台界面](http://git.oschina.net/uploads/images/2016/1216/101906_23f5cac9_474499.png "后台界面")
![后台界面](http://git.oschina.net/uploads/images/2016/1216/101918_2d2f2b09_474499.png "后台界面")
![后台界面](http://git.oschina.net/uploads/images/2016/1216/101926_2fed83a4_474499.png "后台界面")
![后台界面](http://git.oschina.net/uploads/images/2016/1216/101936_51942583_474499.png "后台界面")
![后台界面](http://git.oschina.net/uploads/images/2016/1216/101944_17417a87_474499.png "后台界面")

## 代码示例
实体类
```
@Table(name = "notice")
@BindID(name = "id")
@SuppressWarnings("serial")
public class Notice extends BaseModel {
	private String id;
	private Integer creater;
	private String content;
	private String title;
	private Date createTime;

	@AutoID
	@SeqID(name = "SEQ_NOTICE")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}	
	.....................
		
}
```

 新增
```
	@Json
	@RequestMapping(KEY_SAVE)
	public AjaxResult save() {
		Notice notice = mapping(PREFIX, Notice.class);
		boolean temp = Blade.create(Notice.class).save(notice);
		if (temp) {
			return success(SAVE_SUCCESS_MSG);
		} else {
			return error(SAVE_FAIL_MSG);
		}
	}
```

 修改
```
	@Json
	@RequestMapping(KEY_UPDATE)
	public AjaxResult update() {
		Notice notice = mapping(PREFIX, Notice.class);
		boolean temp = Blade.create(Notice.class).update(notice);
		if (temp) {
			return success(UPDATE_SUCCESS_MSG);
		} else {
			return error(UPDATE_FAIL_MSG);
		}
	}
```

 删除
```
	@Json
	@RequestMapping(KEY_REMOVE)
	public AjaxResult remove(@RequestParam String ids) {
		int cnt = Blade.create(Notice.class).deleteByIds(ids);
		if (cnt > 0) {
			return success(DEL_SUCCESS_MSG);
		} else {
			return error(DEL_FAIL_MSG);
		}
	}
```

 自定义sql查询,返回map
```
	List<Map> list = Db.selectList("select * form news where title = #{title}", CMap.init().set("title", "标题测试"));
```

 自定义sql查询,返回String(使用多数据源)
```
	String editor = Db.init("otherDb").queryStr("select editor form news where newsId = #{newsId}", CMap.init().set("newsId", 123));
```

 根据md文件的sql执行修改
```
	int cnt = Md.update("news.update", CMap.init().set("title", "标题测试").set("id", "1"));
```

 根据条件修改
```
	boolean temp = Blade.create(News.class).updateBy("editor = #{editor}", "title = #{title}", CMap.init().set("title", "测试标题").set("editor", "编辑一"));
```

 根据条件删除
```
	String ids = "1,2,3,4,5";
	String[] idArr = ids.split(",");
	int cnt = Blade.create(News.class).deleteBy("status in (#{join(ids)})", CMap.init().set("ids", idArr));
```

## 通用Service
```
	public interface NoticeService extends IService<Notice> {
	
	}
	
	
	@Service
	public class NoticeServiceImpl extends BaseService<Notice> implements NoticeService {
	
	}


	@Autowired
	NoticeService service;

	@Json
	@RequestMapping(KEY_SAVE)
	public AjaxResult save() {
		Notice notice = mapping(PREFIX, Notice.class);
		boolean temp = service.save(notice);
		if (temp) {
			return success(SAVE_SUCCESS_MSG);
		} else {
			return error(SAVE_FAIL_MSG);
		}
	}

```

## 分页
```
	@Json
	@RequestMapping(KEY_LIST)
	public Object list() {
		Object grid = paginate(LIST_SOURCE, new IQuery() {
			
			@Override
			public void queryBefore(AopContext ac) {
				if (ShiroKit.lacksRole(ConstShiro.ADMINISTRATOR)) {
					String condition = "and creater = #{creater}";
					ac.setCondition(condition);
					ac.getParam().put("creater", ShiroKit.getUser().getId());
				}
			}
			
			@Override
			public void queryAfter(AopContext ac) {
				@SuppressWarnings("unchecked")
				BladePage<Map<String, Object>> page = (BladePage<Map<String, Object>>) ac.getObject();
				List<Map<String, Object>> list = page.getRows();
				for (Map<String, Object> map : list) {
					map.put("createrName", SysCache.getDictName(102, map.get("creater")));
				}
			}
		});
		
		return grid;
	}
```

注：
=======

欢迎提出更好的意见, 大家共同进步  
SpringBlade主要用于交流学习, 开源协议署名为smallchill的代码也可以进行商用
但是如果因为商业用途引起的纠纷和造成的一切后果请自行承担
登陆名密码：两个 admin

SpringBlade交流群：`477853168`  主要给大家交流学习, 本人工作比较忙, 回复的少请见谅

SpringBlade不搞捐赠, 不打广告, 只做最单纯的开源项目

如果需要非maven版,请点击[SpringBlade](http://git.oschina.net/smallc/SpringBlade_General)

常见问题
=======
##1.linux下登陆报未知错误
发布在linux的小伙伴需要做如下操作：
`vi /etc/my.cnf`
在[mysqld]节点下增加`lower_case_table_names = 1`
`:wq`
`service mysqld restart`
取消大小写敏感，就可以正常运行了

##2.连接oracle报未知错误
到resource文件夹下config.properties修改oracle链接，然后到resource/spring/applicationContext.xml找到
```
<property name="dbStyle">
    <bean class="org.beetl.sql.core.db.MySqlStyle"></bean>
</property>
```
将`MySqlStyle`改为`OracleStyle`

##3.创建model后有没有自动生成javabean字段和sql的办法？
有,访问如下两个地址：
`localhost:8080/blade/generate/pojo/blade_menu`
`localhost:8080/blade/generate/sql/com.smallchill.system.model.Menu`
查看控制台打印结果,按自己需求复制粘贴到model和md文件中

