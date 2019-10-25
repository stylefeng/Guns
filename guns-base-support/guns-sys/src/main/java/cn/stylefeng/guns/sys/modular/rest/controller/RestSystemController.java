/**
 * Copyright 2018-2020 stylefeng & fengshuonan (https://gitee.com/stylefeng)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cn.stylefeng.guns.sys.modular.rest.controller;

import cn.hutool.core.codec.Base64;
import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.auth.model.LoginUser;
import cn.stylefeng.guns.base.oshi.SystemHardwareInfo;
import cn.stylefeng.guns.sys.core.constant.DefaultAvatar;
import cn.stylefeng.guns.sys.modular.rest.service.RestFileInfoService;
import cn.stylefeng.guns.sys.modular.rest.service.RestUserService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.reqres.response.SuccessResponseData;
import cn.stylefeng.roses.core.util.ToolUtil;
import cn.stylefeng.roses.kernel.model.exception.RequestEmptyException;
import cn.stylefeng.roses.kernel.model.exception.ServiceException;
import cn.stylefeng.roses.kernel.model.exception.enums.CoreExceptionEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

/**
 * 通用控制器
 *
 * @author fengshuonan
 * @Date 2017年2月17日20:27:22
 */
@RestController
@RequestMapping("/rest/system")
@Slf4j
public class RestSystemController extends BaseController {

    @Autowired
    private RestUserService restUserService;

    @Autowired
    private RestFileInfoService restFileInfoService;

    /**
     * 系统硬件信息
     *
     * @author fengshuonan
     * @Date 2018/12/24 22:43
     */
    @RequestMapping("/systemInfo")
    public ResponseData systemInfo() {

        SystemHardwareInfo systemHardwareInfo = new SystemHardwareInfo();
        systemHardwareInfo.copyTo();

        return new SuccessResponseData(systemHardwareInfo);
    }

    /**
     * 更新头像
     *
     * @author fengshuonan
     * @Date 2018/11/9 12:45 PM
     */
    @RequestMapping("/updateAvatar")
    public Object uploadAvatar(@RequestParam("fileId") String fileId) {

        if (ToolUtil.isEmpty(fileId)) {
            throw new RequestEmptyException("请求头像为空");
        }

        restFileInfoService.updateAvatar(fileId);

        return SUCCESS_TIP;
    }

    /**
     * 预览头像
     *
     * @author fengshuonan
     * @Date 2018/11/9 12:45 PM
     */
    @RequestMapping("/previewAvatar")
    public Object previewAvatar(HttpServletResponse response) {

        //输出图片的文件流
        try {
            response.setContentType("image/jpeg");
            byte[] decode = this.restFileInfoService.previewAvatar();
            response.getOutputStream().write(decode);
        } catch (IOException e) {
            throw new ServiceException(CoreExceptionEnum.SERVICE_ERROR);
        }

        return null;
    }

    /**
     * 获取当前用户详情
     *
     * @author fengshuonan
     * @Date 2018/12/23 6:59 PM
     */
    @RequestMapping("/currentUserInfo")
    public ResponseData getUserInfo() {

        LoginUser currentUser = LoginContextHolder.getContext().getUser();
        if (currentUser == null) {
            throw new ServiceException(CoreExceptionEnum.NO_CURRENT_USER);
        }

        return new SuccessResponseData(restUserService.getUserInfo(currentUser.getId()));
    }

    /**
     * layui上传组件 通用文件上传接口
     *
     * @author fengshuonan
     * @Date 2019-2-23 10:48:29
     */
    @RequestMapping(method = RequestMethod.POST, path = "/upload")
    public ResponseData layuiUpload(@RequestPart("file") MultipartFile file) {

        String fileId = this.restFileInfoService.uploadFile(file);

        HashMap<String, Object> map = new HashMap<>();
        map.put("fileId", fileId);

        return ResponseData.success(0, "上传成功", map);
    }

    /**
     * 查看图片
     *
     * @author fengshuonan
     * @Date 2019/7/27 20:33
     */
    @RequestMapping("/preview/{fileId}")
    public Object preview(@PathVariable("fileId") String fileId, HttpServletResponse response) {

        byte[] decode = null;

        //输出图片的文件流
        try {
            response.setContentType("image/jpeg");
            decode = this.restFileInfoService.getFileBytes(fileId);
        } catch (Exception e) {
            //返回默认头像
            decode = Base64.decode(DefaultAvatar.BASE_64_AVATAR);
        }

        try {
            response.getOutputStream().write(decode);
        } catch (IOException e) {
            throw new ServiceException(CoreExceptionEnum.SERVICE_ERROR);
        }

        return null;
    }

}
