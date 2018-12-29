/**
 * 角色详情对话框（可用于添加和修改对话框）
 */
var NoticeAddDlg = {
    editor: null,
    data: {
        title: "",
        content: ""
    }
};

/**
 * 关闭此对话框
 */
NoticeAddDlg.close = function () {
    parent.layer.close(window.parent.Notice.layerIndex);
};

/**
 * 验证表单
 */
NoticeAddDlg.validateForm = function () {

    //接收数据
    NoticeAddDlg.data.title = $("#title").val();
    NoticeAddDlg.data.content = NoticeAddDlg.editor.txt.html();

    var data = NoticeAddDlg.data;

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
NoticeAddDlg.addSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/notice/add", function (data) {
        parent.Feng.success("添加成功!");
        window.parent.Notice.table.refresh();
        parent.layer.close(window.parent.Notice.layerIndex);
    }, function (data) {
        parent.Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(NoticeAddDlg.data);
    ajax.start();
};

/**
 * 确认按钮
 */
NoticeAddDlg.ensure = function () {
    var result = NoticeAddDlg.validateForm();
    if (result === true) {
        NoticeAddDlg.addSubmit();
    } else {
        Feng.alert(result);
    }
};

/**
 * 取消按钮
 */
NoticeAddDlg.close = function () {
    NoticeAddDlg.close();
};

$(function () {

    //初始化富文本编辑器
    var E = window.wangEditor;
    var editor2 = new E('#editor');
    editor2.create();
    NoticeAddDlg.editor = editor2;

});
