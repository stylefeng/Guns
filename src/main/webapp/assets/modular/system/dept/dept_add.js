/**
 * 用户详情对话框（可用于添加和修改对话框）
 */
var DeptInfoDlg = {
    data: {
        simpleName: "",
        fullName: "",
        description: "",
        sort: "",
        pid: "",
        pName: ""
    }
};

/**
 * 关闭此对话框
 */
DeptInfoDlg.close = function () {
    parent.layer.close(window.parent.Dept.layerIndex);
};

/**
 * 验证表单
 */
DeptInfoDlg.validateForm = function () {

    var data = DeptInfoDlg.data;

    if (!data.simpleName) {
        return "请输入部门名称";
    }
    if (!data.fullName) {
        return "请输入上级部门名称";
    }
    if (!data.pid) {
        return "请选择上级部门";
    }

    return true;
};

/**
 * 提交添加用户
 */
DeptInfoDlg.addSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/dept/add", function (data) {
        parent.Feng.success("添加成功!");
        window.parent.Dept.table.refresh();
        DeptInfoDlg.close();
    }, function (data) {
        parent.Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(DeptInfoDlg.data);
    ajax.start();
};

$(function () {

    DeptInfoDlg.app = new Vue({
        el: '#deptForm',
        data: DeptInfoDlg.data,
        methods: {
            submitForm: function (e) {
                e.preventDefault();
            },
            showDeptSelectTree: function () {
                var formName = encodeURIComponent("parent.DeptInfoDlg.app.pName");
                var formId = encodeURIComponent("parent.DeptInfoDlg.app.pid");
                var treeUrl = encodeURIComponent(Feng.ctxPath + "/dept/tree");

                layer.open({
                    type: 2,
                    title: '部门选择',
                    area: ['300px', '400px'],
                    content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl
                });
            },
            ensure: function () {
                var result = DeptInfoDlg.validateForm();
                if (result === true) {
                    DeptInfoDlg.addSubmit();
                } else {
                    Feng.alert(result);
                }
            },
            close: function () {
                DeptInfoDlg.close();
            }
        }
    });
});
