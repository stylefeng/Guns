package cn.stylefeng.guns.modular.system.service;

import cn.stylefeng.guns.core.shiro.ShiroKit;
import cn.stylefeng.guns.core.shiro.ShiroUser;
import cn.stylefeng.guns.modular.system.entity.FileInfo;
import cn.stylefeng.guns.modular.system.entity.User;
import cn.stylefeng.guns.modular.system.mapper.FileInfoMapper;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import cn.stylefeng.roses.kernel.model.exception.enums.CoreExceptionEnum;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 文件信息表
 * 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class FileInfoService extends ServiceImpl<FileInfoMapper, FileInfo> {

    @Autowired
    private UserService userService;

    /**
     * 上传头像
     *
     * @author fengshuonan
     * @Date 2018/11/10 4:10 PM
     */
    @Transactional(rollbackFor = Exception.class)
    public void uploadAvatar(String avatar) {
        ShiroUser currentUser = ShiroKit.getUser();
        if (currentUser == null) {
            throw new ServiceException(CoreExceptionEnum.NO_CURRENT_USER);
        }

        User user = userService.selectById(currentUser.getId());

        //保存文件信息
        FileInfo fileInfo = new FileInfo();
        fileInfo.setFileId(IdWorker.getIdStr());
        fileInfo.setFileData(avatar);
        this.insert(fileInfo);

        //更新用户的头像
        user.setAvatar(fileInfo.getFileId());
        userService.updateById(user);
    }
}
