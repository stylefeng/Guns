layui.use(['form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    //获取详情信息，填充表单
	var request = new HttpRequest(Feng.ctxPath + "/dictType/getDictDetail?dictTypeId=" + Feng.getUrlParam("dictTypeId"), 'get', function (result) {
		if(result.data.dictTypeClass === 2){
			$('input,select,textarea').attr("disabled",true).attr('readonly',true);
		}
		form.val('dictTypeForm', result.data);
	}, function (data) {
		Feng.error("添加失败！" + data.message);
	});
	request.start();

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/dictType/updateDictType", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("更新成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("更新失败！" + data.message);
        });

        request.set(data.field);
        request.start(true);
    
    });
	
	// 编码类型切换事件
	form.on('radio(dictTypeClass)', function (data) {
		if ($('input[name="dictTypeClass"]:checked').val() === '1') {
			$('#dictTypeBusCode').parents('.layui-inline').show();
		} else {
			$('#dictTypeBusCode').parents('.layui-inline').hide();
			$('#dictTypeBusCode').val('');
		}
		form.render();
	});

});