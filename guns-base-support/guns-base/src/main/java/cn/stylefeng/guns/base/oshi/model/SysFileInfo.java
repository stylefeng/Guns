package cn.stylefeng.guns.base.oshi.model;

import lombok.Data;

/**
 * 系统文件相关信息
 *
 * @author fengshuonan
 * @Date 2019-07-13 13:42
 */
@Data
public class SysFileInfo {

    /**
     * 盘符路径
     */
    private String dirName;

    /**
     * 盘符类型
     */
    private String sysTypeName;

    /**
     * 文件类型
     */
    private String typeName;

    /**
     * 总大小
     */
    private String total;

    /**
     * 剩余大小
     */
    private String free;

    /**
     * 已经使用量
     */
    private String used;

    /**
     * 资源的使用率
     */
    private double usage;

}
