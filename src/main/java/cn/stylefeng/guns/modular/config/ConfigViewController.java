package cn.stylefeng.guns.modular.config;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 系统配置相关页面渲染
 *
 * @author: jiawei
 * @date: 2021/01/04 12:02
 */
@Controller
@Slf4j
@ApiResource(name = "系统配置相关页面", path = "config")
public class ConfigViewController {
    private String PREFIX = "/modular/sysConfig";

    /**
     * 系统配置-首页-视图
     *
     * @author jiawei
     * @date 2021/1/4 13:33
     */
    @GetResource(name = "系统配置-列表-视图", path = "", requiredPermission = false, requiredLogin = false)
    public String indexView() {
        return PREFIX + "/sysConfig.html";
    }

    /**
     * 系统配置—新增-视图
     *
     * @author jiawei
     * @date 2021/1/4 13:34
     * @param
     */
    @GetResource(name = "系统配置—新增-视图", path = "/addView", requiredPermission = false, requiredLogin = false)
    public String addView() {
        return PREFIX + "/sysConfig_add.html";
    }

    /**
     * 系统配置-修改-视图
     *
     * @author jiawei
     * @date 2021/1/4 13:35
     * @param
     */
    @GetResource(name = "系统配置-修改-视图", path = "editView", requiredPermission = false, requiredLogin = false)
    public String editView() {
        return PREFIX + "/sysConfig_edit.html";
    }
}
