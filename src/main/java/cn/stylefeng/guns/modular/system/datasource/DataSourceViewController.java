package cn.stylefeng.guns.modular.system.datasource;

import cn.stylefeng.roses.kernel.scanner.api.annotation.ApiResource;
import cn.stylefeng.roses.kernel.scanner.api.annotation.GetResource;
import org.springframework.stereotype.Controller;

/**
 * 多数据源界面
 *
 * @author fengshuonan
 * @date 2021/1/23 21:45
 */
@Controller
@ApiResource(name = "多数据源界面")
public class DataSourceViewController {

    /**
     * 多数据源列表界面
     *
     * @author fengshuonan
     * @date 2021/1/23 21:45
     */
    @GetResource(name = "多数据源列表界面", path = "/view/datasource")
    public String indexView() {
        return "/modular/system/datasource/datasource.html";
    }

    /**
     * 多数据源新增界面
     *
     * @author fengshuonan
     * @date 2021/1/23 21:59
     */
    @GetResource(name = "多数据源新增界面", path = "/view/datasource/add")
    public String addView() {
        return "/modular/system/datasource/datasource_add.html";
    }


}
