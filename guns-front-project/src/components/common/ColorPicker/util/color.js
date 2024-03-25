/**
 * 数字对应的 16 进制字符
 */
const INT_HEX_MAP = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F'
};

/**
 * 16 进制字符对应的数字
 */
const HEX_INT_MAP = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };

/**
 * 是否是百分数格式
 */
const isPercentage = function (n) {
  return typeof n === 'string' && n.indexOf('%') !== -1;
};

/**
 * 是否等于 1.0
 */
const isOnePointZero = function (n) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
};

/**
 * Take input from [0, n] and return it as [0, 1]
 */
const bound01 = function (value, max) {
  if (isOnePointZero(value)) {
    value = '100%';
  }

  const processPercent = isPercentage(value);
  value = Math.min(max, Math.max(0, parseFloat(String(value))));

  // Automatically convert percentage into number
  if (processPercent) {
    value = parseInt(String(value * max), 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(value - max) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return (value % max) / parseFloat(String(max));
};

/**
 * hsv 转 hsl
 * @param hue 色相
 * @param sat 饱和度
 * @param val 明度
 */
const hsv2hsl = function (hue, sat, val) {
  return [hue, (sat * val) / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue) || 0, hue / 2];
};

/**
 * hsl 转 hsv
 * @param hue 色相
 * @param sat 饱和度
 * @param light 亮度
 */
const hsl2hsv = function (hue, sat, light) {
  sat = sat / 100;
  light = light / 100;
  let smin = sat;
  const lmin = Math.max(light, 0.01);

  light *= 2;
  sat *= light <= 1 ? light : 2 - light;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  const v = (light + sat) / 2;
  const sv = light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat);

  return {
    h: hue,
    s: sv * 100,
    v: v * 100
  };
};

/**
 * rgb 转 hsv
 * Converts an RGB color value to HSV
 * Assumes: r, g, and b are contained in the set [0, 255] or [0, 1]
 * Returns: { h, s, v } in [0,1]
 * @param r
 * @param g
 * @param b
 */
const rgb2hsv = function (r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;

  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: v * 100 };
};

/**
 * hsv 转 rgb
 * Converts an HSV color value to RGB
 * Assumes: h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * Returns: { r, g, b } in the set [0, 255]
 * @param h
 * @param s
 * @param v
 */
const hsv2rgb = function (h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);

  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

/**
 * rgb 转 16 进制
 * @param
 */
const toHex = function ({ r, g, b }) {
  const hexOne = function (value) {
    value = Math.min(Math.round(value), 255);
    const high = Math.floor(value / 16);
    const low = value % 16;
    return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low);
  };

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return '';
  }

  return '#' + hexOne(r) + hexOne(g) + hexOne(b);
};

/**
 * 解析颜色通道
 * @param hex
 */
const parseHexChannel = function (hex) {
  if (hex.length === 2) {
    return (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 + (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]);
  }
  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
};

/**
 * 颜色对象
 */
export default class Color {
  // 色相
  _hue;
  // 饱和度
  _saturation;
  // 明度
  _value;
  // 透明度
  _alpha;
  // 是否开启透明度
  enableAlpha;
  // 颜色格式
  format;
  // 颜色值
  value;

  constructor(options = {}) {
    this._hue = options._hue ?? 0;
    this._saturation = options._saturation ?? 100;
    this._value = options._value ?? 100;
    this._alpha = options._alpha ?? 100;

    this.enableAlpha = options.enableAlpha ?? false;
    this.format = options.format ?? 'hex';
    this.value = '';

    this.doOnChange();
  }

  /**
   * 修改属性
   * @param options
   */
  set(options) {
    Object.assign(this, options);
    this.doOnChange();
  }

  /**
   * 转 rgb
   */
  toRgb() {
    return hsv2rgb(this._hue, this._saturation, this._value);
  }

