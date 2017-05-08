package com.stylefeng.guns.core.template.config;

/**
 * 全局配置
 *
 * @author fengshuonan
 * @date 2017-05-08 20:21
 */
public class ContextConfig {

    private String projectPath = "D:\\ideaSpace\\guns";//模板输出的项目目录
    private String bizChName;   //业务名称
    private String bizEnName;   //业务英文名称

    public String getBizChName() {
        return bizChName;
    }

    public void setBizChName(String bizChName) {
        this.bizChName = bizChName;
    }

    public String getBizEnName() {
        return bizEnName;
    }

    public void setBizEnName(String bizEnName) {
        this.bizEnName = bizEnName;
    }

    public String getProjectPath() {
        return projectPath;
    }

    public void setProjectPath(String projectPath) {
        this.projectPath = projectPath;
    }
}
