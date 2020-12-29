package cn.stylefeng.guns.modular.blackboard;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 工作台和分析页界面渲染
 *
 * @author fengshuonan
 * @date 2020/12/29 21:29
 */
@Controller
@Slf4j
@ApiResource(name = "工作台和分析页面")
public class BlackboardViewController {

    /**
     * 工作台
     *
     * @author fengshuonan
     * @date 2018/12/24 22:43
     */
    @GetResource(name = "工作台", path = "/blackboard/platform", requiredPermission = false)
    public String platform() {
        return "/modular/blackboard/board_platform.html";
    }

    /**
     * 分析页面
     *
     * @author fengshuonan
     * @date 2020/12/29 21:27
     */
    @GetResource(name = "分析页面", path = "/blackboard/analyse", requiredPermission = false)
    public String analyse() {
        return "/modular/blackboard/board_analyse.html";
    }

}
