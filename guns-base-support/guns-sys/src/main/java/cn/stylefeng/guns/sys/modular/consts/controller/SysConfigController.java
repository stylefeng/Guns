package cn.stylefeng.guns.sys.modular.consts.controller;

import cn.stylefeng.guns.base.pojo.page.LayuiPageInfo;
import cn.stylefeng.guns.sys.modular.consts.entity.SysConfig;
import cn.stylefeng.guns.sys.modular.consts.model.params.SysConfigParam;
import cn.stylefeng.guns.sys.modular.consts.service.SysConfigService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.util.ToolUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 参数配置控制器
 *
 * @author stylefeng
 * @Date 2019-06-20 14:32:21
 */
@Controller
@RequestMapping("/sysConfig")
public class SysConfigController extends BaseController {

    private String PREFIX = "/modular/sysConfig";

    @Autowired
    private SysConfigService sysConfigService;

    /**
     * 跳转到主页面
     *
     * @author stylefeng
     * @Date 2019-06-20
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "/sysConfig.html";
    }

    /**
     * 新增页面
     *
     * @author stylefeng
     * @Date 2019-06-20
     */
    @RequestMapping("/add")
    public String add() {
        return PREFIX + "/sysConfig_add.html";
    }

    /**
     * 编辑页面
     *
     * @author stylefeng
     * @Date 2019-06-20
     */
    @RequestMapping("/edit")
    public String edit() {
        return PREFIX + "/sysConfig_edit.html";
    }

    /**
     * 新增接口
     *
     * @author stylefeng
     * @Date 2019-06-20
     */
    @RequestMapping("/addItem")
    @ResponseBody
    public ResponseData addItem(SysConfigParam sysConfigParam) {
        this.sysConfigService.add(sysConfigParam);
        return ResponseData.success();
    }

    /**
     * 编辑接口
     *
     * @author stylefeng
     * @Date 2019-06-20
     */
    @RequestMapping("/editItem")
    @ResponseBody
    public ResponseData editItem(SysConfigParam sysConfigParam) {
        this.sysConfigService.update(sysConfigParam);
        return ResponseData.success();
    }

    /**
     * 删除接口
     *
     * @author stylefeng
     * @Date 2019-06-20
     */
    @RequestMapping("/delete")
    @ResponseBody
    public ResponseData delete(SysConfigParam sysConfigParam) {
        this.sysConfigService.delete(sysConfigParam);
        return ResponseData.success();
    }

    /**
     * 查看详情接口
     *
     * @author stylefeng
     * @Date 2019-06-20
     */
    @RequestMapping("/detail")
    @ResponseBody
    public ResponseData detail(SysConfigParam sysConfigParam) {
        SysConfig detail = this.sysConfigService.getById(sysConfigParam.getId());
        return ResponseData.success(detail);
    }

    /**
     * 查询列表
     *
     * @author stylefeng
     * @Date 2019-06-20
     */
    @ResponseBody
    @RequestMapping("/list")
    public LayuiPageInfo list(@RequestParam(value = "condition", required = false) String condition) {

        SysConfigParam sysConfigParam = new SysConfigParam();

        if (ToolUtil.isNotEmpty(condition)) {
            sysConfigParam.setCode(condition);
            sysConfigParam.setName(condition);
            sysConfigParam.setRemark(condition);
            sysConfigParam.setValue(condition);
        }

        return this.sysConfigService.findPageBySpec(sysConfigParam);
    }

}


