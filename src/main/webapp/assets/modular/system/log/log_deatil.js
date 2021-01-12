/**
 * 详情对话框
 */
var SysLogInfoDlg = {
    data: {
        logId: "",
    }
};

layui.use(['layer', 'form', 'admin', 'laydate', 'HttpRequest', 'iconPicker'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;

    //获取菜单信息
    var request = new HttpRequest(Feng.ctxPath + "/logManager/detail?logId=" + Feng.getUrlParam("logId"), 'get');
    var sysLogResult = request.start();
    form.val('sysLogForm', sysLogResult.data);
});
