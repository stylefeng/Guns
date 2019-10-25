package cn.stylefeng.guns.sys.modular.rest.service;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.io.IoUtil;
import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.auth.model.LoginUser;
import cn.stylefeng.guns.base.consts.ConstantsContext;
import cn.stylefeng.guns.sys.core.constant.DefaultAvatar;
import cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum;
import cn.stylefeng.guns.sys.modular.rest.entity.RestFileInfo;
import cn.stylefeng.guns.sys.modular.rest.entity.RestUser;
import cn.stylefeng.guns.sys.modular.rest.mapper.RestFileInfoMapper;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import cn.stylefeng.roses.kernel.model.exception.enums.CoreExceptionEnum;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.math.BigDecimal;

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
@Slf4j
public class RestFileInfoService extends ServiceImpl<RestFileInfoMapper, RestFileInfo> {

    @Resource
    private RestUserService restUserService;

    /**
     * 更新头像
     *
     * @author fengshuonan
     * @Date 2018/11/10 4:10 PM
     */
    @Transactional(rollbackFor = Exception.class)
    public void updateAvatar(String fileId) {
        LoginUser currentUser = LoginContextHolder.getContext().getUser();
        if (currentUser == null) {
            throw new ServiceException(CoreExceptionEnum.NO_CURRENT_USER);
        }

        RestUser user = restUserService.getById(currentUser.getId());

        //更新用户的头像
        user.setAvatar(fileId);
        restUserService.updateById(user);
    }

    /**
     * 预览当前用户头像
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:04
     */
    public byte[] previewAvatar() {

        //获取当前用户
        LoginUser currentUser = LoginContextHolder.getContext().getUser();
        if (currentUser == null) {
            throw new ServiceException(CoreExceptionEnum.NO_CURRENT_USER);
        }

        //获取当前用户的头像id
        RestUser user = restUserService.getById(currentUser.getId());
        String avatarFileId = user.getAvatar();

        try {
            //返回头像id的字节流
            return getFileBytes(avatarFileId);
        } catch (Exception e) {

            //返回默认头像
            return Base64.decode(DefaultAvatar.BASE_64_AVATAR);
        }
    }

    /**
     * 获取文件流
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:04
     */
    public byte[] getFileBytes(String fileId) {

        if (ToolUtil.isEmpty(fileId)) {
            throw new ServiceException(BizExceptionEnum.FILE_NOT_FOUND);
        }

        RestFileInfo fileInfo = this.getById(fileId);
        if (fileInfo == null) {
            throw new ServiceException(BizExceptionEnum.FILE_NOT_FOUND);
        } else {
            try {
                String filePath = fileInfo.getFilePath();
                return IoUtil.readBytes(new FileInputStream(filePath));
            } catch (FileNotFoundException e) {
                log.error("文件未找到，id为：" + fileId, e);
                throw new ServiceException(BizExceptionEnum.FILE_NOT_FOUND);
            }
        }
    }

    /**
     * 上传文件
     *
     * @author fengshuonan
     * @Date 2019-05-04 17:18
     */
    public String uploadFile(MultipartFile file) {

        //生成文件的唯一id
        String fileId = IdWorker.getIdStr();

        //获取文件后缀
        String fileSuffix = ToolUtil.getFileSuffix(file.getOriginalFilename());

        //获取文件原始名称
        String originalFilename = file.getOriginalFilename();

        //生成文件的最终名称
        String finalName = fileId + "." + ToolUtil.getFileSuffix(originalFilename);

        try {
            //保存文件到指定目录
            String fileSavePath = ConstantsContext.getFileUploadPath();
            File newFile = new File(fileSavePath + finalName);
            file.transferTo(newFile);

            //保存文件信息
            RestFileInfo fileInfo = new RestFileInfo();
            fileInfo.setFileId(fileId);
            fileInfo.setFileName(originalFilename);
            fileInfo.setFileSuffix(fileSuffix);
            fileInfo.setFilePath(fileSavePath + finalName);
            fileInfo.setFinalName(finalName);

            //计算文件大小kb
            long kb = new BigDecimal(file.getSize())
                    .divide(BigDecimal.valueOf(1024))
                    .setScale(0, BigDecimal.ROUND_HALF_UP).longValue();
            fileInfo.setFileSizeKb(kb);
            this.save(fileInfo);
        } catch (Exception e) {
            log.error("上传文件错误！", e);
            throw new ServiceException(BizExceptionEnum.UPLOAD_ERROR);
        }

        return fileId;

    }
}
