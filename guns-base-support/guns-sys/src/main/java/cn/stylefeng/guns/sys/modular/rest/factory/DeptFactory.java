package cn.stylefeng.guns.sys.modular.rest.factory;

import cn.hutool.core.bean.BeanUtil;
import cn.stylefeng.guns.sys.modular.rest.model.DeptTreeNode;
import cn.stylefeng.roses.core.treebuild.DefaultTreeBuildFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 部门树构建
 *
 * @author fengshuonan
 * @date 2019-07-26-17:38
 */
public class DeptFactory {

    /**
     * 构造部门树，部门列表用
     *
     * @author fengshuonan
     * @Date 2019-07-26 17:41
     */
    public static List<DeptTreeNode> buildTreeNodes(List<Map<String, Object>> originMap) {

        ArrayList<DeptTreeNode> deptTreeNodes = new ArrayList<>();

        for (Map<String, Object> map : originMap) {
            DeptTreeNode deptTreeNode = BeanUtil.mapToBean(map, DeptTreeNode.class, true);
            deptTreeNodes.add(deptTreeNode);
        }

        DefaultTreeBuildFactory<DeptTreeNode> buildFactory = new DefaultTreeBuildFactory<>();

        buildFactory.setRootParentId("0");

        return buildFactory.doTreeBuild(deptTreeNodes);
    }

}
