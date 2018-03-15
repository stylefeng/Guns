package com.stylefeng.guns.core.common.constant.factory;

import com.stylefeng.guns.core.support.StrKit;
import com.stylefeng.guns.core.util.ToolUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 组合字符串生产者
 *
 * @author fengshuonan
 * @date 2017-04-27 16:42
 */
public class MutiStrFactory {

    /**
     * 每个条目之间的分隔符
     */
    public static final String ITEM_SPLIT = ";";

    /**
     * 属性之间的分隔符
     */
    public static final String ATTR_SPLIT = ":";

    /**
     * 拼接字符串的id
     */
    public static final String MUTI_STR_ID = "ID";

    /**
     * 拼接字符串的key
     */
    public static final String MUTI_STR_KEY = "KEY";

    /**
     * 拼接字符串的value
     */
    public static final String MUTI_STR_VALUE = "VALUE";

    /**
     * 解析一个组合字符串(例如:  "1:启用;2:禁用;3:冻结"  这样的字符串)
     *
     * @author fengshuonan
     * @Date 2017/4/27 16:44
     */
    public static List<Map<String,String>> parseKeyValue(String mutiString){
        if(ToolUtil.isEmpty(mutiString)){
            return new ArrayList<>();
        }else{
            ArrayList<Map<String,String>> results = new ArrayList<>();
            String[] items = StrKit.split(StrKit.removeSuffix(mutiString, ITEM_SPLIT), ITEM_SPLIT);
            for (String item : items) {
                String[] attrs = item.split(ATTR_SPLIT);
                HashMap<String, String> itemMap = new HashMap<>();
                itemMap.put(MUTI_STR_KEY,attrs[0]);
                itemMap.put(MUTI_STR_VALUE,attrs[1]);
                results.add(itemMap);
            }
            return results;
        }
    }
    
    /**
     * 解析id:key:value这样类型的字符串
     * 
     * @author fengshuonan
     * @Date 2017/4/28 11:06
     */
    public static List<Map<String,String>> parseIdKeyValue(String mutiString){
        if(ToolUtil.isEmpty(mutiString)){
            return new ArrayList<>();
        }else{
            ArrayList<Map<String,String>> results = new ArrayList<>();
            String[] items = StrKit.split(StrKit.removeSuffix(mutiString, ITEM_SPLIT), ITEM_SPLIT);
            for (String item : items) {
                String[] attrs = item.split(ATTR_SPLIT);
                HashMap<String, String> itemMap = new HashMap<>();
                itemMap.put(MUTI_STR_ID,attrs[0]);
                itemMap.put(MUTI_STR_KEY,attrs[1]);
                itemMap.put(MUTI_STR_VALUE,attrs[2]);
                results.add(itemMap);
            }
            return results;
        }
    }
}
