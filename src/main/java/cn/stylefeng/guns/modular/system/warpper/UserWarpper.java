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
package cn.stylefeng.guns.modular.system.warpper;

import cn.stylefeng.guns.core.common.constant.factory.ConstantFactory;
import cn.stylefeng.roses.core.base.warpper.BaseControllerWrapper;
import cn.stylefeng.roses.kernel.model.page.PageResult;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.util.List;
import java.util.Map;

/**
 * 用户管理的包装类
 *
 * @author fengshuonan
 * @date 2017年2月13日 下午10:47:03
 */
public class UserWarpper extends BaseControllerWrapper {

    public UserWarpper(Map<String, Object> single) {
        super(single);
    }

    public UserWarpper(List<Map<String, Object>> multi) {
        super(multi);
    }

    public UserWarpper(Page<Map<String, Object>> page) {
        super(page);
    }

    public UserWarpper(PageResult<Map<String, Object>> pageResult) {
        super(pageResult);
    }

    @Override
    protected void wrapTheMap(Map<String, Object> map) {
        map.put("sexName", ConstantFactory.me().getSexName((String) map.get("sex")));
        map.put("roleName", ConstantFactory.me().getRoleName((String) map.get("roleId")));
        map.put("deptName", ConstantFactory.me().getDeptName((Long) map.get("deptId")));
        map.put("statusName", ConstantFactory.me().getStatusName((String) map.get("status")));
    }

}
