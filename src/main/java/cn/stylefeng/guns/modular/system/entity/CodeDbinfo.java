package cn.stylefeng.guns.modular.system.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.FieldFill;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 数据库链接信息
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@TableName("code_dbinfo")
public class CodeDbinfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "DB_ID", type = IdType.ID_WORKER)
    private Long dbId;
    /**
     * 别名
     */
    @TableField("NAME")
    private String name;
    /**
     * 数据库驱动
     */
    @TableField("DB_DRIVER")
    private String dbDriver;
    /**
     * 数据库地址
     */
    @TableField("DB_URL")
    private String dbUrl;
    /**
     * 数据库账户
     */
    @TableField("DB_USER_NAME")
    private String dbUserName;
    /**
     * 连接密码
     */
    @TableField("DB_PASSWORD")
    private String dbPassword;
    /**
     * 数据库类型(字典)
     */
    @TableField("DB_TYPE")
    private String dbType;
    /**
     * 创建时间
     */
    @TableField(value = "CREATE_TIME", fill = FieldFill.INSERT)
    private Date createTime;
    /**
     * 修改时间
     */
    @TableField(value = "UPDATE_TIME", fill = FieldFill.UPDATE)
    private Date updateTime;
    /**
     * 创建用户
     */
    @TableField(value = "CREATE_USER", fill = FieldFill.INSERT)
    private Long createUser;
    /**
     * 修改用户
     */
    @TableField(value = "UPDATE_USER", fill = FieldFill.UPDATE)
    private Long updateUser;


    public Long getDbId() {
        return dbId;
    }

    public void setDbId(Long dbId) {
        this.dbId = dbId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDbDriver() {
        return dbDriver;
    }

    public void setDbDriver(String dbDriver) {
        this.dbDriver = dbDriver;
    }

    public String getDbUrl() {
        return dbUrl;
    }

    public void setDbUrl(String dbUrl) {
        this.dbUrl = dbUrl;
    }

    public String getDbUserName() {
        return dbUserName;
    }

    public void setDbUserName(String dbUserName) {
        this.dbUserName = dbUserName;
    }

    public String getDbPassword() {
        return dbPassword;
    }

    public void setDbPassword(String dbPassword) {
        this.dbPassword = dbPassword;
    }

    public String getDbType() {
        return dbType;
    }

    public void setDbType(String dbType) {
        this.dbType = dbType;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Long getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Long createUser) {
        this.createUser = createUser;
    }

    public Long getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(Long updateUser) {
        this.updateUser = updateUser;
    }

    @Override
    public String toString() {
        return "CodeDbinfo{" +
        ", dbId=" + dbId +
        ", name=" + name +
        ", dbDriver=" + dbDriver +
        ", dbUrl=" + dbUrl +
        ", dbUserName=" + dbUserName +
        ", dbPassword=" + dbPassword +
        ", dbType=" + dbType +
        ", createTime=" + createTime +
        ", updateTime=" + updateTime +
        ", createUser=" + createUser +
        ", updateUser=" + updateUser +
        "}";
    }
}
