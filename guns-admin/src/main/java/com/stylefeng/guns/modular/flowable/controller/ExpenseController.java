package com.stylefeng.guns.modular.flowable.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.modular.system.model.Expense;
import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.core.shiro.ShiroKit;
import com.stylefeng.guns.modular.flowable.service.IExpenseService;
import com.stylefeng.guns.modular.flowable.warpper.ExpenseWarpper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 报销管理控制器
 *
 * @author fengshuonan
 * @Date 2017-12-04 21:11:36
 */
@Controller
@RequestMapping("/expense")
public class ExpenseController extends BaseController {

    private String PREFIX = "/flowable/expense/";

    @Autowired
    private IExpenseService expenseService;

    /**
     * 跳转到报销管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "expense.html";
    }

    /**
     * 跳转到添加报销管理
     */
    @RequestMapping("/expense_add")
    public String expenseAdd() {
        return PREFIX + "expense_add.html";
    }

    /**
     * 查看当前流程图
     */
    @RequestMapping("/expense_update/{expenseId}")
    public void expenseView(@PathVariable Integer expenseId) {
        try {
            expenseService.printProcessImage(expenseId);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取报销管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        EntityWrapper<Expense> expenseEntityWrapper = new EntityWrapper<>();
        expenseEntityWrapper.eq("userid", ShiroKit.getUser().getId());
        List<Map<String, Object>> stringObjectMap = expenseService.selectMaps(expenseEntityWrapper);
        return super.warpObject(new ExpenseWarpper(stringObjectMap));
    }

    /**
     * 新增报销管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Expense expense) {
        expenseService.add(expense);
        return SUCCESS_TIP;
    }

    /**
     * 删除报销管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer expenseId) {
        expenseService.delete(expenseId);
        return SUCCESS_TIP;
    }

    /**
     * 修改报销管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Expense expense) {
        expenseService.updateById(expense);
        return SUCCESS_TIP;
    }

    /**
     * 报销管理详情
     */
    @RequestMapping(value = "/detail/{expenseId}")
    @ResponseBody
    public Object detail(@PathVariable("expenseId") Integer expenseId) {
        return expenseService.selectById(expenseId);
    }
}
