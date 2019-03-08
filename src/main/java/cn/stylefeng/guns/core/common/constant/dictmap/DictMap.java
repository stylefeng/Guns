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
 * 字典map
 *
 * @author fengshuonan
 * @date 2017-05-06 15:43
 */
public class DictMap extends AbstractDictMap {

    @Override
    public void init() {
        put("dictId", "字典名称");
        put("name", "字典名称");
        put("code", "字典编码");
        put("description", "字典描述");
        put("sort", "排序");
    }

    @Override
    protected void initBeWrapped() {

    }
}
