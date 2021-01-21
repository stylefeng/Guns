package cn.stylefeng.guns.modular.system.service.impl;

import cn.hutool.http.HttpUtil;
import cn.stylefeng.guns.core.consts.ProjectConstants;
import cn.stylefeng.guns.modular.system.model.PromResponseInfo;
import cn.stylefeng.guns.modular.system.model.PromResultInfo;
import cn.stylefeng.guns.modular.system.service.MetricService;
import com.alibaba.excel.util.StringUtils;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 监控管理prometheus
 *
 * @author chenli
 * @date 2021/1/10 16:09
 */
@Service
public class MetricServiceImpl implements MetricService {

    /**
     * prometheus采集监控指标
     *
     * @author chenli
     * @date 2021/1/10 16:09
     */
    @Override
    public List<PromResultInfo> getMetricInfo(String promURL, String promQL) {
        Map<String, Object> paramMap = new HashMap<>();

        // prometheus查询命令
        paramMap.put(ProjectConstants.PROMETHEUS_QUERY, promQL);

        // 查询5分钟数据
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.MINUTE, calendar.get(Calendar.MINUTE) - 5);

        // 查询开始时间
        paramMap.put(ProjectConstants.PROMETHEUS_START, (calendar.getTime().getTime()) / 1000L);

        // 查询结束时间
        paramMap.put(ProjectConstants.PROMETHEUS_END, (new Date().getTime()) / 1000L);

        // 查询步长
        paramMap.put(ProjectConstants.PROMETHEUS_STEP, 15);

        // 获取查询结果
        PromResponseInfo responseInfo = JSON.parseObject(HttpUtil.get(promURL, paramMap), PromResponseInfo.class);
        if (StringUtils.isEmpty(responseInfo)) {
            // prometheus未开启
            return null;
        }
        if (StringUtils.isEmpty(responseInfo.getStatus()) || !"success".equals(responseInfo.getStatus())) {
            // prometheus查询失败
            return null;
        }
        return responseInfo.getData().getResult();
    }

}
