package com.stylefeng.guns.modular.system.warpper;

import com.stylefeng.guns.common.warpper.BaseControllerWarpper;
import com.stylefeng.guns.core.util.ToolUtil;

import java.util.List;
import java.util.Map;

/**
 * 日志列表的包装类
 *
 * @author fengshuonan
 * @date 2017年4月5日22:56:24
 */
public class LogWarpper extends BaseControllerWarpper {

    public LogWarpper(List<Map<String, Object>> list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        String message = (String) map.get("message");
        if (ToolUtil.isNotEmpty(message) && message.length() >= 100) {
            message = message.substring(0, 100) + "...";
        } else {
            message = null;
        }
        map.put("message", message);
    }

}
