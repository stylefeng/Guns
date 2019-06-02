package cn.stylefeng.guns.modular.demos.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * Guns复杂表单的示例
 * </p>
 *
 * @author stylefeng
 * @since 2019-02-23
 */
@TableName("sys_eg_form")
@Data
public class EgForm implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId("FORM_ID")
    private Long formId;

    /**
     * 名称
     */
    @TableField("NAME")
    private String name;

    /**
     * 单个时间
     */
    @TableField("SINGLE_TIME")
    private String singleTime;

    /**
     * 时间段
     */
    @TableField("BETWEEN_TIME")
    private String betweenTime;

    /**
     * 单行选择
     */
    @TableField("SIMPLE_SELECT")
    private String simpleSelect;

    /**
     * 分组选择
     */
    @TableField("FENZU_SELECT")
    private String fenzuSelect;

    /**
     * 搜索选择
     */
    @TableField("MODULES")
    private String modules;

    /**
     * 多个选择
     */
    @TableField("MULTI_SELECT_HIDDEN")
    private String multiSelectHidden;

    /**
     * 图片文件id
     */
    @TableField("PICTURE_INPUT_HIDDEN")
    private String pictureInputHidden;

    /**
     * 文件id
     */
    @TableField("FILE_INPUT_HIDDEN")
    private String fileInputHidden;

    /**
     * 开关标识
     */
    @TableField("CLOSE_FLAG")
    private String closeFlag;

    /**
     * 单选
     */
    @TableField("SEX")
    private String sex;

    /**
     * 复选框
     */
    @TableField("CHECKBOX")
    private String checkbox;

    /**
     * 数字
     */
    @TableField("NUMBER")
    private Integer number;

    /**
     * 长字段
     */
    @TableField("LONG_TEXT")
    private String longText;

}
