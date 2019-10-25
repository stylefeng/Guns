package cn.stylefeng.guns.sys.modular.system.model.params;

import cn.stylefeng.roses.kernel.model.validator.BaseValidatingParam;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 基础字典
 * </p>
 *
 * @author stylefeng
 * @since 2019-03-13
 */
@Data
public class DictParam implements Serializable, BaseValidatingParam {

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
