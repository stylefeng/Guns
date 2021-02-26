package cn.stylefeng.guns.modular.system.config;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 系统配置相关页面渲染
 *
 * @author jiawei
 * @date 2021/1/10 14:28
 */
@Controller
@ApiResource(name = "系统配置相关页面")
public class ConfigViewController {

    /**
     * 系统配置-首页-视图
     *
     * @author jiawei
     * @date 2021/1/4 13:33
     */
    @GetResource(name = "系统配置-列表-视图", path = "/view/config")
    public String indexView() {
        return "/modular/system/config/config.html";
    }

    /**
     * 系统配置—新增-视图
     *
     * @author jiawei
     * @date 2021/1/4 13:34
     */
    @GetResource(name = "系统配置—新增-视图", path = "/view/config/addView")
    public String addView() {
        return "/modular/system/config/sysConfig_add.html";
    }

    /**
     * 系统配置-修改-视图
     *
     * @author jiawei
     * @date 2021/1/4 13:35
     */
    @GetResource(name = "系统配置-修改-视图", path = "/view/config/editView")
    public String editView() {
        return "/modular/system/config/sysConfig_edit.html";
    }

}
