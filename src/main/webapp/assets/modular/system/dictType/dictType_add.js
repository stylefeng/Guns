/**
 * 详情对话框
 */
var DictTypeInfoDlg = {
    data: {
        systemFlag: "",
        code: "",
        name: "",
        description: "",
        status: "",
        createTime: "",
        createUser: "",
        updateTime: "",
        updateUser: ""
    }
};

layui.use(['form', 'ax'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/dictType/addItem", function (data) {
            Feng.success("添加成功！");
            window.location.href = Feng.ctxPath + "/dictType";
        }, function (data) {
            Feng.error("添加失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        return false;
    });

    //返回按钮
    $("#backupPage").click(function () {
        window.location.href = Feng.ctxPath + "/dictType";
    });
});