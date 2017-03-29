package com.stylefeng.guns.modular.system.controller;

import com.stylefeng.guns.common.controller.BaseController;
import com.stylefeng.guns.common.node.ZTreeNode;
import com.stylefeng.guns.modular.system.dao.DeptDao;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * 部门控制器
 *
 * @author fengshuonan
 * @Date 2017年2月17日20:27:22
 */
@Controller
@RequestMapping("/dept")
public class DeptController extends BaseController {

    @Resource
    DeptDao deptDao;

    /**
     * 获取部门的tree列表
     */
    @RequestMapping(value = "/tree")
    @ResponseBody
    public List<ZTreeNode> tree() {
        return this.deptDao.tree();
    }

}
