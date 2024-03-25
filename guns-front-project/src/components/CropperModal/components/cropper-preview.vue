<template>
  <div ref="rootRef" class="guns-cropper-preview-group" :style="{ width: `${previewWidth + 14}px` }">
    <div
      class="guns-cropper-preview"
      :style="{
        width: `${previewWidth}px`,
        height: `${previewWidth / (aspectRatio || 1)}px`,
        marginTop: '0px'
      }"
    ></div>
    <div
      v-if="aspectRatio === 1"
      class="guns-cropper-preview guns-cropper-preview-circle"
      :style="{
        width: `${previewWidth}px`,
        height: `${previewWidth / aspectRatio}px`
      }"
    ></div>
    <template v-else-if="aspectRatio">
      <div
        class="guns-cropper-preview"
        :style="{
          width: `${previewWidth}px`,
          height: `${((previewWidth / 3) * 2 - 10) / aspectRatio}px`
        }"
      ></div>
      <div
        class="guns-cropper-preview"
        :style="{
          width: `${previewWidth}px`,
          height: `${previewWidth / 3 / aspectRatio}px`,
          marginLeft: '10px'
        }"
      ></div>
    </template>
  </div>
</template>

<script setup name="CropperPreview">
import { ref } from 'vue';

const props = defineProps({
  // 预览组件宽度
  previewWidth: {
    type: Number,
    required: true
  },
  // 裁剪比例
  aspectRatio: {
    type: Number,
    required: true
  }
});
const rootRef = ref(null);

const getPreviews = () => {
  return rootRef.value?.querySelectorAll('.guns-cropper-preview');
};

defineExpose({
  getPreviews
});
</script>
