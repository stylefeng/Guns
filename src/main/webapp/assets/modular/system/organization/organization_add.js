layui.use(['form', 'admin', 'HttpRequest', 'xmSelect'], function () {
    var $ = layui.$;
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;
    var xmSelect = layui.xmSelect;
    var insXmSel;

    /* 渲染树形 */
    function renderTree() {
        $.get(Feng.ctxPath + '/hrOrganization/treeLayui', function (data) {
            insXmSel = xmSelect.render({
                el: '#organizationEditParentSel',
                height: '250px',
                data: data.data,
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
        });
    }

    renderTree();

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        //获取机构id
        data.field.orgParentId = insXmSel.getValue('valueStr');
        var request = new HttpRequest(Feng.ctxPath + "/hrOrganization/add", 'post', function (data) {
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