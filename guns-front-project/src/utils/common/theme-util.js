/** 主题切换方法 */
import { generate } from '@ant-design/colors';

/**
 * 切换主题色
 * @param color 颜色值
 * @param dark 是否暗黑模式
 */
export function changeColor(color, dark, darkClass = 'guns-admin-theme-dark') {
  const id = `guns-admin-theme-var`;
  const elem = document.getElementById(id);
  if (elem?.parentNode) {
    elem.parentNode.removeChild(elem);
  }
  if (color) {
    const colors = generate(color, dark ? { theme: 'dark' } : {});
    const clazz = dark ? `.${darkClass}` : ':root';
    const elem = document.createElement('style');
    elem.id = id;
    elem.setAttribute('type', 'text/css');
    elem.innerHTML =
      `${clazz}{` +
      colors
        .map((c, i) => {
          return `--primary-${i + 1}:${c};`;
        })
        .concat([`--primary-color:${color};`])
        .join('') +
      '}';
    document.head.appendChild(elem);
    document.body.dataset.theme = color;
  } else {
    document.body.removeAttribute('data-theme');
  }
  if (dark) {
    document.body.classList.add(darkClass);
  } else {
    document.body.classList.remove(darkClass);
  }
}
