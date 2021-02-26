package cn.stylefeng.guns.modular.system.position;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 职位管理控制器
 *
 * @author chenjinlong
 * @date 2020/12/28 9:28
 */
@Controller
@ApiResource(name = "职位管理相关的界面渲染")
public class PositionViewController {

    /**
     * 职位管理-首页-视图
     *
     * @author chenjinlong
     * @date 2020/11/04 11:07
     */
    @GetResource(name = "职位管理-首页-视图", path = "/view/position")
    public String indexView() {
        return "/modular/system/position/position.html";
    }

    /**
     * 职位管理-首页-视图
     *
     * @author chenjinlong
     * @date 2020/11/04 11:07
     */
    @GetResource(name = "职位管理-首页-视图", path = "/view/position/addView")
    public String addView() {
        return "/modular/system/position/position_add.html";
    }

    /**
     * 职位管理-首页-视图
     *
     * @author chenjinlong
     * @date 2020/11/04 11:07
     */
    @GetResource(name = "职位管理-首页-视图", path = "/view/position/editView")
    public String editView() {
        return "/modular/system/position/position_edit.html";
    }

}
