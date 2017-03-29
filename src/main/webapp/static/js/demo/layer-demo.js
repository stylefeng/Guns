/*! layer demo */ ;
! function () {
    var gather = {
        htdy: $('html, body')
    };

    //一睹为快
    gather.demo1 = $('#demo1');
    $('#chutiyan>a').on('click', function () {
        var othis = $(this),
            index = othis.index();
        var p = gather.demo1.children('p').eq(index);
        var top = p.position().top;
        gather.demo1.animate({
            scrollTop: gather.demo1.scrollTop() + top
        }, 0);
        switch (index) {
        case 0:
            var icon = -1;
            (function changeIcon() {
                var index = parent.layer.alert('点击确认更换图标', {
                    icon: icon,
                    shadeClose: true,
                    title: icon === -1 ? '初体验' : 'icon：' + icon
                }, changeIcon);
                if (8 === ++icon) layer.close(index);
            }());
            break;
        case 1:
            var icon = 0;
            (function changeIcon1() {
                var index = parent.layer.alert('点击确认更换图标', {
                    icon: icon,
                    shadeClose: true,
                    skin: 'layer-ext-moon',
                    shift: 5,
                    title: icon === -1 ? '第三方扩展皮肤' : 'icon：' + icon
                }, changeIcon1);
                if (9 === ++icon) {
                    parent.layer.confirm('怎么样，是否很喜欢该皮肤，去下载？', {
                        skin: 'layer-ext-moon'
                    }, function (index, layero) {
                        layero.find('.layui-layer-btn0').attr({
                            href: 'http://layer.layui.com/skin.html',
                            target: '_blank'
                        });
                        parent.layer.close(index);
                    });
                };
            }());
            break;
        case 6:
            parent.layer.open({
                type: 1,
                area: ['420px', '240px'],
                skin: 'layui-layer-rim', //加上边框
                content: '<div style="padding:20px;">即直接给content传入html字符<br>当内容宽高超过定义宽高，会自动出现滚动条。<br><br><br><br><br><br><br><br><br><br><br>很高兴在下面遇见你</div>'
            });
            break;
        case 7:
            parent.layer.open({
                type: 1,
                skin: 'layui-layer-demo',
                closeBtn: false,
                area: '350px',
                shift: 2,
                shadeClose: true,
                content: '<div style="padding:20px;">即传入skin:"样式名"，然后你就可以为所欲为了。<br>你怎么样给她整容都行<br><br><br>我是华丽的酱油==。</div>'
            });
            break;
        case 8:
            layer.tips('Hi，我是tips', this);
            break;
        case 11:
            var ii = parent.layer.load(0, {
                shade: false
            });
            setTimeout(function () {
                parent.layer.close(ii)
            }, 5000);
            break;
        case 12:
            var iii = parent.layer.load(1, {
                shade: [0.1, '#fff']
            });
            setTimeout(function () {
                parent.layer.close(iii)
            }, 3000);
            break;
        case 13:
            layer.tips('我是另外一个tips，只不过我长得跟之前那位稍有些不一样。', this, {
                tips: [1, '#3595CC'],
                time: 4000
            });
            break;
        case 14:
            parent.layer.prompt({
                title: '输入任何口令，并确认',
                formType: 1
            }, function (pass) {
                parent.layer.prompt({
                    title: '随便写点啥，并确认',
                    formType: 2
                }, function (text) {
                    parent.layer.msg('演示完毕！您的口令：' + pass + '<br>您最后写下了：' + text);
                });
            });
            break;
        case 15:
            parent.layer.tab({
                area: ['600px', '300px'],
                tab: [{
                    title: '无题',
                    content: '<div style="padding:20px; line-height:30px; text-align:center">欢迎体验layer.tab<br>此时此刻不禁让人吟诗一首：<br>一入前端深似海<br>从此妹纸是浮云<br>以下省略七个字<br>。。。。。。。<br>——贤心</div>'
                }, {
                    title: 'TAB2',
                    content: '<div style="padding:20px;">TAB2该说些啥</div>'
                }, {
                    title: 'TAB3',
                    content: '<div style="padding:20px;">有一种坚持叫：layer</div>'
                }]
            });
            break;
        case 16:
            if (gather.photoJSON) {
                layer.photos({
                    photos: gather.photoJSON
                });
            } else {
                $.getJSON('js/demo/photos.json?v=', function (json) {
                    gather.photoJSON = json;
                    layer.photos({
                        photos: json
                    });
                });
            }
            break;
        default:
            new Function(p.text())();
            break;
        }
    });
}();
