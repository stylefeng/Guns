package com.stylefeng.guns.core.template.engine.base;

import com.stylefeng.guns.core.template.config.ContextConfig;
import com.stylefeng.guns.core.template.config.ControllerConfig;
import com.stylefeng.guns.core.template.config.PageConfig;

/**
 * 模板生成父类
 *
 * @author fengshuonan
 * @date 2017-05-08 20:17
 */
public class AbstractTemplateEngine {

    private ContextConfig contextConfig = new ContextConfig();              //全局配置
    private ControllerConfig controllerConfig = new ControllerConfig();     //控制器的配置
    private PageConfig pageConfig = new PageConfig();                       //页面的控制器

    public PageConfig getPageConfig() {
        return pageConfig;
    }

    public void setPageConfig(PageConfig pageConfig) {
        this.pageConfig = pageConfig;
    }

    public ContextConfig getContextConfig() {
        return contextConfig;
    }

    public void setContextConfig(ContextConfig contextConfig) {
        this.contextConfig = contextConfig;
    }

    public ControllerConfig getControllerConfig() {
        return controllerConfig;
    }

    public void setControllerConfig(ControllerConfig controllerConfig) {
        this.controllerConfig = controllerConfig;
    }
}

