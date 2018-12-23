/**
 * 菜单详情对话框
 */
var MenuInfoDlg = {
    data: {
        menuId: "",
        name: "",
        code: "",
        pid: "",
        pcodeName: "",
        url: "",
        sort: "",
        levels: "",
        icon: "",
        menuFlag: ""
    }
};

/**
 * 关闭此对话框
 */
MenuInfoDlg.close = function () {
    parent.layer.close(window.parent.Menu.layerIndex);
};

/**
 * 验证数据是否为空
 */
MenuInfoDlg.validateForm = function () {

    var data = MenuInfoDlg.data;

    if (!data.name) {
        return "请输入菜单名称";
    }
    if (!data.code) {
        return "请输入菜单编号";
    }
    if (!data.pid) {
        return "请输入菜单上级";
    }
    if (!data.menuFlag) {
        return "请输入是否是菜单";
    }
    if (!data.url) {
        return "请输入url地址";
    }

    return true;
};

/**
 * 提交添加菜单
 */
MenuInfoDlg.addSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/menu/add", function (data) {
        parent.Feng.success("添加成功!");
        window.parent.Menu.table.refresh();
        MenuInfoDlg.close();
    }, function (data) {
        parent.Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.data);
    ajax.start();
};

$(function () {
    MenuInfoDlg.app = new Vue({
        el: '#menuForm',
        data: MenuInfoDlg.data,
        methods: {
            submitForm: function (e) {
                e.preventDefault();
            },
            showMenuSelectTree: function () {
                var formName = encodeURIComponent("parent.MenuInfoDlg.app.pcodeName");
                var formId = encodeURIComponent("parent.MenuInfoDlg.app.pid");
                var treeUrl = encodeURIComponent(Feng.ctxPath + "/menu/selectMenuTreeList");

                layer.open({
                    type: 2,
                    title: '部门选择',
                    area: ['300px', '400px'],
                    content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl
                });
            },
            ensure: function () {
                var result = MenuInfoDlg.validateForm();
                if (result === true) {
                    MenuInfoDlg.addSubmit();
                } else {
                    Feng.alert(result);
                }
            },
            close: function () {
                MenuInfoDlg.close();
            }
        }
    });
});
