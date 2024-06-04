package cn.stylefeng.guns.modular.deploy;


import cn.hutool.core.io.IoUtil;
import cn.hutool.core.io.resource.ResourceUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * 项目部署的控制器，直接jar包启动
 *
 * @author fengshuonan
 * @since 2024-04-22 18:07
 */
@Controller
public class IndexController {

    /**
     * devops访问的渲染
     *
     * @author fengshuonan
     * @since 2024/6/4 18:31
     */
    @GetMapping("/guns-devops")
    public void index(HttpServletResponse response) throws IOException {
        renderIndex(response);
    }

    /**
     * 渲染主页的操作
     *
     * @author fengshuonan
     * @date 2022/10/23 15:02
     */
    private void renderIndex(HttpServletResponse response) throws IOException {
        ServletOutputStream outputStream = response.getOutputStream();
        response.addHeader("Content-Type", "text/html");
        response.addHeader("Cache-Control", "no-cache");
        response.addHeader("Cache-Control", "no-cache, no-store, private, must-revalidate, proxy-revalidate");
        String indexContent = ResourceUtil.readStr("classpath:/guns-devops/index.html", StandardCharsets.UTF_8);
        IoUtil.write(outputStream, StandardCharsets.UTF_8, true, indexContent);
    }

}
