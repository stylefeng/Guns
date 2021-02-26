package cn.stylefeng.guns.modular.system.timer;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 定时控制器
 *
 * @author youyongkun
 * @date 2021/1/6 3:56 下午
 */
@Controller
@ApiResource(name = "定时管理相关的界面渲染")
public class TimersViewController {

    /**
     * 定时管理-首页-视图
     *
     * @author youyongkun
     * @date 2021/1/6 4:28 下午
     */
    @GetResource(name = "定时管理-首页-视图", path = "/view/sysTimers")
    public String indexView() {
        return "/modular/system/timers/timers.html";
    }

    /**
     * 定时管理-添加-视图
     *
     * @author youyongkun
     * @date 2021/1/6 4:28 下午
     */
    @GetResource(name = "定时管理-添加-视图", path = "/view/sysTimers/addView")
    public String addView() {
        return "/modular/system/timers/timers_add.html";
    }

    /**
     * 定时管理-修改-视图
     *
     * @author youyongkun
     * @date 2021/1/6 4:28 下午
     */
    @GetResource(name = "定时管理-修改-视图", path = "/view/sysTimers/editView")
    public String editView() {
        return "/modular/system/timers/timers_edit.html";
    }

}
