/**
 * ueditor完整配置项
 * 可以在这里配置整个编辑器的特性
 */
/**************************提示********************************
 * 所有被注释的配置项均为UEditor默认值。
 * 修改默认配置请首先确保已经完全明确该参数的真实用途。
 * 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
 * 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
 **************************提示********************************/

(function () {

    /**
     * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
     * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
     * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/ueditor/"这样的路径。
     * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
     * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
     * window.UEDITOR_HOME_URL = "/xxxx/xxxx/";
     */
    var URL = window.UEDITOR_HOME_URL || getUEBasePath();

    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UEDITOR_CONFIG = {

        UEDITOR_HOME_URL: URL
        , serverUrl: Feng.ctxPath + "/ueditor/config"
        //字体设置 label留空支持多语言自动切换，若配置，则以配置值为准
        , 'fontfamily':
            [
                {label: '', name: 'songti', val: '宋体,SimSun'},
                {label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai'},
                {label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'},
                {label: '', name: 'heiti', val: '黑体, SimHei'},
                {label: '', name: 'lishu', val: '隶书, SimLi'},
                {label: '', name: 'andaleMono', val: 'andale mono'},
                {label: '', name: 'arial', val: 'arial, helvetica,sans-serif'},
                {label: '', name: 'arialBlack', val: 'arial black,avant garde'},
                {label: '', name: 'comicSansMs', val: 'comic sans ms'},
                {label: '', name: 'impact', val: 'impact,chicago'},
                {label: '', name: 'timesNewRoman', val: 'times new roman'}
            ]
        , toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'print', 'preview', 'searchreplace', 'drafts', 'help'
        ]]
        , xssFilterRules: true
        , inputXssFilter: true
        , outputXssFilter: true
        , whitList: {
            a: ['target', 'href', 'title', 'class', 'style'],
            abbr: ['title', 'class', 'style'],
            address: ['class', 'style'],
            area: ['shape', 'coords', 'href', 'alt'],
            article: [],
            aside: [],
            audio: ['autoplay', 'controls', 'loop', 'preload', 'src', 'class', 'style'],
            b: ['class', 'style'],
            bdi: ['dir'],
            bdo: ['dir'],
            big: [],
            blockquote: ['cite', 'class', 'style'],
            br: [],
            caption: ['class', 'style'],
            center: [],
            cite: [],
            code: ['class', 'style'],
            col: ['align', 'valign', 'span', 'width', 'class', 'style'],
            colgroup: ['align', 'valign', 'span', 'width', 'class', 'style'],
            dd: ['class', 'style'],
            del: ['datetime'],
            details: ['open'],
            div: ['class', 'style'],
            dl: ['class', 'style'],
            dt: ['class', 'style'],
            em: ['class', 'style'],
            font: ['color', 'size', 'face'],
            footer: [],
            h1: ['class', 'style'],
            h2: ['class', 'style'],
            h3: ['class', 'style'],
            h4: ['class', 'style'],
            h5: ['class', 'style'],
            h6: ['class', 'style'],
            header: [],
            hr: [],
            i: ['class', 'style'],
            img: ['src', 'alt', 'title', 'width', 'height', 'id', '_src', 'loadingclass', 'class', 'data-latex', 'style'],
            ins: ['datetime'],
            li: ['class', 'style'],
            mark: [],
            nav: [],
            ol: ['class', 'style'],
            p: ['class', 'style', 'data-background'],
            pre: ['class', 'style'],
            s: [],
            section: [],
            small: [],
            span: ['class', 'style'],
            sub: ['class', 'style'],
            sup: ['class', 'style'],
            strong: ['class', 'style'],
            table: ['width', 'border', 'align', 'valign', 'class', 'style', 'cellpadding', 'cellspacing'],
            tbody: ['align', 'valign', 'class', 'style'],
            td: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
            tfoot: ['align', 'valign', 'class', 'style'],
            th: ['width', 'rowspan', 'colspan', 'align', 'valign', 'class', 'style'],
            thead: ['align', 'valign', 'class', 'style'],
            tr: ['rowspan', 'align', 'valign', 'class', 'style'],
            tt: [],
            u: [],
            ul: ['class', 'style'],
            video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'class', 'style'],
            source: ['src', 'type'],
            embed: ['type', 'class', 'pluginspage', 'src', 'width', 'height', 'align', 'style', 'wmode', 'play', 'autoplay', 'loop', 'menu', 'allowscriptaccess', 'allowfullscreen', 'controls', 'preload'],
            iframe: ['src', 'class', 'height', 'width', 'max-width', 'max-height', 'align', 'frameborder', 'allowfullscreen']
        }
    };

    function getUEBasePath(docUrl, confUrl) {

        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());

    }

    function getConfigFilePath() {

        var configPath = document.getElementsByTagName('script');

        return configPath[configPath.length - 1].src;

    }

    function getBasePath(docUrl, confUrl) {

        var basePath = confUrl;


        if (/^(\/|\\\\)/.test(confUrl)) {

            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');

        } else if (!/^[a-z]+:/i.test(confUrl)) {

            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');

            basePath = docUrl + "" + confUrl;

        }

        return optimizationPath(basePath);

    }

    function optimizationPath(path) {

        var protocol = /^[a-z]+:\/\//.exec(path)[0],
            tmp = null,
            res = [];

        path = path.replace(protocol, "").split("?")[0].split("#")[0];

        path = path.replace(/\\/g, '/').split(/\//);

        path[path.length - 1] = "";

        while (path.length) {

            if ((tmp = path.shift()) === "..") {
                res.pop();
            } else if (tmp !== ".") {
                res.push(tmp);
            }

        }

        return protocol + res.join("/");

    }

    window.UE = {
        getUEBasePath: getUEBasePath
    };

})();
