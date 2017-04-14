@/*
    按钮标签中各个参数的说明:

    spaceCss : 按钮左侧是否有间隔(true/false)
    clickFun : 点击按钮所执行的方法
    icon : 按钮上的图标的样式
    name : 按钮名称
@*/

@var spaceCss = "";
@if(isEmpty(space)){
@   spaceCss = "";
@}else{
@   spaceCss = "button-margin";
@}
<button type="button" class="btn btn-primary ${spaceCss}" onclick="${clickFun}">
    <i class="fa ${icon}"></i>&nbsp;${name}
</button>

