var Feng = {
    ctxPath: "",
    addCtx: function (ctx) {
        if (this.ctxPath === "") {
            this.ctxPath = ctx;
        }
    },
    confirm: function (tip, ensure) {//询问框
        swal({
            title: "请确认",
            text: tip,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#009efb",
            confirmButtonText: "确认执行",
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            ensure();
            swal.close();
        });
    },
    log: function (info) {
        console.log(info);
    },
    alert: function (info) {
        swal(info);
    },
    alert: function (title, info) {
        swal(title, info);
    },
    info: function (info) {
        $.toast({
            heading: '提示',
            text: info,
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'info',
            hideAfter: 3000,
            stack: 6
        });
    },
    success: function (info) {
        $.toast({
            heading: '成功',
            text: info,
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'success',
            hideAfter: 3000,
            stack: 6
        });
    },
    error: function (info) {
        $.toast({
            heading: '错误',
            text: info,
            position: 'bottom-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3000,
            stack: 6
        });
    },
    infoDetail: function (title, info) {
        var display = "";
        if (typeof info === "string") {
            display = info;
        } else {
            if (info instanceof Array) {
                for (var x in info) {
                    display = display + info[x] + "<br/>";
                }
            } else {
                display = info;
            }
        }
        parent.layer.open({
            title: title,
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['950px', '600px'], //宽高
            content: '<div style="padding: 20px;">' + display + '</div>'
        });
    },
    showInputTree: function (inputId, inputTreeContentId, leftOffset, rightOffset) {
        var onBodyDown = function (event) {
            if (!(event.target.id === "menuBtn" || event.target.id === inputTreeContentId || $(event.target).parents("#" + inputTreeContentId).length > 0)) {
                $("#" + inputTreeContentId).fadeOut("fast");
                $("body").unbind("mousedown", onBodyDown);// mousedown当鼠标按下就可以触发，不用弹起
            }
        };

        if (leftOffset === undefined && rightOffset === undefined) {
            var inputDiv = $("#" + inputId);
            var inputDivOffset = $("#" + inputId).offset();
            $("#" + inputTreeContentId).css({
                left: inputDivOffset.left + "px",
                top: inputDivOffset.top + inputDiv.outerHeight() + "px"
            }).slideDown("fast");
        } else {
            $("#" + inputTreeContentId).css({
                left: leftOffset + "px",
                top: rightOffset + "px"
            }).slideDown("fast");
        }

        $("body").bind("mousedown", onBodyDown);
    },
    baseAjax: function (url, tip) {
        var ajax = new $ax(Feng.ctxPath + url, function (data) {
            Feng.success(tip + "成功!");
        }, function (data) {
            Feng.error(tip + "失败!" + data.responseJSON.message + "!");
        });
        return ajax;
    },
    changeAjax: function (url) {
        return Feng.baseAjax(url, "修改");
    },
    zTreeCheckedNodes: function (zTreeId) {
        var zTree = $.fn.zTree.getZTreeObj(zTreeId);
        var nodes = zTree.getCheckedNodes();
        var ids = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            ids += "," + nodes[i].id;
        }
        return ids.substring(1);
    },
    eventParseObject: function (event) {//获取点击事件的源对象
        event = event ? event : window.event;
        var obj = event.srcElement ? event.srcElement : event.target;
        return $(obj);
    },
    sessionTimeoutRegistry: function () {
        $.ajaxSetup({
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            complete: function (XMLHttpRequest, textStatus) {

                //通过XMLHttpRequest取得响应头，sessionstatus，
                var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
                if (sessionstatus === "timeout") {

                    //如果超时就处理 ，指定要跳转的页面
                    window.location = Feng.ctxPath + "/global/sessionError";
                }
            }
        });
    },
    initValidator: function (formId, fields) {
        $('#' + formId).bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: fields,
            live: 'enabled',
            message: '该字段不能为空'
        });
    },
    underLineToCamel: function (str) {
        var strArr = str.split('_');
        for (var i = 1; i < strArr.length; i++) {
            strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
        }
        var result = strArr.join('');
        return result.charAt(0).toUpperCase() + result.substring(1);
    },
    randomNum: function (minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    },
    currentDate: function () {
        // 获取当前日期
        var date = new Date();

        // 获取当前月份
        var nowMonth = date.getMonth() + 1;

        // 获取当前是几号
        var strDate = date.getDate();

        // 添加分隔符“-”
        var seperator = "-";

        // 对月份进行处理，1-9月在前面添加一个“0”
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }

        // 对月份进行处理，1-9号在前面添加一个“0”
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }

        // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
        return date.getFullYear() + seperator + nowMonth + seperator + strDate;
    },
    testEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    },
    initLaydate: function (dateValue) {
        laydate.render({
            elem: '#dateSelect'
        });
        $("#dateSelect").val(dateValue);
    },
    getLaydate: function () {
        return $("#dateSelect").val();
    },
    showRightSideBar: function () {
        $(".right-sidebar").slideDown(50);
        $(".right-sidebar").toggleClass("shw-rside");
    }
};
