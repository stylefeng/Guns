package cn.stylefeng.guns.modular.dict;

import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 字典视图控制器
 *
 * @author chenjinlong
 * @date 2021/1/22 16:09
 */
@Controller
@ApiResource(name = "字典管理相关的界面渲染")
public class DictViewController {


    private String PREFIX = "/modular/system/dict/";

    /**
     * 字典管理-列表-视图
     *
     * @author chenjinlong
     * @date 2021/1/22 16:09
     */
    @GetResource(name = "字典管理-列表-视图", path = "/view/dict")
    public String indexView() {
        return PREFIX + "dict.html";
    }

    /**
     * 字典管理-添加-视图
     *
     * @author chenjinlong
     * @date 2021/1/22 16:09
     */
    @GetResource(name = "字典管理-添加-视图", path = "/view/dict/addView")
    public String addView() {
        return PREFIX + "dict_add.html";
    }

    /**
     * 字典管理-编辑-视图
     *
     * @author chenjinlong
     * @date 2021/1/22 16:09
     */
    @GetResource(name = "字典管理-编辑-视图", path = "/view/dict/editView")
    public String editView() {
        return PREFIX + "dict_edit.html";
    }

}
