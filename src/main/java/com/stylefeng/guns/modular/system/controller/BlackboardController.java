package com.stylefeng.guns.modular.system.controller;

import com.stylefeng.guns.common.controller.BaseController;
import com.stylefeng.guns.modular.system.dao.NoticeDao;
import com.stylefeng.guns.common.persistence.dao.NoticeMapper;
import com.stylefeng.guns.common.persistence.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.common.persistence.model.User;

import java.util.List;
import java.util.Map;

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

    @Autowired
    NoticeMapper noticeMapper;

    @Autowired
    NoticeDao noticeDao;

    /**
     * 跳转到黑板
     */
    @RequestMapping("")
    public String blackboard() {
        List<Map<String, Object>> notices = noticeDao.list(null);
        super.setAttr("noticeList",notices);
        super.setAttr("userCount", userMapper.selectCount(new EntityWrapper<User>().notLike("status", "5")));
        super.setAttr("systemCount", super.getSystemInvokCount());
        return "/blackboard.html";
    }
}
