layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest', 'xmSelect'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var laydate = layui.laydate;
    var xmSelect = layui.xmSelect;
    var organizationXmSel;
    var positionXmSel;

    // 初始化组织树
    new HttpRequest(Feng.ctxPath + "/hrOrganization/tree", 'get', function (data) {
        organizationXmSel = xmSelect.render({
            el: '#organization',
            data: data.data,
            model: {label: {type: 'text'}},
            radio: true,
            layVerify: 'required',
            clickClose: true,
            tree: {
                show: true,
                indent: 15,
                strict: false,
                expandedKeys: true
            }
        });
    }).start();

    // 初始化职位
    new HttpRequest(Feng.ctxPath + "/hrPosition/list", 'get', function (data) {
        positionXmSel = xmSelect.render({
            el: '#position',
            radio: true,
            clickClose: true,
            data: data.data
        });
    }).start();

    // 渲染时间选择框
    laydate.render({
        elem: '#birthday'
    });

    // 添加表单验证方法
    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repsw: function (value) {
            if (value !== $('#userForm input[name=password]').val()) {
                return '两次密码输入不一致';
            }
        }
    });

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {

        // 获取机构id
        data.field.orgId = organizationXmSel.getValue('valueStr');
        // 职位id
        data.field.positionId = positionXmSel.getValue('valueStr');

        var request = new HttpRequest(Feng.ctxPath + "/sysUser/add", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("添加成功！");
            admin.putTempData('formOk', true);
        }, function (data) {
            Feng.error("添加失败！" + data.message);
        });
        request.set(data.field);
        request.start(true);
        return false;
    });
});
