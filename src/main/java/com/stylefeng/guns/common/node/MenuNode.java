package com.stylefeng.guns.common.node;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.stylefeng.guns.core.util.ToolUtil;

/**
 * @Description 菜单的节点
 * @author fengshuonan
 * @date 2016年12月6日 上午11:34:17
 */
public class MenuNode {

	/**
	 * 节点id
	 */
	private Integer id;

	/**
	 * 父节点
	 */
	private Integer parentId;

	/**
	 * 节点名称
	 */
	private String name;
	
	/**
	 * 按钮级别
	 */
	private Integer levels;

	/**
	 * 节点的url
	 */
	private String url;

	/**
	 * 节点图标
	 */
	private String icon;

	/**
	 * 子节点的集合
	 */
	private List<MenuNode> children;

	/**
	 * 查询子节点时候的临时集合
	 */
	private List<MenuNode> linkedList = new ArrayList<MenuNode>();

	public MenuNode() {
		super();
	}

	public MenuNode(Integer id, Integer parentId) {
		super();
		this.id = id;
		this.parentId = parentId;
	}
	
	public Integer getLevels() {
		return levels;
	}

	public void setLevels(Integer levels) {
		this.levels = levels;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public static MenuNode createRoot() {
		return new MenuNode(0, -1);
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
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

	public List<MenuNode> getChildren() {
		return children;
	}

	public void setChildren(List<MenuNode> children) {
		this.children = children;
	}

	/**
	 * @Description 构建整个菜单树
	 * @param list
	 *            需要被构建的节点集合
	 * @author fengshuonan
	 */
	public void buildNodeTree(List<MenuNode> nodeList) {
		for (MenuNode treeNode : nodeList) {
			List<MenuNode> linkedList = treeNode.findChildNodes(nodeList, treeNode.getId());
			if (linkedList.size() > 0) {
				treeNode.setChildren(linkedList);
			}
		}
	}

	/**
	 * @Description 查询子节点的集合
	 * @author fengshuonan
	 */
	public List<MenuNode> findChildNodes(List<MenuNode> nodeList, Integer parentId) {
		if (nodeList == null && parentId == null)
			return null;
		for (Iterator<MenuNode> iterator = nodeList.iterator(); iterator.hasNext();) {
			MenuNode node = (MenuNode) iterator.next();
			// 根据传入的某个父节点ID,遍历该父节点的所有子节点
			if (node.getParentId() != 0 && parentId == node.getParentId()) {
				recursionFn(nodeList, node, parentId);
			}
		}
		return linkedList;
	}

	/**
	 * @Description 遍历一个节点的子节点
	 * @author fengshuonan
	 */
	public void recursionFn(List<MenuNode> nodeList, MenuNode node, Integer pId) {
		List<MenuNode> childList = getChildList(nodeList, node);// 得到子节点列表
		if (childList.size() > 0) {// 判断是否有子节点
			if (node.getParentId() == pId) {
				linkedList.add(node);
			}
			Iterator<MenuNode> it = childList.iterator();
			while (it.hasNext()) {
				MenuNode n = (MenuNode) it.next();
				recursionFn(nodeList, n, pId);
			}
		} else {
			if (node.getParentId() == pId) {
				linkedList.add(node);
			}
		}
	}

	/**
	 * @Description 得到子节点列表
	 * @author fengshuonan
	 */
	private List<MenuNode> getChildList(List<MenuNode> list, MenuNode node) {
		List<MenuNode> nodeList = new ArrayList<MenuNode>();
		Iterator<MenuNode> it = list.iterator();
		while (it.hasNext()) {
			MenuNode n = (MenuNode) it.next();
			if (n.getParentId() == node.getId()) {
				nodeList.add(n);
			}
		}
		return nodeList;
	}

	@Override
	public String toString() {
		return "MenuNode [id=" + id + ", parentId=" + parentId + ", name=" + name + ", url=" + url + ", children="
				+ children + "]";
	}
	
	/**
	 * 清除掉按钮级别的资源
	 * @param nodes
	 * @return
	 * @date 2017年2月19日 下午11:04:11
	 */
	public static List<MenuNode> clearBtn(List<MenuNode> nodes){
		ArrayList<MenuNode> noBtns = new ArrayList<MenuNode>();
		for(MenuNode node : nodes){
			if(node.getLevels() < 3){
				noBtns.add(node);
			}
		}
		return noBtns;
	}
	
	/**
	 * 清除不包含子节点的节点
	 * @return
	 * @date 2017年2月19日 下午11:18:19
	 */
	public static List<MenuNode> clearNoChild(List<MenuNode> nodes){
		ArrayList<MenuNode> results = new ArrayList<MenuNode>();
		for(MenuNode node : nodes){
			if(ToolUtil.isNotEmpty(node.getChildren())){
				results.add(node);
			}
		}
		return results;
	}
	
	/**
	 * 构建菜单列表
	 * @return
	 * @date 2017年2月19日 下午11:18:19
	 */
	public static List<MenuNode> buildTitle(List<MenuNode> nodes){
		List<MenuNode> clearBtn = clearBtn(nodes);
		new MenuNode().buildNodeTree(clearBtn);
		return clearNoChild(clearBtn);
	}
}
