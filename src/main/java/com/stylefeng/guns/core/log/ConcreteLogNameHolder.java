package com.stylefeng.guns.core.log;

import java.util.HashMap;

/**
 * 方法名和具体日志记录名称的映射管理
 *
 * @author fengshuonan
 * @date 2017-03-30 19:22
 */
public class ConcreteLogNameHolder {

    private HashMap<String, String> mapping = new HashMap<>();

    private void init(){
        mapping.put("setAuthority","分配角色权限");
    }

    private ConcreteLogNameHolder() {
        init();
    }

    private static ConcreteLogNameHolder holder = new ConcreteLogNameHolder();

    public static ConcreteLogNameHolder me(){
        return holder;
    }

    public String get(String key){
        return mapping.get(key);
    }
}
