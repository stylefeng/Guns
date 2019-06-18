layui.use(['element'], function () {
    var $ = layui.jquery;
    var element = layui.element;

    // 加载更多按钮点击事件
    $('#btn-more1').click(function () {
        var $that = $(this);
        var str = $that.prev()[0].outerHTML;
        for (var i = 0; i < 5; i++) {
            $that.before(str);
        }
    });

    // 清空消息点击事件
    $('.message-btn-clear').click(function () {
        $(this).css('display', 'none');
        $(this).prev().find('.message-list-item').remove();
        $(this).prev().find('.message-btn-more').remove();
        $(this).prev().find('.message-list-empty').css('display', 'block');
    });
});