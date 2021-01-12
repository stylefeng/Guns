package cn.stylefeng.guns.modular.position;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 职位管理控制器
 *
 * @author chenjinlong
 * @date 2020/12/28 9:28
 */
@Controller
@Slf4j
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
