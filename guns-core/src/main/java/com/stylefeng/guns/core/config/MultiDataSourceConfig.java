package com.stylefeng.guns.core.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.baomidou.mybatisplus.plugins.OptimisticLockerInterceptor;
import com.baomidou.mybatisplus.plugins.PaginationInterceptor;
import com.stylefeng.guns.core.config.properties.DruidProperties;
import com.stylefeng.guns.core.config.properties.MutiDataSourceProperties;
import com.stylefeng.guns.core.datascope.DataScopeInterceptor;
import com.stylefeng.guns.core.mutidatasource.DynamicDataSource;
import com.stylefeng.guns.core.mutidatasource.aop.MultiSourceExAop;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.sql.SQLException;
import java.util.HashMap;

/**
 * 多数据源配置<br/>
 * <p>
 * 注：由于引入多数据源，所以让spring事务的aop要在多数据源切换aop的后面
 *
 * @author stylefeng
 * @Date 2017/5/20 21:58
 */
@Configuration
@ConditionalOnProperty(prefix = "guns.muti-datasource", name = "open", havingValue = "true")
@EnableTransactionManagement(order = 2)
@MapperScan(basePackages = {"com.stylefeng.guns.modular.*.dao"})
public class MultiDataSourceConfig {

    @Bean
    @ConfigurationProperties(prefix = "guns.muti-datasource")
    public MutiDataSourceProperties mutiDataSourceProperties() {
        return new MutiDataSourceProperties();
    }

    @Bean
    public MultiSourceExAop multiSourceExAop() {
        return new MultiSourceExAop();
    }

    /**
     * guns的数据源
     */
    private DruidDataSource dataSource(DruidProperties druidProperties) {
        DruidDataSource dataSource = new DruidDataSource();
        druidProperties.config(dataSource);
        return dataSource;
    }

    /**
     * 多数据源，第二个数据源
     */
    private DruidDataSource bizDataSource(DruidProperties druidProperties, MutiDataSourceProperties mutiDataSourceProperties) {
        DruidDataSource dataSource = new DruidDataSource();
        druidProperties.config(dataSource);
        mutiDataSourceProperties.config(dataSource);
        return dataSource;
    }

    /**
     * 多数据源连接池配置
     */
    @Bean
    public DynamicDataSource mutiDataSource(DruidProperties druidProperties, MutiDataSourceProperties mutiDataSourceProperties) {

        DruidDataSource dataSourceGuns = dataSource(druidProperties);
        DruidDataSource bizDataSource = bizDataSource(druidProperties, mutiDataSourceProperties);

        try {
            dataSourceGuns.init();
            bizDataSource.init();
        } catch (SQLException sql) {
            sql.printStackTrace();
        }

        DynamicDataSource dynamicDataSource = new DynamicDataSource();
        HashMap<Object, Object> hashMap = new HashMap<>();
        hashMap.put(mutiDataSourceProperties.getDataSourceNames()[0], dataSourceGuns);
        hashMap.put(mutiDataSourceProperties.getDataSourceNames()[1], bizDataSource);
        dynamicDataSource.setTargetDataSources(hashMap);
        dynamicDataSource.setDefaultTargetDataSource(dataSourceGuns);
        return dynamicDataSource;
    }

    /**
     * mybatis-plus分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }

    /**
     * 数据范围mybatis插件
     */
    @Bean
    public DataScopeInterceptor dataScopeInterceptor() {
        return new DataScopeInterceptor();
    }

    /**
     * 乐观锁mybatis插件
     */
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor() {
        return new OptimisticLockerInterceptor();
    }

    /**
     * 事务配置
     *
     * @author stylefeng
     * @Date 2018/6/27 23:11
     */
    @Bean
    public DataSourceTransactionManager dataSourceTransactionManager(DynamicDataSource mutiDataSource) {
        return new DataSourceTransactionManager(mutiDataSource);
    }
}
