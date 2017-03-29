/**
 * 页面单例
 */
var Charge = {
	phone : ""	//被操作的电话号码
};

/**
 * 设置电话
 * @returns
 */
function setPhone(phone){
	Charge.phone = phone;
	$("#telephone").val(phone);
}

/**
 * 获取被操作的电话
 * @returns
 */
function getPhone(){
	Charge.phone = $("#telephone").val();
	return Charge.phone;
}

/**
 * 清空电话历史记录
 * @returns
 */
function clearHisPhone(){
	var ajax = Feng.baseAjax("/charge/clearHisPhone","清空历史记录");
	ajax.start();
	window.location.href = Feng.ctxPath + "/charge";
}

/**
 * 修改手机号验证码
 * @param val
 * @returns
 */
function chPhoneVali(val){
	var phone = getPhone();
	var phoneVali = val;
	if(val == undefined){
		phoneVali = $("#phoneVali").val();
	}
	if(phone == "" || phoneVali == ""){
		Feng.error("请输入手机号或验证码！");
		return ;
	}else{
		var ajax = Feng.changeAjax("/charge/chPhoneVali");
		ajax.set("phone",phone);
		ajax.set("phoneVali",phoneVali);
		ajax.start();
	}
}

/**
 * 修改余额
 * @param val
 * @returns
 */
function chMoney(val){
	var phone = getPhone();
	var money = val;
	if(val == undefined){
		money = $("#money").val();
	}
	if(phone == "" || money == ""){
		Feng.error("请输入手机号或余额！");
		return ;
	}else{
		var ajax = Feng.changeAjax("/charge/chMoney");
		ajax.set("phone",phone);
		ajax.set("money",money);
		ajax.start();
	}
}

/**
 * 修改积分
 * @param val
 * @returns
 */
function chIntegral(val){
	var phone = getPhone();
	var integral = val;
	if(val == undefined){
		integral = $("#integral").val();
	}
	if(phone == "" || integral == ""){
		Feng.error("请输入手机号或积分！");
		return ;
	}else{
		var ajax = Feng.changeAjax("/charge/chIntegral");
		ajax.set("phone",phone);
		ajax.set("integral",integral);
		ajax.start();
	}
}

/**
 * 修改顺风车的状态
 * @param val
 * @returns
 */
function chWayCarAuth(val){
	var phone = getPhone();
	var status = val;
	if(phone == ""){
		Feng.error("请输入手机号！");
		return ;
	}else{
		var ajax = Feng.changeAjax("/charge/chWayCarAuth");
		ajax.set("phone",phone);
		ajax.set("status",status);
		ajax.start();
	}
}

/**
 * 修改出租车状态
 * @param val
 * @returns
 */
function chTaxiAuth(val){
	var phone = getPhone();
	var status = val;
	if(phone == ""){
		Feng.error("请输入手机号！");
		return ;
	}else{
		var ajax = Feng.changeAjax("/charge/chTaxiAuth");
		ajax.set("phone",phone);
		ajax.set("status",status);
		ajax.start();
	}
}

/**
 * 修改专车状态
 * @param val
 * @returns
 */
function chSpecialAuth(val){
	var phone = getPhone();
	var status = val;
	if(phone == ""){
		Feng.error("请输入手机号！");
		return ;
	}else{
		var ajax = Feng.changeAjax("/charge/chSpecialAuth");
		ajax.set("phone",phone);
		ajax.set("status",status);
		ajax.start();
	}
}

/**
 * 修改专车的车辆等级
 * @param val
 * @returns
 */
function chVehiLevel(val){
	var phone = getPhone();
	var level = val;
	if(phone == ""){
		Feng.error("请输入手机号！");
		return ;
	}else{
		var ajax = Feng.changeAjax("/charge/chVehiLevel");
		ajax.set("phone",phone);
		ajax.set("level",level);
		ajax.start();
	}
}