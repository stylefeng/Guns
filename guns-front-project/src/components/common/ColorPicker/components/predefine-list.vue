<!-- 预设颜色列表 -->
<template>
  <div class="guns-color-predefine">
    <div v-for="(item, index) in colors" :key="index + '-' + item" class="guns-color-predefine-item" @click="handleSelect(item)">
      <div :style="{ backgroundColor: item }"></div>
      <CheckOutlined v-if="color && color.toLowerCase() === item.toLowerCase()" />
    </div>
  </div>
</template>

<script setup name="PredefineList">
const props = defineProps({
  // 颜色列表
  colors: {
    type: Array,
    required: true
  },
  // 选中的颜色
  color: String
});
const emits = defineEmits(['update:color']);
/* 颜色选中事件 */
const handleSelect = color => {
  emits('update:color', color);
};
</script>
