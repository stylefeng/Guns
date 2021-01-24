package cn.stylefeng.guns.modular.system.dashboard;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 工作台和分析页界面渲染
 *
 * @author fengshuonan
 * @date 2020/12/29 21:29
 */
@Controller
@ApiResource(name = "工作台和分析页面")
public class DashboardViewController {

    /**
     * 工作台
     *
     * @author fengshuonan
     * @date 2018/12/24 22:43
     */
    @GetResource(name = "工作台", path = "/view/dashboard/workplace", requiredPermission = false)
    public String platform() {
        return "/modular/dashboard/board_platform.html";
    }

    /**
     * 分析页面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:27
     */
    @GetResource(name = "分析页面", path = "/view/dashboard/analysis", requiredPermission = false)
    public String analyse() {
        return "/modular/dashboard/board_analyse.html";
    }

}
