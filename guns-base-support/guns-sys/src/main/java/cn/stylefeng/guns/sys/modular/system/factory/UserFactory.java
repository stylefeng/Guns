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
package cn.stylefeng.guns.sys.modular.system.factory;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.date.DateUtil;
import cn.stylefeng.guns.base.auth.context.LoginContextHolder;
import cn.stylefeng.guns.base.auth.model.LoginUser;
import cn.stylefeng.guns.base.consts.ConstantsContext;
import cn.stylefeng.guns.sys.core.constant.factory.ConstantFactory;
import cn.stylefeng.guns.sys.core.constant.state.ManagerStatus;
import cn.stylefeng.guns.sys.modular.system.entity.User;
import cn.stylefeng.guns.sys.modular.system.model.UserDto;
import cn.stylefeng.roses.core.util.ToolUtil;
import org.springframework.beans.BeanUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户创建工厂
 *
 * @author fengshuonan
 * @date 2017-05-05 22:43
 */
public class UserFactory {

    /**
     * 根据请求创建实体
     */
    public static User createUser(UserDto userDto, String md5Password, String salt) {
        if (userDto == null) {
            return null;
        } else {
            User user = new User();
            BeanUtils.copyProperties(userDto, user);
            user.setCreateTime(new Date());
            user.setStatus(ManagerStatus.OK.getCode());
            user.setPassword(md5Password);
            user.setSalt(salt);
            return user;
        }
    }

    /**
     * 更新user
     */
    public static User editUser(UserDto newUser, User oldUser) {
        if (newUser == null || oldUser == null) {
            return oldUser;
        } else {
            if (ToolUtil.isNotEmpty(newUser.getAvatar())) {
                oldUser.setAvatar(newUser.getAvatar());
            }
            if (ToolUtil.isNotEmpty(newUser.getName())) {
                oldUser.setName(newUser.getName());
            }
            if (ToolUtil.isNotEmpty(newUser.getBirthday())) {
                oldUser.setBirthday(newUser.getBirthday());
            }
            if (ToolUtil.isNotEmpty(newUser.getDeptId())) {
                oldUser.setDeptId(newUser.getDeptId());
            }
            if (ToolUtil.isNotEmpty(newUser.getSex())) {
                oldUser.setSex(newUser.getSex());
            }
            if (ToolUtil.isNotEmpty(newUser.getEmail())) {
                oldUser.setEmail(newUser.getEmail());
            }
            if (ToolUtil.isNotEmpty(newUser.getPhone())) {
                oldUser.setPhone(newUser.getPhone());
            }
            return oldUser;
        }
    }

    /**
     * 过滤不安全字段并转化为map
     */
    public static Map<String, Object> removeUnSafeFields(User user) {
        if (user == null) {
            return new HashMap<>();
        } else {
            Map<String, Object> map = BeanUtil.beanToMap(user);
            map.remove("password");
            map.remove("salt");
            map.put("birthday", DateUtil.formatDate(user.getBirthday()));
            return map;
        }
    }

    /**
     * 通过用户表的信息创建一个登录用户
     */
    public static LoginUser createLoginUser(User user) {
        LoginUser loginUser = new LoginUser();

        if (user == null) {
            return loginUser;
        }

        loginUser.setId(user.getUserId());
        loginUser.setAccount(user.getAccount());
        loginUser.setDeptId(user.getDeptId());
        loginUser.setDeptName(ConstantFactory.me().getDeptName(user.getDeptId()));
        loginUser.setName(user.getName());
        loginUser.setEmail(user.getEmail());

        loginUser.setAvatar("/api/system/preview/" + user.getAvatar());

        return loginUser;
    }

    /**
     * 判断用户是否是从oauth2登录过来的
     */
    public static boolean oauth2Flag() {
        String account = LoginContextHolder.getContext().getUser().getAccount();
        if (account.startsWith(ConstantsContext.getOAuth2UserPrefix())) {
            return true;
        } else {
            return false;
        }
    }
}
