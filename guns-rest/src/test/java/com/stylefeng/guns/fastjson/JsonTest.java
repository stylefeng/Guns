package com.stylefeng.guns.fastjson;

import com.alibaba.fastjson.JSON;
import com.stylefeng.guns.core.util.MD5Util;
import com.stylefeng.guns.rest.common.SimpleObject;
import com.stylefeng.guns.rest.modular.auth.converter.BaseTransferEntity;

/**
 * json测试
 *
 * @author fengshuonan
 * @date 2017-08-25 16:11
 */


public class JsonTest {

    public static void main(String[] args) {
        String randomKey = "1xm7hw";

        BaseTransferEntity baseTransferEntity = new BaseTransferEntity();
        SimpleObject simpleObject = new SimpleObject();
        simpleObject.setUser("fsn");
        baseTransferEntity.setObject("123123");

        String json = JSON.toJSONString(simpleObject);

        //md5签名
        String encrypt = MD5Util.encrypt(json + randomKey);
        baseTransferEntity.setSign(encrypt);

        System.out.println(JSON.toJSONString(baseTransferEntity));
    }
}
