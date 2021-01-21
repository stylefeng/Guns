package cn.stylefeng.guns.modular.system.model;

import lombok.Data;

/**
 * prometheus结果
 *
 * @author chenli
 * @date 2021/1/10 18:58
 */
@Data
public class PromResultInfo {

    /**
     * prometheus指标属性
     */
    private PromMetricInfo metric;

    /**
     * prometheus指标值
     */
    private String[] values;

}
