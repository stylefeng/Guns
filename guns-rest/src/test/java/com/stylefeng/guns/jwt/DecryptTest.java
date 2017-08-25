package com.stylefeng.guns.jwt;

import io.jsonwebtoken.Jwts;

/**
 * jwt测试
 *
 * @author fengshuonan
 * @date 2017-08-21 16:34
 */
public class DecryptTest {

    public static void main(String[] args) {

        String key = "mySecret";

        String compactJws = "eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJjdXVuYXgiLCJzdWIiOiJhZG1pbiIsImV4cCI6MTUwNDIzNjk1MywiaWF0IjoxNTAzNjMyMTUzfQ.8Feb8wU67zVOGuxWEllH8I_q5VKVsIHAdeJKTRLkmrhvfPzd0Xzx5C_DRvctTpzXjEw5v3czNTJyzai1Q1LpJg";

        System.out.println("body = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getBody());
        System.out.println("header = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getHeader());
        System.out.println("signature = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getSignature());
    }
}
