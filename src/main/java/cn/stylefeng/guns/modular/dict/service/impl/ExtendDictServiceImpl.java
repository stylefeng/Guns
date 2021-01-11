package cn.stylefeng.guns.modular.dict.service.impl;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.stylefeng.guns.modular.dict.service.ExtendDictService;
import cn.stylefeng.roses.kernel.dict.api.exception.DictException;
import cn.stylefeng.roses.kernel.dict.api.exception.enums.DictExceptionEnum;
import cn.stylefeng.roses.kernel.dict.modular.entity.SysDict;
import cn.stylefeng.roses.kernel.dict.modular.entity.SysDictType;
import cn.stylefeng.roses.kernel.dict.modular.pojo.request.DictRequest;
import cn.stylefeng.roses.kernel.dict.modular.service.DictService;
import cn.stylefeng.roses.kernel.dict.modular.service.DictTypeService;
import cn.stylefeng.roses.kernel.rule.enums.YesOrNotEnum;
import cn.stylefeng.roses.kernel.system.pojo.ztree.ZTreeNode;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 字典扩展业务实现
 *
 * @param
 * @author huangyao
 * @return
 * @date 2021/1/10 16:24
 */
@Service
public class ExtendDictServiceImpl implements ExtendDictService {

    @Autowired
    private DictService dictService;
    @Autowired
    private DictTypeService dictTypeService;

    @Override
    public List<ZTreeNode> dictZTree(DictRequest dictRequest) {
        // 查询条件
        LambdaQueryWrapper<SysDict> queryWrapper = createWrapper(dictRequest);
        List<SysDict> dictList = dictService.list(queryWrapper);

        // 构建ztree
        ArrayList<ZTreeNode> zTreeNodes = new ArrayList<>();
        for (SysDict dict : dictList) {
            ZTreeNode zTreeNode = new ZTreeNode();
            zTreeNode.setId(dict.getDictId());
            zTreeNode.setpId(dict.getDictParentId());
            zTreeNode.setName(dict.getDictName());
            zTreeNode.setOpen(true);
            zTreeNodes.add(zTreeNode);
        }

        ZTreeNode zTreeNode = new ZTreeNode();
        zTreeNode.setId(-1L);
        zTreeNode.setpId(0L);
        zTreeNode.setName("顶级");
        zTreeNode.setOpen(true);
        zTreeNodes.add(zTreeNode);


        // 构建已选中的状态
        return zTreeNodes;
    }

    @Override
    public SysDictType getDictTypeByDictId(Long dictId) {
        SysDict dict = dictService.getById(dictId);
        // 根据字典类型编码获取字典类型
        SysDictType dictType = dictTypeService.getOne(new QueryWrapper<SysDictType>().lambda()
                .eq(SysDictType::getDelFlag, 'N')
                .eq(SysDictType::getDictTypeCode, dict.getDictTypeCode()));
        if (ObjectUtil.isEmpty(dictType)) {
            throw new DictException(DictExceptionEnum.DICT_TYPE_NOT_EXISTED, dictType.getDictTypeCode());
        }
        return dictType;
    }

    /**
     * 创建字典通用的条件查询wrapper
     *
     * @param
     * @return
     * @author huangyao
     * @date 2021/1/10 16:33
     */
    private LambdaQueryWrapper<SysDict> createWrapper(DictRequest dictRequest) {
        LambdaQueryWrapper<SysDict> queryWrapper = new LambdaQueryWrapper<>();
        if (ObjectUtil.isNotNull(dictRequest)) {

            // 拼接字典名称查询条件
            if (ObjectUtil.isNotEmpty(dictRequest.getDictName())) {
                queryWrapper.like(SysDict::getDictName, dictRequest.getDictName());
            }

            // 拼接字典拼音查询条件
            if (ObjectUtil.isNotEmpty(dictRequest.getDictNamePinYin())) {
                queryWrapper.eq(SysDict::getDictNamePinyin, dictRequest.getDictNamePinYin());
            }

            // 根据字典类型查询条件
            if (ObjectUtil.isNotEmpty(dictRequest.getDictTypeCode())) {
                queryWrapper.eq(SysDict::getDictTypeCode, dictRequest.getDictTypeCode());
            }

            // 拼接字典父级id查询条件
            if (ObjectUtil.isNotEmpty(dictRequest.getDictParentId())) {
                queryWrapper
                        .eq(SysDict::getDictParentId, dictRequest.getDictParentId())
                        .or()
                        .like(SysDict::getDictPids, dictRequest.getDictPids());
            }
        }

        // 查询未删除状态的
        queryWrapper.eq(SysDict::getDelFlag, YesOrNotEnum.N.getCode());

        // 根据排序升序排列，序号越小越在前
        queryWrapper.orderByAsc(SysDict::getDictSort);

        return queryWrapper;
    }
}
