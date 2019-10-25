/**
 * Copyright 2018-2020 stylefeng & fengshuonan (sn93@qq.com)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cn.stylefeng.guns.base.auth.jwt;

import cn.stylefeng.guns.base.auth.jwt.payload.JwtPayLoad;
import cn.stylefeng.guns.base.consts.ConstantsContext;
import cn.stylefeng.roses.core.util.ToolUtil;
import io.jsonwebtoken.*;

import java.util.Date;
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
public class JwtTokenUtil {

    /**
     * 生成token,根据userId和默认过期时间
     */
    public static String generateToken(JwtPayLoad jwtPayLoad) {
        Long expiredSeconds = getExpireSeconds();
        final Date expirationDate = new Date(System.currentTimeMillis() + expiredSeconds * 1000);
        return generateToken(String.valueOf(jwtPayLoad.getUserId()), expirationDate, jwtPayLoad.toMap());
    }

    /**
     * 获取jwt的payload部分
     */
    public static JwtPayLoad getJwtPayLoad(String token) {
        Claims claimFromToken = getClaimFromToken(token);
        return JwtPayLoad.toBean(claimFromToken);
    }

    /**
     * 解析token是否正确(true-正确, false-错误)
     */
    public static Boolean checkToken(String token) {
        try {
            String jwtSecret = getJwtSecret();
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    /**
     * 验证token是否失效
     */
    public static Boolean isTokenExpired(String token) {
        try {
            final Date expiration = getExpirationDateFromToken(token);
            return expiration.before(new Date());
        } catch (ExpiredJwtException expiredJwtException) {
            return true;
        }
    }

    /**
     * 获取jwt失效时间
     */
    public static Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token).getExpiration();
    }

    /**
     * 生成token,根据userId和过期时间
     */
    public static String generateToken(String userId, Date exppiredDate, Map<String, Object> claims) {

        final Date createdDate = new Date();
        String secret = getJwtSecret();

        if (claims == null) {
            return Jwts.builder()
                    .setSubject(userId)
                    .setIssuedAt(createdDate)
                    .setExpiration(exppiredDate)
                    .signWith(SignatureAlgorithm.HS512, secret)
                    .compact();
        } else {
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(userId)
                    .setIssuedAt(createdDate)
                    .setExpiration(exppiredDate)
                    .signWith(SignatureAlgorithm.HS512, secret)
                    .compact();
        }
    }

    /**
     * 获取jwt的payload部分
     */
    public static Claims getClaimFromToken(String token) {

        if (ToolUtil.isEmpty(token)) {
            throw new IllegalArgumentException("token参数为空！");
        }

        String jwtSecret = getJwtSecret();
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
    }

    private static String getJwtSecret() {
        return ConstantsContext.getJwtSecret();
    }

    private static Long getExpireSeconds() {
        return ConstantsContext.getJwtSecretExpireSec();
    }
}