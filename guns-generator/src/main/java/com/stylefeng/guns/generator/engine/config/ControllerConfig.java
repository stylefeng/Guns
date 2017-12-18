package com.stylefeng.guns.generator.engine.config;

import java.util.ArrayList;
import java.util.List;

/**
 * 控制器模板生成的配置
 *
 * @author fengshuonan
 * @date 2017-05-07 22:12
 */
public class ControllerConfig {

    private ContextConfig contextConfig;

    private String controllerPathTemplate;
    private String packageName;//包名称
    private List<String> imports;//所引入的包

    public void init() {
        ArrayList<String> imports = new ArrayList<>();
        imports.add(contextConfig.getCoreBasePackage() + ".base.controller.BaseController");
        imports.add("org.springframework.stereotype.Controller");
        imports.add("org.springframework.web.bind.annotation.RequestMapping");
        imports.add("org.springframework.web.bind.annotation.ResponseBody");
        imports.add("org.springframework.ui.Model");
        imports.add("org.springframework.web.bind.annotation.PathVariable");
        imports.add("org.springframework.beans.factory.annotation.Autowired");
        imports.add(contextConfig.getProPackage() + ".core.log.LogObjectHolder");
        imports.add("org.springframework.web.bind.annotation.RequestParam");
        imports.add(contextConfig.getModelPackageName() + "." + contextConfig.getEntityName());
        imports.add(contextConfig.getProPackage() + ".modular." + contextConfig.getModuleName() + ".service" + ".I" + contextConfig.getEntityName() + "Service");
        this.imports = imports;
        this.packageName = contextConfig.getProPackage() + ".modular." + contextConfig.getModuleName() + ".controller";
        this.controllerPathTemplate = "\\src\\main\\java\\"+contextConfig.getProPackage().replaceAll("\\.","\\\\")+"\\modular\\" + contextConfig.getModuleName() + "\\controller\\{}Controller.java";
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public List<String> getImports() {
        return imports;
    }

    public void setImports(List<String> imports) {
        this.imports = imports;
    }

    public String getControllerPathTemplate() {
        return controllerPathTemplate;
    }

    public void setControllerPathTemplate(String controllerPathTemplate) {
        this.controllerPathTemplate = controllerPathTemplate;
    }

    public ContextConfig getContextConfig() {
        return contextConfig;
    }

    public void setContextConfig(ContextConfig contextConfig) {
        this.contextConfig = contextConfig;
    }

}
