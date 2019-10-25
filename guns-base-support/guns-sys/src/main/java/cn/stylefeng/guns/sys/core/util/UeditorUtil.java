package cn.stylefeng.guns.sys.core.util;

import cn.hutool.core.io.FileUtil;
import cn.stylefeng.guns.base.consts.ConstantsContext;
import cn.stylefeng.guns.sys.core.listener.ConfigListener;
import cn.stylefeng.guns.sys.modular.system.model.UeditorFileResult;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import static cn.stylefeng.guns.sys.core.exception.enums.BizExceptionEnum.*;

/**
 * 百度富文本的工具类
 *
 * @author fengshuonan
 * @Date 2019/8/26 15:27
 */
@Slf4j
public class UeditorUtil {

    /**
     * ue上传文件逻辑
     *
     * @author fengshuonan
     * @Date 2019-08-27 12:54
     */
    public static UeditorFileResult uploadFile(MultipartFile upfile, FileType fileType) {
        if (upfile.isEmpty()) {
            throw new ServiceException(UE_FILE_NULL_ERROR);
        }

        // 获取文件名,后缀名
        String oldFileName = upfile.getOriginalFilename();
        String suffixName = ToolUtil.getFileSuffix(oldFileName);

        // 重新命名图片
        String newFileName = IdWorker.getIdStr() + "." + suffixName;

        UeditorFileResult ueditorFileResult = new UeditorFileResult();
        String path = null;

        // 如果是上传图片
        if (fileType.equals(FileType.IMG)) {

            ueditorFileResult.setUrl(UeditorUtil.getImageRelativeUrl(newFileName));
            ueditorFileResult.setTitle(newFileName);
            ueditorFileResult.setOriginal(newFileName);

            //文件用原始文件
            path = ConstantsContext.getFileUploadPath() + newFileName;


        } else if (fileType.equals(FileType.FILE)) {

            // 如果是上传文件
            ueditorFileResult.setUrl(UeditorUtil.getFileRelativeUrl(newFileName) + "/" + oldFileName);
            ueditorFileResult.setTitle(oldFileName);
            ueditorFileResult.setOriginal(oldFileName);

            //文件用原始文件
            path = ConstantsContext.getFileUploadPath() + newFileName;

        } else {

            // 如果是上传视频
            ueditorFileResult.setUrl(UeditorUtil.getVideoRelativeUrl(newFileName));
            ueditorFileResult.setTitle(newFileName);
            ueditorFileResult.setOriginal(newFileName);

            //文件用原始文件
            path = ConstantsContext.getFileUploadPath() + newFileName;

        }

        try {

            File dest = new File(path);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            upfile.transferTo(dest);
            return ueditorFileResult;
        } catch (IOException e) {
            log.error("保存ue的上传文件出错！", e);
            throw new ServiceException(UE_FILE_SAVE_ERROR);
        }
    }

    /**
     * 读取文件
     *
     * @author fengshuonan
     * @Date 2019-08-27 13:02
     */
    public static void readFile(String fileName, HttpServletResponse response, FileType fileType, String orginalName) {

        if (ToolUtil.isEmpty(fileName)) {
            throw new ServiceException(UE_FILE_NULL_ERROR);
        }

        //获取文件路径
        String path = ConstantsContext.getFileUploadPath() + fileName;
        File file = new File(path);

        //文件不存在或者不可读
        if (!file.exists() || !file.canRead()) {
            throw new ServiceException(UE_FILE_NULL_ERROR);
        }

        //读取文件
        byte[] bytes = null;

        //设置响应的类型
        if (fileType.equals(FileType.IMG)) {

            response.setContentType("image/png");
            bytes = FileUtil.readBytes(file);

        } else if (fileType.equals(FileType.FILE)) {

            response.setContentType("multipart/form-data;charset=utf-8");

            //判断文件是否已经被重命名
            String newFilePath = ConstantsContext.getFileUploadPath() + orginalName;
            File newFile = new File(newFilePath);
            if (!newFile.exists()) {
                newFile = UeditorUtil.reName(file, orginalName);
            }
            bytes = FileUtil.readBytes(newFile);

        } else {

            response.setContentType("video/x-sgi-movie");
            bytes = FileUtil.readBytes(file);

        }

        try {
            OutputStream stream = response.getOutputStream();
            stream.write(bytes);
        } catch (IOException e) {
            log.error("读取文件错误！", e);
            throw new ServiceException(UE_FILE_READ_ERROR);
        }
    }

    /**
     * 获取图片相对路径
     *
     * @author fengshuonan
     * @Date 2019/8/26 15:21
     */
    private static String getImageRelativeUrl(String imageName) {
        String contextPath = ConfigListener.getConf().get("contextPath");
        return contextPath + "/ueditor/images/" + imageName;
    }

    /**
     * 获取文件相对路径
     *
     * @author fengshuonan
     * @Date 2019/8/26 15:22
     */
    private static String getFileRelativeUrl(String imageName) {
        String contextPath = ConfigListener.getConf().get("contextPath");
        return contextPath + "/ueditor/file/" + imageName;
    }

    /**
     * 获取视频相对路径
     *
     * @author fengshuonan
     * @Date 2019/8/26 15:22
     */
    private static String getVideoRelativeUrl(String imageName) {
        String contextPath = ConfigListener.getConf().get("contextPath");
        return contextPath + "/ueditor/video/" + imageName;
    }

    /**
     * 文件重命名
     *
     * @author fengshuonan
     * @Date 2019/8/26 15:23
     */
    private static File reName(File file, String newName) {
        if (file.exists()) {

            //创建新名字的抽象文件
            File newfile = new File(file.getParent() + File.separator + newName);

            if (file.renameTo(newfile)) {
                log.info("重命名成功！");
                return newfile;
            } else {
                log.info("重命名失败！新文件名已存在!");
                return file;
            }
        } else {
            log.info("重命名文件不存在！");
            return file;
        }
    }

    /**
     * 文件类型
     *
     * @author fengshuonan
     * @Date 2019-08-27 12:52
     */
    public enum FileType {

        /**
         * 图片类型
         */
        IMG,

        /**
         * 文件类型
         */
        FILE,

        /**
         * 视频类型
         */
        VIDEO
    }

}
