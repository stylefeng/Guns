package com.stylefeng.guns.rest.modular.auth.util;

import com.stylefeng.guns.core.util.ToolUtil;
import com.stylefeng.guns.rest.config.properties.JwtProperties;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>jwt token工具类</p>
 * <pre>
 *     jwt的claim里一般包含以下几种数据:
 *         1. iss -- token的发行者
 *         2. sub -- 该JWT所面向的用户
 *         3. aud -- 接收该JWT的一方
 *         4. exp -- token的失效时间
 *         5. nbf -- 在此时间段之前,不会被处理
 *         6. iat -- jwt发布时间
 *         7. jti -- jwt唯一标识,防止重复使用
 * </pre>
 *
 * @author fengshuonan
 * @Date 2017/8/25 10:59
 */
@Component
public class JwtTokenUtil {

    @Autowired
    private JwtProperties jwtProperties;

    /**
     * 获取用户名从token中
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token).getSubject();
    }

    /**
     * 获取jwt发布时间
     */
    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token).getIssuedAt();
    }

    /**
     * 获取jwt失效时间
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token).getExpiration();
    }

    /**
     * 获取jwt接收者
     */
    public String getAudienceFromToken(String token) {
        return getClaimFromToken(token).getAudience();
    }

    /**
     * 获取私有的jwt claim
     */
    public String getPrivateClaimFromToken(String token, String key) {
        return getClaimFromToken(token).get(key).toString();
    }

    /**
     * 获取md5 key从token中
     */
    public String getMd5KeyFromToken(String token) {
        return getPrivateClaimFromToken(token, jwtProperties.getMd5Key());
    }

    /**
     * 获取jwt的payload部分
     */
    public Claims getClaimFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtProperties.getSecret())
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 解析token是否正确,不正确会报异常<br>
     */
    public void parseToken(String token) throws JwtException {
        Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token).getBody();
    }

    /**
     * <pre>
     *  验证token是否失效
     *  true:过期   false:没过期
     * </pre>
     */
    public Boolean isTokenExpired(String token) {
        try {
            final Date expiration = getExpirationDateFromToken(token);
            return expiration.before(new Date());
        } catch (ExpiredJwtException expiredJwtException) {
            return true;
        }
    }

    /**
     * 生成token(通过用户名和签名时候用的随机数)
     */
    public String generateToken(String userName, String randomKey) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(jwtProperties.getMd5Key(), randomKey);
        return doGenerateToken(claims, userName);
    }

    /**
     * 生成token
     */
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + jwtProperties.getExpiration() * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
    }

    /**
     * 获取混淆MD5签名用的随机字符串
     */
    public String getRandomKey() {
        return ToolUtil.getRandomString(6);
    }
}