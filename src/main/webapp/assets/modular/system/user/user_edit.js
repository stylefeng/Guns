/**
 * 用户详情对话框（可用于添加和修改对话框）
 */
var UserInfoDlg = {
    data: {
        userId: "",
        account: "",
        sex: "",
        email: "",
        name: "",
        birthday: "",
        deptId: "",
        deptName: "",
        phone: "",
        roleName: ""
    }
};

/**
 * 关闭此对话框
 */
UserInfoDlg.close = function () {
    parent.layer.close(window.parent.MgrUser.layerIndex);
};

/**
 * 验证表单
 */
UserInfoDlg.validateForm = function () {

    var data = UserInfoDlg.data;

    if (data.account && data.name && data.deptId) {
        return true;
    }

    if (!data.account) {
        return "请输入账号";
    }
    if (!data.name) {
        return "请输入姓名";
    }
    if (!data.deptId) {
        return "请选择部门";
    }
};

/**
 * 提交修改
 */
UserInfoDlg.editSubmit = function () {

    //注意！vue的model绑定和layui有冲突！手动赋值一下！
    UserInfoDlg.data.birthday = Feng.getLaydate();

    var ajax = new $ax(Feng.ctxPath + "/mgr/edit", function (data) {
        window.parent.Feng.success("修改成功!");
        if (window.parent.MgrUser !== undefined) {
            window.parent.MgrUser.table.refresh();
            UserInfoDlg.close();
        }
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(UserInfoDlg.data);
    ajax.start();
};

$(function () {

    //获取用户信息
    var ajax = new $ax(Feng.ctxPath + "/mgr/getUserInfo?userId=" + Feng.getUrlParam("userId"));
    var result = ajax.start();
    UserInfoDlg.data = result.data;

    UserInfoDlg.app = new Vue({
        el: '#userForm',
        data: UserInfoDlg.data,
        methods: {
            submitForm: function (e) {
                e.preventDefault();
            },
            showDeptSelectTree: function () {
                var formName = encodeURIComponent("parent.UserInfoDlg.app.deptName");
                var formId = encodeURIComponent("parent.UserInfoDlg.app.deptId");
                var treeUrl = encodeURIComponent(Feng.ctxPath + "/dept/tree");

                layer.open({
                    type: 2,
                    title: '部门选择',
                    area: ['300px', '400px'],
                    content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl
                });
            },
            ensure: function () {
                var result = UserInfoDlg.validateForm();
                if (result === true) {
                    UserInfoDlg.editSubmit();
                } else {
                    Feng.alert(result);
                }
            },
            close: function () {
                UserInfoDlg.close();
            }
        }
    });

    //注意！vue的model绑定和layui有冲突！
    Feng.initLaydate(UserInfoDlg.data.birthday);

});
