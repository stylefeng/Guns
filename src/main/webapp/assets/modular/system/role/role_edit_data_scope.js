/**
 * 角色详情对话框
 */
layui.use(['form', 'admin', 'HttpRequest', 'ztree'], function () {
    var HttpRequest = layui.HttpRequest;
    var form = layui.form;
    var admin = layui.admin;
    var $ZTree = layui.ztree;

    // zTree的配置
    var setting = {
        check: {
            enable: true,
            chkboxType: {
                "Y": "",
                "N": ""
            }
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };

    // 校验数据范围是否是指定部门，指定部门则显示出选择部门的框
    function checkDataScope(dataScope) {
        if (dataScope == '40') {
            $("#deptTreeContext").removeClass("layui-hide");
        } else {
            $("#deptTreeContext").addClass("layui-hide");
        }
    }

    // 初始化角色的详情数据
    var detailRequest = new HttpRequest(Feng.ctxPath + "/sysRole/detail?roleId=" + Feng.getUrlParam("roleId"), 'get');
    var result = detailRequest.start();
    form.val('roleForm', result.data);

    // 校验是否需要打开选择组织机构树
    checkDataScope(result.data.dataScopeType);
    form.render();

    // 初始化选择组织机构的界面
    var ztree = new $ZTree("deptTree", Feng.ctxPath + "/hrOrganization/roleBindOrgScope?roleId=" + result.data.roleId);
    ztree.setSettings(setting);
    ztree.init();

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var request = new HttpRequest(Feng.ctxPath + "/sysRole/grantDataScope", 'post', function (data) {
            Feng.success("修改成功!");
            admin.closeThisDialog();
        }, function (data) {
            Feng.error("修改失败!" + data.message + "!");
        });
        request.set("roleId", data.field.roleId);
        request.set("dataScopeType", data.field.dataScopeType);

        // 如果是指定部门，则提交部门信息
        if (data.field.dataScopeType == '40') {
            var nodes = ztree.getCheckedNodes();
            var orgIds = [];
            for (let i = 0; i < nodes.length; i++) {
                orgIds[i] = nodes[i].id;
            }
            request.set("grantOrgIdList", orgIds);
        }
        request.start(true);

        //添加 return false 可成功跳转页面
        return false;
    });

    // 监听数据范围单选
    form.on('radio(dataScopeType)', function (data) {
        checkDataScope(data.value);
    });

});
