package com.stylefeng.guns.core.template.config;

import java.util.ArrayList;
import java.util.List;

/**
 * 控制器模板生成的配置
 *
 * @author fengshuonan
 * @date 2017-05-07 22:12
 */
public class ControllerConfig {

    private String controllerPathTemplate = "\\src\\main\\java\\com\\stylefeng\\guns\\modular\\system\\controller\\{}Controller.java";
    private String packageName;//包名称
    private List<String> imports;//所引入的包

    public ControllerConfig(){
        init();
    }

    private void init(){
        ArrayList<String> imports = new ArrayList<>();
        imports.add("com.stylefeng.guns.common.controller.BaseController");
        imports.add("org.springframework.stereotype.Controller");
        imports.add("org.springframework.web.bind.annotation.RequestMapping");
        imports.add("org.springframework.web.bind.annotation.ResponseBody");
        imports.add("org.springframework.ui.Model");
        imports.add("org.springframework.web.bind.annotation.PathVariable");
        this.imports = imports;
        this.packageName = "com.stylefeng.guns.modular.system.controller";
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
}
