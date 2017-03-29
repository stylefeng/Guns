/**
 * 初始化表格的列
 */
function initColumn(){
	var columns = [  
		{field: 'selectItem',radio:true},     
        {title: 'id',field: 'userId', visible: false, align: 'center',valign: 'middle'},     
        {title: '姓名',field: 'userName',align: 'center',valign: 'middle'},   
        {title: '账号',field: 'userNo',align: 'center',valign: 'middle'},   
        {title: '角色',field: 'userRole',align: 'center',valign: 'middle',
            formatter:function(value,row,index){
	            if(value == "1"){
	            	return "超级管理员";
	            }else if(value == "2"){
	            	return "管理员";
	            }else{
	            	return "其他";
	            }
            }
        },
        {title: '用户状态',field: 'userStatus',align: 'center',valign: 'middle',
            formatter:function(value,row,index){
	            if(value == 1){
	            	return "登录中";
	            }else if(value == 2){
	            	return "已退出";
	            }else{
	            	return "冻结";
	            }
            }
	    },
        {title: '创建时间',field: 'createTime',align: 'center',valign: 'middle'},   
        {title: '上次登录时间',field: 'loginTime',align: 'center',valign: 'middle'},   
        {title: '操作',field: '#',align: 'center',
            formatter:function(value,row,index){
                var e = '<a href="#" mce_href="#" onclick="editManagerInfo(\''+ row.userId + '\')">编辑</a> &nbsp;&nbsp;';
                var f = '<a href="#" mce_href="#" onclick="freezeAccount(\''+ row.userId + '\')">停用</a> &nbsp;&nbsp;';
                var unf = '<a href="#" mce_href="#" onclick="unFreezeAccount(\''+ row.userId + '\')">恢复</a> ';
                return e+f+unf;
            }
        }];
	return columns;
}

/**
 * 点击编辑按钮时
 * @param userId
 */
function editManagerInfo(userId){
	console.log("userId=" + userId);
}

/**
 * 点击添加管理员
 */
function addManager(){
	parent.layer.open({
	    type: 2,
	    title: false,
	    closeBtn: false,
	    shade: [0],
	    area: ['340px', '215px'],
	    offset: 'rb', //右下角弹出
	    time: 2000, //2秒后自动关闭
	    shift: 2,
	    content: ['http://www.zi-han.net', 'no'], //iframe的url，no代表不显示滚动条
	    end: function(){ //此处用于演示
	        parent.layer.open({
	            type: 2,
	            title: '很多时候，我们想最大化看，比如像这个页面。',
	            shadeClose: true,
	            shade: false,
	            maxmin: true, //开启最大化最小化按钮
	            area: ['1150px', '650px'],
	            content: 'http://www.zi-han.net'
	        });
	    }
	});
}

/**
 * 冻结用户账户
 * @param userId
 */
function freezeAccount(userId){
	parent.layer.confirm('您确定要停用该账户吗？', {
	    btn: ['确定','取消'],
	    shade: false //不显示遮罩
	}, function(){
		var ajax = new $ax(Feng.ctxPath + "/sys/freeze/" + userId+"", function(data){
			parent.layer.msg('停用成功', {icon: 1});
			$('#managerTable').bootstrapTable('refresh');
		},function(data){
			parent.layer.msg('停用失败!', {icon: 2});
		});
		ajax.start();
	});
}

/**
 * 解除冻结用户账户
 * @param userId
 */
function unFreezeAccount(userId){
	parent.layer.confirm('您确定要恢复该账户吗？', {
	    btn: ['确定','取消'],
	    shade: false //不显示遮罩
	}, function(){
		var ajax = new $ax(Feng.ctxPath + "/sys/unfreeze/" + userId, function(data){
			parent.layer.msg('恢复成功', {icon: 1});
			$('#managerTable').bootstrapTable('refresh');
		},function(data){
			parent.layer.msg('恢复失败', {icon: 2});
		});
		ajax.start();
	});
}

(function(document, window, $) {
	
	var defaultColunms = initColumn();
	
	// 管理员列表的表格
	(function() {
		$('#managerTable').bootstrapTable({
			url : Feng.ctxPath + "/sys/members",
			method : "post",
			search : true,
			selectItemName : "selectItem",
			clickToSelect : true,
			pagination : true,
			sidePagination : "client",
			showRefresh : true,
			showColumns : true,
			iconSize : 'outline',
			toolbar : '#managerTableToolbar',
			icons : {
				refresh : 'glyphicon-repeat',
				toggle : 'glyphicon-list-alt',
				columns : 'glyphicon-list'
			},
			height : 620,
			columns: defaultColunms
		});
	})();
})(document, window, jQuery);
