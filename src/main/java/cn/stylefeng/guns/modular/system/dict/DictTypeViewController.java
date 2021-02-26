package cn.stylefeng.guns.modular.system.dict;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 字典类型视图控制器
 *
 * @author huangyao
 * @date 2021/1/6 20:53
 **/
@Controller
@ApiResource(name = "字典类型管理相关的界面渲染")
public class DictTypeViewController {

    /**
     * 字典管理-视图
     *
     * @author chenjinlong
     * @date 2021/1/22 16:09
     */
    @GetResource(name = "字典类型管理-列表-视图", path = "/view/dictType")
    public String indexView() {
        return "/modular/system/dict/dictType.html";
    }

    /**
     * 字典类型管理-添加-视图
     *
     * @author chenjinlong
     * @date 2021/1/22 16:09
     */
    @GetResource(name = "字典类型管理-添加-视图", path = "/view/dictType/addView")
    public String addView() {
        return "/modular/system/dict/dictType_add.html";
    }

    /**
     * 字典类型管理-编辑-视图
     *
     * @author chenjinlong
     * @date 2021/1/22 16:09
     */
    @GetResource(name = "字典类型管理-编辑-视图", path = "/view/dictType/editView")
    public String editView() {
        return "/modular/system/dict/dictType_edit.html";
    }

}
