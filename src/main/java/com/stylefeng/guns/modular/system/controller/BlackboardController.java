package com.stylefeng.guns.modular.system.controller;

import com.stylefeng.guns.common.controller.BaseController;
import com.stylefeng.guns.persistence.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.persistence.model.User;

/**
 * 总览信息
 *
 * @author fengshuonan
 * @Date 2017年3月4日23:05:54
 */
@Controller
@RequestMapping("/blackboard")
public class BlackboardController extends BaseController {

    @Autowired
    UserMapper userMapper;

    /**
     * 跳转到黑板
     */
    @RequestMapping("")
    public String blackboard() {
        super.setAttr("userCount", userMapper.selectCount(new EntityWrapper<User>().notLike("status", "5")));
        super.setAttr("systemCount", super.getSystemInvokCount());
        return "/blackboard.html";
    }
}
