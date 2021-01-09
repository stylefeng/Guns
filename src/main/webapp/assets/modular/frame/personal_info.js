layui.use(['form', 'upload', 'element', 'HttpRequest', 'laydate'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var upload = layui.upload;
    var element = layui.element;
    var HttpRequest = layui.HttpRequest;
    var laydate = layui.laydate;

    //渲染时间选择框
    laydate.render({
        elem: '#birthday'
    });

    //获取用户详情
    var request = new HttpRequest(Feng.ctxPath + "/sysUser/currentUserInfo", 'get');
    var result = request.start();

    //用这个方法必须用在class有layui-form的元素上
    form.val('userInfoForm', result.data);

    //表单提交事件
    form.on('submit(userInfoSubmit)', function (data) {
        var updateUserInfoRequest = new HttpRequest(Feng.ctxPath + "/sysUser/updateInfo", 'post', function (data) {
            Feng.success("修改成功!");
        }, function (response) {
            Feng.error("修改失败!" + response.message + "!");
        });
        updateUserInfoRequest.set(data.field);
        updateUserInfoRequest.start(true);
    });

    upload.render({
        elem: '#imgHead'
        , url: Feng.ctxPath + '/sysFileInfo/upload?secretFlag=Y'
        , before: function (obj) {
            obj.preview(function (index, file, result) {
                $('#avatarPreview').attr('src', result);
            });
        }
        , done: function (res) {
            var updateAvatarRequest = new HttpRequest(Feng.ctxPath + "/sysUser/updateAvatar", 'post', function (data) {
                Feng.success("更新头像成功!");
            }, function (data) {
                Feng.error("更新头像失败!" + data.message + "!");
            });
            updateAvatarRequest.set("avatar", res.data.fileId);
            updateAvatarRequest.start(true);
        }
        , error: function () {
            Feng.error("更新头像失败！");
        }
    });
});
