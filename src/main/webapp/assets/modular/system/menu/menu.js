/**
 * 角色管理的单例
 */
var Menu = {
    id: "menuTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    condition: {
        menuName: "",
        level: "",
        menuId: ""
    }
};

/**
 * 初始化表格的列
 */
Menu.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'menuId', visible: false, align: 'center', valign: 'middle'},
        {title: '菜单名称', field: 'name', align: 'center', valign: 'middle', sortable: true},
        {title: '菜单编号', field: 'code', align: 'center', valign: 'middle', sortable: true},
        {title: '菜单父编号', field: 'pcode', align: 'center', valign: 'middle', sortable: true},
        {title: '请求地址', field: 'url', align: 'center', valign: 'middle', sortable: true},
        {title: '排序', field: 'sort', align: 'center', valign: 'middle', sortable: true},
        {title: '层级', field: 'levels', align: 'center', valign: 'middle', sortable: true},
        {title: '是否是菜单', field: 'isMenuName', align: 'center', valign: 'middle', sortable: true},
        {title: '状态', field: 'statusName', align: 'center', valign: 'middle', sortable: true}];
};


/**
 * 检查是否选中
 */
Menu.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length === 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Menu.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加菜单
 */
Menu.openAddMenu = function () {
    this.layerIndex = layer.open({
        type: 2,
        title: '添加菜单',
        area: ['830px', '500px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/menu/menu_add'
    });
};

/**
 * 点击修改
 */
Menu.openChangeMenu = function () {
    if (this.check()) {
        this.layerIndex = layer.open({
            type: 2,
            title: '修改菜单',
            area: ['800px', '500px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/menu/menu_edit?menuId=' + this.seItem.menuId
        });
    }
};

/**
 * 删除
 */
Menu.delMenu = function () {
    if (this.check()) {

        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/menu/remove", function (data) {
                Feng.success("删除成功!");
                Menu.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("menuId", Menu.seItem.menuId);
            ajax.start();
        };

        Feng.confirm("是否刪除该菜单?", operation);
    }
};

/**
 * 搜索
 */
Menu.search = function () {
    var queryData = {};

    queryData['menuId'] = Menu.condition.menuId;
    queryData['menuName'] = Menu.condition.menuName;
    queryData['level'] = Menu.condition.level;

    Menu.table.refresh({query: queryData});
};

/**
 * 选择菜单树时候
 */
Menu.onClickMenuTree = function (e, treeId, treeNode) {
    Menu.condition.menuId = treeNode.id;
    Menu.search();
};

$(function () {
    Menu.app = new Vue({
        el: '#menuPage',
        data: Menu.condition
    });

    var ztree = new $ZTree("menuTree", "/menu/selectMenuTreeList");
    ztree.bindOnClick(Menu.onClickMenuTree);
    ztree.init();

    var defaultColunms = Menu.initColumn();
    var table = new BSTable(Menu.id, "/menu/list", defaultColunms);
    table.setPaginationType("client");
    Menu.table = table.init();
});
