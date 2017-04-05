package com.stylefeng.guns.common.constant.factory;

import com.baomidou.mybatisplus.plugins.Page;
import com.stylefeng.guns.core.support.HttpKit;

import javax.servlet.http.HttpServletRequest;

/**
 * BootStrap Table默认的分页参数创建
 *
 * @author fengshuonan
 * @date 2017-04-05 22:25
 */
public class PageFactory<T> {

    public Page<T> defaultPage() {
        HttpServletRequest request = HttpKit.getRequest();
        int limit = Integer.valueOf(request.getParameter("limit"));
        int offset = Integer.valueOf(request.getParameter("offset"));
        return new Page<>((offset/limit + 1), limit);
    }
}
