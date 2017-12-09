package com.stylefeng.guns.generator.engine.config;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 资源表
 * </p>
 *
 * @author fengshuonan
 * @since 2017-11-23
 */
@TableName("adi_uc_permission")
public class Permission extends Model<Permission> {

    private static final long serialVersionUID = 1L;

	@TableId(value="id", type= IdType.AUTO)
	private Long id;
    /**
     * 权限的标识
     */
	private String code;
    /**
     * 父id
     */
	private Long pid;
    /**
     * 父id的集合
     */
	private String pids;
    /**
     * 权限名称
     */
	private String name;
    /**
     * 权限请求路径
     */
	private String url;
    /**
     * 菜单标识: Y-是菜单, N-不是
     */
	@TableField("menu_flag")
	private String menuFlag;
    /**
     * 图标
     */
	private String icon;
    /**
     * 菜单层级
     */
	private Integer level;
    /**
     * 排序
     */
	private Integer sort;
    /**
     * 创建时间
     */
	@TableField("create_time")
	private Date createTime;
    /**
     * 修改时间
     */
	@TableField("update_time")
	private Date updateTime;
    /**
     * 是否可用：Y-可用；N-不可用
     */
	private String status;
    /**
     * 是否删除:  Y-已删除; N-未删除
     */
	@TableField("del_flag")
	private String delFlag;
    /**
     * 菜单是否打开的标识: Y-打开, N-不打开
     */
	@TableField("open_flag")
	private String openFlag;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Long getPid() {
		return pid;
	}

	public void setPid(Long pid) {
		this.pid = pid;
	}

	public String getPids() {
		return pids;
	}

	public void setPids(String pids) {
		this.pids = pids;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMenuFlag() {
		return menuFlag;
	}

	public void setMenuFlag(String menuFlag) {
		this.menuFlag = menuFlag;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(String delFlag) {
		this.delFlag = delFlag;
	}

	public String getOpenFlag() {
		return openFlag;
	}

	public void setOpenFlag(String openFlag) {
		this.openFlag = openFlag;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "Permission{" +
			"permId=" + id +
			", code=" + code +
			", pid=" + pid +
			", pids=" + pids +
			", name=" + name +
			", url=" + url +
			", menuFlag=" + menuFlag +
			", icon=" + icon +
			", level=" + level +
			", sort=" + sort +
			", createTime=" + createTime +
			", updateTime=" + updateTime +
			", status=" + status +
			", delFlag=" + delFlag +
			", openFlag=" + openFlag +
			"}";
	}
}
