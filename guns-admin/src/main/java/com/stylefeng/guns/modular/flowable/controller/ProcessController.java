package com.stylefeng.guns.modular.flowable.controller;

import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.modular.flowable.service.IExpenseService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 审批管理控制器
 *
 * @author fengshuonan
 * @Date 2017-12-04 21:11:36
 */
@Controller
@RequestMapping("/process")
public class ProcessController extends BaseController {

    private String PREFIX = "/flowable/process/";

    @Autowired
    private IExpenseService expenseService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private RuntimeService runtimeService;

    /**
     * 跳转到审批管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "process.html";
    }


    /**
     * 获取审批管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return expenseService.getProcessList();
    }

    /**
     * 审核通过
     */
    @RequestMapping(value = "/pass")
    @ResponseBody
    public Object pass(String taskId) {
        expenseService.pass(taskId);
        return SUCCESS_TIP;
    }

    /**
     * 审核不通过
     */
    @RequestMapping(value = "/unPass")
    @ResponseBody
    public Object unPass(String taskId) {
        expenseService.unPass(taskId);
        return SUCCESS_TIP;
    }
}
