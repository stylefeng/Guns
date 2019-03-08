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
package cn.stylefeng.guns.core.common.constant.dictmap;

import cn.stylefeng.guns.core.common.constant.dictmap.base.AbstractDictMap;

/**
 * 菜单的字典
 *
 * @author fengshuonan
 * @date 2017-05-06 15:01
 */
public class MenuDict extends AbstractDictMap {

    @Override
    public void init() {
        put("menuId", "菜单id");
        put("code", "菜单编号");
        put("pcode", "菜单父编号");
        put("name", "菜单名称");
        put("icon", "菜单图标");
        put("url", "url地址");
        put("sort", "菜单排序号");
        put("levels", "菜单层级");
        put("description", "备注");
        put("status", "菜单状态");
        put("openFlag", "是否打开");
    }

    @Override
    protected void initBeWrapped() {

    }
}
