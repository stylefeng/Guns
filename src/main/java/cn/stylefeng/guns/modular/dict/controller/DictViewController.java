package cn.stylefeng.guns.modular.dict.controller;

import cn.stylefeng.guns.modular.dict.service.ExtendDictService;
import cn.stylefeng.roses.kernel.dict.modular.entity.SysDict;
import cn.stylefeng.roses.kernel.dict.modular.entity.SysDictType;
import cn.stylefeng.roses.kernel.dict.modular.pojo.request.DictRequest;
import cn.stylefeng.roses.kernel.dict.modular.service.DictService;
import cn.stylefeng.roses.kernel.dict.modular.service.DictTypeService;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import cn.stylefeng.roses.kernel.system.pojo.ztree.ZTreeNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * 字典视图控制器
 *
 * @Author: huangyao
 * @Date: 2021/1/6 20:52
 **/
@Controller
@Slf4j
@ApiResource(name = "字典管理相关的界面渲染", path = "dict")
public class DictViewController {

    private String PREFIX = "/modular/system/dict";

    @Autowired
    private ExtendDictService extendDictService;
    @Autowired
    private DictService dictService;
    @Autowired
    private DictTypeService dictTypeService;

    /**
     * 字典管理-列表-视图
     *
     * @param
     * @return
     * @author huangyao
     * @date 2021/1/9 22:37
     */
    @GetResource(name = "字典管理-列表-视图", path = "")
    public ModelAndView indexView(ModelAndView view, @RequestParam Long dictTypeId) {
        SysDictType dictType = dictTypeService.getById(dictTypeId);
        view.addObject("dictTypeId", dictType.getDictTypeId());
        view.addObject("dictTypeName", dictType.getDictTypeName());
        view.addObject("dictTypeCode", dictType.getDictTypeCode());
        view.setViewName(PREFIX + "/dict.html");
        return view;
    }

    /**
     * 字典管理-添加-视图
     *
     * @param
     * @return
     * @author huangyao
     * @date 2021/1/9 22:37
     */
    @GetResource(name = "字典管理-添加-视图", path = "/addView")
    public ModelAndView addView(ModelAndView view, @RequestParam Long dictTypeId) {
        SysDictType dictType = dictTypeService.getById(dictTypeId);
        view.addObject("dictTypeName", dictType.getDictTypeName());
        view.addObject("dictTypeId", dictType.getDictTypeId());
        view.addObject("dictTypeCode", dictType.getDictTypeCode());
        view.setViewName(PREFIX + "/dict_add.html");
        return view;
    }

    /**
     * 字典管理-编辑-视图
     *
     * @param
     * @return
     * @author huangyao
     * @date 2021/1/9 22:38
     */
    @GetResource(name = "字典管理-编辑-视图", path = "/editView")
    public ModelAndView editView(ModelAndView view, @RequestParam Long dictId) {
        SysDict dict = dictService.findDetail(dictId);
        SysDictType dictType = dictTypeService.getById(dict.getDictId());
        view.addObject("dictTypeName", dictType.getDictTypeName());
        view.addObject("dictTypeId", dictType.getDictTypeId());
        view.addObject("dictTypeCode", dictType.getDictTypeCode());
        view.setViewName(PREFIX + "/dict_edit.html");
        return view;
    }

    /**
     * 字典树列表
     *
     * @param
     * @return
     * @author huangyao
     * @date 2021/1/10 17:31
     */
    @GetResource(name = "获取zTree形式的字典树（layui版本）", path = "/zTree")
    @ResponseBody
    public List<ZTreeNode> layuiSelectParentMenuTreeList(DictRequest dictRequest) {
        return this.extendDictService.dictZTree(dictRequest);
    }

}
