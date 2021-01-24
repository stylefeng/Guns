/**
 * 添加菜单按钮
 */
layui.use(['form', 'admin', 'HttpRequest'], function () {
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    // 菜单id赋值
    var menuId = Feng.getUrlParam("menuId");
    form.val("menuButtonForm", {
        "menuId": menuId
    })

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/sysMenuButton/add", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("添加成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("添加失败！" + data.message);
        });
        request.set(data.field);
        request.start(true);
    });

});
