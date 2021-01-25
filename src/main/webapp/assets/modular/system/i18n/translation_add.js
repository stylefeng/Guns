/**
 * 添加或者修改页面
 */
var TranslationInfoDlg = {
    data: {
        tranCode: "",
        tranName: "",
        language: "",
        tranValue: "",
        createTime: "",
        createUser: "",
        updateTime: "",
        updateUser: ""
    }
};

layui.use(['form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;

    //让当前iframe弹层高度适应
    admin.iframeAuto();

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/i18n/add", 'post', function (data) {
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

        return false;
    });

});
