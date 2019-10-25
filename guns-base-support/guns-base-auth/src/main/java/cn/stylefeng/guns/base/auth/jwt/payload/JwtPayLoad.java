package cn.stylefeng.guns.base.auth.jwt.payload;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

/**
 * jwt的第二部分
 *
 * @author fengshuonan
 * @Date 2019/7/20 20:45
 */
@Data
public class JwtPayLoad {

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 账号
     */
    private String account;

    /**
     * 用户的键
     */
    private String userKey;

    public JwtPayLoad() {
    }

    public JwtPayLoad(Long userId, String account, String userKey) {
        this.userId = userId;
        this.account = account;
        this.userKey = userKey;
    }

    /**
     * payload转化为map形式
     *
     * @author fengshuonan
     * @Date 2019/7/20 20:50
     */
    public Map<String, Object> toMap() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("userId", this.userId);
        map.put("account", this.account);
        map.put("userKey", this.userKey);
        return map;
    }

    /**
     * payload转化为map形式
     *
     * @author fengshuonan
     * @Date 2019/7/20 20:50
     */
    public static JwtPayLoad toBean(Map<String, Object> map) {
        if (map == null || map.size() == 0) {
            return new JwtPayLoad();
        } else {
            JwtPayLoad jwtPayLoad = new JwtPayLoad();

            Object userId = map.get("userId");
            if (userId instanceof Integer) {
                jwtPayLoad.setUserId(Long.valueOf(map.get("userId").toString()));
            }

            jwtPayLoad.setAccount((String) map.get("account"));
            jwtPayLoad.setUserKey((String) map.get("userKey"));
            return jwtPayLoad;
        }
    }

}
