package cn.stylefeng.guns.sys.modular.system.model.result;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 字典类型表
 * </p>
 *
 * @author stylefeng
 * @since 2019-03-13
 */
@Data
public class DictTypeResult implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * 字典类型id
     */
    private Long dictTypeId;

    /**
     * 是否是系统字典，Y-是，N-否
     */
    private String systemFlag;

    /**
     * 字典类型编码
     */
    private String code;

    /**
     * 字典类型名称
     */
    private String name;

    /**
     * 字典描述
     */
    private String description;

    /**
     * 状态(字典)
     */
    private String status;

    /**
     * 添加时间
     */
    private Date createTime;

    /**
     * 创建人
     */
    private Long createUser;

    /**
     * 修改时间
     */
    private Date updateTime;

    /**
     * 修改人
     */
    private Long updateUser;

    /**
     * 排序
     */
    private Integer sort;

}
