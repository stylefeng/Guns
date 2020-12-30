/**
 * 添加或者修改页面
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

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        ajaxUtil.post(Feng.ctxPath + "/hrPosition/add", JSON.stringify(data.field), function (res) {
            admin.closeThisDialog();
            Feng.success("添加成功！");
            admin.putTempData('formOk', true);

        }, function (res) {
            admin.closeThisDialog();
            Feng.error("添加失败！" + res.responseJSON.message);
        });
    });
});