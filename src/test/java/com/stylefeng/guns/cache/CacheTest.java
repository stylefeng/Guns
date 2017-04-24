package com.stylefeng.guns.cache;

import com.alibaba.fastjson.JSON;
import com.stylefeng.guns.base.BaseTest;
import com.stylefeng.guns.common.constant.factory.ConstantFactory;
import com.stylefeng.guns.common.node.ZTreeNode;
import com.stylefeng.guns.core.support.cache.CacheKit;
import com.stylefeng.guns.modular.system.dao.DeptDao;
import com.stylefeng.guns.modular.system.dao.DictDao;
import com.stylefeng.guns.modular.system.dao.UserMgrDao;
import com.stylefeng.guns.persistence.model.Dict;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 缓存测试
 *
 * @author fengshuonan
 * @date 2017-04-24 21:00
 */
public class CacheTest extends BaseTest{

    @Autowired
    UserMgrDao userMgrDao;

    /**
     * 测试没有缓存的情况
     *
     * @author fengshuonan
     * @Date 2017/4/24 21:00
     */
    @Test
    public void testNoCache(){
        long beginTIme = System.currentTimeMillis();
        for(int i = 1;i<1000;i++){
            List<Map<String, Object>> maps = userMgrDao.selectUsers(null, null, null);
        }
        System.out.println(System.currentTimeMillis() - beginTIme);



        Object constant = CacheKit.get("CONSTANT", 1);
        System.out.println(constant);

        List constant1 = CacheKit.getKeys("CONSTANT");
        System.out.println(JSON.toJSONString(constant1));


    }
}
