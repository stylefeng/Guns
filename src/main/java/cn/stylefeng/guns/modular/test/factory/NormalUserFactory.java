package cn.stylefeng.guns.modular.test.factory;

import cn.hutool.core.util.RandomUtil;
import cn.stylefeng.roses.kernel.sys.modular.user.entity.SysUser;

import java.util.Date;

/**
 * 创建一个用于测试数据源的用户
 *
 * @author fengshuonan
 * @since 2021/1/23 23:29
 */
public class NormalUserFactory {

    /**
     * 创建一个用于测试数据源的用户
     *
     * @author fengshuonan
     * @since 2021/1/23 23:29
     */
    public static SysUser createAnUser() {
        SysUser user = new SysUser();
        user.setAccount(RandomUtil.randomString(5));
        user.setPassword(RandomUtil.randomString(5));
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        user.setCreateUser(1L);
        user.setSex("M");
        user.setUpdateUser(1L);
        user.setRealName(RandomUtil.randomString(5));
        return user;
    }

}
