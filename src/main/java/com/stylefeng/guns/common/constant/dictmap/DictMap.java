package com.stylefeng.guns.common.constant.dictmap;

import com.stylefeng.guns.common.constant.dictmap.base.AbstractDictMap;

/**
 * 字典map
 *
 * @author fengshuonan
 * @date 2017-05-06 15:43
 */
public class DictMap extends AbstractDictMap {
    @Override
    public void init() {
        put("dictId","字典id");
        put("dictName","字典名称");
    }
}
