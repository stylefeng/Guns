/**
 * 角色详情对话框（可用于添加和修改对话框）
 */
var DictInfoDlg = {
    data: {
        name: "",
        code: "",
        description: "",
        sort: ""
    }
};

/**
 * 关闭此对话框
 */
DictInfoDlg.close = function () {
    parent.layer.close(window.parent.Dict.layerIndex);
};

/**
 * 验证表单
 */
DictInfoDlg.validateForm = function () {

    var data = DictInfoDlg.data;

    if (!data.name) {
        return "请输入字典名称";
    }
    if (!(data.code)) {
        return "请输入字典编码";
    }

    return true;
};

/**
 * 提交添加角色
 */
DictInfoDlg.addSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/dict/add", function (data) {
        parent.Feng.success("添加成功!");
        window.parent.Dict.table.refresh();
        DictInfoDlg.close();
    }, function (data) {
        parent.Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.data);
    ajax.start();
};

$(function () {

    DictInfoDlg.app = new Vue({
        el: '#dictForm',
        data: DictInfoDlg.data,
        methods: {
            submitForm: function (e) {
                e.preventDefault();
            },
            ensure: function () {
                var result = DictInfoDlg.validateForm();
                if (result === true) {
                    DictInfoDlg.addSubmit();
                } else {
                    Feng.alert(result);
                }
            },
            close: function () {
                DictInfoDlg.close();
            }
        }
    });

});
