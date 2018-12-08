/**
 * 角色管理的单例
 */
var Role = {
    id: "roleTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    condition: {
        roleName: ""
    }
};

/**
 * 初始化表格的列
 */
Role.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'roleId', visible: false, align: 'center', valign: 'middle'},
        {title: '名称', field: 'name', align: 'center', valign: 'middle', sortable: true},
        {title: '上级角色', field: 'pName', align: 'center', valign: 'middle', sortable: true},
        {title: '别名', field: 'description', align: 'center', valign: 'middle', sortable: true}];
};


/**
 * 检查是否选中
 */
Role.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length === 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Role.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加管理员
 */
Role.openAddRole = function () {
    this.layerIndex = layer.open({
        type: 2,
        title: '添加角色',
        area: ['800px', '400px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/role/role_add'
    });
};

/**
 * 点击修改按钮时
 */
Role.openChangeRole = function () {
    if (this.check()) {
        this.layerIndex = layer.open({
            type: 2,
            title: '修改角色',
            area: ['800px', '400px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/role/role_edit?roleId=' + this.seItem.roleId
        });
    }
};

/**
 * 删除角色
 */
Role.delRole = function () {
    if (this.check()) {

        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/role/remove", function () {
                Feng.success("删除成功!");
                Role.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("roleId", Role.seItem.roleId);
            ajax.start();
        };

        Feng.confirm("是否删除角色 " + Role.seItem.name + "?", operation);
    }
};

/**
 * 权限配置
 */
Role.assign = function () {
    if (this.check()) {
        this.layerIndex = layer.open({
            type: 2,
            title: '权限配置',
            area: ['300px', '450px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/role/role_assign/' + this.seItem.roleId
        });
    }
};

/**
 * 搜索角色
 */
Role.search = function () {
    var queryData = {};
    queryData['roleName'] = Role.condition.roleName;
    Role.table.refresh({query: queryData});
};

$(function () {

    Role.app = new Vue({
        el: '#rolePage',
        data: Role.condition
    });

    var defaultColunms = Role.initColumn();
    var table = new BSTable(Role.id, "/role/list", defaultColunms);
    table.setPaginationType("client");
    table.init();
    Role.table = table;
});
