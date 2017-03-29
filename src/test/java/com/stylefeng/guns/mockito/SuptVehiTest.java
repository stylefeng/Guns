package com.stylefeng.guns.mockito;

import com.stylefeng.guns.persistence.dao.UserMapper;
import com.stylefeng.guns.persistence.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.modules.junit4.PowerMockRunnerDelegate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import project.config.root.RootSpringConfig;

import javax.annotation.Resource;

import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.when;

/**
 * 自营车辆测试
 *
 * @author fengshuonan
 * @date 2017-03-23 16:38
 */
@RunWith(PowerMockRunner.class)  //使用PowerMockRunner运行时
@PowerMockRunnerDelegate(SpringJUnit4ClassRunner.class)  //委派给SpringJUnit4ClassRunner
@ContextConfiguration(classes = RootSpringConfig.class)
@PowerMockIgnore( {"javax.management.*","org.apache.shiro.*"})
@PrepareForTest(TestMockito.class)
public class SuptVehiTest {

    @Resource
    UserMapper userMapper;

    @Test
    public void test(){

        mockStatic(TestMockito.class);
        when(TestMockito.get()).thenReturn("bbb");

        System.out.println(TestMockito.get());

        User user = userMapper.selectById(1);
        System.out.println(user.getAccount());
    }
}

class TestMockito{

    public static String get(){
        return "aaa";
    }
}