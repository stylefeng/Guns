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
        String auth = "eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJmcnpubW0iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTUwNDI1MzU4NSwiaWF0IjoxNTAzNjQ4Nzg1fQ.smQQlKnRgfHnfSkID6FoYpXBAMPw-NfFq4zaqc2E0Ve7V2nb0U5iIJvVMKY75lYbi1gYtDiTibqt0B39noNCHg";
        String randomKey = "nv0lwt";

        BaseTransferEntity baseTransferEntity = new BaseTransferEntity();
        SimpleObject simpleObject = new SimpleObject();
        simpleObject.setUser("fsn");
        baseTransferEntity.setObject(simpleObject);

        String json = JSON.toJSONString(simpleObject);

        //md5签名
        String encrypt = MD5Util.encrypt(json + randomKey);
        baseTransferEntity.setSign(encrypt);

        System.out.println(JSON.toJSONString(baseTransferEntity));
    }
}
