/**
 * Copyright (c) 2015-2017, Chill Zhuang 庄骞 (smallchill@163.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.stylefeng.guns.core.support.cache;

import java.util.List;

/**
 * 通用缓存接口
 */
public interface ICache {
	
	public void put(String cacheName, Object key, Object value);
	
	public <T> T get(String cacheName, Object key);
	
	@SuppressWarnings("rawtypes")
	public List getKeys(String cacheName);
	
	public void remove(String cacheName, Object key);
	
	public void removeAll(String cacheName);
	
	public <T> T get(String cacheName, Object key, ILoader iLoader);
	
	public <T> T get(String cacheName, Object key, Class<? extends ILoader> iLoaderClass);
	
}
