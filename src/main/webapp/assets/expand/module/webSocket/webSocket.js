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
        _self.heartCheckHandler = null; //心跳检测
        _self.wsReconnectHandler = null; //重连处理器
        var WebSocket = window.WebSocket || window.MozWebSocket || 0;
        if (!WebSocket) {
            _self.result = 0;
            _self.msg = "您的浏览器不支持WebSocket";
            (param.connectErr || emptyFun)(_self.msg);
            return;
        }

        var func = {};
        var msgList = [];//等待发送的信息

        // 连接方法
        _self.connect = function () {
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

        // 心跳检测
        _self.heartCheck = function () {
            // 15s 发送心跳
            _self.heartCheckHandler && clearTimeout(_self.heartCheckHandler);
            _self.heartCheckHandler = setTimeout(function () {
                try {
                    // 发送心跳检测
                    _self.send("&")
                } catch (e) {
                    (param.connectErr || emptyFun)(e);
                    _self.lockReconnect = false;
                    _self.reconnect()
                }
                setTimeout(_self.heartCheck, 15000)
            }, 15000)
        }

        // 重新连接方法
        _self.reconnect = function () {
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

        // 发送消息方法
        _self.send = function (msg) {
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
                param.wsSend(msg);
            }

        }

        // 关闭连接方法
        _self.close = function (event) {
            try {
                func.WebSocket.close();
            } catch (e) {
                (param.connectErr || emptyFun)(e);
            }

        }

        // 绑定ws事件
        _self.initEventHandle = function () {
            try {
                func.WebSocket.onopen = function (event) {
                    _self.reCount = 5;
                    _self.heartCheck();
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
