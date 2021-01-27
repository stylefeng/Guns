layui.use(['table', 'admin', 'ax', 'ztree', 'func', 'tree'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var $ZTree = layui.ztree;
    var func = layui.func;
    var tree = layui.tree;

    /**
     * 系统管理--部门管理
     */
    var Dept = {
        tableId: "deptTable",
        condition: {
            deptId: ""
        }
    };

    /**
     * 初始化表格的列
     */
    Dept.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'deptId', hide: true, sort: true, title: 'id'},
            {field: 'simpleName', align: "center", sort: true, title: '部门简称'},
            {field: 'fullName', align: "center", sort: true, title: '部门全称'},
            {field: 'sort', align: "center", sort: true, title: '排序'},
            {field: 'description', align: "center", sort: true, title: '备注'},
            {align: 'center', toolbar: '#tableBar', title: '操作', minWidth: 200}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Dept.search = function () {
        var queryData = {};
        queryData['condition'] = $("#name").val();
        queryData['deptId'] = Dept.condition.deptId;
        table.reload(Dept.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 选择部门时
     */
    Dept.onClickDept = function (obj) {
        Dept.condition.deptId = obj.data.id;
        Dept.search();
    };

    /**
     * 弹出添加
     */
    Dept.openAddDept = function () {
        func.open({
            title: '添加部门',
            content: Feng.ctxPath + '/dept/dept_add',
            tableId: Dept.tableId,
            endCallback: function () {
                Dept.loadDeptTree();
            }
        });
    };

    /**
     * 点击编辑部门
     *
     * @param data 点击按钮时候的行数据
     */
    Dept.onEditDept = function (data) {
        func.open({
            title: '编辑部门',
            content: Feng.ctxPath + "/dept/dept_update?deptId=" + data.deptId,
            tableId: Dept.tableId,
            endCallback: function () {
                Dept.loadDeptTree();
            }
        });
    };

    /**
     * 导出excel按钮
     */
    Dept.exportExcel = function () {
        var checkRows = table.checkStatus(Dept.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击删除部门
     *
     * @param data 点击按钮时候的行数据
     */
    Dept.onDeleteDept = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/dept/delete", function () {
                Feng.success("删除成功!");
                table.reload(Dept.tableId);

                //左侧树加载
                Dept.loadDeptTree();

            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("deptId", data.deptId);
            ajax.start();
        };
        Feng.confirm("是否删除部门 " + data.simpleName + "?", operation);
    };

    /**
     * 左侧树加载
     */
    Dept.loadDeptTree = function () {
        var ajax = new $ax(Feng.ctxPath + "/dept/layuiTree", function (data) {
            tree.render({
                elem: '#deptTree',
                data: data,
                click: Dept.onClickDept,
                onlyIconControl: true
            });
        }, function (data) {
        });
        ajax.start();
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Dept.tableId,
        url: Feng.ctxPath + '/dept/list',
        page: true,
        height: "full-98",
        cellMinWidth: 100,
        cols: Dept.initColumn()
    });

    //初始化左侧部门树
    Dept.loadDeptTree();

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Dept.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Dept.openAddDept();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Dept.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Dept.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent === 'edit') {
            Dept.onEditDept(data);
        } else if (layEvent === 'delete') {
            Dept.onDeleteDept(data);
        }
    });
});

$(function () {
    var panehHidden = false;
    if ($(this).width() < 769) {
        panehHidden = true;
    }
    $('#myContiner').layout({initClosed: panehHidden, west__size: 260});
});