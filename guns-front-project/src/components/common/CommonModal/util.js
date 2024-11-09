export const containerClass = 'guns-modal-container';
export const closedClass = 'guns-modal-closed';
export const movableClass = 'guns-modal-movable';
export const moveOutClass = 'guns-modal-move-out';
export const moveOutPositiveClass = 'guns-modal-move-out-positive';
export const resizableClass = 'guns-modal-resizable';
export const resizableHorizontalClass = 'guns-modal-resizable-horizontal';
export const resizableVerticalClass = 'guns-modal-resizable-vertical';
export const multipleClass = 'guns-modal-multiple';
export const fullscreenClass = 'guns-modal-wrap-fullscreen';
export const innerClass = 'guns-modal-inner';
export const hideClass = 'guns-modal-hide';
export const closedResetClass = 'guns-modal-closed-reset';
//
export const noResponsiveClass = 'guns-modal-no-responsive';
export const collapseClass = 'guns-state-collapse';
export const navCollapseClass = 'guns-state-nav-collapse';
export const bodyFullscreenClass = 'guns-state-body-fullscreen';
export const showTabsClass = 'guns-state-show-tabs';
export const sideMixClass = 'guns-state-side-mix';
export const sideMixSingleClass = 'guns-state-side-mix-single';
export const layoutTopClass = 'guns-state-layout-top';
export const contentFullscreenClass = 'guns-state-content-fullscreen';
export const mobileClass = 'guns-state-mobile';
//
const wrapClass = 'ant-modal-wrap';
const modalClass = 'ant-modal';
const headerClass = 'ant-modal-header';
const modalDefaultZIndex = 1000;
const defaultMinWidth = 260;
const defaultMinHeight = 160;
let movableIsUse = false;
let resizableIsUse = false;
let setTopIsUse = false;

/**
 * 初始化 modal 样式
 */
function initModalStyle(modalEl) {
    modalEl.style.top = modalEl.offsetTop + 'px';
    modalEl.style.left = modalEl.offsetLeft + 'px';
    modalEl.style.bottom = 'auto';
    modalEl.style.right = 'auto';
    modalEl.style.margin = '0';
    modalEl.style.position = 'relative';
    modalEl.style.display = 'inline-block';
    modalEl.style.verticalAlign = 'top';
}

/**
 * 查找最近的父元素
 * @param el 目标元素
 * @param parentClass 父元素class
 */
export function queryParentByClass(
    el,
    parentClass,
    stopHandle
) {
    if (el == null || el === document) {
        return;
    }
    if (el.classList?.contains(parentClass)) {
        return el;
    }
    if (stopHandle && stopHandle(el) === true) {
        return;
    }
    return queryParentByClass(el.parentNode, parentClass);
}

/**
 * 获取 dom 样式
 * @param el
 */
function getCurrentStyle(el) {
    return el['currentStyle'] || window.getComputedStyle(el, null) || {};
}

/**
 * 获取样式对象的字符形式
 */
export function getStyleString(obj) {
    const keys = Object.keys(obj);
    if (!keys.length) {
        return '';
    }
    return keys.map((key) => key + ':' + obj[key]).join(';') + ';';
}

/**
 * 获取支持同时打开多个时的弹窗容器
 */
export function getModalContainer() {
    const elem = document.querySelector('.' + containerClass);
    if (elem) {
        return elem;
    }
    const el = document.createElement('div');
    el.classList.add(containerClass);
    document.body.appendChild(el);
    return el;
}

/**
 * 支持打开多个时获取所有已打开的弹窗
 */
function getVisibleModalWrap() {
    return getModalContainer().querySelectorAll(
        `.${wrapClass}:not(.${closedClass})`
    );
}

/**
 * 支持打开多个时获取已打开的最大 zIndex
 */
function getModalMaxIndex(el) {
    const wrapEl = getVisibleModalWrap();
    let maxIndex = 0;
    if (wrapEl) {
        for (let i = 0; i < wrapEl.length; i++) {
            const index = Number(
                getCurrentStyle(wrapEl[i]).zIndex || modalDefaultZIndex
            );
            if (index >= maxIndex) {
                if (el) {
                    if (wrapEl[i] !== el) {
                        maxIndex = index + 1;
                    }
                } else {
                    maxIndex = index + 1;
                }
            }
        }
    }
    return maxIndex || modalDefaultZIndex;
}

/**
 * 弹窗移动事件处理
 */
