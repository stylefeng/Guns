package com.stylefeng.guns.persistence.model;

import com.baomidou.mybatisplus.activerecord.Model;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;
import com.baomidou.mybatisplus.annotations.TableId;


/**
 * <p>
 * 
 * </p>
 *
 * @author stylefeng
 * @since 2017-03-26
 */
@TableName("_login_log")
public class LoginLog extends Model<LoginLog> {

    private static final long serialVersionUID = 1L;

	@TableId
	private Integer id;
	private String logname;
	private String userid;
	private String classname;
	private String method;
	private Date createtime;
	private String succeed;
	private String message;


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLogname() {
		return logname;
	}

	public void setLogname(String logname) {
		this.logname = logname;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
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
	protected Serializable pkVal() {
		return this.id;
	}

}
