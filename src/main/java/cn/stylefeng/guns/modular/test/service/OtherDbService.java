package cn.stylefeng.guns.modular.test.service;

import cn.stylefeng.guns.modular.test.factory.NormalUserFactory;
import cn.stylefeng.roses.kernel.dsctn.api.annotation.DataSource;
import cn.stylefeng.roses.kernel.sys.modular.user.entity.SysUser;
import cn.stylefeng.roses.kernel.sys.modular.user.mapper.SysUserMapper;
import cn.stylefeng.roses.kernel.sys.modular.user.service.SysUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 其他数据库操作
 *
 * @author fengshuonan
 * @since 2021/1/23 23:30
 */
@Service
public class OtherDbService extends ServiceImpl<SysUserMapper, SysUser> {

    @Resource
    private SysUserService sysUserService;

    @DataSource(name = "test")
    public void otherDb() {
        sysUserService.save(NormalUserFactory.createAnUser());
    }

}
