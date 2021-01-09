package cn.stylefeng.guns.modular.system.controller;

import cn.stylefeng.guns.modular.system.warpper.SystemHardwareWarpper;
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
 * @Date 2020/12/30 16:40
 */
@Controller
@Slf4j
@ApiResource(name = "项目监控")
public class MonitorController {

    private String PREFIX = "/modular/frame";

    @Value("${server.port}")
    private String port;

    /**
     * 系统硬件信息页面
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:43
     */
    @GetResource(name = "服务器监控", path = "/monitor/systemInfo", requiredPermission = false)
    public String systemInfo(Model model) {
        SystemHardwareWarpper systemHardwareWarpper = new SystemHardwareWarpper();
        systemHardwareWarpper.copyTo();
        model.addAttribute("server",systemHardwareWarpper);
        return PREFIX+"/systemInfo.html";
    }

    /**
     * durid sql监控页面
     *
     * @author chenli
     * @Date 2021/1/4 16:32
     */
    @GetResource(name = "SQL监控", path = "/monitor/druid", requiredPermission = false,requiredLogin = false)
    public String duridInfo(Model model){
        model.addAttribute("port",port);
        return PREFIX+"/druid.html";
    }

}
