package com.stylefeng.guns.template;

import com.stylefeng.guns.core.template.config.ContextConfig;
import com.stylefeng.guns.core.template.engine.GunsTemplateEngine;

import java.io.IOException;

/**
 * 客户端
 *
 * @author fengshuonan
 * @date 2017-05-09 20:27
 */
public class TemplateGenerator {

    public static void main(String[] args) throws IOException {
        ContextConfig contextConfig = new ContextConfig();
        contextConfig.setBizChName("测试");
        contextConfig.setBizEnName("test");

        GunsTemplateEngine gunsTemplateEngine = new GunsTemplateEngine();
        gunsTemplateEngine.setContextConfig(contextConfig);
        gunsTemplateEngine.start();
    }

}
