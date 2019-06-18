/**
 * 下拉菜单
 *
 * @author  王帆
 * @version  1.2
 * @date 2018-12-10
 */
layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;
    var noAnchorClass = 'dropdown-no-anchor';  // 不要小三角
    var hasShadeClass = 'dropdown-has-shade';  // 加遮罩颜色
    var triggerOpenClass = 'dropdown-open';  // 打开
    var dropdownOpenClass = 'dropdown-opened';  // 打开
    var dropdownDisableClass = 'dropdown-disabled';  // 禁用
    var htmlNoScrollClass = 'dropdown-no-scroll';  // 禁止滚动
    var shadeClass = 'dropdown-menu-shade';  // 遮罩层
    var anchorClass = 'dropdown-anchor';  // 小三角
    var fixedClass = 'fixed';

    var dropdown = {
        ANCHOR_POSITIONS: ['top-left', 'top-center', 'top-right', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right', 'left-top', 'left-center', 'left-bottom'],
        defaultPosition: 'top-left',
        init: function () {
            $('body').off('click.dropdown').on('click.dropdown', '[data-dropdown]', function (event) {
                if (event !== void 0) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                dropdown.showDropdown(event.currentTarget);
            });
            $('html').off('click.dropdown').on('click.dropdown', function () {
                dropdown.hideAll();
            });
            /*$(window).off('resize.dropdown').on('resize.dropdown', function () {
                dropdown.hideAll();
            });*/
        },
        showDropdown: function (target) {
            var $trigger = $(target);
            var $dropdown = $($trigger.data('dropdown'));
            if ($dropdown.length < 1) {
                return console.error('Could not find dropdown: ' + $trigger.data('dropdown'));
            }
            var isOpen = $trigger.hasClass(triggerOpenClass);  // 是否已展开
            var isDisabled = $trigger.hasClass(dropdownDisableClass);  // 是否禁用
            // dropdown.hideAll($trigger.data('dropdown'));
            dropdown.hideAll();
            if (isOpen || isDisabled) {
                return false;
            }

            // 显示遮罩层
            var isFixed = $dropdown.hasClass(fixedClass);
            if (isFixed) {
                $('html').addClass(htmlNoScrollClass);
                var hasShade = ' no-shade';
                if ($dropdown.hasClass(hasShadeClass)) {
                    hasShade = '';
                }
                $dropdown.after('<div class="' + shadeClass + hasShade + '"></div>');
            }

            // 获取配置的方向
            var sAnchor = $trigger.data('anchor');
            var anchorPosition = dropdown.defaultPosition;
            for (var i = 0; i < dropdown.ANCHOR_POSITIONS.length; i++) {
                var position = dropdown.ANCHOR_POSITIONS[i];
                if (position == sAnchor) {
                    anchorPosition = position;
                } else {
                    $dropdown.removeClass('dropdown-anchor-' + position);
                }
            }
            // 是否需要小三角
            if (!$dropdown.hasClass(noAnchorClass)) {
                if ($dropdown.find('.' + anchorClass).length <= 0) {
                    $dropdown.prepend('<div class="' + anchorClass + '"></div>');
                }
                $dropdown.addClass('dropdown-anchor-' + anchorPosition);
            }

            // 计算坐标位置
            var topLeft = dropdown.getTopLeft($trigger, $dropdown, anchorPosition);

            // 判断是否超出屏幕
            if (isFixed) {
                var aps = anchorPosition.split('-');
                if ('top' == aps[0]) {
                    if ((topLeft.top + $dropdown.outerHeight()) > dropdown.getPageHeight()) {
                        $trigger.data('anchor', 'bottom-' + aps[1]);
                        dropdown.showDropdown(target);
                        return;
                    }
                } else if ('bottom' == aps[0]) {
                    if (topLeft.top < 0) {
                        $trigger.data('anchor', 'top-' + aps[1]);
                        dropdown.showDropdown(target);
                        return;
                    }
                }
            }

            $dropdown.css({
                'top': topLeft.top,
                'left': topLeft.left
            });
            $trigger.addClass(triggerOpenClass);
            $dropdown.addClass(dropdownOpenClass);
        },
        hideAll: function (notElem) {
            var el = '.dropdown-menu';
            var trigger = '[data-dropdown]';
            if (notElem) {
                el += ':not(' + notElem + ')';
                trigger = '[data-dropdown!="' + notElem + '"]';
            }
            $(el).removeClass(dropdownOpenClass);
            $(trigger).removeClass(triggerOpenClass);
            $('.' + shadeClass).remove();
            $('html').removeClass(htmlNoScrollClass);
        },
        attach: function (elem, data) {
            $(elem).attr('data-dropdown', data);
        },
        detach: function (elem) {
            $(elem).removeAttr('data-dropdown');
        },
        show: function (elem) {
            $(elem).click();
        },
        hide: function (elem) {
            dropdown.hideAll();
        },
        enable: function (elem) {
            $(elem).removeClass(dropdownDisableClass);
        },
        // 获取浏览器高度
        getPageHeight: function () {
            return document.documentElement.clientHeight || document.body.clientHeight;
        },
        // 获取浏览器宽度
        getPageWidth: function () {
            return document.documentElement.clientWidth || document.body.clientWidth;
        },
        disable: function (elem) {
            $(elem).addClass(dropdownDisableClass);
        },
        getTopLeft: function ($trigger, $dropdown, position) {
            // 计算坐标
            var widthTrigger = $trigger.outerWidth();
            var heightTrigger = $trigger.outerHeight();
            var widthDropdown = $dropdown.outerWidth();
            var heightDropdown = $dropdown.outerHeight();
            var topTrigger = $trigger.position().top;
            var leftTrigger = $trigger.position().left;
            var $tParent = $trigger.parent();
            while (true) {
                if ($tParent == null || $tParent == undefined || $tParent.length <= 0 || $tParent[0].tagName == undefined) {
                    break;
                }
                var tPosition = $tParent.css('position');
                if (tPosition == 'relative' || tPosition == 'absolute') {
                    break;
                }
                $tParent = $tParent.parent();
            }
            if ($tParent && $tParent.length > 0 && $tParent[0].tagName) {
                topTrigger += $tParent.scrollTop();
            }
            if ($dropdown.hasClass(fixedClass)) {
                topTrigger = $trigger.offset().top - $(document).scrollTop();
                leftTrigger = $trigger.offset().left;
            }
            var bottomTrigger = topTrigger + heightTrigger;
            var rightTrigger = leftTrigger + widthTrigger;
            var top = 0;
            var left = 0;
            var positionParts = position.split('-');
            var anchorSide = positionParts[0];  // 箭头位置
            var anchorPosition = positionParts[1];  // 箭头方向
            if (anchorSide === 'top' || anchorSide === 'bottom') {
                switch (anchorPosition) {
                    case 'left':
                        left = leftTrigger;
                        break;
                    case 'center':
                        left = leftTrigger - widthDropdown / 2 + widthTrigger / 2;
                        break;
                    case 'right':
                        left = rightTrigger - widthDropdown;
                }
            }
            if (anchorSide === 'left' || anchorSide === 'right') {
                switch (anchorPosition) {
                    case 'top':
                        top = topTrigger;
                        break;
                    case 'center':
                        top = topTrigger - heightDropdown / 2 + heightTrigger / 2;
                        break;
                    case 'bottom':
                        top = topTrigger + heightTrigger - heightDropdown;
                }
            }
            switch (anchorSide) {
                case 'top':
                    top = topTrigger + heightTrigger;
                    break;
                case 'right':
                    left = leftTrigger - widthDropdown;
                    break;
                case 'bottom':
                    top = topTrigger - heightDropdown;
                    break;
                case 'left':
                    left = leftTrigger + widthTrigger;
            }
            return {top: top, left: left};
        }
    };

    layui.link(layui.cache.base + 'dropdown/dropdown.css');

    dropdown.init();

    exports('dropdown', dropdown);
});
