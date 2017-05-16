package com.stylefeng.guns.common.constant.dictmap;

import com.stylefeng.guns.common.constant.dictmap.base.AbstractDictMap;

/**
 * 用于删除业务的字典
 *
 * @author fengshuonan
 * @date 2017-05-06 15:01
 */
public class DeleteDict extends AbstractDictMap {

    @Override
    public void init() {
        put("roleId","角色名称");
    }

    @Override
    protected void initBeWrapped() {
        putFieldWrapperMethodName("roleId","getCacheObject");
    }
}
