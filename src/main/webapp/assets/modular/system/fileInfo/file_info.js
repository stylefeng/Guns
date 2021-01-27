layui.use(['table', 'form', 'func', 'HttpRequest', 'util', 'upload'], function () {
    var $ = layui.$;
    var table = layui.table;
    var form = layui.form;
    var func = layui.func;
    var HttpRequest = layui.HttpRequest;
    var util = layui.util;
    var upload = layui.upload;
    var layer = layui.layer;


    // 职位表管理
    var FileInfo = {
        tableId: "fileTable"
    };

    // 初始化表格的列
    FileInfo.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'fileId', hide: true, title: '主键id'},
            {
                title: '图片', templet: function (d) {
                    var url = d.imgUrl || Feng.ctxPath + '/sysFileInfo/previewByObjectName?fileBucket=' + d.fileBucket + '&fileObjectName=' + d.fileObjectName;
                    return '<img data-index="' + (d.LAY_INDEX - 1) + '" src="' + url + '" class="tb-img-circle" tb-img alt=""/>';
                }, align: 'center', unresize: true
            },
            {field: 'fileLocation', sort: true, title: '存储位置'},
            {field: 'fileOriginName', sort: true, title: '文件名称'},
            {field: 'secretFlag', sort: true, title: '是否机密'},
            {field: 'fileSuffix', sort: true, title: '文件后缀'},
            {field: 'fileSizeInfo', sort: true, title: '文件大小'},
            {
                field: 'createTime', sort: true, title: '创建时间', templet: function (d) {
                    return util.toDateString(d.createTime);
                }
            },
            {field: 'createUserName', sort: true, title: '创建人'},
            {align: 'center', toolbar: '#tableBar', title: '操作', width: 230}
        ]];
    };
    /* 点击图片放大 */
    $(document).off('click.tbImg').on('click.tbImg', '[tb-img]', function () {
        var imgList = table.cache[FileInfo.tableId].map(function (d) {
            return {
                alt: d.nickName,
                src: d.imgUrl || Feng.ctxPath + '/sysFileInfo/previewByObjectName?fileBucket=' + d.fileBucket + '&fileObjectName=' + d.fileObjectName
            }
        });
        layer.photos({photos: {data: imgList, start: $(this).data('index')}, shade: .1, closeBtn: true});
    });

    //上传
    var uploadInst = upload.render({
        elem: '#btnUpload' //绑定元素
        , url: Feng.ctxPath + '/sysFileInfo/upload?secretFlag=N' //上传接口
        , done: function (res) {
            //上传完毕回调
            Feng.success("上传成功!");

            FileInfo.search();
        }
        , error: function (err) {
            //请求异常回调
            Feng.error("上传失败！" + err.message);
        }
    });


    // 点击查询按钮
    FileInfo.search = function () {
        var queryData = {};
        queryData['fileOriginName'] = $("#fileOriginName").val();
        //queryData['positionCode'] = $("#positionCode").val();
        table.reload(FileInfo.tableId, {
            where: queryData,
            page: {curr: 1}
        });
    };


    // 点击详情
    FileInfo.openDetails = function (data) {
        func.open({
            title: '详情',
            content: Feng.ctxPath + '/view/fileInfoDetails?fileId=' + data.fileId,
            tableId: FileInfo.tableId
        });
    };


    // 点击删除
    FileInfo.onDeleteFile = function (data) {
        var operation = function () {
            var httpRequest = new HttpRequest(Feng.ctxPath + "/sysFileInfo/deleteReally", 'post', function (data) {
                Feng.success("删除成功!");
                table.reload(FileInfo.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.message + "!");
            });
            httpRequest.set(data);
            httpRequest.start(true);
        };
        Feng.confirm("是否删除?", operation);
    };


    // 下载
    FileInfo.onFileDownload = function (data) {
        if (data.secretFlag === 'Y') {
            window.location.href = Feng.ctxPath + '/sysFileInfo/privateDownload?fileId=' + data.fileId;
        } else {
            window.location.href = Feng.ctxPath + '/sysFileInfo/publicDownload?fileId=' + data.fileId;
        }
    }

    // 预览
    FileInfo.openPreview = function (data) {
        var imgUrl = Feng.ctxPath + '/sysFileInfo/previewByObjectName?fileBucket=' + data.fileBucket + '&fileObjectName=' + data.fileObjectName;
        layer.photos({photos: {"data": [{"src": imgUrl}]}, shade: .1, closeBtn: true});
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + FileInfo.tableId,
        url: Feng.ctxPath + '/sysFileInfo/fileInfoListPage',
        page: true,
        request: {pageName: 'pageNo', limitName: 'pageSize'}, //自定义分页参数
        height: "full-158",
        cellMinWidth: 100,
        cols: FileInfo.initColumn(),
        parseData: Feng.parseData
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        FileInfo.search();
    });


    // 工具条点击事件
    table.on('tool(' + FileInfo.tableId + ')', function (obj) {
        var data = obj.data;
        var event = obj.event;
        if (event === 'details') {
            FileInfo.openDetails(data);
        } else if (event === 'delete') {
            FileInfo.onDeleteFile(data);
        } else if (event === 'download') {
            FileInfo.onFileDownload(data);
        } else if (event === 'preview') {
            FileInfo.openPreview(data);
        }
    });

    // 修改状态
    form.on('switch(status)', function (obj) {
        var fileInfoId = obj.elem.value;
        var checked = obj.elem.checked ? 1 : 2;
        FileInfo.updateStatus(fileInfoId, checked);
    });
});
