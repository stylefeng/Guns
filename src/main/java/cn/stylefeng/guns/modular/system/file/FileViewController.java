package cn.stylefeng.guns.modular.system.file;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 文件管理界面
 *
 * @author lgq
 * @date 2021/1/9
 */
@Controller
@ApiResource(name = "文件管理界面")
public class FileViewController {

    /**
     * 文件管理首页
     *
     * @author lgq
     * @date 2021/1/9
     */
    @GetResource(name = "文件管理首页", path = "/view/file")
    public String fileIndex() {
        return "/modular/system/fileInfo/file_info.html";
    }

    /**
     * 文件详情页面
     *
     * @author lgq
     * @date 2021/1/9
     */
    @GetResource(name = "文件详情页面", path = "/view/fileInfoDetails")
    public String details() {
        return "/modular/system/fileInfo/file_info_details.html";
    }

}
