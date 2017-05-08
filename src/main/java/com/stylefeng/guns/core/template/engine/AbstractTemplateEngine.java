package com.stylefeng.guns.core.template.engine;

import com.stylefeng.guns.core.template.config.ContextConfig;
import com.stylefeng.guns.core.template.config.ControllerConfig;

/**
 * 模板生成父类
 *
 * @author fengshuonan
 * @date 2017-05-08 20:17
 */
public class AbstractTemplateEngine {

    private ContextConfig contextConfig = new ContextConfig();              //全局配置
    private ControllerConfig controllerConfig = new ControllerConfig();     //控制器的配置

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

