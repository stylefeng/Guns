package com.stylefeng.guns.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.baomidou.mybatisplus.entity.GlobalConfiguration;
import com.baomidou.mybatisplus.enums.DBType;
import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean;
import com.stylefeng.guns.core.util.ResKit;
import org.apache.ibatis.plugin.Interceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

/**
 * MybatisPlus配置
 *
 * @author stylefeng
 * @Date 2017/5/20 21:58
 */
@Configuration
@MapperScan(basePackages = {"com.stylefeng.guns.modular.*.dao","com.stylefeng.guns.persistence.dao"})
public class MybatisPlusConfig {

    private String url;
    private String username;
    private String password;

    /**
     * mybatis-plus分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor(DataSource dataSource) {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        paginationInterceptor.setDialectType(DBType.MYSQL.getDb());
        //paginationInterceptor.setOptimizeType(Optimize.JSQLPARSER.getOptimize());
        return paginationInterceptor;
    }

    /**
     * 事务管理, 声明式事务的开启
     */
    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        DataSourceTransactionManager manager = new DataSourceTransactionManager();
        manager.setDataSource(dataSource);
        return manager;
    }

    /**
     * 第三方数据库连接池的配置
     */
    //@Bean(initMethod = "init")
    //public DruidDataSource dataSource() {
    //    DruidDataSource dataSource = new DruidDataSource();
    //    dataSource.setUrl(this.url);
    //    dataSource.setUsername(this.username);
    //    dataSource.setPassword(this.password);
    //    DataSourceConfigTemplate.config(dataSource);
    //    return dataSource;
    //}

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
}
