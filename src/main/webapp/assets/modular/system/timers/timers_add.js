layui.use(['form', 'admin', 'HttpRequest'], function () {
    let $ = layui.$;
    let form = layui.form;
    let admin = layui.admin;
    let HttpRequest = layui.HttpRequest;

    // 正则不全-弃用
    form.verify({
        corn: function (value, item) {
            // corn 正则验证
            let cornRegEx = '/^[^\\s]*\\s[^\\s]*\\s[^\\s]*\\s((\\*|(1[0-2]|[0-9])|(1[0-2]|[0-9])-(1[0-2]|[0-9]))(\\/(1[0-2]|[0-9]))*|(((1[0-2]|[0-9])|(1[0-2]|[0-9])-(1[0-2]|[0-9]))+(,((1[0-2]|[0-9])|(1[0-2]|[0-9])-(1[0-2]|[0-9])))*)|(((jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))))\\s[^\\s]*$/i\n';
            if (value == "") {
                return 'corn表达式不能为空';
            }
            if (!new RegExp(cornRegEx).test(value)) {
                return 'corn表达式错误';
            }
        }
    });

    // 渲染任务job class实现类
    $.ajax({
        url: Feng.ctxPath + '/sysTimers/getActionClasses',
        dataType: 'json',
        type: 'post',
        success: function (data) {
            //使用循环遍历，给下拉列表赋值
            $.each(data.data, function (index, value) {
                $('#actionClass').append(new Option(value, value));// 下拉菜单里添加元素
            });
            layui.form.render("select");//重新渲染 固定写法
        }
    })

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        let request = new HttpRequest(Feng.ctxPath + "/sysTimers/add", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("添加成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("添加失败！" + data.message);
        });
        request.set(data.field);
        request.start(true);
    });
});