/**
 * 部门管理初始化
 */
var Dept = {
    id: "DeptTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    condition: {
        name: '',
        deptId: ''
    }
};

/**
 * 初始化表格的列
 */
Dept.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'deptId', align: 'center', valign: 'middle', width: '50px'},
        {title: '部门简称', field: 'simpleName', align: 'center', valign: 'middle', sortable: true},
        {title: '部门全称', field: 'fullName', align: 'center', valign: 'middle', sortable: true},
        {title: '排序', field: 'sort', align: 'center', valign: 'middle', sortable: true},
        {title: '备注', field: 'description', align: 'center', valign: 'middle', sortable: true}];
};

/**
 * 检查是否选中
 */
Dept.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length === 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        Dept.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加部门
 */
Dept.openAddDept = function () {
    this.layerIndex = layer.open({
        type: 2,
        title: '添加部门',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/dept/dept_add'
    });
};

/**
 * 打开查看部门详情
 */
Dept.openDeptDetail = function () {
    if (this.check()) {
        this.layerIndex = layer.open({
            type: 2,
            title: '部门详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/dept/dept_update?deptId=' + Dept.seItem.deptId
        });
    }
};

/**
 * 删除部门
 */
Dept.delete = function () {
    if (this.check()) {

        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/dept/delete", function () {
                Feng.success("删除成功!");
                Dept.table.refresh();
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("deptId", Dept.seItem.deptId);
            ajax.start();
        };

        Feng.confirm("是否刪除该部门?", operation);
    }
};

/**
 * 查询部门列表
 */
Dept.search = function () {
    var queryData = {};
    queryData['condition'] = Dept.condition.name;
    queryData['deptId'] = Dept.condition.deptId;
    Dept.table.refresh({query: queryData});
};

$(function () {

    //获取部门树
    var ajax = new $ax(Feng.ctxPath + "/dept/treeview");
    var result = ajax.start();

    $('#deptTree').treeview({
        selectedBackColor: "#03a9f3",
        expandIcon: 'ti-plus',
        collapseIcon: 'ti-minus',
        data: result,
        onNodeSelected: function (event, data) {
            Dept.condition.deptId = data.tags;
            Dept.search();
        }
    });

    Dept.app = new Vue({
        el: '#deptPage',
        data: Dept.condition
    });

    var defaultColunms = Dept.initColumn();
    var table = new BSTable("DeptTable", "/dept/list", defaultColunms);
    table.setPaginationType("client");
    Dept.table = table.init();
});
