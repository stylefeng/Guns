package com.stylefeng.guns.cache;

import com.alibaba.fastjson.JSON;
import com.stylefeng.guns.base.BaseTest;
import com.stylefeng.guns.common.constant.factory.ConstantFactory;
import com.stylefeng.guns.core.cache.CacheKit;
import org.junit.Test;

import java.util.List;

/**
 * 缓存测试
 *
 * @author fengshuonan
 * @date 2017-04-24 21:00
 */
public class CacheTest extends BaseTest{

    /**
     * 测试没有缓存的情况
     *
     * @author fengshuonan
     * @Date 2017/4/24 21:00
     */
    @Test
    public void testNoCache(){
        long beginTIme = System.currentTimeMillis();

        //for(int i = 1;i<2000000;i++){
            String singleRoleName1 = ConstantFactory.me().getDeptName(1);
            String singleRoleName2 = ConstantFactory.me().getDeptName(2);
            String singleRoleName3 = ConstantFactory.me().getDeptName(14);
            String singleRoleName4 = ConstantFactory.me().getDeptName(15);


            System.out.println(singleRoleName1);
            System.out.println(singleRoleName2);
            System.out.println(singleRoleName3);
            System.out.println(singleRoleName4);


        String singleRoleName = ConstantFactory.me().getSingleRoleName(1);
        System.out.println(singleRoleName);

        //}


        System.out.println();
        System.out.println();


        System.out.println(System.currentTimeMillis() - beginTIme);

        System.out.println();
        System.out.println();

        List constant1 = CacheKit.getKeys("CONSTANT");
        System.out.println(JSON.toJSONString(constant1));
    }
}
