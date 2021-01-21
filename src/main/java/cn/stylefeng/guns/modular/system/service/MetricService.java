package cn.stylefeng.guns.modular.system.service;

import cn.stylefeng.guns.modular.system.model.PromResultInfo;

import java.util.List;

/**
 * 监控管理prometheus
 *
 * @author chenli
 * @date 2021/1/10 16:09
 */
public interface MetricService {

    /**
     * prometheus采集监控指标
     *
     * @param promURL prometheus地址
     * @param promQL  prometheus查询表达式
     * @return Map<String, Object>  指标名称与指标数据的集合
     * @author chenli
     * @date 2021/1/10 17:37
     */
    List<PromResultInfo> getMetricInfo(String promURL, String promQL);

}
