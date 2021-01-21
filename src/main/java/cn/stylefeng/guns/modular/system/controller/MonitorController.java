package cn.stylefeng.guns.modular.system.controller;

import cn.stylefeng.guns.core.consts.ProjectConstants;
import cn.stylefeng.guns.modular.system.model.PromResultInfo;
import cn.stylefeng.guns.modular.system.service.MetricService;
import cn.stylefeng.guns.modular.system.warpper.SystemHardwareWarpper;
import cn.stylefeng.roses.kernel.resource.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.resource.api.annotation.GetResource;
import com.alibaba.fastjson.JSON;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import java.util.List;
import java.util.Objects;

/**
 * 项目监控
 *
 * @author chenli
 * @Date 2020/12/30 16:40
 */
@Controller
@Slf4j
@ApiResource(name = "项目监控")
public class MonitorController {

    private String PREFIX = "/modular/frame";

    @Value("${server.port}")
    private String port;

    @Value("${spring.application.name}")
    private String name;

    @Value("${prometheus.url}")
    private String prometheusUrl;

    @Value("${prometheus.instance}")
    private String prometheusInstance;

    @Autowired
    private MetricService service;

    /**
     * 系统硬件信息页面
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:43
     */
    @GetResource(name = "服务器监控", path = "/monitor/systemInfo")
    public String systemInfo(Model model) {
        SystemHardwareWarpper systemHardwareWarpper = new SystemHardwareWarpper();
        systemHardwareWarpper.copyTo();
        model.addAttribute("server",systemHardwareWarpper);
        return PREFIX+"/systemInfo.html";
    }

    /**
     * durid sql监控页面
     *
     * @author chenli
     * @Date 2021/1/4 16:32
     */
    @GetResource(name = "SQL监控", path = "/monitor/druid")
    public String duridInfo(Model model){
        model.addAttribute("port",port);
        return PREFIX+"/druid.html";
    }

    /**
     * tomcat监控页面
     *
     * @author chenli
     * @Date 2021/1/4 16:32
     */
    @GetResource(name = "tomcat监控", path = "/monitor/tomcatInfo")
    public String tomcatInfo(Model model){
        getMetricInfos("tomcat_",model);
        return PREFIX+"/tomcatInfo.html";
    }

    /**
     * jvm监控
     *
     * @author chenli
     * @Date 2021/1/4 16:32
     */
    @GetResource(name = "jvm监控", path = "/monitor/jvmInfo")
    public String jvmInfo(Model model){
        getMetricInfos("jvm_",model);
        return PREFIX+"/jvmInfo.html";
    }

    /**
     * 分别输出监控名称以及对应的值
     *
     * @author chenli
     * @Date 2021/1/4 16:32
     */
    private void getMetricInfos(String metric,Model model){
        String promQL = "";
        if(!StringUtils.isEmpty(prometheusInstance)){
            promQL = "{application=\""+name+"\",instance=\""+prometheusInstance+"\"}";
        } else {
            promQL = "{application=\""+name+"\"}";
        }
        if(!StringUtils.isEmpty(prometheusUrl)){
            List<PromResultInfo> promResultInfos = service.getMetricInfo(prometheusUrl.concat(ProjectConstants.PROMETHEUS_QUERY_RANGE), promQL);
            for(PromResultInfo promResultInfo : promResultInfos){
                String metricName = promResultInfo.getMetric().get__name__();
                if(!Objects.isNull(metricName)){
                    if(metricName.contains(metric)){
                        String metricValues = StringEscapeUtils.unescapeJava(JSON.toJSONString(promResultInfo.getValues()));
                        model.addAttribute(metricName, metricValues.replace("\"",""));
                    }
                }
            }
        }
    }
}
