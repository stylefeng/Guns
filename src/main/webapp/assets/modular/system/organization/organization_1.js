layui.use(['layer', 'form', 'table', 'util', 'admin', 'tree', 'dropdown', 'xmSelect', 'treeTable'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var table = layui.table;
    var util = layui.util;
    var admin = layui.admin;
    var tree = layui.tree;
    var xmSelect = layui.xmSelect;
    var selObj, treeData;  // 左树选中数据

    /* 渲染树形 */
    function renderTree() {
        $.get(Feng.ctxPath + '/hrOrganization/treeLayui', function (res) {
            tree.render({
                elem: '#organizationTree',
                onlyIconControl: true,
                data: res.data,
                click: function (obj) {
                    selObj = obj;
                    $('#organizationTree').find('.ew-tree-click').removeClass('ew-tree-click');
                    $(obj.elem).children('.layui-tree-entry').addClass('ew-tree-click');
                    insTb.reload({
                        where: {organizationId: obj.data.organizationId},
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
        showEditModel(null, selObj ? selObj.data.parentId : null);
    });

    /* 修改 */
    $('#organizationEditBtn').click(function () {
        if (!selObj) return layer.msg('未选择机构', {icon: 2});
        showEditModel(selObj.data);
    });

    /* 删除 */
    $('#organizationDelBtn').click(function () {
        if (!selObj) return layer.msg('未选择机构', {icon: 2});
        doDel(selObj);
    });

    /* 显示表单弹窗 */
    function showEditModel(mData, pid) {
        admin.open({
            type: 1,
            area: '600px',
            title: (mData ? '修改' : '添加') + '机构',
            content: $('#organizationEditDialog').html(),
            success: function (layero, dIndex) {
                // 回显表单数据
                form.val('organizationEditForm', mData);
                // 表单提交事件
                form.on('submit(organizationEditSubmit)', function (data) {
                    data.field.parentId = insXmSel.getValue('valueStr');
                    var loadIndex = layer.load(2);
                    $.get(mData ? '../../json/ok.json' : '../../json/ok.json', data.field, function (res) {
                        layer.close(loadIndex);
                        if (200 === res.code) {
                            layer.close(dIndex);
                            layer.msg(res.msg, {icon: 1});
                            renderTree();
                        } else {
                            layer.msg(res.msg, {icon: 2});
                        }
                    }, 'json');
                    return false;
                });
                // 渲染下拉树
                var insXmSel = xmSelect.render({
                    el: '#organizationEditParentSel',
                    height: '250px',
                    data: treeData,
                    initValue: mData ? [mData.parentId] : (pid ? [pid] : []),
                    model: {label: {type: 'text'}},
                    prop: {
                        name: 'organizationName',
                        value: 'organizationId'
                    },
                    radio: true,
                    clickClose: true,
                    tree: {
                        show: true,
                        indent: 15,
                        strict: false,
                        expandedKeys: true
                    }
                });
                // 禁止弹窗出现滚动条
                $(layero).children('.layui-layer-content').css('overflow', 'visible');
            }
        });
    }

    /* 删除 */
    function doDel(obj) {
        layer.confirm('确定要删除此机构吗？', {
            skin: 'layui-layer-admin',
            shade: .1
        }, function (i) {
            layer.close(i);
            var loadIndex = layer.load(2);
            $.get('../../json/ok.json', {
                id: obj.data.organizationId,
            }, function (res) {
                layer.close(loadIndex);
                if (200 === res.code) {
                    layer.msg(res.msg, {icon: 1});
                    renderTree();
                } else {
                    layer.msg(res.msg, {icon: 2});
                }
            }, 'json');
        });
    }

    /* 渲染表格 */
    var insTb = table.render({
        elem: '#organizationUserTable',
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
            {field: 'orgRemark', sort: true, title: '备注'},
            {title: '操作', toolbar: '#organizationUserTbBar', align: 'center', width: 120, minWidth: 120}
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

    /* 表格工具条点击事件 */
    table.on('tool(organizationUserTable)', function (obj) {
        if (obj.event === 'edit') { // 修改
            showEditModel2(obj.data);
        } else if (obj.event === 'del') { // 删除
            doDel2(obj);
        }
    });

    /* 表格头工具栏点击事件 */
    table.on('toolbar(organizationUserTable)', function (obj) {
        if (obj.event === 'add') { // 添加
            showEditModel2();
        } else if (obj.event === 'del') { // 删除
            var checkRows = table.checkStatus('organizationUserTable');
            if (checkRows.data.length === 0) {
                layer.msg('请选择要删除的数据', {icon: 2});
                return;
            }
            var ids = checkRows.data.map(function (d) {
                return d.userId;
            });
            doDel2({ids: ids});
        }
    });

    /* 显示表单弹窗2 */
    function showEditModel2(mData) {
        admin.open({
            type: 1,
            title: (mData ? '修改' : '添加') + '用户',
            content: $('#organizationUserEditDialog').html(),
            success: function (layero, dIndex) {
                // 回显表单数据
                form.val('organizationUserEditForm', mData);
                // 表单提交事件
                form.on('submit(organizationUserEditSubmit)', function (data) {
                    data.field.organizationId = selObj ? selObj.data.organizationId : undefined;
                    var loadIndex = layer.load(2);
                    $.get(mData ? '../../json/ok.json' : '../../json/ok.json', data.field, function (res) {
                        layer.close(loadIndex);
                        if (200 === res.code) {
                            layer.close(dIndex);
                            layer.msg(res.msg, {icon: 1});
                            insTb.reload({page: {curr: 1}});
                        } else {
                            layer.msg(res.msg, {icon: 2});
                        }
                    }, 'json');
                    return false;
                });
                // 禁止弹窗出现滚动条
                $(layero).children('.layui-layer-content').css('overflow', 'visible');
            }
        });
    }

    /* 删除2 */
    function doDel2(obj) {
        layer.confirm('确定要删除选中用户吗？', {
            skin: 'layui-layer-admin',
            shade: .1
        }, function (i) {
            layer.close(i);
            var loadIndex = layer.load(2);
            $.get('../../json/ok.json', {
                id: obj.data ? obj.data.userId : '',
                ids: obj.ids ? obj.ids.join(',') : ''
            }, function (res) {
                layer.close(loadIndex);
                if (200 === res.code) {
                    layer.msg(res.msg, {icon: 1});
                    insTb.reload({page: {curr: 1}});
                } else {
                    layer.msg(res.msg, {icon: 2});
                }
            }, 'json');
        });
    }

});