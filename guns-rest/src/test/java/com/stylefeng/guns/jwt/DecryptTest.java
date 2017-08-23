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

        String compactJws = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZCI6IndlYiIsImV4cCI6MTUwNDA3NDg1OCwiaWF0IjoxNTAzNDcwMDU4fQ.S6eOFPkDl77sg9mwhgkQZ37504OaYFTZs4pMb2FuG-UKbimTsiOAU_gQhqfOfBOIho8Ab4C1fnIN-4z-Ie8V8g";

        System.out.println("body = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getBody());
        System.out.println("header = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getHeader());
        System.out.println("signature = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getSignature());
    }
}
