layui.define(['jquery'], function (exports) {
    var $ = layui.$;

    var ajaxUtil = {
        post: function (url, params, suc, err, contentType, async) {
            ajaxUtil.sendAjax(url, params, 'POST', suc, err, contentType, async);
        },
        post: function (url, params, suc, err) {
            ajaxUtil.sendAjax(url, params, 'POST', suc, err, null, null);
        },
        get: function (url, params, suc, err, contentType, async) {
            ajaxUtil.sendAjax(url, params, 'GET', suc, err, contentType, async);
        },
        get: function (url, suc, err, contentType, async) {
            ajaxUtil.sendAjax(url, '', 'GET', suc, err, contentType, async);
        },
        get: function (url, suc, err) {
            ajaxUtil.sendAjax(url, '', 'GET', suc, err, null, null);
        },
        sendAjax: function (url, params, method, suc, err, contentType, async) {
            $.ajax({
                url: url,
                cache: false,
                async: async == undefined ? false : async,
                data: params == undefined ? '' : JSON.stringify(params),
                type: method == undefined ? "POST" : method,
                contentType: contentType == undefined ? 'application/json; charset=UTF-8' : contentType,
                dataType: "json",
                success: function (data) {
                    if (data.code = '00000') {
                        if (suc !== undefined && typeof suc == "function") {
                            suc(data);
                        }
                    } else {
                        if (err !== undefined && typeof err == "function") {
                            err(data);
                        }
                    }

                },
                error: function (data) {
                    if (err !== undefined && typeof err == "function") {
                        err(data);
                    }
                }
            });
        }
    }
    exports("ajaxUtil", ajaxUtil);
});