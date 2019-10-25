package cn.stylefeng.guns.sys.modular.rest.mapper;

import cn.stylefeng.guns.sys.modular.rest.entity.RestUserPos;
import cn.stylefeng.guns.sys.modular.system.model.params.UserPosParam;
import cn.stylefeng.guns.sys.modular.system.model.result.UserPosResult;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 用户职位关联表 Mapper 接口
 * </p>
 *
 * @author stylefeng
 * @since 2019-06-28
 */
public interface RestUserPosMapper extends BaseMapper<RestUserPos> {

    /**
     * 获取列表
     *
     * @author stylefeng
     * @Date 2019-06-28
     */
    List<UserPosResult> customList(@Param("paramCondition") UserPosParam paramCondition);

    /**
     * 获取map列表
     *
     * @author stylefeng
     * @Date 2019-06-28
     */
    List<Map<String, Object>> customMapList(@Param("paramCondition") UserPosParam paramCondition);

    /**
     * 获取分页实体列表
     *
     * @author stylefeng
     * @Date 2019-06-28
     */
    Page<UserPosResult> customPageList(@Param("page") Page page, @Param("paramCondition") UserPosParam paramCondition);

    /**
     * 获取分页map列表
     *
     * @author stylefeng
     * @Date 2019-06-28
     */
    Page<Map<String, Object>> customPageMapList(@Param("page") Page page, @Param("paramCondition") UserPosParam paramCondition);

}
