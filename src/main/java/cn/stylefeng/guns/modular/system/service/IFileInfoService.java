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
package cn.stylefeng.guns.modular.system.service;

import cn.stylefeng.guns.modular.system.model.FileInfo;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 文件信息 服务类
 * </p>
 *
 * @author stylefeng123
 * @since 2018-02-22
 */
public interface IFileInfoService extends IService<FileInfo> {

    /**
     * 上传头像
     *
     * @author fengshuonan
     * @Date 2018/11/10 4:10 PM
     */
    void uploadAvatar(String avatar);

}
