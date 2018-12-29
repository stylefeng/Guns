/**
 * 角色详情对话框（可用于添加和修改对话框）
 */
var NoticeEditDlg = {
    editor: null,
    data: {
        noticeId: $("#noticeId").val(),
        title: $("#title").val(),
        content: $("#content").val()
    }
};

/**
 * 关闭此对话框
 */
NoticeEditDlg.close = function () {
    parent.layer.close(window.parent.Notice.layerIndex);
};

/**
 * 验证表单
 */
NoticeEditDlg.validateForm = function () {

    //接收数据
    NoticeEditDlg.data.title = $("#title").val();
    NoticeEditDlg.data.content = NoticeEditDlg.editor.txt.html();

    var data = NoticeEditDlg.data;

    if (!data.title) {
        return "请输入标题";
    }

    if (!data.content) {
        return "请输入内容";
    }

    return true;
};

/**
 * 提交添加角色
 */
NoticeEditDlg.editSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/notice/update", function (data) {
        parent.Feng.success("修改成功!");
        window.parent.Notice.table.refresh();
        parent.layer.close(window.parent.Notice.layerIndex);
    }, function (data) {
        parent.Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(NoticeEditDlg.data);
    ajax.start();
};

/**
 * 确认按钮
 */
NoticeEditDlg.ensure = function () {
    var result = NoticeEditDlg.validateForm();
    if (result === true) {
        NoticeEditDlg.editSubmit();
    } else {
        Feng.alert(result);
    }
};

/**
 * 取消按钮
 */
NoticeEditDlg.close = function () {
    NoticeEditDlg.close();
};

$(function () {

    //初始化编辑器
    var E = window.wangEditor;
    var editor = new E('#editor');
    editor.create();
    editor.txt.html($("#contentVal").val());
    NoticeEditDlg.editor = editor;

});
