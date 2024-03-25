<!-- 颜色选择器组件 -->
<template>
  <a-dropdown :trigger="['click']" :disabled="isDisabled" v-model:visible="visible" @visibleChange="handleVisibleChange">
    <div :class="triggerClass">
      <div :class="innerClass">
        <div :style="{ backgroundColor: displayValue }"></div>
      </div>
      <div class="guns-color-picker-trigger-arrow">
        <DownOutlined v-if="displayValue" />
        <CloseOutlined v-else />
      </div>
    </div>
    <template #overlay>
      <div :class="['ant-dropdown-menu guns-color-picker', popperClass]">
        <div @click.stop="">
          <SvPanel :hue="colorHue" :saturation="colorSaturation" :value="colorValue" @change="handleSVChange" />
          <HueSlider :hue="colorHue" @update:hue="handleHChange" />
          <AlphaSlider v-if="showAlpha" :rgb="colorRgb" :alpha="colorAlpha" @update:alpha="handleAChange" />
          <PredefineList v-if="predefine" :color="displayValue" :colors="predefineColors" @update:color="handleColorChange" />
          <div class="guns-color-picker-footer">
            <div class="guns-color-picker-value">
              <a-input size="small" v-model:value="inputValue" @pressEnter="handleInput" @blur="handleInput" />
            </div>
            <div class="guns-color-picker-button-group">
              <a-button size="small" @click="clearValue" class="border-radius">
                {{ cancelText }}
              </a-button>
              <a-button size="small" type="primary" @click="confirmValue" class="border-radius">
                {{ okText }}
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script setup name="ColorPicker">
import { ref, computed, watch } from 'vue';
import SvPanel from './components/sv-panel.vue';
import HueSlider from './components/hue-slider.vue';
import AlphaSlider from './components/alpha-slider.vue';
import PredefineList from './components/predefine-list.vue';
import Color from './util/color';

const props = defineProps({
  // 绑定的颜色, v-model
  value: String,
  // 绑定的颜色格式, hsl / hsv / hex / rgb
  colorFormat: {
    type: String,
    validator: value => {
      return ['hsl', 'hsv', 'hex', 'rgb'].includes(value);
    }
  },
  // 是否支持透明度选择
  showAlpha: Boolean,
  // 预定义颜色
  predefine: Array,
  // 尺寸
  size: {
    type: String,
    validator: value => {
      return ['large', 'default', 'small'].includes(value);
    }
  },
  // 是否禁用
  disabled: Boolean,
  // 自定义下拉框类名
  popperClass: String,
  // 自定义类名
  customClass: String,
  // 取消按钮文字
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文字
  okText: {
    type: String,
    default: '确定'
  }
});
const emits = defineEmits(['change', 'active-change', 'update:value']);

// 颜色封装
const color = new Color({
  enableAlpha: props.showAlpha,
  format: props.colorFormat
});

// 初始值
const initValue = (() => {
  if (!props.value) {
    return '';
  }
  color.fromString(props.value);
  return color.value;
})();

// 色相
const colorHue = ref(color._hue);

// 饱和度
const colorSaturation = ref(color._saturation);

// 明度
const colorValue = ref(color._value);

// 透明度
const colorAlpha = ref(color._alpha);

// rgb
const colorRgb = ref(color.toRgb());

// 输入的颜色值
const inputValue = ref(initValue);

// 当前显示的颜色值
const displayValue = ref(initValue);

// 是否显示 popper
const visible = ref(false);

// 是否禁用
const isDisabled = computed(() => {
  return props.disabled;
});

// trigger 的 class
const triggerClass = computed(() => {
  return [
    'guns-color-picker-trigger',
    { 'guns-color-picker-large': props.size === 'large' },
    { 'guns-color-picker-small': props.size === 'small' },
    { 'is-disabled': isDisabled.value },
    props.customClass
  ];
});

// inner 的 class
const innerClass = computed(() => {
  return ['guns-color-picker-trigger-inner', { 'is-empty': !displayValue.value }];
});

// 预设颜色数据
const predefineColors = computed(() => {
  return props.predefine
    ? props.predefine.map(value => {
        const c = new Color({
          enableAlpha: props.showAlpha,
          format: props.colorFormat
        });
        c.fromString(value);
        return c.value;
      })
    : [];
});

/* 确定 */
const confirmValue = () => {
  emits('update:value', color.value);
  emits('change', color.value);
  emits('active-change', color.value);
  visible.value = false;
};

/* 清空 */
const clearValue = () => {
  emits('update:value', '');
  emits('change', '');
  emits('active-change', '');
  inputValue.value = '';
  displayValue.value = '';
  visible.value = false;
};

/* 色相改变处理 */
const handleHChange = value => {
  color.set({ _hue: value });
  colorHue.value = color._hue;
  colorRgb.value = color.toRgb();
  inputValue.value = color.value;
  displayValue.value = color.value;
  emits('active-change', color.value);
};

/* 饱和度和明度改变处理 */
const handleSVChange = obj => {
  color.set({
    _saturation: obj.saturation,
    _value: obj.value
  });
  colorSaturation.value = color._saturation;
  colorValue.value = color._value;
  colorRgb.value = color.toRgb();
  inputValue.value = color.value;
  displayValue.value = color.value;
  emits('active-change', color.value);
};

/* 透明度改变处理 */
const handleAChange = value => {
  color.set({ _alpha: value });
  colorAlpha.value = color._alpha;
  inputValue.value = color.value;
  displayValue.value = color.value;
  emits('active-change', color.value);
};

/* 颜色改变处理 */
const handleColorChange = value => {
  if (value) {
    if (value !== color.value) {
      color.fromString(value);
      colorHue.value = color._hue;
      colorSaturation.value = color._saturation;
      colorValue.value = color._value;
      colorAlpha.value = color._alpha;
      colorRgb.value = color.toRgb();
    }
    inputValue.value = color.value;
    displayValue.value = color.value;
    emits('active-change', color.value);
  }
};

/* 颜色输入改变处理 */
const handleInput = () => {
  if (inputValue.value) {
    handleColorChange(inputValue.value);
  } else {
    inputValue.value = color.value;
    displayValue.value = color.value;
    emits('active-change', color.value);
  }
};

/* picker 展开和关闭处理 */
const handleVisibleChange = visible => {
  if (!visible) {
    if (props.value) {
      handleColorChange(props.value);
    } else {
      inputValue.value = '';
      displayValue.value = '';
      emits('active-change', '');
    }
  }
};

watch(
  () => props.value,
  value => {
    if (value) {
      handleColorChange(value);
    } else {
      inputValue.value = '';
      displayValue.value = '';
      emits('active-change', '');
    }
  }
);

watch(
  () => props.colorFormat,
  value => {
    color.set({ format: value });
    inputValue.value = color.value;
    displayValue.value = color.value;
    emits('active-change', color.value);
  }
);

watch(
  () => props.showAlpha,
  value => {
    color.set({ enableAlpha: value });
    inputValue.value = color.value;
    displayValue.value = color.value;
    emits('active-change', color.value);
  }
);
</script>

<style>
@import url('./style//index.less');
</style>
