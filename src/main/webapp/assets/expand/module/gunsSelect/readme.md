1.添加html标签
<select name="city" id="city" lay-verify="" lay-search>
    <option value="">请选择</option>
</select>

2.引入layui 模块组件'dict'
layui.use(['gunsSelect'], function () {
    var gunsSelect = layui.gunsSelect;
    // 渲染组件
    gunsSelect.render({
            url: Feng.ctxPath + '/dict/getDictList',
            elem: '#city',
            fields: {name: 'dictName', value: 'dictCode'},
            where:{code:123}
    });
}

