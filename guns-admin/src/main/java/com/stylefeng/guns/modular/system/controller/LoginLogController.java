package com.stylefeng.guns.modular.system.controller;

import com.baomidou.mybatisplus.mapper.SqlRunner;
import com.baomidou.mybatisplus.plugins.Page;
import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.core.common.annotion.BussinessLog;
import com.stylefeng.guns.core.common.annotion.Permission;
import com.stylefeng.guns.core.common.constant.Const;
import com.stylefeng.guns.core.common.constant.factory.PageFactory;
import com.stylefeng.guns.modular.system.model.LoginLog;
import com.stylefeng.guns.modular.system.service.ILoginLogService;
import com.stylefeng.guns.modular.system.warpper.LogWarpper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 日志管理的控制器
 *
 * @author fengshuonan
 * @Date 2017年4月5日 19:45:36
 */
@Controller
@RequestMapping("/loginLog")
public class LoginLogController extends BaseController {

    private static String PREFIX = "/system/log/";

    @Autowired
    private ILoginLogService loginLogService;

    /**
     * 跳转到日志管理的首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "login_log.html";
    }

    /**
     * 查询登录日志列表
     */
    @RequestMapping("/list")
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object list(@RequestParam(required = false) String beginTime, @RequestParam(required = false) String endTime, @RequestParam(required = false) String logName) {
        Page<LoginLog> page = new PageFactory<LoginLog>().defaultPage();
        List<Map<String, Object>> result = loginLogService.getLoginLogs(page, beginTime, endTime, logName, page.getOrderByField(), page.isAsc());
        page.setRecords((List<LoginLog>) new LogWarpper(result).warp());
        return super.packForBT(page);
    }

    /**
     * 清空日志
     */
    @BussinessLog("清空登录日志")
    @RequestMapping("/delLoginLog")
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object delLog() {
        SqlRunner.db().delete("delete from sys_login_log");
        return SUCCESS_TIP;
    }
}
