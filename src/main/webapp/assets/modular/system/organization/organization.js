layui.use(['layer', 'form', 'table', 'util', 'admin', 'tree', 'dropdown', 'xmSelect', 'treeTable', 'func', 'HttpRequest'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var admin = layui.admin;
    var tree = layui.tree;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;
    var xmSelect = layui.xmSelect;
    var selObj, treeData;  // 左树选中数据

    /**
     * 系统管理--用户管理
     */
    var Organization = {
        tableId: "organizationTable",    //表格id
    };

    /* 点击新增对话框 */
    Organization.openAddDlg = function () {
        func.open({
            title: '添加机构',
            content: Feng.ctxPath + '/view/organization/addView',
            tableId: Organization.tableId,
            endCallback: function () {
                renderTree();
            }
        });
    };

    /* 点击编辑对话框 */
    Organization.openEditDlg = function (data) {
        func.open({
            title: '修改机构',
            content: Feng.ctxPath + '/view/organization/editView?orgId=' + data.id,
            tableId: Organization.tableId,
            endCallback: function () {
                renderTree();
            }
        });
    };

    /* 点击删除 */
    Organization.delete = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/hrOrganization/delete", 'post', function (data) {
                Feng.success("删除成功!");
                //刷新表格
                table.reload(Organization.tableId);
                //刷新树
                renderTree();
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };

    /* 渲染树形 */
    function renderTree() {
        $.get(Feng.ctxPath + '/hrOrganization/tree', function (res) {
            tree.render({
                elem: '#organizationTree',
                onlyIconControl: true,
                data: res.data,
                click: function (obj) {
                    selObj = obj;
                    $('#organizationTree').find('.ew-tree-click').removeClass('ew-tree-click');
                    $(obj.elem).children('.layui-tree-entry').addClass('ew-tree-click');
                    insTb.reload({
                        where: {orgParentId: obj.data.id},
                        page: {curr: 1},
                        url: Feng.ctxPath + '/hrOrganization/page'
                    });
                }
            });
            $('#organizationTree').find('.layui-tree-entry:first>.layui-tree-main>.layui-tree-txt').trigger('click');
        });
    }

    renderTree();

    /* 添加 */
    $('#organizationAddBtn').click(function () {
        Organization.openAddDlg();
    });

    /* 修改 */
    $('#organizationEditBtn').click(function () {
        if (!selObj) return layer.msg('未选择机构', {icon: 2});
        Organization.openEditDlg(selObj.data)
    });

    /* 删除 */
    $('#organizationDelBtn').click(function () {
        if (!selObj) return layer.msg('未选择机构', {icon: 2});
        selObj.data.orgId = selObj.data.id;
        Organization.delete(selObj.data)

    });


    /* 渲染表格 */
    var insTb = table.render({
        elem: '#organizationTable',
        data: [],
        height: 'full-100',
        page: true,
        //toolbar: '#organizationUserTbToolBar',
        cellMinWidth: 100,
        cols: [[
            {type: 'checkbox'},
            {type: 'numbers'},
            {field: 'orgId', hide: true, title: '主键id'},
            {field: 'orgName', sort: true, title: '机构名称'},
            {field: 'orgCode', sort: true, title: '机构编码'},
            {field: 'orgSort', sort: true, title: '排序'},
            {field: 'orgRemark', sort: true, title: '备注'}
        ]],
        done: function () {
            // 表格搜索
            form.on('submit(organizationUserTbSearch)', function (data) {
                insTb.reload({where: data.field, page: {curr: 1}});
                return false;
            });
        },
        parseData: Feng.parseData
    });

    /* 点击搜索 */
    form.on('submit(organizationTbSearch)', function (data) {
        insTb.reload({where: data.field});
        return false;
    });

});
