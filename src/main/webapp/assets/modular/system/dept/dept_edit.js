/**
 * 部门详情对话框（可用于添加和修改对话框）
 */
var DeptEditInfoDlg = {
    data: {
        deptId: "",
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
DeptEditInfoDlg.close = function () {
    parent.layer.close(window.parent.Dept.layerIndex);
};

/**
 * 验证表单
 */
DeptEditInfoDlg.validateForm = function () {

    var data = DeptEditInfoDlg.data;

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
 * 提交编辑部门
 */
DeptEditInfoDlg.addSubmit = function () {
    var ajax = new $ax(Feng.ctxPath + "/dept/update", function (data) {
        parent.Feng.success("修改成功!");
        window.parent.Dept.table.refresh();
        DeptEditInfoDlg.close();
    }, function (data) {
        parent.Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(DeptEditInfoDlg.data);
    ajax.start();
};

$(function () {

    //获取部门信息
    var ajax = new $ax(Feng.ctxPath + "/dept/detail/" + Feng.getUrlParam("deptId"));
    DeptEditInfoDlg.data = ajax.start();

    DeptEditInfoDlg.app = new Vue({
        el: '#deptEditForm',
        data: DeptEditInfoDlg.data,
        methods: {
            submitForm: function (e) {
                e.preventDefault();
            },
            showDeptSelectTree: function () {
                var formName = encodeURIComponent("parent.DeptEditInfoDlg.app.pName");
                var formId = encodeURIComponent("parent.DeptEditInfoDlg.app.pid");
                var treeUrl = encodeURIComponent(Feng.ctxPath + "/dept/tree");

                layer.open({
                    type: 2,
                    title: '部门选择',
                    area: ['300px', '400px'],
                    content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl
                });
            },
            ensure: function () {
                var result = DeptEditInfoDlg.validateForm();
                if (result === true) {
                    DeptEditInfoDlg.addSubmit();
                } else {
                    Feng.alert(result);
                }
            },
            close: function () {
                DeptEditInfoDlg.close();
            }
        }
    });
});