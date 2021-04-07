layui.use(['form', 'admin', 'HttpRequest', 'xmSelect'], function () {
    var $ = layui.$;
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;
    var xmSelect = layui.xmSelect;
    var organizationXmSel;

    //获取信息详情填充表单
    var request = new HttpRequest(Feng.ctxPath + "/hrOrganization/detail?orgId=" + Feng.getUrlParam("orgId"), 'get');
    var result = request.start();

    form.val('organizationForm', result.data);

    // 初始化组织树
    new HttpRequest(Feng.ctxPath + "/hrOrganization/tree", 'get', function (data) {
        organizationXmSel = xmSelect.render({
            el: '#organization',
            data: data.data,
            initValue: [result.data.orgParentId],
            layVerify: 'required',
            model: {label: {type: 'text'}},
            prop: {name: 'title', value: 'id'},
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

    var pId = organizationXmSel.getValue('valueStr');
    if (!pId) {
        $("#parentId").remove();
    }

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        //获取机构id
        if (!pId) {
            data.field.orgParentId = "-1";
        }else {
            data.field.orgParentId = organizationXmSel.getValue('valueStr');
        }
        var orgId = $("[name = 'orgId']").val();
        if (orgId == data.field.orgParentId) {
            return Feng.error("不能选择本机构作为上级机构！");
        }
        var request = new HttpRequest(Feng.ctxPath + "/hrOrganization/edit", 'post', function (data) {
            admin.closeThisDialog();
            Feng.success("修改成功!");
            admin.putTempData('formOk', true);
        }, function (data) {
            admin.closeThisDialog();
            Feng.error("修改失败!" + data.message);
        });
        request.set(data.field);
        request.start(true);
    });
});
