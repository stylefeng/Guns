package com.stylefeng.guns.core.exception;

/**
 * @Description 业务异常的封装
 * @author fengshuonan
 * @date 2016年11月12日 下午5:05:10
 */
@SuppressWarnings("serial")
public class GunsException extends RuntimeException{

	//友好提示的code码
	private int friendlyCode;
	
	//友好提示
	private String friendlyMsg;
	
	//业务异常跳转的页面
	private String urlPath;
	
	public GunsException(GunsExceptionEnum bizExceptionEnum){
		this.friendlyCode = bizExceptionEnum.getCode();
		this.friendlyMsg = bizExceptionEnum.getMessage();
		this.urlPath = bizExceptionEnum.getUrlPath();
	}

	public int getCode() {
		return friendlyCode;
	}

	public void setCode(int code) {
		this.friendlyCode = code;
	}

	public String getMessage() {
		return friendlyMsg;
	}

	public void setMessage(String message) {
		this.friendlyMsg = message;
	}

	public String getUrlPath() {
		return urlPath;
	}

	public void setUrlPath(String urlPath) {
		this.urlPath = urlPath;
	}
	
}
