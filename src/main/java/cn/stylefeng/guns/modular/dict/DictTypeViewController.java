package cn.stylefeng.guns.modular.dict;


import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

/**
 * 字典类型视图控制器
 *
 * @author huangyao
 * @date 2021/1/6 20:53
 **/
@Controller
@Slf4j
@ApiResource(name = "字典类型管理相关的界面渲染")
public class DictTypeViewController {

    /**
     * 字典类型管理-字典类型-视图
     *
     * @author huangyao
     * @date 2021/1/6 21:08
     */
    @GetResource(name = "字典类型管理-列表-视图", path = "/view/dictType")
    public String indexView() {
        return "/modular/system/dictType/dictType.html";
    }

    /**
     * 字典类型管理-添加-视图
     *
     * @author huangyao
     * @date 2021/1/6 21:25
     */
    @GetResource(name = "字典类型管理-添加-视图", path = "/view/dictType/addView")
    public String addView() {
        return "/modular/system/dictType/dictType_add.html";
    }

    /**
     * 字典类型管理-编辑-视图
     *
     * @author huangyao
     * @date 2021/1/6 21:26
     */
    @GetResource(name = "字典类型管理-编辑-视图", path = "/view/dictType/editView")
    public String editView() {
        return "/modular/system/dictType/dictType_edit.html";
    }

}
