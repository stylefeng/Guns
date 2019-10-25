package cn.stylefeng.guns.sys.modular.rest.model;

import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.tree.Tree;
import lombok.Data;

import java.util.List;

/**
 * 字典信息
 *
 * @author fengshuonan
 * @Date 2018/12/8 18:16
 */
@Data
public class DeptTreeNode implements Tree {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
    private Long deptId;
    /**
     * 父部门id
     */
    private Long pid;
    /**
     * 父部门名称
     */
    private String pName;
    /**
     * 简称
     */
    private String simpleName;
    /**
     * 全称
     */
    private String fullName;
    /**
     * 描述
     */
    private String description;
    /**
     * 排序
     */
    private Integer sort;

    /**
     * 子节点
     */
    private List<MenuTreeNode> childrenNodes;

    @Override
    public String getNodeId() {
        if (ToolUtil.isNotEmpty(deptId)) {
            return String.valueOf(deptId);
        } else {
            return "0";
        }
    }

    @Override
    public String getNodeParentId() {
        if (ToolUtil.isNotEmpty(pid)) {
            return String.valueOf(pid);
        } else {
            return "0";
        }
    }

    @Override
    public void setChildrenNodes(List childrenNodes) {
        this.childrenNodes = childrenNodes;
    }
}
