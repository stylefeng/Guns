package com.stylefeng.guns.core.mutidatasource.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 默认多数据源配置
 *
 * @author fengshuonan
 * @date 2017-08-16 10:02
 */
@Component
@ConfigurationProperties(prefix = "guns.muti-datasource")
public class MutiDataSourceProperties {

    private String defaultDataSourceName = "dataSourceGuns";

    public String getDefaultDataSourceName() {
        return defaultDataSourceName;
    }

    public void setDefaultDataSourceName(String defaultDataSourceName) {
        this.defaultDataSourceName = defaultDataSourceName;
    }
}
