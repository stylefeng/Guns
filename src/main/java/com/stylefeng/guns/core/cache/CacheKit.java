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

package com.stylefeng.guns.core.cache;

import java.util.List;

/**
 * 缓存工具类
 */
public class CacheKit {
	
	private static ICache defaultCacheFactory = new EhcacheFactory();

	public static void put(String cacheName, Object key, Object value) {
		defaultCacheFactory.put(cacheName, key, value);
	}
	
	public static <T> T get(String cacheName, Object key) {
		return defaultCacheFactory.get(cacheName, key);
	}
	
	@SuppressWarnings("rawtypes")
	public static List getKeys(String cacheName) {
		return defaultCacheFactory.getKeys(cacheName);
	}
	
	public static void remove(String cacheName, Object key) {
		defaultCacheFactory.remove(cacheName, key);
	}
	
	public static void removeAll(String cacheName) {
		defaultCacheFactory.removeAll(cacheName);
	}
	
	public static <T> T get(String cacheName, Object key, ILoader iLoader) {
		return defaultCacheFactory.get(cacheName, key, iLoader);
	}
	
	public static <T> T get(String cacheName, Object key, Class<? extends ILoader> iLoaderClass) {
		return defaultCacheFactory.get(cacheName, key, iLoaderClass);
	}
	
}


