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
package cn.stylefeng.guns.modular.system.service;

import cn.stylefeng.guns.modular.system.model.Dict;
import com.baomidou.mybatisplus.service.IService;

import java.util.List;
import java.util.Map;

/**
 * 字典服务
 *
 * @author fengshuonan
 * @date 2017-04-27 17:00
 */
public interface IDictService extends IService<Dict> {

    /**
     * 添加字典
     */
    void addDict(String dictCode, String dictName, String dictTips, String dictValues);

    /**
     * 编辑字典
     */
    void editDict(Integer dictId, String dictCode, String dictName, String dictTips, String dicts);

    /**
     * 删除字典
     */
    void delteDict(Integer dictId);

    /**
     * 根据编码获取词典列表
     */
    List<Dict> selectByCode(String code);

    /**
     * 根据父类编码获取词典列表
     */
    List<Dict> selectByParentCode(String code);

    /**
     * 查询字典列表
     */
    List<Map<String, Object>> list(String conditiion);

}
