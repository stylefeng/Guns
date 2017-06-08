package com.stylefeng.guns.core.template.config;

import java.util.ArrayList;
import java.util.List;

/**
 * Service模板生成的配置
 *
 * @author fengshuonan
 * @date 2017-05-07 22:12
 */
public class ServiceConfig {

    private ContextConfig contextConfig;

    private String servicePathTemplate = "\\src\\main\\java\\com\\stylefeng\\guns\\modular\\system\\service\\I{}Service.java";
    private String serviceImplPathTemplate = "\\src\\main\\java\\com\\stylefeng\\guns\\modular\\system\\service\\impl\\{}ServiceImpl.java";

    private String packageName = "com.stylefeng.guns.modular.system.service";

    private List<String> serviceImplImports;

    public ServiceConfig(ContextConfig contextConfig) {
        this.contextConfig = contextConfig;
        init();
    }

    private void init() {
        ArrayList<String> imports = new ArrayList<>();
        imports.add("org.springframework.stereotype.Service");
        imports.add("com.stylefeng.guns.modular.system.service.I" + contextConfig.getBizEnBigName() + "Service");
        this.serviceImplImports = imports;
    }


    public String getServicePathTemplate() {
        return servicePathTemplate;
    }

    public void setServicePathTemplate(String servicePathTemplate) {
        this.servicePathTemplate = servicePathTemplate;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getServiceImplPathTemplate() {
        return serviceImplPathTemplate;
    }

    public void setServiceImplPathTemplate(String serviceImplPathTemplate) {
        this.serviceImplPathTemplate = serviceImplPathTemplate;
    }

    public List<String> getServiceImplImports() {
        return serviceImplImports;
    }

    public void setServiceImplImports(List<String> serviceImplImports) {
        this.serviceImplImports = serviceImplImports;
    }

    public ContextConfig getContextConfig() {
        return contextConfig;
    }

    public void setContextConfig(ContextConfig contextConfig) {
        this.contextConfig = contextConfig;
    }
}
