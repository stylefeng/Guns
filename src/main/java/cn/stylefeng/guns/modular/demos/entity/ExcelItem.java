package cn.stylefeng.guns.modular.demos.entity;

import cn.afterturn.easypoi.excel.annotation.Excel;
import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 管理员表
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@TableName("sys_user")
@Data
public class ExcelItem implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "user_id", type = IdType.ID_WORKER)
    @Excel(name = "用户id")
    private Long userId;

    /**
     * 头像
     */
    @TableField("avatar")
    @Excel(name = "头像")
    private String avatar;

    /**
     * 账号
     */
    @TableField("account")
    @Excel(name = "账号")
    private String account;

    /**
     * 密码
     */
    @TableField("password")
    private String password;

    /**
     * md5密码盐
     */
    @TableField("salt")
    private String salt;

    /**
     * 名字
     */
    @TableField("name")
    @Excel(name = "姓名")
    private String name;

    /**
     * 生日
     */
    @TableField("birthday")
    @Excel(name = "生日")
    private Date birthday;

    /**
     * 性别(字典)
     */
    @TableField("sex")
    @Excel(name = "性别")
    private String sex;

    /**
     * 电子邮件
     */
    @TableField("email")
    @Excel(name = "邮箱")
    private String email;

    /**
     * 电话
     */
    @TableField("phone")
    @Excel(name = "电话")
    private String phone;

    /**
     * 角色id(多个逗号隔开)
     */
    @TableField("role_id")
    @Excel(name = "角色id")
    private String roleId;

    /**
     * 部门id(多个逗号隔开)
     */
    @TableField("dept_id")
    @Excel(name = "部门id")
    private Long deptId;

    /**
     * 状态(字典)
     */
    @TableField("status")
    @Excel(name = "状态")
    private String status;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    @Excel(name = "创建时间")
    private Date createTime;

    /**
     * 创建人
     */
    @TableField(value = "create_user", fill = FieldFill.INSERT)
    private Long createUser;

    /**
     * 更新时间
     */
    @TableField(value = "update_time", fill = FieldFill.UPDATE)
    private Date updateTime;

    /**
     * 更新人
     */
    @TableField(value = "update_user", fill = FieldFill.UPDATE)
    private Long updateUser;

    /**
     * 乐观锁
     */
    @TableField("version")
    private Integer version;

}
