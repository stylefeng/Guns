package cn.stylefeng.guns.modular.file.controller;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 文件管理界面
 * @author : lgq
 * @date : 2021/1/9
 */
@Controller
@Slf4j
@ApiResource(name = "文件管理界面")
public class FileViewController {

    @GetResource(name = "菜单管理首页", path = "/view/file")
    public String fileIndex() {
        return "/modular/system/fileInfo/file_info.html";
    }


}
