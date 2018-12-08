/**
 * 用户详情对话框（可用于添加和修改对话框）
 */
var UserInfoDlg = {
    data: {
        userId: "",
        account: "",
        sex: "",
        password: "",
        rePassword: "",
        avatar: "",
        email: "",
        name: "",
        birthday: "",
        deptId: "",
        deptName: "",
        phone: ""
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

    if (!data.account) {
        return "请输入账号";
    }
    if (!(data.password === data.rePassword)) {
        return "两次密码输入不一致";
    }
    if (!data.name) {
        return "请输入姓名";
    }
    if (!data.deptId) {
        return "请选择部门";
    }

    return true;
};

/**
 * 提交添加用户
 */
UserInfoDlg.addSubmit = function () {

    //注意！vue的model绑定和layui有冲突！手动赋值一下！
    UserInfoDlg.data.birthday = Feng.getLaydate();

    var ajax = new $ax(Feng.ctxPath + "/mgr/add", function (data) {
        window.parent.Feng.success("添加成功!");
        window.parent.MgrUser.table.refresh();
        UserInfoDlg.close();
    }, function (data) {
        window.parent.Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.data);
    ajax.start();
};

$(function () {

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
                    UserInfoDlg.addSubmit();
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
