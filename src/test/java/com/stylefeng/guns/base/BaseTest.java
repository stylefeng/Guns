package com.stylefeng.guns.base;

import com.stylefeng.guns.core.log.ILog;
import com.stylefeng.guns.core.util.SpringContextHolder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import project.config.root.RootSpringConfig;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = RootSpringConfig.class)
public class BaseTest {

    @Test
    public void test() {

        ILog logFactory = SpringContextHolder.getBean(ILog.class);
        logFactory.doLog("12", "message", true);
    }

}