  /**
   * 解析颜色
   * @param value
   */
  fromString(value) {
    if (!value) {
      this._hue = 0;
      this._saturation = 100;
      this._value = 100;
      this._alpha = 100;
      this.doOnChange();
      return;
    }

    const fromHSV = (h, s, v) => {
      this._hue = Math.max(0, Math.min(360, h));
      this._saturation = Math.max(0, Math.min(100, s));
      this._value = Math.max(0, Math.min(100, v));
      this.doOnChange();
    };

    if (value.indexOf('hsl') !== -1) {
      const parts = value
        .replace(/hsla|hsl|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter(val => val !== '')
        .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)));
      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(String(parts[3])) * 100);
      } else if (parts.length === 3) {
        this._alpha = 100;
      }
      if (parts.length >= 3) {
        const { h, s, v } = hsl2hsv(parts[0], parts[1], parts[2]);
        fromHSV(h, s, v);
      }
    } else if (value.indexOf('hsv') !== -1) {
      const parts = value
        .replace(/hsva|hsv|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter(val => val !== '')
        .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)));
      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(String(parts[3])) * 100);
      } else if (parts.length === 3) {
        this._alpha = 100;
      }
      if (parts.length >= 3) {
        fromHSV(parts[0], parts[1], parts[2]);
      }
    } else if (value.indexOf('rgb') !== -1) {
      const parts = value
        .replace(/rgba|rgb|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter(val => val !== '')
        .map((val, index) => (index > 2 ? parseFloat(val) : parseInt(val, 10)));
      if (parts.length === 4) {
        this._alpha = Math.floor(parseFloat(String(parts[3])) * 100);
      } else if (parts.length === 3) {
        this._alpha = 100;
      }
      if (parts.length >= 3) {
        const { h, s, v } = rgb2hsv(parts[0], parts[1], parts[2]);
        fromHSV(h, s, v);
      }
    } else if (value.indexOf('#') !== -1) {
      const hex = value.replace('#', '').trim();
      if (!/^(?:[0-9a-fA-F]{3}){1,2}|[0-9a-fA-F]{8}$/.test(hex)) {
        return;
      }
      let r, g, b;
      if (hex.length === 3) {
        r = parseHexChannel(hex[0] + hex[0]);
        g = parseHexChannel(hex[1] + hex[1]);
        b = parseHexChannel(hex[2] + hex[2]);
      } else if (hex.length === 6 || hex.length === 8) {
        r = parseHexChannel(hex.substring(0, 2));
        g = parseHexChannel(hex.substring(2, 4));
        b = parseHexChannel(hex.substring(4, 6));
      }
      if (hex.length === 8) {
        this._alpha = Math.floor((parseHexChannel(hex.substring(6)) / 255) * 100);
      } else if (hex.length === 3 || hex.length === 6) {
        this._alpha = 100;
      }
      const { h, s, v } = rgb2hsv(r ?? 0, g ?? 0, b ?? 0);
      fromHSV(h, s, v);
    }
  }

  /**
   * 比较颜色
   * @param color
   */
  compare(color) {
    return (
      Math.abs(color._hue - this._hue) < 2 &&
      Math.abs(color._saturation - this._saturation) < 1 &&
      Math.abs(color._value - this._value) < 1 &&
      Math.abs(color._alpha - this._alpha) < 1
    );
  }

  /**
   * 更新颜色值
   */
  doOnChange() {
    const { _hue, _saturation, _value, _alpha, format } = this;
    if (this.enableAlpha) {
      if (format === 'hsl') {
        const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
        const _s = Math.round(hsl[1] * 100);
        const _l = Math.round(hsl[2] * 100);
        this.value = `hsla(${_hue}, ${_s}%, ${_l}%, ${_alpha / 100})`;
      } else if (format === 'hsv') {
        const _s = Math.round(_saturation);
        const _v = Math.round(_value);
        this.value = `hsva(${_hue}, ${_s}%, ${_v}%, ${_alpha / 100})`;
      } else {
        const { r, g, b } = hsv2rgb(_hue, _saturation, _value);
        this.value = `rgba(${r}, ${g}, ${b}, ${_alpha / 100})`;
      }
    } else {
      if (format === 'hsl') {
        const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
        const _l = Math.round(hsl[2] * 100);
        this.value = `hsl(${_hue}, ${Math.round(hsl[1] * 100)}%, ${_l}%)`;
      } else if (format === 'hsv') {
        const _v = Math.round(_value);
        this.value = `hsv(${_hue}, ${Math.round(_saturation)}%, ${_v}%)`;
      } else if (format === 'rgb') {
        const { r, g, b } = hsv2rgb(_hue, _saturation, _value);
        this.value = `rgb(${r}, ${g}, ${b})`;
      } else {
        this.value = toHex(hsv2rgb(_hue, _saturation, _value));
      }
    }
  }
}
