package com.stylefeng.guns.generator.action.model;

/**
 * 代码生成的查询参数
 *
 * @author fengshuonan
 * @date 2017-11-30-下午2:05
 */
public class GenQo {

    /**
     * 数据库账号
     */
    private String userName;

    /**
     * 数据库密码
     */
    private String password;

    /**
     * 数据库url
     */
    private String url;

    /**
     * 项目地址
     */
    private String projectPath;

    /**
     * 作者
     */
    private String author;

    /**
     * 项目的包
     */
    private String projectPackage;

    /**
     * 核心模块的包
     */
    private String corePackage;

    /**
     * 表名称
     */
    private String tableName;

    /**
     * 忽略的表前缀
     */
    private String ignoreTabelPrefix;

    /**
     * 业务名称
     */
    private String bizName;

    /**
     * 模块名
     */
    private String moduleName;
    
    /**
     * 父级菜单名称
     */
    private String parentMenuName;

    /**
     * 是否生成控制器代码开关
     */
    private Boolean controllerSwitch = false;

    /**
     * 主页
     */
    private Boolean indexPageSwitch = false;

    /**
     * 添加页面
     */
    private Boolean addPageSwitch = false;

    /**
     * 编辑页面
     */
    private Boolean editPageSwitch = false;

    /**
     * 主页的js
     */
    private Boolean jsSwitch = false;

    /**
     * 详情页面js
     */
    private Boolean infoJsSwitch = false;

    /**
     * dao的开关
     */
    private Boolean daoSwitch = false;

    /**
     * service
     */
    private Boolean serviceSwitch = false;

    /**
     * 生成实体的开关
     */
    private Boolean entitySwitch = false;

    /**
     * 生成sql的开关
     */
    private Boolean sqlSwitch = false;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getProjectPath() {
        return projectPath;
    }

    public void setProjectPath(String projectPath) {
        this.projectPath = projectPath;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCorePackage() {
        return corePackage;
    }

    public void setCorePackage(String corePackage) {
        this.corePackage = corePackage;
    }

    public String getProjectPackage() {

        return projectPackage;
    }

    public void setProjectPackage(String projectPackage) {
        this.projectPackage = projectPackage;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getIgnoreTabelPrefix() {
        return ignoreTabelPrefix;
    }

    public void setIgnoreTabelPrefix(String ignoreTabelPrefix) {
        this.ignoreTabelPrefix = ignoreTabelPrefix;
    }

    public String getBizName() {
        return bizName;
    }

    public void setBizName(String bizName) {
        this.bizName = bizName;
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

    public Boolean getEntitySwitch() {
        return entitySwitch;
    }

    public void setEntitySwitch(Boolean entitySwitch) {
        this.entitySwitch = entitySwitch;
    }

    public Boolean getSqlSwitch() {
        return sqlSwitch;
    }

    public void setSqlSwitch(Boolean sqlSwitch) {
        this.sqlSwitch = sqlSwitch;
    }

    public String getParentMenuName() {
        return parentMenuName;
    }

    public void setParentMenuName(String parentMenuName) {
        this.parentMenuName = parentMenuName;
    }
}
