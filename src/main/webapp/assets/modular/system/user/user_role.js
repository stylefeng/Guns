layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest', 'xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var xmSelect = layui.xmSelect;
    var roleXmSel;

    //获取信息详情填充表单
    var request = new HttpRequest(Feng.ctxPath + "/sysUser/detail?userId=" + Feng.getUrlParam("userId"), 'get');
    var result = request.start();
    form.val('userForm', result.data);

    // 初始化角色
    new HttpRequest(Feng.ctxPath + "/sysRole/dropDown", 'get', function (data) {
        roleXmSel = xmSelect.render({
            el: '#role',
            toolbar: {show: true},
            layVerify: 'required',
            initValue: result.data.grantRoleIdList,
            data: data.data,
            prop: {name: 'name', value: 'id'},
        });
    }).start();

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        // 角色ids
        data.field.grantRoleIdList = roleXmSel.getValue('value');
        data.field.userId = Feng.getUrlParam("userId");

        var request = new HttpRequest(Feng.ctxPath + "/sysUser/grantRole", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("授权成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("授权失败！" + data.message);
        });
        request.set(data.field);
        request.start(true);
    });
});