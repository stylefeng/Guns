package com.stylefeng.guns.core.support;

/**
 * 一些通用的函数
 * 
 * @author Looly
 *
 */
public class ObjectKit {
	/**
	 * 比较两个对象是否相等。<br>
	 * 相同的条件有两个，满足其一即可：<br>
	 * 1. obj1 == null && obj2 == null; 2. obj1.equals(obj2)
	 * 
	 * @param obj1 对象1
	 * @param obj2 对象2
	 * @return 是否相等
	 */
	public static boolean equals(Object obj1, Object obj2) {
		return (obj1 != null) ? (obj1.equals(obj2)) : (obj2 == null);
	}
}
