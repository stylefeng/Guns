package com.stylefeng.guns.core.template.config;

/**
 * 控制器模板生成的配置
 *
 * @author fengshuonan
 * @date 2017-05-07 22:12
 */
public class PageConfig {

    private String pageJsPathTemplate = "\\src\\main\\webapp\\static\\modular\\system\\{}\\{}.js";
    private String pagePathTemplate = "\\src\\main\\webapp\\WEB-INF\\view\\system\\{}\\{}.html";

    public String getPagePathTemplate() {
        return pagePathTemplate;
    }

    public void setPagePathTemplate(String pagePathTemplate) {
        this.pagePathTemplate = pagePathTemplate;
    }

    public String getPageJsPathTemplate() {
        return pageJsPathTemplate;
    }

    public void setPageJsPathTemplate(String pageJsPathTemplate) {
        this.pageJsPathTemplate = pageJsPathTemplate;
    }
}
