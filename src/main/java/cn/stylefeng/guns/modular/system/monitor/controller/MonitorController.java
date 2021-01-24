package cn.stylefeng.guns.modular.system.monitor.controller;

import cn.hutool.core.util.EscapeUtil;
import cn.hutool.core.util.StrUtil;
import cn.stylefeng.guns.core.consts.ProjectConstants;
import cn.stylefeng.guns.modular.system.monitor.model.PromResultInfo;
import cn.stylefeng.guns.modular.system.monitor.service.MetricService;
import cn.stylefeng.guns.modular.system.monitor.warpper.SystemHardwareWrapper;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

/**
 * 项目监控
 *
 * @author chenli
 * @date 2020/12/30 16:40
 */
@Controller
@ApiResource(name = "项目监控")
public class MonitorController {

    @Value("${server.port}")
    private String port;

    @Value("${spring.application.name}")
    private String name;

    @Value("${prometheus.url}")
    private String prometheusUrl;

    @Value("${prometheus.instance}")
    private String prometheusInstance;

    @Resource
    private MetricService service;

    /**
     * 系统硬件信息页面
     *
     * @author fengshuonan
     * @date 2018/12/24 22:43
     */
    @GetResource(name = "服务器监控", path = "/view/monitor/systemInfo")
    public String systemInfo(Model model) {
        SystemHardwareWrapper systemHardwareWrapper = new SystemHardwareWrapper();
        systemHardwareWrapper.copyTo();
        model.addAttribute("server", systemHardwareWrapper);
        return "/modular/system/monitor/systemInfo.html";
    }

    /**
     * druid sql监控页面
     *
     * @author chenli
     * @date 2021/1/4 16:32
     */
    @GetResource(name = "SQL监控", path = "/view/monitor/druid")
    public String druidInfo(Model model) {
        model.addAttribute("port", port);
        return "/modular/system/monitor/druid.html";
    }

    /**
     * tomcat监控页面
     *
     * @author chenli
     * @date 2021/1/4 16:32
     */
    @GetResource(name = "tomcat监控", path = "/view/monitor/tomcatInfo")
    public String tomcatInfo(Model model) {
        getMetricInfos("tomcat_", model);
        return "/modular/system/monitor/tomcatInfo.html";
    }

    /**
     * jvm监控
     *
     * @author chenli
     * @date 2021/1/4 16:32
     */
    @GetResource(name = "jvm监控", path = "/view/monitor/jvmInfo")
    public String jvmInfo(Model model) {
        getMetricInfos("jvm_", model);
        return "/modular/system/monitor/jvmInfo.html";
    }

    /**
     * 分别输出监控名称以及对应的值
     *
     * @author chenli
     * @date 2021/1/4 16:32
     */
    private void getMetricInfos(String metric, Model model) {
        String promQL = "";
        if (!StrUtil.isEmpty(prometheusInstance)) {
            promQL = "{application=\"" + name + "\",instance=\"" + prometheusInstance + "\"}";
        } else {
            promQL = "{application=\"" + name + "\"}";
        }
        if (!StrUtil.isEmpty(prometheusUrl)) {
            List<PromResultInfo> promResultInfos = service.getMetricInfo(prometheusUrl.concat(ProjectConstants.PROMETHEUS_QUERY_RANGE), promQL);
            for (PromResultInfo promResultInfo : promResultInfos) {
                String metricName = promResultInfo.getMetric().get__name__();
                if (!Objects.isNull(metricName)) {
                    if (metricName.contains(metric)) {
                        String metricValues = EscapeUtil.unescape(JSON.toJSONString(promResultInfo.getValues()));
                        model.addAttribute(metricName, metricValues.replace("\"", ""));
                    }
                }
            }
        }
    }

}
