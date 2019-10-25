package cn.stylefeng.guns.sys.modular.system.model.params;

import cn.stylefeng.roses.kernel.model.validator.BaseValidatingParam;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 字典类型表
 * </p>
 *
 * @author stylefeng
 * @since 2019-03-13
 */
@Data
public class DictTypeParam implements Serializable, BaseValidatingParam {

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
     * 查询条件
     */
    private String condition;

    /**
     * 排序
     */
    private Integer sort;

    @Override
    public String checkParam() {
        return null;
    }

}
