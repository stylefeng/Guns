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
@TableName("_notice")
public class Notice extends Model<Notice> {

    private static final long serialVersionUID = 1L;

    /**
     * 序列
     */
	@TableId
	private Integer id;
    /**
     * 标题
     */
	private String title;
    /**
     * 类型
     */
	private Integer type;
    /**
     * 内容
     */
	private String content;
    /**
     * 发布时间
     */
	private Date publishtime;
    /**
     * 创建时间
     */
	private Date createtime;
    /**
     * 创建人
     */
	private Integer creater;
    /**
     * 图片
     */
	private Integer pic;
	private Integer version;


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getPublishtime() {
		return publishtime;
	}

	public void setPublishtime(Date publishtime) {
		this.publishtime = publishtime;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Integer getCreater() {
		return creater;
	}

	public void setCreater(Integer creater) {
		this.creater = creater;
	}

	public Integer getPic() {
		return pic;
	}

	public void setPic(Integer pic) {
		this.pic = pic;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

}
