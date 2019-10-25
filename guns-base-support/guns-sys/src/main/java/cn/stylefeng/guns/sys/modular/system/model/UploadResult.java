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
package cn.stylefeng.guns.sys.modular.system.model;

import lombok.Data;

/**
 * 文件上传结果
 *
 * @author fengshuonan
 * @Date 2019-08-30 09:37
 */
@Data
public class UploadResult {

    /**
     * 文件唯一id
     */
    private String fileId;

    /**
     * 文件后缀
     */
    private String fileSuffix;

    /**
     * 文件原始名称（带后缀）
     */
    private String originalFilename;

    /**
     * 文件最终名称（带后缀）
     */
    private String finalName;

    /**
     * 最终文件存储路径
     */
    private String fileSavePath;
}
