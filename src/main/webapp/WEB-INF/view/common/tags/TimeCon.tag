<div class="input-group">
    <div class="input-group-btn">
        <button data-toggle="dropdown" class="btn btn-white dropdown-toggle"
                type="button">${name}
        </button>
    </div>
    <input type="text" class="form-control layer-date"
           onclick="laydate({istime: ${isTime}, format: '${pattern}'})" id="${id}" />
</div>