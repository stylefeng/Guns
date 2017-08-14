package com.stylefeng.guns.common.constant;

/**
 * 一些服务的快捷获取
 *
 * @author fengshuonan
 * @date 2017-03-30 15:58
 */
public class Cst {

    private Cst() {
    }

    private static Cst cst = new Cst();

    public static Cst me() {
        return cst;
    }

}
