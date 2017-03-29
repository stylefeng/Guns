package com.stylefeng.guns.rest;

public class Result {
	
	private String status;
	private String count;
	private String info;
	private String infocode;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public String getInfocode() {
		return infocode;
	}
	public void setInfocode(String infocode) {
		this.infocode = infocode;
	}
	
	@Override
	public String toString() {
		return "Result [status=" + status + ", count=" + count + ", info=" + info + ", infocode=" + infocode + "]";
	}
}
