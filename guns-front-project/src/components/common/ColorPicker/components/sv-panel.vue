<!-- 饱和度、明度选择 -->
<template>
  <div ref="panelRef" class="guns-color-svpanel" :style="{ backgroundColor: background }">
    <div class="guns-color-svpanel-white"></div>
    <div class="guns-color-svpanel-black"></div>
    <div class="guns-color-svpanel-cursor" :style="{ top: cursorTop + 'px', left: cursorLeft + 'px' }"></div>
  </div>
</template>

<script setup name="SvPanel">
import { ref, unref, onMounted, watch } from 'vue';
import draggable from '../util/draggable';

const props = defineProps({
  // 色相
  hue: {
    type: Number,
    default: 0
  },
  // 饱和度
  saturation: {
    type: Number,
    default: 0
  },
  // 明度
  value: {
    type: Number,
    default: 0
  }
});
const emits = defineEmits(['change']);
// 滑块
const panelRef = ref(null);

// 滑块位置 top
const cursorTop = ref(0);

// 滑块位置 left
const cursorLeft = ref(0);

// 色板背景色
const background = ref('hsl(0, 100%, 50%)');

/* 选中改变事件 */
const handleDrag = event => {
  const panel = unref(panelRef);
  if (!panel) {
    return;
  }
  const rect = panel.getBoundingClientRect();
  let left = event.clientX - rect.left;
  left = Math.max(0, left);
  left = Math.min(left, rect.width);
  let top = event.clientY - rect.top;
  top = Math.max(0, top);
  top = Math.min(top, rect.height);
  cursorLeft.value = left;
  cursorTop.value = top;
  emits('change', {
    saturation: (left / rect.width) * 100,
    value: 100 - (top / rect.height) * 100
  });
};

/* 计算滑块位置 top */
const getCursorTop = () => {
  const panel = unref(panelRef);
  if (!panel) {
    return 0;
  }
  const height = panel.clientHeight || 180;
  return ((100 - (props.value ?? 0)) * height) / 100;
};

/* 计算滑块位置 left */
const getCursorLeft = () => {
  const panel = unref(panelRef);
  if (!panel) {
    return 0;
  }
  const width = panel.clientWidth || 280;
  return ((props.saturation ?? 0) * width) / 100;
};

/* 获取色板背景 */
const getBackground = () => {
  return 'hsl(' + (props.hue ?? 0) + ', 100%, 50%)';
};

onMounted(() => {
  // 获取滑块的默认位置和色板的默认背景
  background.value = getBackground();
  cursorLeft.value = getCursorLeft();
  cursorTop.value = getCursorTop();

  // 色板绑定鼠标移动事件
  const panel = unref(panelRef);
  if (panel) {
    draggable(panel, {
      drag: event => {
        handleDrag(event);
      },
      end: event => {
        handleDrag(event);
      }
    });
  }
});

watch(
  () => props.hue,
  () => {
    background.value = getBackground();
  }
);

watch(
  () => props.saturation,
  () => {
    cursorLeft.value = getCursorLeft();
  }
);

watch(
  () => props.value,
  () => {
    cursorTop.value = getCursorTop();
  }
);
</script>
