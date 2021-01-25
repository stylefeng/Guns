/**
 * webSocket简单封装
 *
 * @author liuhanqing
 * @date 2021/1/25 22:47
 */
layui.define(['jquery', 'layer'], function (exports) {
    var $ = layui.$;
    var layer = layui.layer;

    var ws = function (param) {
        var _self = this;
        var emptyFun = function (data) {
            console.log(data)
        };
        _self.version = "1.0";//版本
        _self.reCount = param.reCount ? param.reCount : 5;//重连次数
        _self.lockReconnect = false; //重连标识
        _self.wsReconnectHandler = null; //重连标识
        var WebSocket = window.WebSocket || window.MozWebSocket || 0;
        if (!WebSocket) {
            _self.result = 0;
            _self.msg = "您的浏览器不支持WebSocket";
            (param.connectErr || emptyFun)(_self.msg);
            return;
        }

        var func = {};
        var msgList = [];//等待发送的信息
        _self.connect = function () {
            debugger
            try {
                func.WebSocket = new WebSocket(param.wsUrl);
                if (func.WebSocket) {
                    _self.initEventHandle()
                }
            } catch (e) {
                (param.connectErr || emptyFun)(e);
                _self.lockReconnect = false;
                _self.reconnect()
            }
        }

        _self.reconnect = function (msg) {
            debugger
            if (_self.lockReconnect || _self.reCount <= 0) {
                return;
            }
            _self.lockReconnect = true;
            // 没连接上1s 后重试
            _self.wsReconnectHandler && clearTimeout(_self.wsReconnectHandler);
            _self.wsReconnectHandler = setTimeout(function () {
                _self.reCount--;
                _self.connect();
                _self.lockReconnect = false;
            }, 1000)
        }
        _self.send = function (msg) {
            debugger
            var state = func.WebSocket.readyState;
            if (state > 1) {
                console.log("连接已经失败，状态码为：" + state);
                return false
            }
            if (state == 0) {//未连接
                msgList.push(msg);
            }
            if (state == 1) {//已经连接成功
                func.WebSocket.send(msg);
            }
            if (typeof param.WsSend === 'function') {
                param.WsSend(msg);
            }

        }
        _self.close = function (a) {
            try {
                func.WebSocket.close();
            } catch (e) {
                (param.connectErr || emptyFun)(e);
            }

        }


        _self.initEventHandle = function () {
            try {
                func.WebSocket.onopen = function (event) {
                    for (var i = 0; i < msgList.length; i++) {
                        func.WebSocket.send(msgList[i]);
                        msgList.shift();
                    }
                    //console.log("onopen");
                    //console.log(event);
                    if (typeof param.onWsOpen === 'function') {
                        param.onWsOpen(event);
                    }
                }

                func.WebSocket.onmessage = function (event) {
                    //console.log("onmessage");
                    //console.log(event);
                    (param.onWsMessage || emptyFun)(event);
                }

                func.WebSocket.onclose = function (event) {

                    _self.lockReconnect = false;
                    _self.reconnect()
                    msgList = [];
                    if (typeof param.onWsClose === 'function') {
                        param.onWsClose(event);
                    }
                }

                func.WebSocket.onerror = function (event) {

                    _self.lockReconnect = false;
                    _self.reconnect()
                    msgList = [];

                    if (typeof param.onWsError === 'function') {
                        param.onWsError(event);
                    } else {
                        console.log(e);
                        console.log("连接错误");
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }


        _self.connect();

    }
    var initFunc = {
        render: function (options) {
            var inst = new ws(options)
            return inst;
        }
    };
    exports('ws', initFunc);
});
