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
 * ueditor文件上传返回结果
 *
 * @author stylefeng
 * @Date 2017/5/5 22:40
 */
@Data
public class UeditorFileResult {

    /**
     * 状态：固定值SUCCESS
     */
    private String state = "SUCCESS";

    /**
     * 图片相对路径
     */
    private String url;

    /**
     * 文件名称（这里我使用随机字符串来重新命名图片）
     */
    private String title;

    /**
     * 文件名称（这里我使用随机字符串来重新命名图片）
     */
    private String original;
}
