package com.stylefeng.guns.common.constant.dictmap.base;

import java.util.HashMap;

/**
 * 字典映射抽象类
 *
 * @author fengshuonan
 * @date 2017-05-06 14:58
 */
public abstract class AbstractDictMap {

    protected HashMap<String, String> dictory = new HashMap<>();

    public AbstractDictMap(){
        put("id","主键id");
        init();
    }

    public String get(String key) {
        return this.dictory.get(key);
    }

    public void put(String key, String value) {
        this.dictory.put(key, value);
    }

    public abstract void init();
}
