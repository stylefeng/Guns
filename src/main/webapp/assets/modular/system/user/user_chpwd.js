/**
 * 用户详情对话框（可用于添加和修改对话框）
 */
var UserPwdPage = {
    data: {
        oldPassword: "",
        newPassword: "",
        repeatPassword: ""
    }
};

/**
 * 重置输入框
 */
UserPwdPage.reset = function () {
    UserPwdPage.data.oldPassword = "";
    UserPwdPage.data.newPassword = "";
    UserPwdPage.data.repeatPassword = "";
};

/**
 * 验证表单
 */
UserPwdPage.validateForm = function () {

    var data = UserPwdPage.data;

    if (data.oldPassword && data.newPassword && data.repeatPassword) {
        return true;
    }

    if (!data.oldPassword) {
        return "请输入旧密码";
    }
    if (!data.newPassword) {
        return "请输入新密码";
    }
    if (!(data.newPassword === data.repeatPassword)) {
        return "两次密码输入不一致";
    }

};

/**
 * 修改密码
 */
UserPwdPage.chPwd = function () {
    var ajax = new $ax(Feng.ctxPath + "/mgr/changePwd", function (data) {
        Feng.success("修改成功!");
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.setData(UserPwdPage.data);
    ajax.start();
};

$(function () {

    UserPwdPage.app = new Vue({
        el: '#passwordForm',
        data: UserPwdPage.data,
        methods: {
            ensure: function () {
                UserPwdPage.chPwd();
            },
            reset: function () {
                UserPwdPage.reset();
            }
        }
    });

});
