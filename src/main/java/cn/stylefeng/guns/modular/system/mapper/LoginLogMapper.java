package cn.stylefeng.guns.modular.system.mapper;

import cn.stylefeng.guns.modular.system.entity.LoginLog;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 登录记录 Mapper 接口
 * </p>
 *
 * @author stylefeng
 * @since 2018-12-07
 */
public interface LoginLogMapper extends BaseMapper<LoginLog> {

    /**
     * 获取登录日志
     */
    List<Map<String, Object>> getLoginLogs(@Param("page") Page page, @Param("beginTime") String beginTime,
                                           @Param("endTime") String endTime, @Param("logName") String logName);
}
