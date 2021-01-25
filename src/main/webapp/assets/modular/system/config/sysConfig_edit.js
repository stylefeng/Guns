layui.use(['form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    // 获取详情信息，填充表单
    var httpRequest = new HttpRequest(Feng.ctxPath + "/sysConfig/detail?configId=" + Feng.getUrlParam("configId"), 'get');
    var result = httpRequest.start();
    form.val('sysConfigForm', result.data);


    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {

        var httpRequest = new HttpRequest(Feng.ctxPath + "/sysConfig/edit", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("修改成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("修改失败！" + data.message)
        });
        httpRequest.set(data.field);
        httpRequest.start(true);
    });

});
