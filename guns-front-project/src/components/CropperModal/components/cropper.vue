<template>
  <div :class="['guns-cropper', { 'guns-cropper-responsive': styleResponsive }]">
    <div class="guns-cropper-group">
      <!-- 裁剪区域 -->
      <div class="guns-cropper-img-group">
        <img :src="src" alt="cropper" ref="imageRef" :style="{ maxWidth: '100%', display: src ? 'block' : 'none' }" />
      </div>
      <!-- 预览区域 -->
      <CropperPreview ref="previewRef" v-if="props.showPreview" :aspect-ratio="props.aspectRatio" :preview-width="props.previewWidth" />
    </div>
    <!-- 操作按钮 -->
    <CropperTools
      :tools="tools"
      :ok-text="props.okText"
      @crop="crop"
      @move-b="moveB"
      @move-l="moveL"
      @move-r="moveR"
      @move-t="moveT"
      @reset="reset"
      @rotate-l="rotateL"
      @rotate-r="rotateR"
      @scale-x="scaleX"
      @scale-y="scaleY"
      @replace="replace"
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
    />
  </div>
</template>

<script setup name="GunsCropper">
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { inject, onMounted, ref, unref, watch, computed, nextTick, onBeforeUnmount } from 'vue';
import CropperPreview from './cropper-preview.vue';
import CropperTools from './cropper-tools.vue';

const props = defineProps({
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
    type: String
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
  okText: String,
  // 是否返回 blob 数据
  toBlob: Boolean,
  // cropperjs 的参数
  options: Object,
  // cropperjs 裁剪方法的参数
  croppedOptions: Object,
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

const emits = defineEmits(['done']);

// 布局状态
const layoutProvide = inject('GunsLayoutState');
// 图片 ref
const imageRef = ref(null);
// 预览区域 ref
const previewRef = ref(null);
// 当前图片类型
const imageType = ref(props.imageType);
// cropper 实例
let instance = null;
// 水平翻转值
let scaleXValue = -1;

// 垂直翻转值
let scaleYValue = -1;
// 是否开启响应式
const styleResponsive = computed(() => {
  return unref(layoutProvide)?.styleResponsive ?? true;
});
/* 渲染 */
const render = () => {
  nextTick(() => {
    destroy();
    const options = {
      aspectRatio: props.aspectRatio,
      viewMode: props.viewMode,
      dragMode: props.dragMode,
      initialAspectRatio: props.initialAspectRatio,
      minContainerWidth: props.minContainerWidth,
      minContainerHeight: props.minContainerHeight,
      minCanvasWidth: props.minCanvasWidth,
      minCanvasHeight: props.minCanvasHeight,
      minCropBoxWidth: props.minCropBoxWidth,
      minCropBoxHeight: props.minCropBoxHeight,
      ...props.options
    };
    if (props.showPreview) {
      options.preview = unref(previewRef.value)?.getPreviews();
    }
    const imageEl = unref(imageRef.value);
    if (imageEl) {
      instance = new Cropper(imageEl, options);
    }
  });
};
/* 放大 */
const zoomIn = () => {
  instance && instance.zoom(0.1);
};

/* 缩小 */
const zoomOut = () => {
  instance && instance.zoom(-0.1);
};

/* 左移 */
const moveL = () => {
  instance && instance.move(-10, 0);
};

/* 右移 */
const moveR = () => {
  instance && instance.move(10, 0);
};

/* 上移 */
const moveT = () => {
  instance && instance.move(0, -10);
};

/* 下移 */
const moveB = () => {
  instance && instance.move(0, 10);
};

/* 左旋 */
const rotateL = () => {
  instance && instance.rotate(-45);
};

/* 右旋 */
const rotateR = () => {
  instance && instance.rotate(45);
};

/* 左右镜像 */
const scaleX = () => {
  instance && instance.scaleX(scaleXValue);
  scaleXValue = -scaleXValue;
};

/* 上下镜像 */
const scaleY = () => {
  instance && instance.scaleY(scaleYValue);
  scaleYValue = -scaleYValue;
};

/* 重置 */
const reset = () => {
  instance && instance.reset();
};

/* 裁剪 */
const crop = () => {
  const result = instance?.getCroppedCanvas({
    width: props.croppedWidth,
    height: props.croppedHeight,
    minWidth: props.croppedMinWidth,
    minHeight: props.croppedMinHeight,
    maxWidth: props.croppedMaxWidth,
    maxHeight: props.croppedMaxHeight,
    fillColor: props.croppedFillColor,
    imageSmoothingEnabled: props.imageSmoothingEnabled,
    imageSmoothingQuality: props.imageSmoothingQuality,
    ...props.croppedOptions
  });
  if (result) {
    if (props.toBlob) {
      result.toBlob(blob => {
        emits('done', blob);
      }, imageType.value);
    } else {
      emits('done', result.toDataURL(imageType.value));
    }
  } else {
    emits('done');
  }
};

/* 替换图片 */
const replace = ({ data, type }) => {
  imageType.value = type;
  if (instance) {
    instance.replace(data);
  } else {
    const elem = unref(imageRef.value);
    if (elem) {
      elem.src = data;
      elem.style.display = 'block';
    }
    render();
  }
};

/* 销毁 */
const destroy = () => {
  instance && instance.destroy();
  instance = null;
};
watch(
  () => props.src,
  value => {
    if (value) {
      if (instance) {
        instance.replace(value);
      } else {
        nextTick(() => {
          render();
        });
      }
    } else {
      destroy();
    }
  }
);

watch(
  () => props.imageType,
  value => {
    if (value) {
      imageType.value = value;
    }
  }
);

onMounted(() => {
  props.src && render();
});

onBeforeUnmount(() => {
  destroy();
});
</script>

<style lang="less">
.guns-cropper {
  .guns-cropper-group {
    display: flex;
  }

  .guns-cropper-img-group {
    flex: 1;
  }

  .guns-cropper-preview-group {
    font-size: 0;
    text-align: right;
  }

  .guns-cropper-preview {
    margin-top: 16px;
    display: inline-block;
    border: 1px solid hsla(0, 0%, 80%, 0.6);
    vertical-align: top;
    overflow: hidden;
  }

  .guns-cropper-preview-circle {
    margin-top: 16px;
    border-radius: 50%;
  }
}

@media screen and (max-width: 768px) {
  .guns-cropper-responsive.guns-cropper .guns-cropper-preview-group {
    display: none;
  }
}

/* cropper tools */
.guns-cropper-tool {
  margin-top: 6px;
}

.guns-cropper-tool-item {
  margin: 10px 14px 0 0;
  vertical-align: top;

  &:last-child {
    margin-right: 0 !important;
  }

  & > .ant-btn + span {
    vertical-align: -1px;
  }
}

.guns-cropper-tool-btn {
  width: auto;
  padding: 0 10px !important;
}

.guns-cropper-tool-btn-ok {
  padding-left: 12px;
  padding-right: 12px;
}

@media screen and (max-width: 768px) {
  .guns-cropper-responsive .guns-cropper-tool .guns-cropper-tool-item {
    margin-right: 6px;
  }
}
</style>
