layui.use(['form', 'admin', 'ajaxUtil'], function () {
    var form = layui.form;
    var admin = layui.admin;
    var ajaxUtil = layui.ajaxUtil;
    //获取详情信息，填充表单

    ajaxUtil.get("/hrOrganization/detail?orgId=" + Feng.getUrlParam("positionId"), function (res) {
        form.val('positionForm', res.data);
    }, function (res) {
        admin.closeThisDialog();
        Feng.error("编辑异常！" + res.responseJSON.message);
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        ajaxUtil.post(Feng.ctxPath + "/hrOrganization/edit", data.field, function (res) {
            Feng.success("修改成功!");
            admin.putTempData('formOk', true);
            admin.closeThisDialog();
        }, function (res) {
            admin.closeThisDialog();
            Feng.error("修改失败!" + res.responseJSON.message);
        });
    });
});