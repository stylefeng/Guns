package project.config.datasource;

import com.alibaba.druid.pool.DruidDataSource;

import java.sql.SQLException;

/**
 * 数据源配置模板
 *
 * @author fengshuonan
 * @date 2016年11月12日 下午4:59:30
 */
public class DataSourceConfigTemplate {

    public static void config(DruidDataSource dataSource) {

        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setInitialSize(2);   //定义初始连接数
        dataSource.setMinIdle(1);       //最小空闲
        dataSource.setMaxActive(20);    //定义最大连接数
        dataSource.setMaxWait(60000);   //最长等待时间

        // 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
        dataSource.setTimeBetweenEvictionRunsMillis(60000);

        // 配置一个连接在池中最小生存的时间，单位是毫秒
        dataSource.setMinEvictableIdleTimeMillis(300000);
        dataSource.setValidationQuery("SELECT 'x'");
        dataSource.setTestWhileIdle(true);
        dataSource.setTestOnBorrow(false);
        dataSource.setTestOnReturn(false);

        // 打开PSCache，并且指定每个连接上PSCache的大小
        dataSource.setPoolPreparedStatements(true);
        dataSource.setMaxPoolPreparedStatementPerConnectionSize(20);

        try {
            dataSource.setFilters("stat");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
