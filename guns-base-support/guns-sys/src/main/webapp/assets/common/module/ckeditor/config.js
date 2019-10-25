/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.baseFloatZIndex = 19892000;

    // 图片上传配置
    config.image_previewText = ' ';  // 清除图片预览的文字
    config.filebrowserImageUploadUrl = "../../../json/editor_ok.json";  // 图片上传url

    // 文件上传配置(音频、视频、flash等)
    config.filebrowserUploadUrl = "../../../json/editor_error.json";  // 文件上传url

    // 操作按钮布局配置
    config.toolbarGroups = [
        {name: 'document', groups: ['mode', 'document', 'doctools']},
        {name: 'clipboard', groups: ['clipboard', 'undo']},
        {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
        {name: 'forms', groups: ['forms']},
        {name: 'colors', groups: ['colors']},
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'paragraph', groups: ['align', 'list', 'indent', 'blocks', 'bidi', 'paragraph']},
        {name: 'links', groups: ['links']},
        {name: 'insert', groups: ['insert']},
        {name: 'styles', groups: ['styles']},
        {name: 'tools', groups: ['tools']}
    ];

    // 移除的按钮
    config.removeButtons = 'Cut,Copy,Paste,PasteText,PasteFromWord,Anchor,ShowBlocks,CopyFormatting,RemoveFormat';
};
