package com.stylefeng.guns.jwt;

import com.alibaba.fastjson.JSON;
import com.stylefeng.guns.core.util.MD5Util;
import com.stylefeng.guns.rest.common.SimpleObject;
import com.stylefeng.guns.rest.modular.auth.converter.BaseTransferEntity;

/**
 * jwt测试
 *
 * @author fengshuonan
 * @date 2017-08-21 16:34
 */
public class DecryptTest {

    public static void main(String[] args) {

        String key = "mySecret";

        String compactJws = "eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJ0dDA5emciLCJzdWIiOiJhZG1pbiIsImV4cCI6MTUwNTIyMjU1MiwiaWF0IjoxNTA0NjE3NzUyfQ.wFn1U3qBDZNDlPOkTxOnsbn8U1qjMveyqvbARviJ1tOQ_giFhbToIup4r-Xvy0AaiFnGt2YFB25MA-YFXGDl9Q";
        String salt = "tt09zg";

        SimpleObject simpleObject = new SimpleObject();
        simpleObject.setUser("stylefeng");
        String md5 = MD5Util.encrypt(JSON.toJSONString(simpleObject) + salt);

        BaseTransferEntity baseTransferEntity = new BaseTransferEntity();
        baseTransferEntity.setObject(simpleObject);
        baseTransferEntity.setSign(md5);

        System.out.println(JSON.toJSON(baseTransferEntity));

        //System.out.println("body = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getBody());
        //System.out.println("header = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getHeader());
        //System.out.println("signature = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getSignature());
    }
}
