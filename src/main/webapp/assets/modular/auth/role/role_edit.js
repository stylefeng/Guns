/**
 * 角色详情对话框
 */
layui.use(['form', 'admin', 'HttpRequest'], function () {
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;

    //初始化角色的详情数据
    var detailRequest = new HttpRequest(Feng.ctxPath + "/sysRole/detail?roleId=" + Feng.getUrlParam("roleId"), 'get');
    var result = detailRequest.start();
    form.val('roleForm', result.data);

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/sysRole/edit", 'post', function (data) {
            Feng.success("修改成功!");

            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);

            //关掉对话框
            admin.closeThisDialog();

        }, function (data) {
            Feng.error("修改失败!" + data.message + "!");
        });
        request.set(data.field);
        request.start(true);

        //添加 return false 可成功跳转页面
        return false;
    });

});
