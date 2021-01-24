layui.use(['layer', 'form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    // 让当前iframe弹层高度适应
    admin.iframeAuto();

    // 监听提交
    form.on('submit(submit-psw)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/sysUser/updatePassword", 'post', function (data) {
            Feng.success("修改成功!");
            admin.closeThisDialog();
        }, function (response) {
            Feng.dialog("修改失败", response.message);
        });
        request.set(data.field);
        request.start(true);

        //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        return false;
    });

    // 添加表单验证方法
    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repsw: function (t) {
            if (t !== $('#form-psw input[name=newPassword]').val()) {
                return '两次密码输入不一致';
            }
        }
    });
});