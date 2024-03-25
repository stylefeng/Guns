/** 拖动事件封装 */
let isDragging = false;

/**
 * 拖动事件封装
 * @param element
 * @param options
 */
export default function (element, options) {
  // 鼠标移动事件
  const moveFn = function (event) {
    options.drag && options.drag(event);
  };

  // 鼠标抬起事件
  const upFn = function (event) {
    document.removeEventListener('mousemove', moveFn);
    document.removeEventListener('mouseup', upFn);
    document.onselectstart = null;
    document.ondragstart = null;
    isDragging = false;
    options.end && options.end(event);
  };

  // 鼠标按下事件
  element.addEventListener('mousedown', function (event) {
    if (isDragging) {
      return;
    }
    document.onselectstart = function () {
      return false;
    };
    document.ondragstart = function () {
      return false;
    };
    document.addEventListener('mousemove', moveFn);
    document.addEventListener('mouseup', upFn);
    isDragging = true;
    options.start && options.start(event);
  });
}
