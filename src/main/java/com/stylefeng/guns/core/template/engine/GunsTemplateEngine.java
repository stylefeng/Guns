package com.stylefeng.guns.core.template.engine;

import com.stylefeng.guns.core.template.config.ContextConfig;
import com.stylefeng.guns.core.util.ToolUtil;
import org.beetl.core.Configuration;
import org.beetl.core.GroupTemplate;
import org.beetl.core.Template;
import org.beetl.core.resource.ClasspathResourceLoader;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * guns项目模板生成 引擎
 *
 * @author fengshuonan
 * @date 2017-05-07 22:15
 */
public class GunsTemplateEngine extends AbstractTemplateEngine {

    private GroupTemplate groupTemplate;

    public GunsTemplateEngine() {
        initBeetlEngine();
    }

    public void initBeetlEngine() {
        Properties properties = new Properties();
        properties.put("RESOURCE.root", "");
        properties.put("DELIMITER_STATEMENT_START", "<%");
        properties.put("DELIMITER_STATEMENT_END", "%>");
        properties.put("HTML_TAG_FLAG", "##");
        Configuration cfg = null;
        try {
            cfg = new Configuration(properties);
        } catch (IOException e) {
            e.printStackTrace();
        }
        ClasspathResourceLoader resourceLoader = new ClasspathResourceLoader();
        groupTemplate = new GroupTemplate(resourceLoader, cfg);
        groupTemplate.registerFunctionPackage("tool", new ToolUtil());
    }

    public void configTemplate(Template template){
        template.binding("controller", super.getControllerConfig());
        template.binding("context", super.getContextConfig());
    }

    public void start() throws IOException {
        //初始化控制器模板
        Template controllerTemplate = groupTemplate.getTemplate("gunsTemplate/Controller.java.btl");
        configTemplate(controllerTemplate);
        String controllerPath = ToolUtil.format(super.getContextConfig().getProjectPath() + super.getControllerConfig().getControllerPathTemplate(),
                ToolUtil.firstLetterToUpper(super.getContextConfig().getBizEnName()));
        controllerTemplate.renderTo(new FileOutputStream(controllerPath));
        System.out.println("生成控制器成功!");

        //初始化主页面html
        Template pageTemplate = groupTemplate.getTemplate("gunsTemplate/page.html.btl");
        configTemplate(pageTemplate);
        String pagePath = ToolUtil.format(super.getContextConfig().getProjectPath() + super.getPageConfig().getPagePathTemplate(),
                super.getContextConfig().getBizEnName(),super.getContextConfig().getBizEnName());
        File file = new File(pagePath);
        File parentFile = file.getParentFile();
        if(!parentFile.exists()){
            parentFile.mkdirs();
        }
        pageTemplate.renderTo(new FileOutputStream(file));
        System.out.println("生成页面成功!");
    }

    public static void main(String[] args) throws IOException {
        ContextConfig contextConfig = new ContextConfig();
        contextConfig.setBizChName("测试");
        contextConfig.setBizEnName("test");

        GunsTemplateEngine gunsTemplateEngine = new GunsTemplateEngine();
        gunsTemplateEngine.setContextConfig(contextConfig);
        gunsTemplateEngine.start();
    }
}
