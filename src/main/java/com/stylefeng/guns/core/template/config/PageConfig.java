package com.stylefeng.guns.core.template.config;

/**
 * 控制器模板生成的配置
 *
 * @author fengshuonan
 * @date 2017-05-07 22:12
 */
public class PageConfig {

    private String pagePathTemplate = "\\src\\main\\webapp\\WEB-INF\\view\\system\\{}\\{}.html";
    private String pageAddPathTemplate = "\\src\\main\\webapp\\WEB-INF\\view\\system\\{}\\{}_add.html";
    private String pageEditPathTemplate = "\\src\\main\\webapp\\WEB-INF\\view\\system\\{}\\{}_edit.html";
    private String pageJsPathTemplate = "\\src\\main\\webapp\\static\\modular\\system\\{}\\{}.js";
    private String pageInfoJsPathTemplate = "\\src\\main\\webapp\\static\\modular\\system\\{}\\{}_info.js";

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

    public String getPageAddPathTemplate() {
        return pageAddPathTemplate;
    }

    public void setPageAddPathTemplate(String pageAddPathTemplate) {
        this.pageAddPathTemplate = pageAddPathTemplate;
    }

    public String getPageEditPathTemplate() {
        return pageEditPathTemplate;
    }

    public void setPageEditPathTemplate(String pageEditPathTemplate) {
        this.pageEditPathTemplate = pageEditPathTemplate;
    }

    public String getPageInfoJsPathTemplate() {
        return pageInfoJsPathTemplate;
    }

    public void setPageInfoJsPathTemplate(String pageInfoJsPathTemplate) {
        this.pageInfoJsPathTemplate = pageInfoJsPathTemplate;
    }
}
