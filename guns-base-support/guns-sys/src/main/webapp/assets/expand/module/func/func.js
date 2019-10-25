/**
 * 高频方法集
 *
 * @author fengshuonan
 * @Date 2019/7/29 21:20
 */
layui.define(['jquery', 'layer', 'admin', 'table', 'ax', 'form'], function (exports) {
    var $ = layui.$;
    var layer = layui.layer;
    var admin = layui.admin;
    var table = layui.table;
    var $ax = layui.ax;
    var form = layui.form;

    var func = {

        /**
         * 拼接下拉字典
         */
        initDictSelect: function (url, selectId, optValue, optName) {
            $("#" + selectId).html('<option value="">请选择</option>');
            var ajax = new $ax(Feng.ctxPath + url, function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    var optionValue = data.data[i][optValue];
                    var optionName = data.data[i][optName];
                    $("#" + selectId).append('<option value="' + optionValue + '">' + optionName + '</option>');
                }
                form.render();
            }, function (data) {
            });
            ajax.start();
        },

        /**
         * 获取内部高度，返回数值
         */
        getClientHeight: function () {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            } else {
                clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            }
            return clientHeight;
        },

        /**
         * 获取内部高度，返回字符串
         */
        getClientHeightPx: function () {
            return Feng.getClientHeight() + 'px';
        },

        /**
         * 打开表单的弹框
         */
        open: function (param) {

            //宽度计算
            var width = '1000px';
            if (param.width) {
                width = param.width;
            }

            //计算高度
            var clientHeight = func.getClientHeight();
            if (param.height) {
                if (clientHeight < param.height) {
                    param.area = [width, clientHeight + "px"];
                } else {
                    param.area = [width, param.height + "px"];
                }
            } else {
                param.area = [width, clientHeight + "px"];
            }

            param.skin = 'layui-layer-admin';
            param.offset = '35px';
            param.type = 2;

            admin.putTempData('formOk', false);
            param.end = function () {
                layer.closeAll('tips');
                if (param.tableId) {
                    admin.getTempData('formOk') && table.reload(param.tableId);
                }

                if (param.endCallback) {
                    admin.getTempData('formOk') && param.endCallback();
                }
            };

            if (!param.fixed) {
                param.fixed = false;
            }

            if (!param.resize) {
                param.resize = false;
            }

            if (!param.shade) {
                param.shade = .1;
            }

            var thisIndex = top.layui.layer.open(param);

            //按键监听esc关闭对话框
            $(window).keydown(function (event) {
                if (event.keyCode === 27) {
                    parent.layer.close(thisIndex)
                }
            });

            return thisIndex;
        }
    };

    exports('func', func);
});