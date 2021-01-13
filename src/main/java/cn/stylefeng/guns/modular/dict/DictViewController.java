package cn.stylefeng.guns.modular.dict;

import cn.stylefeng.roses.kernel.dict.modular.entity.SysDict;
import cn.stylefeng.roses.kernel.dict.modular.entity.SysDictType;
import cn.stylefeng.roses.kernel.dict.modular.service.DictService;
import cn.stylefeng.roses.kernel.dict.modular.service.DictTypeService;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * 字典视图控制器
 *
 * @Author: huangyao
 * @Date: 2021/1/6 20:52
 **/
@Controller
@Slf4j
@ApiResource(name = "字典管理相关的界面渲染")
public class DictViewController {

    private String PREFIX = "/modular/system/dict";

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
    @GetResource(name = "字典管理-列表-视图", path = "/view/dict")
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
    @GetResource(name = "字典管理-添加-视图", path = "/view/dict/addView")
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
    @GetResource(name = "字典管理-编辑-视图", path = "/view/dict/editView")
    public ModelAndView editView(ModelAndView view, @RequestParam Long dictId) {
        SysDict dict = dictService.getById(dictId);
        // 根据字典获取字典类型
        SysDictType dictType = dictTypeService.getOne(new QueryWrapper<SysDictType>().lambda().eq(SysDictType::getDelFlag, "N")
                .eq(SysDictType::getDictTypeCode, dict.getDictTypeCode()));

        view.addObject("dictTypeName", dictType.getDictTypeName());
        view.addObject("dictId", dictId);
        view.addObject("dictTypeCode", dictType.getDictTypeCode());
        view.setViewName(PREFIX + "/dict_edit.html");
        return view;
    }

}
