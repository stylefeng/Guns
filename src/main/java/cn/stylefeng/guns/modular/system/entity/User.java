package cn.stylefeng.guns.modular.system.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.FieldFill;
import com.baomidou.mybatisplus.enums.IdType;
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
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "USER_ID", type = IdType.ID_WORKER)
    private Long userId;
    /**
     * 头像
     */
    @TableField("AVATAR")
    private String avatar;
    /**
     * 账号
     */
    @TableField("ACCOUNT")
    private String account;
    /**
     * 密码
     */
    @TableField("PASSWORD")
    private String password;
    /**
     * md5密码盐
     */
    @TableField("SALT")
    private String salt;
    /**
     * 名字
     */
    @TableField("NAME")
    private String name;
    /**
     * 生日
     */
    @TableField("BIRTHDAY")
    private Date birthday;
    /**
     * 性别(字典)
     */
    @TableField("SEX")
    private String sex;
    /**
     * 电子邮件
     */
    @TableField("EMAIL")
    private String email;
    /**
     * 电话
     */
    @TableField("PHONE")
    private String phone;
    /**
     * 角色id(多个逗号隔开)
     */
    @TableField("ROLE_ID")
    private String roleId;
    /**
     * 部门id(多个逗号隔开)
     */
    @TableField("DEPT_ID")
    private Long deptId;
    /**
     * 状态(字典)
     */
    @TableField("STATUS")
    private String status;
    /**
     * 创建时间
     */
    @TableField(value = "CREATE_TIME", fill = FieldFill.INSERT)
    private Date createTime;
    /**
     * 创建人
     */
    @TableField(value = "CREATE_USER", fill = FieldFill.INSERT)
    private Long createUser;
    /**
     * 更新时间
     */
    @TableField(value = "UPDATE_TIME", fill = FieldFill.UPDATE)
    private Date updateTime;
    /**
     * 更新人
     */
    @TableField(value = "UPDATE_USER", fill = FieldFill.UPDATE)
    private Long updateUser;
    /**
     * 乐观锁
     */
    @TableField("VERSION")
    private Integer version;

}
