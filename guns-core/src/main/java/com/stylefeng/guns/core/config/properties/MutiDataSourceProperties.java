package com.stylefeng.guns.core.config.properties;

import com.alibaba.druid.pool.DruidDataSource;

/**
 * 默认多数据源配置
 *
 * @author fengshuonan
 * @date 2017-08-16 10:02
 */
public class MutiDataSourceProperties {

    private String url = "jdbc:mysql://127.0.0.1:3306/biz?autoReconnect=true&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull";

    private String username = "root";

    private String password = "root";

    private String driverClassName = "com.mysql.cj.jdbc.Driver";

    private String validationQuery = "SELECT 'x'";

    private String[] dataSourceNames = {"dataSourceGuns", "dataSourceBiz"};

    public void config(DruidDataSource dataSource) {
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName(driverClassName);
        dataSource.setValidationQuery(validationQuery);
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDriverClassName() {
        return driverClassName;
    }

    public void setDriverClassName(String driverClassName) {
        this.driverClassName = driverClassName;
    }

    public String getValidationQuery() {
        return validationQuery;
    }

    public void setValidationQuery(String validationQuery) {
        this.validationQuery = validationQuery;
    }

    public String[] getDataSourceNames() {
        return dataSourceNames;
    }

    public void setDataSourceNames(String[] dataSourceNames) {
        this.dataSourceNames = dataSourceNames;
    }
}
