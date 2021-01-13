/**
 * 详情对话框
 */
var DictInfoDlg = {
    data: {
        dictParentId: "-1",
		parentName: "顶级"
    }
};

layui.use(['form', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var form = layui.form;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
		var request = new HttpRequest(Feng.ctxPath + "/dict/addDict", 'post', function (data) {
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

    //父级字典时
    $('#parentName').click(function () {
        var formName = encodeURIComponent("parent.DictInfoDlg.data.parentName");
        var formId = encodeURIComponent("parent.DictInfoDlg.data.dictParentId");
        var treeUrl = encodeURIComponent("/dict/zTree?dictTypeCode=" + $("#dictTypeCode").val());

        layer.open({
            type: 2,
            title: '父级字典',
            area: ['300px', '400px'],
            content: Feng.ctxPath + '/view/common/tree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#dictParentId").val(DictInfoDlg.data.dictParentId);
                $("#parentName").val(DictInfoDlg.data.parentName);
            }
        });
    });
});