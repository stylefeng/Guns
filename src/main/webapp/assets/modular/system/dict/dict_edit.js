layui.use(['form', 'admin', 'HttpRequest'], function () {
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    //获取详情信息，填充表单
	var request = new HttpRequest(Feng.ctxPath + "/dict/detail?dictId=" + Feng.getUrlParam("dictId"), 'get');
    var result = request.start();
    form.val('dictForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/dict/edit", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("修改成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("修改失败！" + data.message);
        });

        request.set(data.field);
        request.start(true);

        return false;
    });


});
