layui.use(['form', 'HttpRequest'], function () {
    var form = layui.form;
    var HttpRequest = layui.HttpRequest;

    //获取信息详情填充表单
    var request = new HttpRequest(Feng.ctxPath + "/logManager/detail?logId=" + Feng.getUrlParam("logId"), 'get');
    var result = request.start();
    form.val('logForm', result.data);

});