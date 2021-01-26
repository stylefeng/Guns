layui.use(['form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;

    //获取详情信息，填充表单
    var request = new HttpRequest(Feng.ctxPath + "/i18n/detail?tranId=" + Feng.getUrlParam("tranId"), 'get');
    var result = request.start();
    form.val('translationForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var editRequest = new HttpRequest(Feng.ctxPath + "/i18n/edit", 'post', function (data) {
            Feng.success("更新成功！");
            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);
            //关掉对话框
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("更新失败！" + data.message)
        });
        editRequest.set(data.field);
        editRequest.start(true);
        return false;
    });

});
