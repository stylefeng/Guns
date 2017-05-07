package com.stylefeng.guns.core.template.engine;

import com.stylefeng.guns.core.support.BeanKit;
import com.stylefeng.guns.core.template.config.ControllerConfig;
import com.stylefeng.guns.core.util.ToolUtil;
import org.beetl.core.Configuration;
import org.beetl.core.GroupTemplate;
import org.beetl.core.Template;
import org.beetl.core.resource.ClasspathResourceLoader;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * guns项目模板生成 引擎
 *
 * @author fengshuonan
 * @date 2017-05-07 22:15
 */
public class GunsEngine {

    public static void main(String[] args) throws IOException {
        Properties properties = new Properties();
        properties.put("RESOURCE.root","");

        ControllerConfig controllerConfig = new ControllerConfig();
        controllerConfig.setBizChName("测试");
        controllerConfig.setBizEnName("test");

        ClasspathResourceLoader resourceLoader = new ClasspathResourceLoader();
        Configuration cfg = new Configuration(properties);
        GroupTemplate groupTemplate = new GroupTemplate(resourceLoader,cfg);
        groupTemplate.registerFunctionPackage("tool", new ToolUtil());

        Template template = groupTemplate.getTemplate("gunsTemplate/Controller.java.btl");
        template.binding(BeanKit.beanToMap(controllerConfig));
        String render = template.render();
        template.renderTo(new FileOutputStream("D:\\ideaSpace\\guns\\src\\main\\java\\com\\stylefeng\\guns\\modular\\system\\controller\\TestController.java"));
        System.out.println(render);
    }
}