const modalMovableListener = function (event) {
    const headerEl = queryParentByClass(event.target, headerClass);
    if (!headerEl) {
        return;
    }
    const modalEl = headerEl.parentNode?.parentNode;
    const wrapEl = modalEl?.parentNode;
    const wrapClass = wrapEl?.classList;
    if (wrapClass?.contains(fullscreenClass)) {
        return;
    }
    const moveOut = wrapClass?.contains(moveOutClass);
    const moveOutPositive = wrapClass?.contains(moveOutPositiveClass);
    const multiple = wrapClass?.contains(multipleClass);
    if (!wrapClass?.contains(movableClass) && !moveOut) {
        return;
    }
    modalEl.style.userSelect = 'none';
    initModalStyle(modalEl);
    // 获取原始位置
    const downX = event.clientX;
    const downY = event.clientY;
    const downOL = modalEl.offsetLeft;
    const downOT = modalEl.offsetTop;

    // 鼠标移动事件
    const mousemoveFn = function (e) {
        let l = e.clientX - downX + downOL;
        let t = e.clientY - downY + downOT;
        // 边界判断
        if (!moveOut) {
            const limitL = wrapEl.clientWidth - modalEl.clientWidth - 1;
            if (l < 0) {
                l = 0;
            } else if (l > limitL) {
                l = limitL;
            }
            const limitT = wrapEl.clientHeight - modalEl.clientHeight - 1;
            if (t > limitT) {
                t = limitT;
            }
            if (t < 0) {
                t = 0;
            }
        } else if (moveOutPositive) {
            const limitL = wrapEl.clientWidth - 50;
            if (l < 0) {
                l = 0;
            } else if (multiple && l > limitL) {
                l = limitL;
            }
            const limitT = wrapEl.clientHeight - 50;
            if (multiple && t > limitT) {
                t = limitT;
            }
            if (t < 0) {
                t = 0;
            }
        }
        // 移动 dialog
        modalEl.style.left = l + 'px';
        modalEl.style.top = t + 'px';
        modalEl.style.transformOrigin = 'center';
    };

    // 鼠标抬起事件
    const mouseupFn = function () {
        modalEl.style.userSelect = '';
        document.removeEventListener('mousemove', mousemoveFn);
        document.removeEventListener('mouseup', mouseupFn);
    };

    // 添加鼠标事件监听
    document.addEventListener('mousemove', mousemoveFn);
    document.addEventListener('mouseup', mouseupFn);
};

/**
 * 弹窗拉伸事件处理
 */
const modalResizableListener = function (event) {
    const modalEl = queryParentByClass(event.target, modalClass);
    if (!modalEl) {
        return;
    }
    const wrapEl = modalEl.parentNode;
    const wrapClass = wrapEl?.classList;
    if (!wrapClass?.contains(resizableClass)) {
        return;
    }
    if (wrapClass?.contains(fullscreenClass)) {
        return;
    }
    const moveOut = wrapClass?.contains(moveOutClass);
    const canSetWidth = !wrapClass?.contains(resizableVerticalClass);
    const canSetHeight = !wrapClass?.contains(resizableHorizontalClass);
    const limitX =
        modalEl.clientWidth +
        modalEl.offsetLeft -
        wrapEl.scrollLeft +
        wrapEl.offsetLeft;
    const limitY =
        modalEl.clientHeight +
        modalEl.offsetTop -
        wrapEl.scrollTop +
        wrapEl.offsetTop;
    if (
        event.clientX > limitX ||
        limitX - event.clientX > 10 ||
        event.clientY > limitY ||
        limitY - event.clientY > 10
    ) {
        return;
    }
    modalEl.style.userSelect = 'none';
    initModalStyle(modalEl);
    // 获取原始位置
    const downX = event.clientX;
    const downY = event.clientY;
    const downW = modalEl.clientWidth;
    const downH = modalEl.clientHeight;

    // 鼠标移动事件
    const mousemoveFn = function (e) {
        if (canSetWidth) {
            const w = e.clientX - downX + downW;
            const maxW = wrapEl.clientWidth - modalEl.offsetLeft - 1;
            const nw =
                (w < defaultMinWidth
                    ? defaultMinWidth
                    : !moveOut && w > maxW
                        ? maxW
                        : w) + 'px';
            modalEl.style.width = nw;
            modalEl.style.maxWidth = nw;
            modalEl.style.minWidth = nw;
        }
        if (canSetHeight) {
            const h = e.clientY - downY + downH;
            const maxH = wrapEl.clientHeight - modalEl.offsetTop - 1;
            const nh =
                (h < defaultMinHeight
                    ? defaultMinHeight
                    : !moveOut && h > maxH
                        ? maxH
                        : h) + 'px';
            modalEl.style.height = nh;
            modalEl.style.maxHeight = nh;
            modalEl.style.minHeight = nh;
        }
        modalEl.style.transformOrigin = 'center';
    };

    // 鼠标抬起事件
    const mouseupFn = function () {
        modalEl.style.userSelect = '';
        document.removeEventListener('mousemove', mousemoveFn);
        document.removeEventListener('mouseup', mouseupFn);
    };

    // 添加鼠标事件监听
    document.addEventListener('mousemove', mousemoveFn);
    document.addEventListener('mouseup', mouseupFn);
};

/**
 * 弹窗点击置顶事件处理
 */
const modalAutoSetTopListener = function (event) {
    const modalEl = queryParentByClass(event.target, modalClass);
    setModalTop(modalEl);
};

/**
 * 弹窗支持拖动
 */
export function useModalMovable() {
    if (movableIsUse) {
        return;
    }
    movableIsUse = true;
    document.removeEventListener('mousedown', modalMovableListener);
    document.addEventListener('mousedown', modalMovableListener);
}

