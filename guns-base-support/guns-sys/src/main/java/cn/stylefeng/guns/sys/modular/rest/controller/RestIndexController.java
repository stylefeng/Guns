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

import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.auth.model.LoginUser;
import cn.stylefeng.guns.sys.modular.rest.service.RestUserService;
import cn.stylefeng.roses.core.base.controller.BaseController;
import cn.stylefeng.roses.core.reqres.response.ErrorResponseData;
import cn.stylefeng.roses.core.reqres.response.ResponseData;
import cn.stylefeng.roses.core.reqres.response.SuccessResponseData;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

import static cn.stylefeng.guns.base.auth.exception.enums.AuthExceptionEnum.NO_ROLE_ERROR;

/**
 * 首页信息
 *
 * @author fengshuonan
 * @Date 2019/7/24 22:09
 */
@RestController
@RequestMapping("/rest")
public class RestIndexController extends BaseController {

    @Resource
    private RestUserService restUserService;

    /**
     * 获取用户菜单列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:41 PM
     */
    @RequestMapping(value = "/menus", method = RequestMethod.POST)
    public ResponseData menus() {

        //获取当前用户角色列表
        LoginUser user = LoginContextHolder.getContext().getUser();
        List<Long> roleList = user.getRoleList();

        //如果角色为空
        if (roleList == null || roleList.size() == 0) {
            return new ErrorResponseData(NO_ROLE_ERROR.getCode(), NO_ROLE_ERROR.getMessage());
        }

        //渲染菜单
        return new SuccessResponseData(restUserService.getUserMenuNodes(roleList));
    }

    /**
     * 获取用户菜单列表
     *
     * @author fengshuonan
     * @Date 2018/12/23 5:41 PM
     */
    @RequestMapping(value = "/getUserInfo", method = RequestMethod.POST)
    public ResponseData getUserInfo() {
        LoginUser user = LoginContextHolder.getContext().getUser();
        return new SuccessResponseData(user);
    }

}
