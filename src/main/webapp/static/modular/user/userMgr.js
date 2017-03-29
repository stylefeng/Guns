
/**
 * 用户管理的表格
 */
var UserTable = {
	me : ""
};

/**
 * 初始化整个表格
 */
UserTable.init = function(){
	var defaultColunms = this.initColumn();
	var bstable = new BSTable("userTable","/user/list",defaultColunms);
	this.me = bstable.init();
}

/**
 * 初始化表格的列
 */
UserTable.initColumn = function(){
	var columns = [  
		{field: 'selectItem',radio:true},     
        {title: 'id',field: 'uid', visible: false, align: 'center',valign: 'middle'},
        {title: '姓名',field: 'nickName',align: 'center',valign: 'middle'},   
        {title: '性别',field: 'sex',align: 'center',valign: 'middle',
            formatter:function(value,row,index){
	            if(value == "1"){
	            	return "男";
	            }else if(value == "2"){
	            	return "女";
	            }
            }},   
        {title: '手机号',field: 'tellphone',align: 'center',valign: 'middle'},   
        {title: '角色',field: 'userRole',align: 'center',valign: 'middle',
            formatter:function(value,row,index){
	            if(value == "1"){
	            	return "车主";
	            }else if(value == "2"){
	            	return "乘客";
	            }
            }
        },   
        {title: '状态',field: 'userStatus',align: 'center',valign: 'middle',
            formatter:function(value,row,index){
	            if(value == "1"){
	            	return "登录中";
	            }else if(value == "2"){
	            	return "退出";
	            }else if(value == "3"){
	            	return "锁定";
	            }
            }},   
        {title: '注册时间',field: 'createTime',align: 'center',valign: 'middle'},   
        {title: '认证通过时间',field: 'throughTime',align: 'center',valign: 'middle'},   
        {title: '搭乘次数',field: 'dcount',align: 'center',valign: 'middle'},   
        {title: '搭乘总支出',field: 'dsum',align: 'center',valign: 'middle'},   
        {title: '接乘次数',field: 'jcount',align: 'center',valign: 'middle'},   
        {title: '接乘总收入',field: 'jsum',align: 'center',valign: 'middle'},
        {title: '手机类型',field: 'loginEquipment',align: 'center',valign: 'middle',
            formatter:function(value,row,index){
	            if(value == "1"){
	            	return "IOS";
	            }else if(value == "2"){
	            	return "Android";
	            }
            }},   
        {title: '用户版本号',field: 'clientVersion',align: 'center',valign: 'middle'},   
        {title: '用户当前城市',field: 'currentCity',align: 'center',valign: 'middle'},   
        {title: '操作',field: '#',align: 'center',
            formatter:function(value,row,index){
                var e = '<a href="#" mce_href="#" onclick="editUserBtn(\''+ row.uid + '\')">编辑</a> &nbsp;&nbsp;';
                var f = '<a href="#" mce_href="#" onclick="freezeUser(\''+ row.uid + '\')">停用</a> &nbsp;&nbsp;';
                var unf = '<a href="#" mce_href="#" onclick="unFreezeUser(\''+ row.uid + '\')">恢复</a> ';
                return e+f+unf;
            }
        }];
	return columns;
}

/**
 * 冻结某个用户
 * @param uid 用户的id
 * @returns
 */
function freezeUser(uid){
	var ajax = new $ax(Feng.ctxPath + "/user/freeze/" + uid, function(data){
		Feng.success("冻结成功!");
		UserTable.me.refresh();
	},function(data){
		Feng.error("冻结用户失败!");
	});
	ajax.start();
}

/**
 * 解除冻结某个用户
 * @param uid 用户的id
 * @returns
 */
function unFreezeUser(uid){
	var ajax = new $ax(Feng.ctxPath + "/user/unFreeze/" + uid, function(data){
		Feng.success("解除冻结成功!");
		UserTable.me.refresh();
	},function(data){
		Feng.error("解除冻结失败!");
	});
	ajax.start();
}

/**
 * 点击搜索按钮
 * @returns
 */
function clickSearch(){
	var queryData = {};
	
	queryData['userRole'] = $("#roleHide").val();
	queryData['searchValue'] = $("#searchValue").val();
	queryData['beginTime'] = $("#beginTime").val();
	queryData['endTime'] = $("#endTime").val();
	
	UserTable.me.refresh({query: queryData});
}

/**
 * 修改用户角色
 * @param val 角色的名称
 * @param key 角色的数字值
 */
function changeRole(val,key){
	$("#roleValue").html(val);
	$("#roleHide").val(key);
}

/**
 * 点击添加按钮时，跳出添加用户对话框
 * @returns
 */
function clickAddBtn(){
	var index = layer.open({
	    type: 1,
	    title: '添加用户',
	    skin: 'layui-layer-rim', //加上边框
	    area: [UserInfoDialog.width, UserInfoDialog.height], //宽高
	    content: UserInfoDialog.cache,
	    success: function(layero, index){
	    	UserInfoDialog.renderAdd();
	    }
	});
	UserInfoDialog.currentLayerIndex = index;
}

/**
 * 点击编辑按钮时，跳出用户详情对话框
 * @returns
 */
function editUserBtn(uid){
	var index = layer.open({
	    type: 1,
	    title: '用户详情',
	    skin: 'layui-layer-rim',
	    area: [UserInfoDialog.width, UserInfoDialog.height], 
	    content: UserInfoDialog.cache,
	    success: function(layero, index){
	    	UserInfoDialog.load(uid);
	    }
	});
	UserInfoDialog.currentLayerIndex = index;
}

/**
 * 点击统计按钮时，跳出用户统计对话框
 * @returns
 */
function clickStatBtn(){
	alert(456);
}

$(function(){
	
	//初始化用户管理表格
	UserTable.init();
	
	//初始化添加用户和编辑用户对话框
	UserInfoDialog.init();
});
