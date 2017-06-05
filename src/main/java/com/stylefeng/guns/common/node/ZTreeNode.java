package com.stylefeng.guns.common.node;

/**
 * 
 * jquery ztree 插件的节点
 * 
 * @author fengshuonan
 * @date 2017年2月17日 下午8:25:14
 */
public class ZTreeNode {

	private Integer id;	//节点id
	
	private Integer pId;//父节点id
	
	private String name;//节点名称
	
	private Boolean open;//是否打开节点
	
	private Boolean checked;//是否被选中

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getpId() {
		return pId;
	}

	public void setpId(Integer pId) {
		this.pId = pId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getOpen() {
		return open;
	}

	public void setOpen(Boolean open) {
		this.open = open;
	}

	public Boolean getIsOpen() {
		return open;
	}

	public void setIsOpen(Boolean open) {
		this.open = open;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
	
	public static ZTreeNode createParent(){
		ZTreeNode zTreeNode = new ZTreeNode();
		zTreeNode.setChecked(true);
		zTreeNode.setId(0);
		zTreeNode.setName("顶级");
		zTreeNode.setOpen(true);
		zTreeNode.setpId(0);
		return zTreeNode;
	}
}
