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

        String compactJws = "eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJudjBsd3QiLCJzdWIiOiJhZG1pbiIsImV4cCI6MTUwNDI0NzA1NSwiaWF0IjoxNTAzNjQyMjU1fQ.wHzVxTvi0bmfq8YmI65tVqYfeXp5EJPzm5C_DtQOl5Fyc1HKuDJyaW-BPpjgMtjsk-mdeEBZSadoDK3LjHsy8A";

        System.out.println("body = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getBody());
        System.out.println("header = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getHeader());
        System.out.println("signature = " + Jwts.parser().setSigningKey(key).parseClaimsJws(compactJws).getSignature());
    }
}
