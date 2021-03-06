package cn.stylefeng.guns.modular.system.monitor;

import cn.stylefeng.roses.kernel.monitor.system.holder.SystemHardwareInfoHolder;
import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import javax.annotation.Resource;

/**
 * 项目监控
 *
 * @author chenli
 * @date 2020/12/30 16:40
 */
@Controller
@ApiResource(name = "项目监控")
public class MonitorController {

    @Resource
    private SystemHardwareInfoHolder systemHardwareInfoHolder;

    /**
     * 系统硬件信息页面
     *
     * @author fengshuonan
     * @date 2018/12/24 22:43
     */
    @GetResource(name = "服务器监控", path = "/view/monitor/systemInfo")
    public String systemInfo(Model model) {
        model.addAttribute("server", systemHardwareInfoHolder.getSystemHardwareInfo());
        return "/modular/system/monitor/systemInfo.html";
    }

    /**
     * druid sql监控页面
     *
     * @author chenli
     * @date 2021/1/4 16:32
     */
    @GetResource(name = "SQL监控", path = "/view/monitor/druid")
    public String druidInfo() {
        return "/modular/system/monitor/druid.html";
    }

}
