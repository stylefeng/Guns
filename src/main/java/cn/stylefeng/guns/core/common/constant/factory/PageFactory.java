/**
 * Copyright 2018-2020 stylefeng & fengshuonan (https://gitee.com/stylefeng)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cn.stylefeng.guns.core.common.constant.factory;

import cn.stylefeng.guns.core.common.constant.state.Order;
import cn.stylefeng.roses.core.util.HttpContext;
import cn.stylefeng.roses.core.util.ToolUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import javax.servlet.http.HttpServletRequest;

/**
 * BootStrap Table默认的分页参数创建
 *
 * @author fengshuonan
 * @date 2017-04-05 22:25
 */
public class PageFactory {

    public Page defaultPage() {
        HttpServletRequest request = HttpContext.getRequest();

        //每页多少条数据
        int limit = Integer.valueOf(request.getParameter("limit"));

        //每页的偏移量(本页当前有多少条)
        int offset = Integer.valueOf(request.getParameter("offset"));

        //排序字段名称
        String sort = request.getParameter("sort");

        //asc或desc(升序或降序)
        String order = request.getParameter("order");

        //如果没有排序字段名称
        if (ToolUtil.isEmpty(sort)) {
            return new Page((offset / limit + 1), limit);
        } else {

            //如果有排序字段
            Page page = new Page((offset / limit + 1), limit);
            if (Order.ASC.getDes().equals(order)) {
                page.setAsc(sort);
            } else {
                page.setDesc(sort);
            }
            return page;
        }
    }
}
