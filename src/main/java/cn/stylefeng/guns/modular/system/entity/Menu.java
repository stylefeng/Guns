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
 * 菜单表
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@TableName("sys_menu")
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    @TableId(value = "MENU_ID", type = IdType.ID_WORKER)
    private Long menuId;
    /**
     * 菜单编号
     */
    @TableField("CODE")
    private String code;
    /**
     * 菜单父编号
     */
    @TableField("PCODE")
    private String pcode;
    /**
     * 当前菜单的所有父菜单编号
     */
    @TableField("PCODES")
    private String pcodes;
    /**
     * 菜单名称
     */
    @TableField("NAME")
    private String name;
    /**
     * 菜单图标
     */
    @TableField("ICON")
    private String icon;
    /**
     * url地址
     */
    @TableField("URL")
    private String url;
    /**
     * 菜单排序号
     */
    @TableField("SORT")
    private Integer sort;
    /**
     * 菜单层级
     */
    @TableField("LEVELS")
    private Integer levels;
    /**
     * 是否是菜单(字典)
     */
    @TableField("MENU_FLAG")
    private String menuFlag;
    /**
     * 备注
     */
    @TableField("DESCRIPTION")
    private String description;
    /**
     * 菜单状态(字典)
     */
    @TableField("STATUS")
    private String status;
    /**
     * 是否打开新页面的标识(字典)
     */
    @TableField("NEW_PAGE_FLAG")
    private String newPageFlag;
    /**
     * 是否打开(字典)
     */
    @TableField("OPEN_FLAG")
    private String openFlag;
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
     * 创建人
     */
    @TableField(value = "CREATE_USER", fill = FieldFill.INSERT)
    private Long createUser;
    /**
     * 修改人
     */
    @TableField(value = "UPDATE_USER", fill = FieldFill.UPDATE)
    private Long updateUser;


    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPcode() {
        return pcode;
    }

    public void setPcode(String pcode) {
        this.pcode = pcode;
    }

    public String getPcodes() {
        return pcodes;
    }

    public void setPcodes(String pcodes) {
        this.pcodes = pcodes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getLevels() {
        return levels;
    }

    public void setLevels(Integer levels) {
        this.levels = levels;
    }

    public String getMenuFlag() {
        return menuFlag;
    }

    public void setMenuFlag(String menuFlag) {
        this.menuFlag = menuFlag;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNewPageFlag() {
        return newPageFlag;
    }

    public void setNewPageFlag(String newPageFlag) {
        this.newPageFlag = newPageFlag;
    }

    public String getOpenFlag() {
        return openFlag;
    }

    public void setOpenFlag(String openFlag) {
        this.openFlag = openFlag;
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
        return "Menu{" +
        ", menuId=" + menuId +
        ", code=" + code +
        ", pcode=" + pcode +
        ", pcodes=" + pcodes +
        ", name=" + name +
        ", icon=" + icon +
        ", url=" + url +
        ", sort=" + sort +
        ", levels=" + levels +
        ", menuFlag=" + menuFlag +
        ", description=" + description +
        ", status=" + status +
        ", newPageFlag=" + newPageFlag +
        ", openFlag=" + openFlag +
        ", createTime=" + createTime +
        ", updateTime=" + updateTime +
        ", createUser=" + createUser +
        ", updateUser=" + updateUser +
        "}";
    }
}
