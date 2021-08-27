/**
 * 添加应用
 */
layui.use(['form', 'admin', 'HttpRequest', 'iconPicker'], function () {
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;
    var iconPicker = layui.iconPicker;

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/sysApp/add", 'post', function (data) {
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

    //初始化图标选择
    iconPicker.render({
        elem: '#appIcon',
        type: 'fontClass',
        search: true,
        page: true,
        limit: 12,
        click: function (data) {
        }
    });

});
