package com.stylefeng.guns.config.properties;

import java.util.Properties;

/**
 * beetl配置
 *
 * @author fengshuonan
 * @date 2017-05-22 18:45
 */
public class BeetlProperties {

    private static BeetlProperties beetlProperties = new BeetlProperties();

    private Properties properties = new Properties();

    private BeetlProperties(){
        init();
    }

    public void init() {
        //开始结束占位符
        this.properties.setProperty("DELIMITER_PLACEHOLDER_START", "${");
        this.properties.setProperty("DELIMITER_PLACEHOLDER_END", "}");

        //开始结束标签
        this.properties.setProperty("DELIMITER_STATEMENT_START", "@");
        this.properties.setProperty("DELIMITER_STATEMENT_END", "null");

        //classpath 根路径
        this.properties.setProperty("RESOURCE.root", "/");

        //是否检测文件变化
        this.properties.setProperty("RESOURCE.autoCheck", "true");

        //beetl HTMl标签
        this.properties.setProperty("HTML_TAG_FLAG", "#");

        //自定义标签文件Root目录和后缀
        this.properties.setProperty("RESOURCE.tagRoot", "common/tags");
        this.properties.setProperty("RESOURCE.tagSuffix", "tag");
    }

    public static Properties newInstance(){
        return beetlProperties.properties;
    }
}
