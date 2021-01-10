package cn.stylefeng.guns.modular.dict.service;

import cn.stylefeng.roses.kernel.dict.modular.pojo.request.DictRequest;
import cn.stylefeng.roses.kernel.system.pojo.ztree.ZTreeNode;

import java.util.List;

/**
 * 字典业务接口
 *
 * @param
 * @author huangyao
 * @return
 * @date 2021/1/10 16:23
 */
public interface ExtendDictService {

    /**
     * 获取字典数据的 ztree
     *
     * @param
     * @return
     * @author huangyao
     * @date 2021/1/10 16:26
     */
    List<ZTreeNode> dictZTree(DictRequest dictRequest);
}
