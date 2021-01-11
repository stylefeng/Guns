var Message = {}
layui.use(['element', 'admin', 'ax'], function () {
    var $ = layui.jquery;
    var admin = layui.admin;
    var $ax = layui.ax;

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
        var ajax = new $ax(Feng.ctxPath + "/sysMessage/allMessageReadFlag", function (data) {
            Feng.success("已读成功!");
        }, function (data) {
            Feng.error("标记已读失败!" + data.responseJSON.message + "!");
        });
        ajax.setAsync(true)
        ajax.start();
    };
    /* 清空消息点击事件 */
    $('#messageClearBtn').click(function () {
        debugger
        $(this).parents('.layui-tab-item').addClass('show-empty');
        Message.allReadMessage()
    });

});