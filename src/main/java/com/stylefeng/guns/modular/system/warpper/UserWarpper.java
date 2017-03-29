package com.stylefeng.guns.modular.system.warpper;

import com.stylefeng.guns.common.constant.factory.ConstantFactory;
import com.stylefeng.guns.common.warpper.BaseControllerWarpper;

import java.util.List;
import java.util.Map;

/**
 * 用户管理的包装类
 *
 * @author fengshuonan
 * @date 2017年2月13日 下午10:47:03
 */
public class UserWarpper extends BaseControllerWarpper {

    public UserWarpper(List<Map<String, Object>> list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        map.put("sexName", ConstantFactory.getSexName((Integer) map.get("sex")));
        map.put("roleName", ConstantFactory.getRoleName((String) map.get("roleid")));
        map.put("deptName", ConstantFactory.getDeptName((Integer) map.get("deptid")));
        map.put("statusName", ConstantFactory.getStatusName((Integer) map.get("status")));
    }

}
