/**
 * 定义用户详情对话框的单例，可初始化为添加用户对话框，还可以初始化为编辑用户对话框
 */
var UserInfoDialog = {
	width : '800px',
	height : '600px',
	currentLayerIndex : -1,
	cache :　"",
	userInfoData : {}
};

/**
 * 初始化用户详情对话框
 */
UserInfoDialog.init = function() {
	// 设置缓存
	this.cache = $("#userInfoDialog").html();
	
	// 清空对话框的内容，每次用的时候从this.cache中提取html
	$("#userInfoDialog").html('');
};

/**
 * 设置对话框中的数据
 * 
 * @param key
 *            数据的名称
 * @param val
 *            数据的具体值
 */
UserInfoDialog.set = function(key,val) {
	this.userInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
	return this;
}

/**
 * 设置对话框中的数据
 * 
 * @param key
 *            数据的名称
 * @param val
 *            数据的具体值
 */
UserInfoDialog.get = function(key) {
	return $("#" + key).val();
}

/**
 * 隐藏车辆信息部分
 */
UserInfoDialog.hideDriverInfo = function() {
	$("#driverInfoContent").addClass('hidden');
}

/**
 * 显示车辆信息部分
 */
UserInfoDialog.showDriverInfo = function() {
	$("#driverInfoContent").removeClass('hidden');
}

/**
 * 关闭对话框
 */
UserInfoDialog.close = function() {
	layer.close(this.currentLayerIndex);
}

/**
 * 采集用户填的数据并提交到服务器
 */
UserInfoDialog.collectAndPost = function() {
	this.set("userAvatar").set("nickName").set("userName").set("sex").set("origin").set("occupation").set("userRole")
		.set("homeAddress").set("homeLongitude").set("homeLatitude").set("companyAddress").set("companyLongitude")
		.set("companyLatitude").set("userRole").set("vehicleImage").set("xszImage").set("jszImage")
		.set("lisencePlate").set("vehicleColor").set("registrationType");
	var ajax = new $ax(Feng.ctxPath + "/user/add", function(data){
		Feng.success("添加成功!");
		UserInfoDialog.close();
	},function(data){
		Feng.error("添加失败!" + data.responseJSON.message + "!");
	});
	ajax.set(this.userInfoData);
	ajax.start();
}

/**
 * 把用户信息对话框加载数据
 */
UserInfoDialog.load = function(userId) {
	var ajax = new $ax(Feng.ctxPath + "/user/userDetail", function(data){
		
	},function(data){
		Feng.error("加载用户信息失败!");
	});
	ajax.set("userId",userId);
	ajax.start();
}

/**
 * 生成一个添加用户对话框
 */
UserInfoDialog.renderAdd = function() {
	
	var me = this;
	
	// 绑定是否成为车主复选框的时间,事件应该在插件初始化之前绑定
	$('#beDriver').on('ifChecked', function(event) {
		UserInfoDialog.showDriverInfo();
	});
	$('#beDriver').on('ifUnchecked', function(event) {
		UserInfoDialog.hideDriverInfo();
	});

	// 点击确定时
	$('#ensure').on('click', function(event) {
		me.collectAndPost();
	});

	// 点击取消时
	$('#cancel').on('click', function(event) {
		UserInfoDialog.close();
	});

	// 美化复选框
	$('#beDriver').iCheck({
		checkboxClass : 'icheckbox_square-green',
		radioClass : 'iradio_square-green',
	});

	// 默认不选中成为车主
	$('#beDriver').iCheck('check');
	UserInfoDialog.showDriverInfo();

	// 初始化头像上传
	var avatarUp = new $WebUpload("userAvatar");
	avatarUp.init();

	// 初始化车辆图片上传
	var vehicleImage = new $WebUpload("vehicleImage");
	vehicleImage.init();

	// 初始化行驶本上传
	var xszImage = new $WebUpload("xszImage");
	xszImage.init();

	// 初始化驾驶证上传
	var jszImage = new $WebUpload("jszImage");
	jszImage.init();

}

/**
 * 初始化一个编辑用户详情界面
 */
UserInfoDialog.renderEdit = function() {
	var me = this;

	// 点击确定时
	$('#ensure').on('click', function(event) {
	});

	// 点击取消时
	$('#cancel').on('click', function(event) {
		UserInfoDialog.close();
	});

	// 美化复选框
	$('#beDriver').iCheck({
		checkboxClass : 'icheckbox_square-green',
		radioClass : 'iradio_square-green',
	});

	// 默认不选中成为车主
	$('#beDriver').iCheck('check');
	UserInfoDialog.showDriverInfo();
}