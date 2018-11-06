/**
 * 用户详情对话框（可用于添加和修改对话框）
 */
var UserViewPage = {
    data: {
        id: "",
        account: "",
        sex: "",
        password: "",
        rePassword: "",
        avatar: "",
        email: "",
        name: "",
        birthday: "",
        deptid: "",
        deptName: "",
        phone: ""
    }
};

/**
 * 关闭此对话框
 */
UserViewPage.close = function () {

};

/**
 * 验证表单
 */
UserViewPage.validateForm = function () {

    var data = UserViewPage.data;

    if (data.account && data.password && data.name && data.deptid) {
        return true;
    }

    if (!data.account) {
        return "请输入账号";
    }
    if (!(data.password === data.rePassword)) {
        return "两次密码输入不一致";
    }
    if (!data.name) {
        return "请输入姓名";
    }
    if (!data.deptid) {
        return "请选择部门";
    }
};

$(function () {

    var image = document.getElementById('cropperImage');
    var cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop(event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
        },
    });
});
