layui.use(['form', 'admin', 'HttpRequest'], function () {
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    //获取信息详情填充表单
    var request = new HttpRequest(Feng.ctxPath + "/hrPosition/detail?positionId=" + Feng.getUrlParam("positionId"), 'get');
    var result = request.start();
    form.val('positionForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/hrPosition/edit", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("修改成功!");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("修改失败!" + data.message);
        });
        request.set(data.field);
        request.start(true);
    });
});