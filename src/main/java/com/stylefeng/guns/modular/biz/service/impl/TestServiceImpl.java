package com.stylefeng.guns.modular.biz.service.impl;

import com.alibaba.fastjson.JSON;
import com.stylefeng.guns.common.annotion.DataSource;
import com.stylefeng.guns.common.constant.DSEnum;
import com.stylefeng.guns.common.persistence.dao.TestMapper;
import com.stylefeng.guns.common.persistence.model.Test;
import com.stylefeng.guns.modular.biz.service.ITestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 测试服务
 *
 * @author fengshuonan
 * @date 2017-06-23 23:02
 */
@Service
public class TestServiceImpl implements ITestService {


    @Autowired
    TestMapper testMapper;

    @Override
    @Transactional
    @DataSource(name = DSEnum.DATA_SOURCE_GUNS)
    public void test() {
        Test test = testMapper.selectById(1);
        System.out.println(JSON.toJSONString(test));
    }
}
