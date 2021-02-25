/**
 * 角色详情对话框
 */
layui.use(['form', 'admin', 'HttpRequest', 'gunsSelect'], function () {
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var gunsSelect = layui.gunsSelect;

    // 角色类型
    gunsSelect.render({
        url: Feng.ctxPath + '/dict/list',
        elem: '#roleTypeCode',
        fields: {name: 'dictName', value: 'dictCode'},
        where: {dictTypeCode: 'role_type'}
    });

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/sysRole/add", 'post', function (data) {
            Feng.success("添加成功！");

            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);

            //关掉对话框
            admin.closeThisDialog();

        }, function (data) {
            Feng.error("添加失败！" + data.message)
        });
        request.set(data.field);
        request.start(true);

        //添加 return false 可成功跳转页面
        return false;
    });

});
