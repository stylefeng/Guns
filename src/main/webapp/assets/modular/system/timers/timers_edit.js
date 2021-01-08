layui.use(['form', 'admin', 'HttpRequest'], function () {
    let $ = layui.$;
    let form = layui.form;
    let admin = layui.admin;
    let HttpRequest = layui.HttpRequest;
    //获取详情信息，填充表单


    //获取用户详情
    let request = new HttpRequest(Feng.ctxPath + "/sysTimers/detail?timerId=" + Feng.getUrlParam("timerId"), 'get');
    let result = request.start();
    // 处理下拉框回显
    let actionClass = result.data.actionClass;
    $('#actionClass').append(new Option(actionClass, actionClass));

    // 渲染任务job class实现类下拉框
    $.ajax({
        url: Feng.ctxPath + '/sysTimers/getActionClasses',
        dataType: 'json',
        type: 'post',
        success: function (data) {
            //使用循环遍历，给下拉列表赋值
            $.each(data.data, function (index, value) {
                if (actionClass != value) {
                    $('#actionClass').append(new Option(value, value));
                }
            });
            layui.form.render("select");
        }
    })


    form.val('positionForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        let request = new HttpRequest(Feng.ctxPath + "/sysTimers/edit", 'post', function (data) {
            Feng.success("修改成功!");
            admin.putTempData('formOk', true);
            admin.closeThisDialog();
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("修改失败!" + data.message);
        });
        request.set(data.field);
        request.start(true);
    });
});