package com.stylefeng.guns.modular.system.controller;

import java.util.List;

import javax.annotation.Resource;

import com.stylefeng.guns.common.controller.BaseController;
import com.stylefeng.guns.common.node.ZTreeNode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.stylefeng.guns.modular.system.dao.DeptDao;

/**
 * 部门控制器
 *
 * @author fengshuonan
 * @Date 2017年2月17日20:27:22
 */
@Controller
@RequestMapping("/dept")
public class DeptController extends BaseController {

//	private static String PREFIX = "/dept/";

    @Resource
    DeptDao deptDao;

    /**
     * 获取部门的tree列表
     */
    @RequestMapping(value = "/tree")
    public
    @ResponseBody
    List<ZTreeNode> tree() {
        return this.deptDao.tree();
    }

}
