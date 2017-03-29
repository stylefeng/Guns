package project.config.datasource;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import java.sql.SQLException;

/**
 * 第三方数据库连接池的配置
 *
 * @author fengshuonan
 * @date 2016年11月12日 下午4:59:30
 */
@Configuration
@PropertySource("classpath:jdbc.properties")
public class DruidPoolConfig implements EnvironmentAware {

    private Environment em;

    @Bean(initMethod = "init")
    public DruidDataSource dataSource() {

        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(em.getProperty("jdbc.driver").trim());
        dataSource.setInitialSize(em.getProperty("jdbc.initialSize", Integer.class));
        dataSource.setMinIdle(em.getProperty("jdbc.minIdle", Integer.class));
        dataSource.setMaxActive(em.getProperty("jdbc.maxActive", Integer.class));
        dataSource.setMaxWait(em.getProperty("jdbc.maxWait", Long.class));

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

        dataSource.setUrl(em.getProperty("jdbc.url").trim());
        dataSource.setUsername(em.getProperty("jdbc.username").trim());
        dataSource.setPassword(em.getProperty("jdbc.password").trim());

        return dataSource;
    }

    @Override
    public void setEnvironment(Environment environment) {
        this.em = environment;
    }
}
