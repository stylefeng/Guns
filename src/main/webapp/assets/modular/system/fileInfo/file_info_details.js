layui.use(['layer', 'form', 'admin', 'HttpRequest'], function () {
    var $ = layui.$;
    var form = layui.form;
    var HttpRequest = layui.HttpRequest;

    //获取详情信息，填充表单
    var httpRequest = new HttpRequest(Feng.ctxPath + "/sysFileInfo/detail?fileId=" + Feng.getUrlParam("fileId"),'get');
    var result = httpRequest.start();
    form.val("fileInfoForm", result.data);
 console.log(result)

});
