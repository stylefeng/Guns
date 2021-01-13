var Message = {}
layui.use(['element', 'admin', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var admin = layui.admin;
    var HttpRequest = layui.HttpRequest;

    /* 加载更多按钮点击事件 */
    /*$('#messageMoreBtn2').click(function () {
        var $that = $(this);
        admin.btnLoading($that);
        setTimeout(function () {
            admin.btnLoading($that, false);
            $that.before($that.prev()[0].outerHTML);
        }, 300);
    });*/
    /**
     * 全部标记为已读
     */
    Message.allReadMessage = function () {
        var httpRequest = new HttpRequest(Feng.ctxPath + "/sysMessage/allMessageReadFlag", 'get', function (data) {
            $('#messageClearBtn').parents('.layui-tab-item').addClass('show-empty');
            $('#msgCount').html(0);
            Feng.success("标记已读成功!");
        }, function (data) {
            Feng.error("标记已读失败!" + data.responseJSON.message);
        });
        httpRequest.setAsync(true)
        httpRequest.start();

      /*  var HttpRequest = new HttpRequest(Feng.ctxPath + "/sysMessage/allMessageReadFlag", 'get', function (data) {
            Feng.success("已读成功!");
        }, function (data) {
            Feng.error("标记已读失败!" + data.responseJSON.message + "!");
        });
        HttpRequest.setAsync(true)
        HttpRequest.start();*/
    };
    /* 清空消息点击事件 */
    $('#messageClearBtn').click(function () {

        Message.allReadMessage()
    });

});