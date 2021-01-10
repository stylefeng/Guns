package cn.stylefeng.guns.modular.timer;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 定时控制器
 *
 * @author youyongkun
 * @date 2021/1/6 3:56 下午
 */
@Controller
@Slf4j
@ApiResource(name = "定时管理相关的界面渲染", path = "/sysTimers")
public class TimersViewController {

    private String PREFIX = "/modular/system/timers";

    /**
     * 定时管理-首页-视图
     *
     * @author youyongkun
     * @date 2021/1/6 4:28 下午
     */
    @GetResource(name = "定时管理-首页-视图", path = "", requiredPermission = false, requiredLogin = false)
    public String indexView() {
        return PREFIX + "/timers.html";
    }

    /**
     * 定时管理-添加-视图
     *
     * @author youyongkun
     * @date 2021/1/6 4:28 下午
     */
    @GetResource(name = "定时管理-添加-视图", path = "/addView", requiredPermission = false, requiredLogin = false)
    public String addView() {
        return PREFIX + "/timers_add.html";
    }

    /**
     * 定时管理-修改-视图
     *
     * @author youyongkun
     * @date 2021/1/6 4:28 下午
     */
    @GetResource(name = "定时管理-修改-视图", path = "editView", requiredPermission = false, requiredLogin = false)
    public String editView() {
        return PREFIX + "/timers_edit.html";
    }
}
