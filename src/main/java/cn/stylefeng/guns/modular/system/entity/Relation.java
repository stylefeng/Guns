package cn.stylefeng.guns.modular.system.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;

import static com.baomidou.mybatisplus.annotation.IdType.ID_WORKER;

/**
 * <p>
 * 角色和菜单关联表
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@TableName("sys_relation")
public class Relation implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "RELATION_ID", type = ID_WORKER)
    private Long relationId;
    /**
     * 菜单id
     */
    @TableField("MENU_ID")
    private Long menuId;
    /**
     * 角色id
     */
    @TableField("ROLE_ID")
    private Long roleId;


    public Long getRelationId() {
        return relationId;
    }

    public void setRelationId(Long relationId) {
        this.relationId = relationId;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    @Override
    public String toString() {
        return "Relation{" +
                ", relationId=" + relationId +
                ", menuId=" + menuId +
                ", roleId=" + roleId +
                "}";
    }
}
