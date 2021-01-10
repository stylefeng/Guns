layui.use(['element', 'admin'], function () {
    var $ = layui.jquery;
    var admin = layui.admin;

    /* 加载更多按钮点击事件 */
    $('#messageMoreBtn2').click(function () {
        var $that = $(this);
        admin.btnLoading($that);
        setTimeout(function () {
            admin.btnLoading($that, false);
            $that.before($that.prev()[0].outerHTML);
        }, 300);
    });

    /* 清空消息点击事件 */
    $('#messageClearBtn1,#messageClearBtn2,#messageClearBtn3').click(function () {
        $(this).parents('.layui-tab-item').addClass('show-empty');
    });

});