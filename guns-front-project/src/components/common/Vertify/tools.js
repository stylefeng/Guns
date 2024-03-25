class MiTools {
  /**
   * 是否为移动端.
   * 注: iPad Safari 获取的 ua 与 Mac Safari 一致, 需独立判断.
   * @returns
   */
  isMobile() {
    const ua = navigator.userAgent;
    const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    const isSafari = ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1;
    const isIPhone = ua.indexOf('iPhone') !== -1 && ua.indexOf('Version') !== -1;
    const isIPad = isSafari && !isIPhone && 'ontouchend' in document;
    let mobile = false;
    if (isIPad) {
      mobile = true;
    } else {
      for (let i = 0, len = agents.length; i < len; i++) {
        if (ua.indexOf(agents[i]) > 0) {
          mobile = true;
          break;
        }
      }
    }
    return mobile;
  }

  /**
   * Format string content.
   * @param str
   * @param formatter
   */
  formatEmpty(str, formatter) {
    if (this.isEmpty(str)) return formatter ?? '-';
    return str;
  }

  /**
   * Whether the string content is empty.
   * @param str
   * @param format
   */
  isEmpty(str, format = false) {
    let result = str === null || str == '' || typeof str === 'undefined';
    if (format) result = this.formatEmpty(str);
    return result;
  }

  /**
   * Whether the `element / params` is valid.
   * @param value
   */
  isValid(value) {
    return value !== undefined && value !== null && value !== '';
  }

  /**
   * Whether it is a number.
   * @param number
   */
  isNumber(number) {
    return typeof number === 'number' && isFinite(number);
  }

  /**
   * Get the password strength.
   * return a number level ( 1 - 4 ).
   * @param password
   */
  getPasswordStrength(password) {
    const reg = {
      lower: /[a-z]/,
      upper: /[A-Z]/,
      number: /[\d]/,
      character: /[~!@#$%^&*()_+=\-.,]/
    };
    let strength = 0;
    if (reg.lower.test(password)) strength++;
    if (reg.upper.test(password)) strength++;
    if (reg.number.test(password)) strength++;
    if (reg.character.test(password)) strength++;
    return strength;
  }

  /**
   * random.
   * @returns {string}
   */
  random() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  /**
   * Generate a random number within the specified range.
   * @param start
   * @param end
   * @returns {number}
   */
  randomNumberInRange(start, end) {
    return Math.round(Math.random() * (end - start) + start);
  }

  /**
   * Generate unique string.
   * @param upper
   * @returns {string}
   */
  uid(upper = false, prefix) {
    let str = (
      this.random() +
      this.random() +
      this.random() +
      this.random() +
      this.random() +
      this.random() +
      this.random() +
      this.random()
    ).toLocaleUpperCase();
    if (prefix) str = prefix + str;
    return upper ? str.toUpperCase() : str.toLowerCase();
  }

  /**
   * replace url parameters.
   * @param url
   * @param params
   * @returns
   */
  replaceUrlParams(url, params) {
    if (Object.keys(params).length > 0) {
      for (const i in params) {
        if (params.hasOwnProperty(i)) {
          const reg = new RegExp('{' + i + '}', 'gi');
          url = url.replace(reg, params[i]);
        }
      }
    }
    return url;
  }

  /**
   * Unit conversion.
   * @param value
   * @param base
   */
  px2Rem(value, base = 16) {
    return value ? Math.round((value / base) * 100) / 100 : value;
  }

  /**
   * 转成rem.
   * @param num
   * @returns
   */
  convert2Rem(num) {
    return $tools.isNumber(num)
      ? `${this.px2Rem(parseInt(num.toString()))}rem`
      : num
        ? /%/g.test(num.toString())
          ? num
          : `${this.px2Rem(parseInt(num.toString()))}rem`
        : null;
  }

  /**
   * convert color.
   * @param color
   * @param opacity
   */
  colorHex2Rgba(color, opacity = 1) {
    if (color) {
      const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      if (reg.test(color)) {
        if (color.length === 4) {
          let newColor = '#';
          for (let i = 1; i < 4; i++) {
            newColor += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = newColor;
        }
        const changeColor = [];
        for (let i = 1; i < 7; i += 2) {
          changeColor.push(parseInt('0x' + color.slice(i, i + 2)));
        }
        return `rgba(${changeColor.join(',')}, ${opacity})`;
      }
    } else return color;
  }

  /**
   * convert color.
   * @param color
   */
  colorRgb2Hex(color) {
    if (color) {
      const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      if (/^(rgb|RGB)/.test(color)) {
        const aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
        let strHex = '#';
        for (let i = 0; i < aColor.length; i++) {
          let hex = Number(aColor[i]).toString(16);
          if (hex === '0') hex += hex;
          strHex += hex;
        }
        if (strHex.length !== 7) strHex = color;
        return strHex;
      } else if (reg.test(color)) {
        const aNum = color.replace(/#/, '').split('');
        if (aNum.length === 6) {
          return color;
        } else if (aNum.length === 3) {
          let numHex = '#';
          for (let i = 0; i < aNum.length; i += 1) {
            numHex += aNum[i] + aNum[i];
          }
          return numHex;
        }
      }
    } else return color;
  }

  /**
   * requestAnimationFrame.
   * @param callback
   * @returns
   */
  raf(callback) {
    return window.requestAnimationFrame(callback) || window.setTimeout(callback, 1000 / 60);
  }

  /**
   * cancelAnimationFrame.
   * @param rid
   */
  caf(rid) {
    window.cancelAnimationFrame(rid);
  }

  /**
   * Gets the actual height of the element from the top of the document.
   * @param el
   * @param pos
   * @returns
   */
  getElementActualTopOrLeft(el, pos = 'top') {
    let actual = pos === 'left' ? el.offsetLeft : el.offsetTop;
    let current = el.offsetParent;
    while (current !== null) {
      actual += pos === 'left' ? current.offsetLeft : current.offsetTop;
      current = current.offsetParent;
    }
    return actual;
  }

  /**
   * scroll to top ( animation ).
   * @param el
   * @param from
   * @param to
   * @param duration
   * @param endCallback
   */
  scrollTop(el, from = 0, to, duration = 800, endCallback) {
    const difference = Math.abs(from - to);
    const step = Math.ceil((difference / duration) * 50);
    let rid;
    function scroll(start, end, step, vm) {
      if (start === end) {
        if (rid) vm.caf(rid);
        endCallback && endCallback();
        return;
      }
      let d = start + step > end ? end : start + step;
      if (start > end) d = start - step < end ? end : start - step;
      if (el === window) window.scrollTo(d, d);
      else el.scrollTop = d;
      rid = vm.raf(() => scroll(d, end, step, vm));
    }
    scroll(from, to, step, this);
  }

  /**
   * back to top.
   * @param offset
   * @param duration
   */
  back2top(offset = 0, duration = 1000) {
    const top = offset ?? (document.documentElement.scrollTop || document.body.scrollTop);
    this.scrollTop(document.body, top, 0, duration);
  }

  /**
   * add event listener.
   * @param el
   * @param event
   * @param listener
   * @param useCapture
   */
  on(el, event, listener, useCapture) {
    if (!!document.addEventListener) {
      if (el && event && listener) el.addEventListener(event, listener, useCapture);
    } else {
      if (el && event && listener) el.attachEvent(`on${event}`, listener);
    }
  }

  /**
   * remove event listener.
   * @param el
   * @param event
   * @param listener
   * @param useCapture
   */
  off(el, event, listener, useCapture) {
    if (!!document.addEventListener) {
      if (el && event && listener) el.removeEventListener(event, listener, useCapture);
    } else {
      if (el && event && listener) el.detachEvent(`on${event}`, listener);
    }
  }

  /**
   * transfer.
   * @param html
   * @returns
   */
  htmlEncode(html) {
    let temp = document.createElement('div');
    temp.textContent !== null ? (temp.textContent = html) : (temp.innerText = html);
    const output = temp.innerHTML;
    temp = null;
    return output;
  }
}

export const $tools = new MiTools();
