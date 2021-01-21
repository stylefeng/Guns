package cn.stylefeng.guns.modular.system.model;

import lombok.Data;

/**
 * prometheus返回监控指标信息
 *
 * @author chenli
 * @date 2021/1/10 18:53
 */
@Data
public class PromMetricInfo {

    /**
     * prometheus监控指标名称
     */
    private String __name__;

    /**
     * prometheus实例名称
     */
    private String instance;

    /**
     * prometheus任务名称
     */
    private String job;
}

