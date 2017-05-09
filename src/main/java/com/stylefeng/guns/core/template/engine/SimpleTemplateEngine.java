package com.stylefeng.guns.core.template.engine;

import com.stylefeng.guns.core.template.engine.base.GunsTemplateEngine;
import com.stylefeng.guns.core.util.ToolUtil;
import org.beetl.core.Template;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

/**
 * 通用的模板生成引擎
 *
 * @author fengshuonan
 * @date 2017-05-09 20:32
 */
public class SimpleTemplateEngine extends GunsTemplateEngine {

    @Override
    protected void generatePageJs() {
        Template pageTemplate = groupTemplate.getTemplate("gunsTemplate/page.js.btl");
        configTemplate(pageTemplate);
        String jsPath = ToolUtil.format(super.getContextConfig().getProjectPath() + super.getPageConfig().getPageJsPathTemplate(),
                super.getContextConfig().getBizEnName(),super.getContextConfig().getBizEnName());
        File file = new File(jsPath);
        File parentFile = file.getParentFile();
        if(!parentFile.exists()){
            parentFile.mkdirs();
        }
        try {
            pageTemplate.renderTo(new FileOutputStream(file));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        System.out.println("生成页面js成功!");
    }

    @Override
    protected void generatePageHtml() {
        Template pageTemplate = groupTemplate.getTemplate("gunsTemplate/page.html.btl");
        configTemplate(pageTemplate);
        String pagePath = ToolUtil.format(super.getContextConfig().getProjectPath() + super.getPageConfig().getPagePathTemplate(),
                super.getContextConfig().getBizEnName(),super.getContextConfig().getBizEnName());
        File file = new File(pagePath);
        File parentFile = file.getParentFile();
        if(!parentFile.exists()){
            parentFile.mkdirs();
        }
        try {
            pageTemplate.renderTo(new FileOutputStream(file));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        System.out.println("生成页面成功!");
    }

    @Override
    protected void generateController() {
        Template controllerTemplate = super.groupTemplate.getTemplate("gunsTemplate/Controller.java.btl");
        configTemplate(controllerTemplate);
        String controllerPath = ToolUtil.format(super.getContextConfig().getProjectPath() + super.getControllerConfig().getControllerPathTemplate(),
                ToolUtil.firstLetterToUpper(super.getContextConfig().getBizEnName()));
        try {
            controllerTemplate.renderTo(new FileOutputStream(controllerPath));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        System.out.println("生成控制器成功!");
    }
}
