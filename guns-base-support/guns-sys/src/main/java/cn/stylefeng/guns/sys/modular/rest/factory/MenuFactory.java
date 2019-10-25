package cn.stylefeng.guns.sys.modular.rest.factory;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.sys.modular.rest.model.MenuTreeNode;
import cn.stylefeng.roses.core.treebuild.DefaultTreeBuildFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 菜单树构建
 *
 * @author fengshuonan
 * @date 2019-07-26-17:38
 */
public class MenuFactory {

    /**
     * 构造菜单树，菜单列表用
     *
     * @author fengshuonan
     * @Date 2019-07-26 17:41
     */
    public static List<MenuTreeNode> buildTreeNodes(List<Map<String, Object>> originMap) {

        ArrayList<MenuTreeNode> menuTreeNodes = new ArrayList<>();

        for (Map<String, Object> map : originMap) {
            MenuTreeNode menuTreeNode = BeanUtil.mapToBean(map, MenuTreeNode.class, true);
            menuTreeNodes.add(menuTreeNode);
        }

        DefaultTreeBuildFactory<MenuTreeNode> treeBuildFactory = new DefaultTreeBuildFactory<>();

        treeBuildFactory.setRootParentId("0");

        return treeBuildFactory.doTreeBuild(menuTreeNodes);
    }

}