/**
 * 弹窗支持拉伸
 */
export function useModalResizable() {
    if (resizableIsUse) {
        return;
    }
    resizableIsUse = true;
    document.removeEventListener('mousedown', modalResizableListener);
    document.addEventListener('mousedown', modalResizableListener);
}

/**
 * 弹窗点击自动置顶
 */
export function useModalAutoSetTop() {
    if (setTopIsUse) {
        return;
    }
    setTopIsUse = true;
    document.removeEventListener('mousedown', modalAutoSetTopListener);
    document.addEventListener('mousedown', modalAutoSetTopListener);
}

/**
 * 让弹窗置顶
 * @param modalEl
 */
export function setModalTop(modalEl) {
    const wrapEl = modalEl?.parentNode;
    if (!wrapEl?.classList?.contains(multipleClass)) {
        return;
    }
    const zIndex = Number(getCurrentStyle(wrapEl).zIndex || modalDefaultZIndex);
    const maxIndex = getModalMaxIndex(wrapEl);
    if (maxIndex > zIndex) {
        wrapEl.style.zIndex = String(maxIndex);
        const rootEl = wrapEl.parentNode;
        if (rootEl) {
            rootEl.style.setProperty('--modal-multiple-z-index', String(maxIndex));
        }
    }
}

/**
 * 重置弹窗位置、大小等
 * @param selector 选择器
 * @param width 默认宽度
 */
export function resetModalStyle(
    modalEl,
    width
) {
    if (!modalEl) {
        return;
    }
    modalEl.style.top = '';
    modalEl.style.left = '';
    modalEl.style.bottom = '';
    modalEl.style.right = '';
    modalEl.style.margin = '';
    modalEl.style.position = '';
    modalEl.style.display = '';
    modalEl.style.verticalAlign = '';
    modalEl.style.height = '';
    modalEl.style.maxHeight = '';
    modalEl.style.minHeight = '';
    if (width != null) {
        modalEl.style.width = typeof width === 'number' ? width + 'px' : width;
    }
    modalEl.style.maxWidth = '';
    modalEl.style.minWidth = '';
}

/**
 * 设置弹窗位置
 * @param modalEl 弹窗 el
 * @param position 位置
 * @param moveOut 是否可以拉出容器
 */
export function setModalPosition(
    modalEl,
    position,
    moveOut
) {
    const wrapEl = modalEl.parentNode;
    if (!wrapEl) {
        return;
    }
    initModalStyle(modalEl);
    const maxTop = wrapEl.clientHeight - modalEl.clientHeight - (moveOut ? 0 : 2);
    const maxLeft = wrapEl.clientWidth - modalEl.clientWidth - (moveOut ? 0 : 1);
    if (position === 'top') {
        modalEl.style.top = '0px';
        modalEl.style.left = `${maxLeft / 2}px`;
    } else if (position === 'bottom') {
        modalEl.style.top = `${maxTop}px`;
        modalEl.style.left = `${maxLeft / 2}px`;
    } else if (position === 'left') {
        modalEl.style.top = `${maxTop / 2}px`;
        modalEl.style.left = '0px';
    } else if (position === 'right') {
        modalEl.style.top = `${maxTop / 2}px`;
        modalEl.style.left = `${maxLeft}px`;
    } else if (position === 'leftTop') {
        modalEl.style.top = '0px';
        modalEl.style.left = '0px';
    } else if (position === 'leftBottom') {
        modalEl.style.top = `${maxTop}px`;
        modalEl.style.left = '0px';
    } else if (position === 'rightTop') {
        modalEl.style.top = '0px';
        modalEl.style.left = `${maxLeft}px`;
    } else if (position === 'rightBottom') {
        modalEl.style.top = `${maxTop}px`;
        modalEl.style.left = `${maxLeft}px`;
    } else if (position === 'center') {
        modalEl.style.top = `${maxTop / 2}px`;
        modalEl.style.left = `${maxLeft / 2}px`;
    } else if (typeof position === 'object') {
        if (position.top != null) {
            modalEl.style.top =
                typeof position.top === 'number' ? `${position.top}px` : position.top;
        } else if (position.left != null) {
            modalEl.style.top = `${maxTop / 2}px`;
        }
        if (position.left != null) {
            modalEl.style.left =
                typeof position.left === 'number'
                    ? `${position.left}px`
                    : position.left;
        } else if (position.top != null) {
            modalEl.style.left = `${maxLeft / 2}px`;
        }
    }
}

/**
 * 设置弹窗初始位置
 * @param modalEl 弹窗 el
 * @param position 位置
 * @param moveOut 是否可以拉出容器
 * @param force 是否强制更新
 */
export function setInitPosition(
    modalEl,
    position,
    moveOut,
    force
) {
    if (
        modalEl &&
        position &&
        (force || !modalEl.getAttribute('init-position'))
    ) {
        modalEl.setAttribute('init-position', '1');
        setModalPosition(modalEl, position, moveOut);
    }
}
