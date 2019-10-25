package cn.stylefeng.guns.modular.service;

import cn.hutool.core.util.RandomUtil;
import cn.stylefeng.guns.sys.modular.system.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * <p>
 * 测试数据源能否回滚的例子
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class TranTestService {

    @Autowired
    private GunsDbService gunsDbService;

    @Autowired
    private OtherDbService otherDbService;

    @Transactional(rollbackFor = Exception.class)
    public void testSingleSuccess() {

        User user = new User();
        user.setAccount(RandomUtil.randomString(5));
        user.setPassword(RandomUtil.randomString(5));
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        user.setCreateUser(1L);
        user.setUpdateUser(1L);
        gunsDbService.save(user);

        User user2 = new User();
        user2.setAccount(RandomUtil.randomString(5));
        user2.setPassword(RandomUtil.randomString(5));
        user2.setCreateTime(new Date());
        user2.setUpdateTime(new Date());
        user2.setCreateUser(1L);
        user2.setUpdateUser(1L);
        gunsDbService.save(user2);
    }

    @Transactional(rollbackFor = Exception.class)
    public void testSingleFail() {

        User user = new User();
        user.setAccount(RandomUtil.randomString(5));
        user.setPassword(RandomUtil.randomString(5));
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        user.setCreateUser(1L);
        user.setUpdateUser(1L);
        gunsDbService.save(user);

        User user2 = new User();
        user2.setAccount(RandomUtil.randomString(5));
        user2.setPassword(RandomUtil.randomString(5));
        user2.setCreateTime(new Date());
        user2.setUpdateTime(new Date());
        user2.setCreateUser(1L);
        user2.setUpdateUser(1L);
        gunsDbService.save(user2);

        int i = 1 / 0;
    }

    @Transactional(rollbackFor = Exception.class)
    public void beginTest() {
        gunsDbService.gunsdb();
        otherDbService.otherdb();
    }

    @Transactional(rollbackFor = Exception.class)
    public void beginTestFail() {
        gunsDbService.gunsdb();
        otherDbService.otherdb();
        int i = 1 / 0;
    }

}
