/**
 * 详情对话框
 */
var PositionInfoDlg = {
    data: {
        name: "",
        code: "",
        sort: "",
        status: "",
        remark: "",
        createTime: "",
        updateUser: "",
        updateTime: "",
        createUser: ""
    }
};

layui.use(['form', 'admin', 'ax', 'ajaxUtil'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var ajaxUtil = layui.ajaxUtil;
    //获取详情信息，填充表单

    ajaxUtil.get("/hrPosition/detail?positionId=" + Feng.getUrlParam("positionId"), function (res) {
        form.val('positionForm', res.data);
    }, function (res) {
        admin.closeThisDialog();
        Feng.error("编辑异常！" + res.responseJSON.message);
    });

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        ajaxUtil.post(Feng.ctxPath + "/hrPosition/edit", JSON.stringify(data.field), function (res) {
            Feng.success("修改成功!");
            admin.putTempData('formOk', true);
            admin.closeThisDialog();
        }, function (res) {
            admin.closeThisDialog();
            Feng.error("修改失败!" + res.responseJSON.message);
        });
    });
});