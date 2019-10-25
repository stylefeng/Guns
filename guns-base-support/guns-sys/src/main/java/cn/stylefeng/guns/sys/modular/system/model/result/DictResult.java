package cn.stylefeng.guns.sys.modular.system.model.result;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 基础字典
 * </p>
 *
 * @author stylefeng
 * @since 2019-03-13
 */
@Data
public class DictResult implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * 字典id
     */
    private Long dictId;

    /**
     * 所属字典类型的id
     */
    private Long dictTypeId;

    /**
     * 字典编码
     */
    private String code;

    /**
     * 字典名称
     */
    private String name;

    /**
     * 上级代码id
     */
    private Long parentId;

    /**
     * 状态（字典）
     */
    private String status;

    /**
     * 字典的描述
     */
    private String description;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 创建人
     */
    private Long createUser;

    /**
     * 修改人
     */
    private Long updateUser;

    /**
     * 父级字典名称
     */
    private String parentName;

    /**
     * 排序
     */
    private Integer sort;

}
