package com.stylefeng.guns.core.template.config;

import com.stylefeng.guns.core.util.ToolUtil;

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
    private String bizEnBigName;//业务英文名称(大写)
    private String moduleName = "system";  //模块名称

    private Boolean controllerSwitch = true;    //是否生成控制器代码开关
    private Boolean indexPageSwitch = true;     //主页
    private Boolean addPageSwitch = true;       //添加页面
    private Boolean editPageSwitch = true;      //编辑页面
    private Boolean jsSwitch = true;            //js
    private Boolean infoJsSwitch = true;        //详情页面js
    private Boolean daoSwitch = true;           //dao
    private Boolean serviceSwitch = true;       //service

    public String getBizEnBigName() {
        return bizEnBigName;
    }

    public void setBizEnBigName(String bizEnBigName) {
        this.bizEnBigName = bizEnBigName;
    }

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
        this.bizEnBigName = ToolUtil.firstLetterToUpper(this.bizEnName);
    }

    public String getProjectPath() {
        return projectPath;
    }

    public void setProjectPath(String projectPath) {
        this.projectPath = projectPath;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public Boolean getControllerSwitch() {
        return controllerSwitch;
    }

    public void setControllerSwitch(Boolean controllerSwitch) {
        this.controllerSwitch = controllerSwitch;
    }

    public Boolean getIndexPageSwitch() {
        return indexPageSwitch;
    }

    public void setIndexPageSwitch(Boolean indexPageSwitch) {
        this.indexPageSwitch = indexPageSwitch;
    }

    public Boolean getAddPageSwitch() {
        return addPageSwitch;
    }

    public void setAddPageSwitch(Boolean addPageSwitch) {
        this.addPageSwitch = addPageSwitch;
    }

    public Boolean getEditPageSwitch() {
        return editPageSwitch;
    }

    public void setEditPageSwitch(Boolean editPageSwitch) {
        this.editPageSwitch = editPageSwitch;
    }

    public Boolean getJsSwitch() {
        return jsSwitch;
    }

    public void setJsSwitch(Boolean jsSwitch) {
        this.jsSwitch = jsSwitch;
    }

    public Boolean getInfoJsSwitch() {
        return infoJsSwitch;
    }

    public void setInfoJsSwitch(Boolean infoJsSwitch) {
        this.infoJsSwitch = infoJsSwitch;
    }

    public Boolean getDaoSwitch() {
        return daoSwitch;
    }

    public void setDaoSwitch(Boolean daoSwitch) {
        this.daoSwitch = daoSwitch;
    }

    public Boolean getServiceSwitch() {
        return serviceSwitch;
    }

    public void setServiceSwitch(Boolean serviceSwitch) {
        this.serviceSwitch = serviceSwitch;
    }
}
