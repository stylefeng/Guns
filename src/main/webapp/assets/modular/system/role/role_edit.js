/**
 * 角色详情对话框（可用于添加和修改对话框）
 */
var RoleEditDlg = {
    data: {
        id: "",
        name: "",
        pName: "",
        pid: "",
        description: "",
        sort: ""
    }
};

/**
 * 关闭此对话框
 */
RoleEditDlg.close = function () {
    parent.layer.close(window.parent.Role.layerIndex);
};

/**
 * 验证表单
 */
RoleEditDlg.validateForm = function () {

    var data = RoleEditDlg.data;

    if (!data.name) {
        return "请输入角色名称";
    }
    if (!(data.pName)) {
        return "请输入上级名称";
    }
    if (!data.description) {
        return "请输入别名";
    }

    return true;
};

/**
 * 提交添加角色
 */
RoleEditDlg.editSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/role/edit", function (data) {
        parent.Feng.success("修改成功!");
        window.parent.Role.table.refresh();
        RoleEditDlg.close();
    }, function (data) {
        parent.Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.data);
    ajax.start();
};

$(function () {

    //初始化角色的详情数据
    var ajax = new $ax(Feng.ctxPath + "/role/view/" + Feng.getUrlParam("roleId"));
    var result = ajax.start();
    RoleEditDlg.data = result.data;

    RoleEditDlg.app = new Vue({
        el: '#roleForm',
        data: RoleEditDlg.data,
        methods: {
            submitForm: function (e) {
                e.preventDefault();
            },
            showParentSelectTree: function () {
                var formName = encodeURIComponent("parent.RoleEditDlg.app.pName");
                var formId = encodeURIComponent("parent.RoleEditDlg.app.pid");
                var treeUrl = encodeURIComponent(Feng.ctxPath + "/role/roleTreeList");

                layer.open({
                    type: 2,
                    title: '部门选择',
                    area: ['300px', '350px'],
                    content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl
                });
            },
            ensure: function () {
                var result = RoleEditDlg.validateForm();
                if (result === true) {
                    RoleEditDlg.editSubmit();
                } else {
                    Feng.alert(result);
                }
            },
            close: function () {
                RoleEditDlg.close();
            }
        }
    });

});
