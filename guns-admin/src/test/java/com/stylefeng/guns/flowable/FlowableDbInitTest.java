package com.stylefeng.guns.flowable;

import org.flowable.engine.ProcessEngine;
import org.flowable.engine.ProcessEngineConfiguration;
import org.flowable.engine.impl.cfg.StandaloneProcessEngineConfiguration;
import org.junit.Test;

/**
 * 初始化flowable数据库(执行前需要先在数据库创建这个数据库,下面以数据库名flowable为例)
 *
 * @author fengshuonan
 * @date 2017-12-02 20:32
 */
public class FlowableDbInitTest {

    @Test
    public void init() {
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://127.0.0.1:3306/flowable?autoReconnect=true&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull")
                .setJdbcUsername("root")
                .setJdbcPassword("root")
                .setJdbcDriver("com.mysql.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);

        ProcessEngine processEngine = cfg.buildProcessEngine();
    }
}
