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
package cn.stylefeng.guns.modular.system.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.core.common.annotion.BussinessLog;
import cn.stylefeng.guns.core.common.annotion.Permission;
import cn.stylefeng.guns.core.common.constant.Const;
import cn.stylefeng.guns.core.common.constant.factory.PageFactory;
import cn.stylefeng.guns.core.common.constant.state.BizLogType;
import cn.stylefeng.guns.core.common.page.PageInfoBT;
import cn.stylefeng.guns.modular.system.entity.OperationLog;
import cn.stylefeng.guns.modular.system.service.OperationLogService;
import cn.stylefeng.guns.modular.system.warpper.LogWarpper;
import cn.stylefeng.roses.core.base.controller.BaseController;
import com.baomidou.mybatisplus.mapper.SqlRunner;
import com.baomidou.mybatisplus.plugins.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping("/log")
public class LogController extends BaseController {

    private static String PREFIX = "/system/log/";

    @Autowired
    private OperationLogService operationLogService;

    /**
     * 跳转到日志管理的首页
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:34 PM
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "log.html";
    }

    /**
     * 查询操作日志列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:34 PM
     */
    @RequestMapping("/list")
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object list(@RequestParam(required = false) String beginTime,
                       @RequestParam(required = false) String endTime,
                       @RequestParam(required = false) String logName,
                       @RequestParam(required = false) Integer logType) {

        //获取分页参数
        Page<OperationLog> page = new PageFactory<OperationLog>().defaultPage();

        //根据条件查询操作日志
        List<Map<String, Object>> result = operationLogService.getOperationLogs(page, beginTime, endTime, logName,
                BizLogType.valueOf(logType), page.getOrderByField(), page.isAsc());

        page.setRecords(new LogWarpper(result).wrap());

        return new PageInfoBT<>(page);
    }

    /**
     * 查询操作日志详情
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:34 PM
     */
    @RequestMapping("/detail/{id}")
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object detail(@PathVariable Long id) {
        OperationLog operationLog = operationLogService.selectById(id);
        Map<String, Object> stringObjectMap = BeanUtil.beanToMap(operationLog);
        return super.warpObject(new LogWarpper(stringObjectMap));
    }

    /**
     * 清空日志
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:34 PM
     */
    @BussinessLog(value = "清空业务日志")
    @RequestMapping("/delLog")
    @Permission(Const.ADMIN_NAME)
    @ResponseBody
    public Object delLog() {
        SqlRunner.db().delete("delete from sys_operation_log");
        return SUCCESS_TIP;
    }
}
