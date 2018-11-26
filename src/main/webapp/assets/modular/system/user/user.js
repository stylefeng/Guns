/**
 * 系统管理--用户管理的单例对象
 */
var MgrUser = {
    id: "managerTable", //表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    condition: {
        name: "",
        deptId: ""
    }
};

/**
 * 初始化表格的列
 */
MgrUser.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '账号', field: 'account', align: 'center', valign: 'middle', sortable: true},
        {title: '姓名', field: 'name', align: 'center', valign: 'middle', sortable: true},
        {title: '性别', field: 'sexName', align: 'center', valign: 'middle', sortable: true},
        {title: '角色', field: 'roleName', align: 'center', valign: 'middle', sortable: true},
        {title: '部门', field: 'deptName', align: 'center', valign: 'middle', sortable: true},
        {title: '邮箱', field: 'email', align: 'center', valign: 'middle', sortable: true},
        {title: '电话', field: 'phone', align: 'center', valign: 'middle', sortable: true},
        {title: '创建时间', field: 'createtime', align: 'center', valign: 'middle', sortable: true},
        {title: '状态', field: 'statusName', align: 'center', valign: 'middle', sortable: true}];
};

/**
 * 检查是否选中
 */
MgrUser.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length === 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        MgrUser.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加管理员
 */
MgrUser.openAddMgr = function () {
    this.layerIndex = layer.open({
        type: 2,
        title: '添加管理员',
        area: ['800px', '580px'],
        fix: false,
        maxmin: true,
        content: Feng.ctxPath + '/mgr/user_add'
    });
};

/**
 * 点击修改按钮时
 */
MgrUser.openChangeUser = function () {
    if (this.check()) {
        this.layerIndex = layer.open({
            type: 2,
            title: '编辑管理员',
            area: ['800px', '500px'],
            fix: false,
            maxmin: true,
            content: Feng.ctxPath + '/mgr/user_edit?userId=' + this.seItem.id
        });
    }
};

/**
 * 点击角色分配
 */
MgrUser.roleAssign = function () {
    if (this.check()) {
        this.layerIndex = layer.open({
            type: 2,
            title: '角色分配',
            area: ['300px', '400px'],
            fix: false,
            content: Feng.ctxPath + '/mgr/role_assign?userId=' + this.seItem.id
        });
    }
};

/**
 * 删除用户
 */
MgrUser.delMgrUser = function () {
    if (this.check()) {
        var operation = function () {
            var userId = MgrUser.seItem.id;
            var ajax = new $ax(Feng.ctxPath + "/mgr/delete", function () {
                Feng.success("删除成功!");
                MgrUser.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("userId", userId);
            ajax.start();
        };

        Feng.confirm("是否删除用户" + MgrUser.seItem.account + "?", operation);
    }
};

/**
 * 冻结用户账户
 */
MgrUser.freezeAccount = function () {
    if (this.check()) {
        var userId = this.seItem.id;
        var ajax = new $ax(Feng.ctxPath + "/mgr/freeze", function (data) {
            Feng.success("冻结成功!");
            MgrUser.table.refresh();
        }, function (data) {
            Feng.error("冻结失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userId", userId);
        ajax.start();
    }
};

/**
 * 解除冻结用户账户
 */
MgrUser.unfreeze = function () {
    if (this.check()) {
        var userId = this.seItem.id;
        var ajax = new $ax(Feng.ctxPath + "/mgr/unfreeze", function (data) {
            Feng.success("解除冻结成功!");
            MgrUser.table.refresh();
        }, function (data) {
            Feng.error("解除冻结失败!");
        });
        ajax.set("userId", userId);
        ajax.start();
    }
};

/**
 * 重置密码
 */
MgrUser.resetPwd = function () {
    if (this.check()) {
        var userId = this.seItem.id;
        Feng.confirm("是否重置密码为111111 ?", function(){
            var ajax = new $ax(Feng.ctxPath + "/mgr/reset", function (data) {
                Feng.success("重置密码成功!");
            }, function (data) {
                Feng.error("重置密码失败!");
            });
            ajax.set("userId", userId);
            ajax.start();
        });
    }
};

/**
 * 点击查询按钮
 */
MgrUser.search = function () {
    var queryData = {};

    queryData['deptid'] = MgrUser.condition.deptId;
    queryData['name'] = MgrUser.condition.name;
    queryData['timeLimit'] = $("#timeLimit").val();

    MgrUser.table.refresh({query: queryData});
};

/**
 * 选择部门时
 */
MgrUser.onClickDept = function (e, treeId, treeNode) {
    MgrUser.condition.deptId = treeNode.id;
    MgrUser.search();
};

$(function () {

    MgrUser.app = new Vue({
        el: '#userManagerPage',
        data: MgrUser.condition
    });

    var defaultColunms = MgrUser.initColumn();
    var table = new BSTable("managerTable", "/mgr/list", defaultColunms);
    table.setPaginationType("client");
    MgrUser.table = table.init();

    var ztree = new $ZTree("deptTree", "/dept/tree");
    ztree.bindOnClick(MgrUser.onClickDept);
    ztree.init();

    laydate.render({
        elem: '#timeLimit',
        range: true,
        theme: '#009efb',
        max: Feng.currentDate()
    });
});
