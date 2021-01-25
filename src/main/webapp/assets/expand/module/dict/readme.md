1.添加html标签
<div id="demo1" class="xm-select-demo"></div>

2.引入layui 模块组件'dict'
layui.use(['dict'], function () {

    var dict = layui.dict;
    // 渲染组件
    dict.render({
            elem: '#demo2', //控件
            code: '' //字典dictTypeCode
    });

}

