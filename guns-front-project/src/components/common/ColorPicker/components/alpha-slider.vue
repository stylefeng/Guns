<!-- 透明度滑块 -->
<template>
  <div class="guns-color-alpha-slider">
    <div ref="barRef" class="guns-color-alpha-slider-bar" :style="{ background: background }" @click="handleClick"></div>
    <div ref="thumbRef" class="guns-color-alpha-slider-thumb" :style="{ left: thumbLeft + 'px' }"></div>
  </div>
</template>

<script setup name="AlphaSlider">
import { ref, unref, onMounted, watch } from 'vue';
import draggable from '../util/draggable';

const props = defineProps({
  // 颜色的 rgb 值
  rgb: {
    type: Object,
    required: true
  },
  // 透明度
  alpha: {
    type: Number,
    default: 100
  }
});
const emits = defineEmits(['update:alpha']);
// 滑块
const thumbRef = ref(null);

// 滑轨
const barRef = ref(null);

// 滑块位置
const thumbLeft = ref(0);

// 滑轨背景
const background = ref();

/* 滑轨点击事件 */
const handleClick = event => {
  const thumb = unref(thumbRef);
  if (event.target !== thumb) {
    handleDrag(event);
  }
};

/* 透明度选中改变事件 */
const handleDrag = event => {
  const bar = unref(barRef);
  const thumb = unref(thumbRef);
  if (!bar || !thumb) {
    return;
  }
  const rect = bar.getBoundingClientRect();
  const left = (() => {
    const temp = Math.max(thumb.offsetWidth / 2, event.clientX - rect.left);
    return Math.min(temp, rect.width - thumb.offsetWidth / 2);
  })();
  const t1 = left - thumb.offsetWidth / 2;
  const t2 = rect.width - thumb.offsetWidth;
  const alpha = Math.round((t1 / t2) * 100);
  emits('update:alpha', alpha);
};

/* 计算滑块位置 */
const getThumbLeft = () => {
  const bar = unref(barRef);
  const thumb = unref(thumbRef);
  if (!bar || !thumb) {
    return 0;
  }
  const barWidth = bar.offsetWidth || 280;
  const thumbWidth = thumb.offsetWidth || 6;
  const alpha = props.alpha ?? 0;
  return Math.round((alpha * (barWidth - thumbWidth / 2)) / 100);
};

/* 获取滑轨背景 */
const getBackground = () => {
  if (props.rgb == null) {
    return;
  }
  const { r, g, b } = props.rgb;
  return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
};

onMounted(() => {
  // 获取滑块的默认位置和滑轨的默认背景
  thumbLeft.value = getThumbLeft();
  background.value = getBackground();

  // 滑块、滑轨绑定鼠标移动事件
  const bar = unref(barRef);
  const thumb = unref(thumbRef);
  const dragConfig = {
    drag: event => {
      handleDrag(event);
    },
    end: event => {
      handleDrag(event);
    }
  };
  bar && draggable(bar, dragConfig);
  thumb && draggable(thumb, dragConfig);
});

watch(
  () => props.rgb,
  () => {
    background.value = getBackground();
  }
);

watch(
  () => props.alpha,
  () => {
    thumbLeft.value = getThumbLeft();
  }
);
</script>
