package com.stylefeng.guns.cache;

import com.alibaba.fastjson.JSON;
import com.stylefeng.guns.base.BaseTest;
import com.stylefeng.guns.common.constant.cache.Cache;
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
public class CacheTest extends BaseTest {

    /**
     * 测试没有缓存的情况
     *
     * @author fengshuonan
     * @Date 2017/4/24 21:00
     */
    @Test
    public void testNoCache() {
        long beginTIme = System.currentTimeMillis();

        //用缓存200万次查询,速度6秒
        for (int i = 1; i < 2000000; i++) {
            ConstantFactory.me().getSingleRoleName(1);
        }

        System.out.println(System.currentTimeMillis() - beginTIme);

        System.out.println();

        CacheKit.removeAll(Cache.CONSTANT);

        List constant1 = CacheKit.getKeys(Cache.CONSTANT);
        System.out.println(JSON.toJSONString(constant1));
    }
}
