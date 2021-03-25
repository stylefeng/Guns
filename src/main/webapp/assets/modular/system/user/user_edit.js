layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest', 'xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect;
    var organizationXmSel;
    var positionXmSel;

    //获取信息详情填充表单
    var request = new HttpRequest(Feng.ctxPath + "/sysUser/detail?userId=" + Feng.getUrlParam("userId"), 'get');
    var result = request.start();
    form.val('userForm', result.data);

    // 初始化职位
    new HttpRequest(Feng.ctxPath + "/hrPosition/list", 'get', function (data) {
        let positionId = result.data.positionId;
        if (positionId) {
            positionXmSel = xmSelect.render({
                el: '#position',
                radio: true,
                clickClose: true,
                data: data.data,
                initValue: [positionId]
            });
        } else {
            positionXmSel = xmSelect.render({
                el: '#position',
                radio: true,
                clickClose: true,
                data: data.data,
            });
        }

    }).start();

    // 初始化组织树
    new HttpRequest(Feng.ctxPath + "/hrOrganization/tree", 'get', function (data) {
        organizationXmSel = xmSelect.render({
            el: '#organization',
            data: data.data,
            initValue: [result.data.orgId],
            layVerify: 'required',
            model: {label: {type: 'text'}},
            radio: true,
            clickClose: true,
            tree: {
                show: true,
                indent: 15,
                strict: false,
                expandedKeys: true
            }
        });
    }).start();

    // 添加表单验证方法
    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repsw: function (value) {
            if (value !== $('#userForm input[name=password]').val()) {
                return '两次密码输入不一致';
            }
        }
    });

    // 渲染时间选择框
    laydate.render({
        elem: '#birthday'
    });

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        // 获取机构id
        data.field.orgId = organizationXmSel.getValue('valueStr');
        // 职位id
        data.field.positionId = positionXmSel.getValue('valueStr');

        var request = new HttpRequest(Feng.ctxPath + "/sysUser/edit", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("修改成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            Feng.error("修改失败！" + data.message);
        });
        request.set(data.field);
        request.start(true);
        return false;
    });


});
