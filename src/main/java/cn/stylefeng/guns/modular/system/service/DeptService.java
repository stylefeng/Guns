package cn.stylefeng.guns.modular.system.service;

import cn.stylefeng.guns.core.common.node.ZTreeNode;
import cn.stylefeng.guns.modular.system.entity.Dept;
import cn.stylefeng.guns.modular.system.mapper.DeptMapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 部门表 服务实现类
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
@Service
public class DeptService extends ServiceImpl<DeptMapper, Dept> {

    @Resource
    private DeptMapper deptMapper;

    /**
     * 删除部门
     */
    @Transactional
    public void deleteDept(Long deptId) {
        Dept dept = deptMapper.selectById(deptId);

        Wrapper<Dept> wrapper = new EntityWrapper<>();
        wrapper = wrapper.like("PIDS", "%[" + dept.getDeptId() + "]%");
        List<Dept> subDepts = deptMapper.selectList(wrapper);
        for (Dept temp : subDepts) {
            this.deleteById(temp.getDeptId());
        }

        this.deleteById(dept.getDeptId());
    }

    /**
     * 获取ztree的节点列表
     */
    public List<ZTreeNode> tree() {
        return this.baseMapper.tree();
    }

    /**
     * 获取所有部门列表
     */
    public List<Map<String, Object>> list(String condition) {
        return this.baseMapper.list(condition);
    }

}
