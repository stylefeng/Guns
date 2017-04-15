@/*
    表单中input框标签中各个参数的说明:

    id : input框id
    name : input框名称
@*/
<div class="form-group">
    <label class="col-sm-3 control-label">${name}</label>
    <div class="col-sm-9">
        <input class="form-control" type="text" id="${id}" value="${value!}">
    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}


