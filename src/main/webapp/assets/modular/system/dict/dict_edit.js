/**
 * 详情对话框
 */
var DictInfoDlg = {
    data: {
        dictTypeId: "",
        code: "",
        name: "",
        parentId: "",
        status: "",
        description: "",
        createTime: "",
        updateTime: "",
        createUser: "",
        updateUser: ""
    }
};

layui.use(['form', 'ax'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;

    //获取详情信息，填充表单
    var ajax = new $ax(Feng.ctxPath + "/dict/detail?dictId=" + Feng.getUrlParam("dictId"));
    var result = ajax.start();
    form.val('dictForm', result.data);

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/dict/editItem", function (data) {
            Feng.success("更新成功！");
            window.location.href = Feng.ctxPath + "/dict?dictTypeId=" + $("#dictTypeId").val();
        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();
        return false;
    });

    //返回按钮
    $("#backupPage").click(function () {
        window.location.href = Feng.ctxPath + "/dict?dictTypeId=" + $("#dictTypeId").val();
    });

    //父级字典时
    $('#parentName').click(function () {
        var formName = encodeURIComponent("parent.DictInfoDlg.data.parentName");
        var formId = encodeURIComponent("parent.DictInfoDlg.data.parentId");
        var treeUrl = encodeURIComponent("/dict/ztree?dictTypeId=" + $("#dictTypeId").val() + "&dictId=" + $("#dictId").val());

        layer.open({
            type: 2,
            title: '父级字典',
            area: ['300px', '400px'],
            content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#parentId").val(DictInfoDlg.data.parentId);
                $("#parentName").val(DictInfoDlg.data.parentName);
            }
        });
    });
});