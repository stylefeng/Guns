package cn.stylefeng.guns.modular.system.api;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * API文档管理
 *
 * @author fengshuonan
 * @date 2021/1/14 21:05
 */
@Controller
@ApiResource(name = "API文档管理")
public class ApiViewController {

    /**
     * 编辑应用界面
     *
     * @author fengshuonan
     * @date 2021/1/6 13:37
     */
    @GetResource(name = "API文档界面", path = "/view/api")
    public String apiIndex() {
        return "/modular/system/api/api.html";
    }

}
