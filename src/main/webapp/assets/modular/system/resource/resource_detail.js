/**
 * 详情对话框
 */
var ResourceInfoDlg = {
    data: {
        resourceParentId: "",
        resourceParentName: ""
    }
};

layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest', 'iconPicker'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;

    //获取菜单信息
    var request = new HttpRequest(Feng.ctxPath + "/resource/getDetail?resourceCode=" + Feng.getUrlParam("resourceCode"), 'get');
    var resourceInfoResult = request.start();
    form.val('resourceForm', resourceInfoResult.data);
});
