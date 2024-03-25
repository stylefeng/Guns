<!-- 色相滑块 -->
<template>
  <div class="guns-color-hue-slider">
    <div ref="barRef" class="guns-color-hue-slider-bar" @click="handleClick"></div>
    <div ref="thumbRef" class="guns-color-hue-slider-thumb" :style="{ left: `${thumbLeft}px` }"></div>
  </div>
</template>

<script setup name="HueSlider">
import { ref, unref, onMounted, watch } from 'vue';
import draggable from '../util/draggable';

const props = defineProps({
  // 选中的色相
  hue: {
    type: Number,
    default: 0
  }
});
const emits = defineEmits(['update:hue']);
// 滑块
const thumbRef = ref(null);

// 滑轨
const barRef = ref(null);

// 滑块位置
const thumbLeft = ref(0);

/* 滑轨点击事件 */
const handleClick = event => {
  const thumb = unref(thumbRef);
  if (event.target !== thumb) {
    handleDrag(event);
  }
};

/* 颜色选中改变事件 */
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
  const hue = Math.round((t1 / t2) * 360);
  emits('update:hue', hue);
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
  const hue = props.hue ?? 0;
  return Math.round((hue * (barWidth - thumbWidth / 2)) / 360);
};

onMounted(() => {
  // 获取滑块的默认位置
  thumbLeft.value = getThumbLeft();

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
  () => props.hue,
  () => {
    thumbLeft.value = getThumbLeft();
  }
);
</script>
