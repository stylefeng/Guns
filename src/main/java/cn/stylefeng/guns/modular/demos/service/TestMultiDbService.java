package cn.stylefeng.guns.modular.demos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 测试多数据源回滚的例子
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class TestMultiDbService {

    @Autowired
    private GunsDbService gunsDbService;

    @Autowired
    private OtherDbService otherDbService;

    @Transactional(rollbackFor = Exception.class)
    public void beginTest() {

        gunsDbService.gunsdb();

        otherDbService.otherdb();

//        int i = 1 / 0;

    }

}
