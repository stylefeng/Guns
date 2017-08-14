package com.stylefeng.guns.core.util;

import javax.servlet.http.HttpSession;

/**
 * 非Controller中获取当前session的工具类
 *
 * @author fengshuonan
 * @date 2016年11月28日 上午10:24:31
 */
public class HttpSessionHolder {

    private static ThreadLocal<HttpSession> tl = new ThreadLocal<HttpSession>();

    public static void put(HttpSession s) {
        tl.set(s);
    }

    public static HttpSession get() {
        return tl.get();
    }

    public static void remove() {
        tl.remove();
    }
}
