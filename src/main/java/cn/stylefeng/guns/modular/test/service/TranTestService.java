package cn.stylefeng.guns.modular.test.service;

import cn.stylefeng.guns.modular.test.factory.NormalUserFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * 测试多数据源操作
 *
 * @author fengshuonan
 * @since 2021/1/23 23:30
 */
@Service
public class TranTestService {

    @Resource
    private MasterDbService gunsDbService;

    @Resource
    private OtherDbService otherDbService;

    @Transactional(rollbackFor = Exception.class)
    public void testSingleSuccess() {
        gunsDbService.save(NormalUserFactory.createAnUser());
    }

    @Transactional(rollbackFor = Exception.class)
    public void testSingleFail() {
        gunsDbService.save(NormalUserFactory.createAnUser());
        int i = 1 / 0;
    }

    public void beginTest() {
        gunsDbService.gunsDb();
        otherDbService.otherDb();
    }

    public void beginTestFail() {
        gunsDbService.gunsDb();
        otherDbService.otherDb();
        int i = 1 / 0;
    }

}
