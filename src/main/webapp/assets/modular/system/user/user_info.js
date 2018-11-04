/**
 * 用户详情对话框（可用于添加和修改对话框）
 */
var UserInfoDlg = {
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
 * 点击部门input框时
 *
 * @param e
 * @param treeId
 * @param treeNode
 * @returns
 */
UserInfoDlg.onClickDept = function (e, treeId, treeNode) {
    $("#citySel").attr("value", instance.getSelectedVal());
    $("#deptid").attr("value", treeNode.id);
};

/**
 * 显示部门选择的树
 *
 * @returns
 */
UserInfoDlg.showDeptSelectTree = function () {
    var cityObj = $("#citySel");
    var cityOffset = $("#citySel").offset();
    $("#menuContent").css({
        left: cityOffset.left + "px",
        top: cityOffset.top + cityObj.outerHeight() + "px"
    }).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
};

/**
 * 显示用户详情部门选择的树
 *
 * @returns
 */
UserInfoDlg.showInfoDeptSelectTree = function () {
    var cityObj = $("#citySel");
    var cityPosition = $("#citySel").position();
    $("#menuContent").css({
        left: cityPosition.left + "px",
        top: cityPosition.top + cityObj.outerHeight() + "px"
    }).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
};

/**
 * 隐藏部门选择的树
 */
UserInfoDlg.hideDeptSelectTree = function () {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);// mousedown当鼠标按下就可以触发，不用弹起
};

/**
 * 验证表单
 */
UserInfoDlg.validateForm = function () {

    var data = UserInfoDlg.data;

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

/**
 * 提交添加用户
 */
UserInfoDlg.addSubmit = function () {
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

/**
 * 提交修改
 */
UserInfoDlg.editSubmit = function () {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/mgr/edit", function (data) {
        Feng.success("修改成功!");
        if (window.parent.MgrUser != undefined) {
            window.parent.MgrUser.table.refresh();
            UserInfoDlg.close();
        }
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.data);
    ajax.start();
};

/**
 * 修改密码
 */
UserInfoDlg.chPwd = function () {
    var ajax = new $ax(Feng.ctxPath + "/mgr/changePwd", function (data) {
        Feng.success("修改成功!");
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set("oldPwd");
    ajax.set("newPwd");
    ajax.set("rePwd");
    ajax.start();

};

function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(
        event.target).parents("#menuContent").length > 0)) {
        UserInfoDlg.hideDeptSelectTree();
    }
}

$(function () {

    UserInfoDlg.app = new Vue({
        el: '#userAddForm',
        data: UserInfoDlg.data,
        methods: {
            submitForm: function (e) {
                var result = UserInfoDlg.validateForm();
                if (result === true) {
                    UserInfoDlg.addSubmit();
                } else {
                    Feng.alert(result);
                    e.preventDefault();
                }
            }
        }
    });

    // var ztree = new $ZTree("treeDemo", "/dept/tree");
    // ztree.bindOnClick(UserInfoDlg.onClickDept);
    // ztree.init();
    // instance = ztree;

    // 初始化头像上传
    // var avatarUp = new $WebUpload("avatar");
    // avatarUp.setUploadBarId("progressBar");
    // avatarUp.init();

});
