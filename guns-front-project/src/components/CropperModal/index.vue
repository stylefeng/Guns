<template>
  <!-- 新增编辑 -->
  <a-modal
    :width="props.width"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    :title="props.title"
    :body-style="{ padding: '16px 18px 18px 18px' }"
    @update:visible="updateVisible"
    footer=""
    @close="updateVisible(false)"
  >
    <!-- 裁剪 -->
    <guns-cropper v-bind="props" @done="done" :ok-text="props.okText" v-if="props.visible"/>
  </a-modal>
</template>

<script setup name="CropperModal">
import { ref } from 'vue';
import GunsCropper from './components/cropper.vue';
const props = defineProps({
  visible: Boolean,
  // 弹窗标题
  title: {
    type: String,
    default: '裁剪图片'
  },
  // 弹窗宽度
  width: {
    type: String,
    default: '660px'
  },
  // 图片地址
  src: String,
  // 图片地址对应的图片类型, 如: 'image/jpeg'
  imageType: {
    type: String,
    default: 'image/png'
  },
  // 允许上传的图片类型
  accept: {
    type: String,
    default: 'image/*'
  },
  // 操作按钮布局
  tools: {
    type: String,
    default: ['zoomIn,zoomOut', 'moveL,moveR,moveT,moveB', 'rotateL,rotateR', 'scaleX,scaleY', 'reset,upload', 'crop'].join(' | ')
  },
  // 是否显示预览组件
  showPreview: {
    type: Boolean,
    default: true
  },
  // 预览组件宽度
  previewWidth: {
    type: Number,
    default: 120
  },
  // 完成按钮文字
  okText: {
    type: String,
    defalut: '完成'
  },
  // 是否返回 blob 数据
  toBlob: {
    type: Boolean,
    defalut: false
  },
  // cropperjs 的参数
  options: {
    type: Object,
    defalut: {}
  },
  // cropperjs 裁剪方法的参数
  croppedOptions: {
    type: Object,
    defalut: {}
  },
  //------------------------
  // 裁剪比例
  aspectRatio: {
    type: Number,
    default: 1
  },
  // 裁剪组件模式
  viewMode: {
    type: Number,
    default: 0
  },
  // 拖动模式
  dragMode: {
    type: String,
    default: 'crop'
  },
  // 裁剪框的初始宽高比
  initialAspectRatio: Number,
  // 容器最小宽度
  minContainerWidth: {
    type: Number,
    default: 200
  },
  // 容器最小高度
  minContainerHeight: {
    type: Number,
    default: 100
  },
  // 画布最小宽度
  minCanvasWidth: {
    type: Number,
    default: 0
  },
  // 画布最小高度
  minCanvasHeight: {
    type: Number,
    default: 0
  },
  // 裁剪盒子最小宽度
  minCropBoxWidth: {
    type: Number,
    default: 0
  },
  // 裁剪盒子最小高度
  minCropBoxHeight: {
    type: Number,
    default: 0
  },
  // 裁剪输出宽度
  croppedWidth: Number,
  // 裁剪输出高度
  croppedHeight: Number,
  // 裁剪输出最小宽度
  croppedMinWidth: {
    type: Number,
    default: 0
  },
  // 裁剪输出最小高度
  croppedMinHeight: {
    type: Number,
    default: 0
  },
  // 裁剪输出最大宽度
  croppedMaxWidth: Number,
  // 裁剪输出最大高度
  croppedMaxHeight: Number,
  // 裁剪输出的填充色
  croppedFillColor: {
    type: String,
    default: 'transparent'
  },
  //
  imageSmoothingEnabled: Boolean,
  // 裁剪输出的质量
  imageSmoothingQuality: String
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

/* 裁剪完成 */
const done = result => {
  emits('done', result);
};
</script>

<style></style>
