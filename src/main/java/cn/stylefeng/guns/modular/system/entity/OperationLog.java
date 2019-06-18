package cn.stylefeng.guns.modular.system.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 操作日志
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@TableName("sys_operation_log")
public class OperationLog implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "OPERATION_LOG_ID", type = IdType.ID_WORKER)
    private Long operationLogId;
    /**
     * 日志类型(字典)
     */
    @TableField("LOG_TYPE")
    private String logType;
    /**
     * 日志名称
     */
    @TableField("LOG_NAME")
    private String logName;
    /**
     * 用户id
     */
    @TableField("USER_ID")
    private Long userId;
    /**
     * 类名称
     */
    @TableField("CLASS_NAME")
    private String className;
    /**
     * 方法名称
     */
    @TableField("METHOD")
    private String method;
    /**
     * 创建时间
     */
    @TableField(value = "CREATE_TIME", fill = FieldFill.INSERT)
    private Date createTime;
    /**
     * 是否成功(字典)
     */
    @TableField("SUCCEED")
    private String succeed;
    /**
     * 备注
     */
    @TableField("MESSAGE")
    private String message;


    public Long getOperationLogId() {
        return operationLogId;
    }

    public void setOperationLogId(Long operationLogId) {
        this.operationLogId = operationLogId;
    }

    public String getLogType() {
        return logType;
    }

    public void setLogType(String logType) {
        this.logType = logType;
    }

    public String getLogName() {
        return logName;
    }

    public void setLogName(String logName) {
        this.logName = logName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getSucceed() {
        return succeed;
    }

    public void setSucceed(String succeed) {
        this.succeed = succeed;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "OperationLog{" +
                ", operationLogId=" + operationLogId +
                ", logType=" + logType +
                ", logName=" + logName +
                ", userId=" + userId +
                ", className=" + className +
                ", method=" + method +
                ", createTime=" + createTime +
                ", succeed=" + succeed +
                ", message=" + message +
                "}";
    }
}
