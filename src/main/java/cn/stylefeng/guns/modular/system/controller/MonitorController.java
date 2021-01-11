package cn.stylefeng.guns.modular.system.controller;

import cn.stylefeng.guns.modular.system.warpper.SystemHardwareWrapper;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

/**
 * 项目监控
 *
 * @author chenli
 * @date 2020/12/30 16:40
 */
@Controller
@Slf4j
@ApiResource(name = "项目监控")
public class MonitorController {

    @Value("${server.port}")
    private String port;

    /**
     * 系统硬件信息页面
     *
     * @author fengshuonan
     * @date 2021/1/10 19:09
     */
    @GetResource(name = "服务器监控", path = "/view/monitor/systemInfo")
    public String systemInfo(Model model) {
        SystemHardwareWrapper systemHardwareWrapper = new SystemHardwareWrapper();
        systemHardwareWrapper.copyTo();
        model.addAttribute("server", systemHardwareWrapper);
        return "/modular/frame/systemInfo.html";
    }

    /**
     * druid sql监控页面
     *
     * @author chenli
     * @date 2021/1/4 16:32
     */
    @GetResource(name = "SQL监控", path = "/view/monitor/druid")
    public String druidInfo(Model model) {
        model.addAttribute("port", port);
        return "/modular/frame/druid.html";
    }

}
