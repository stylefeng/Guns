package com.stylefeng.guns.common.constant.enums;

import com.baomidou.mybatisplus.enums.IEnum;

import java.io.Serializable;

/**
 * 通用的业务状态
 *
 * @author zhfish
 */
public enum Status implements IEnum{
    未启用(0),
    启用(1);

    private int value;

    Status(final int value) {
        this.value = value;
    }

    @Override
    public Serializable getValue() {
        return this.value;
    }

    @Override
    public String toString(){
        switch (this.value) {
            case 0:
                return "未启用";
            case 1:
                return "启用";
        }
        return "未启用";
    }
}
