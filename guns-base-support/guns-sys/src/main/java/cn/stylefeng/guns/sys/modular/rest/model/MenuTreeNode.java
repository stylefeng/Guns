package cn.stylefeng.guns.sys.modular.rest.model;

import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.tree.Tree;
import lombok.Data;

import java.util.List;

/**
 * <p>
 * 菜单树形节点
 * </p>
 *
 * @author stylefeng
 * @since 2019-04-01
 */
@Data
public class MenuTreeNode implements Tree {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    private Long menuId;

    /**
     * 菜单编号
     */
    private String code;

    /**
     * 菜单父编号
     */
    private String pcode;

    /**
     * 当前菜单的所有父菜单编号
     */
    private String pcodes;

    /**
     * 菜单名称
     */
    private String name;

    /**
     * 菜单图标
     */
    private String icon;

    /**
     * url地址
     */
    private String url;

    /**
     * 菜单排序号
     */
    private Integer sort;

    /**
     * 菜单层级
     */
    private Integer levels;

    /**
     * 是否是菜单(字典)
     */
    private String menuFlag;

    /**
     * 备注
     */
    private String description;

    /**
     * 菜单状态(字典)
     */
    private String status;

    /**
     * 是否打开新页面的标识(字典)
     */
    private String newPageFlag;

    /**
     * 是否打开(字典)
     */
    private String openFlag;

    /**
     * 系统分类（字典）
     */
    private String systemType;

    /**
     * 状态名称
     */
    private String statusName;

    /**
     * 是否是菜单名称
     */
    private String isMenuName;

    /**
     * 子节点
     */
    private List<MenuTreeNode> childrenNodes;

    @Override
    public String getNodeId() {
        if (ToolUtil.isNotEmpty(code)) {
            return code;
        } else {
            return "0";
        }
    }

    @Override
    public String getNodeParentId() {
        if (ToolUtil.isNotEmpty(pcode)) {
            return pcode;
        } else {
            return "0";
        }
    }

    @Override
    public void setChildrenNodes(List childrenNodes) {
        this.childrenNodes = childrenNodes;
    }
}
