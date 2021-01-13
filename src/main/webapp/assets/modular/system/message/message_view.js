/**
 * 详情对话框
 */
var MessageInfoDlg = {};

layui.use(['form', 'admin', 'HttpRequest', 'laydate'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var laydate = layui.laydate;
    lay('input.date-input').each(function(){
        laydate.render({
            elem: this
            ,trigger: 'click'
        });
    });

    //获取详情信息，填充表单
    var HttpRequest = new HttpRequest(Feng.ctxPath + "/sysMessage/detail?messageId=" + Feng.getUrlParam("messageId"), 'get');
    var result = HttpRequest.start();
    form.val('messageForm', result.data);

  /*  //表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var HttpRequest = new HttpRequest(Feng.ctxPath + "/sysMessage/editItem", 'post', function (data) {
            Feng.success("更新成功！");

            //传给上个页面，刷新table用
            admin.putTempData('formOk', true);

            //关掉对话框
            admin.closeThisDialog();

        }, function (data) {
            Feng.error("更新失败！" + data.responseJSON.message)
        });
        data.field.fileIds = MessageInfoDlg.layUploader.getUploadFileIds().join(",");  //获取上传附件ID 暂时注释掉
        HttpRequest.set(data.field);
        HttpRequest.start();

        return false;
    });*/


    //查看模式
    var openType = $("#formOpenType_").val();
    if(openType == "view"){
        formPriv.doView()
    }
});
