package cn.stylefeng.guns.core.beetl.enums;

import lombok.Getter;

/**
 * 字典下拉选头类型
 *
 * @author liuhanqing
 * @date 2021/1/16 20:36
 */
@Getter
public enum SelectTagHeadTypeEnum {

    /**
     * 全部
     */
    ALL("1", "全部"),

    /**
     * 请选择
     */
    SELECT("2", "请选择");

    private final String code;

    private final String name;

    SelectTagHeadTypeEnum(String code, String name) {
        this.code = code;
        this.name = name;
    }

    /**
     * 根据code获取枚举
     *
     * @author liuhanqing
     * @date 2021/1/16 20:36
     */
    public static SelectTagHeadTypeEnum codeToEnum(String code) {
        if (null != code) {
            for (SelectTagHeadTypeEnum e : SelectTagHeadTypeEnum.values()) {
                if (e.getCode().equals(code)) {
                    return e;
                }
            }
        }
        return null;
    }

    /**
     * 编码转化成中文含义
     *
     * @author liuhanqing
     * @date 2021/1/16 20:36
     */
    public static String codeToName(String code) {
        if (null != code) {
            for (SelectTagHeadTypeEnum e : SelectTagHeadTypeEnum.values()) {
                if (e.getCode().equals(code)) {
                    return e.getName();
                }
            }
        }
        return "未知";
    }

}
