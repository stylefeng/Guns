var Message = {}
layui.use(['element', 'admin', 'HttpRequest', 'func'], function () {
    var $ = layui.jquery;
    var HttpRequest = layui.HttpRequest;
    var func = layui.func;

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
            $('#messageDot').hide();
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

    /**
     * 点击查看
     */
    Message.openViewDlg = function (messageId) {
        func.open({
            title: '查看消息',
            content: Feng.ctxPath + '/view/message_view?messageId=' + messageId,
            tableId: Message.tableId
        });
    };

    /* 清空消息点击事件 */
    $('#messageClearBtn').click(function () {

        Message.allReadMessage()
    });

});