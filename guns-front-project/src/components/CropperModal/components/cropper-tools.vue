<template>
  <div class="guns-cropper-tool">
    <a-button-group v-for="(buttons, i) in groups" :key="i + buttons.join(',')" class="guns-cropper-tool-item">
      <template v-for="(name, j) in buttons">
        <a-button
          v-if="name === 'zoomIn'"
          :key="i + '-' + j + 'zoomIn'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="放大"
          @click="zoomIn"
        >
          <template #icon>
            <ZoomInOutlined />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'zoomOut'"
          :key="i + '-' + j + 'zoomOut'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="缩小"
          @click="zoomOut"
        >
          <template #icon>
            <ZoomOutOutlined />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'rotateL'"
          :key="i + '-' + j + 'rotateL'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="向左旋转"
          @click="rotateL"
        >
          <template #icon>
            <RotateLeftOutlined />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'rotateR'"
          :key="i + '-' + j + 'rotateR'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="向右旋转"
          @click="rotateR"
        >
          <template #icon>
            <RotateRightOutlined />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'moveL'"
          :key="i + '-' + j + 'moveL'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="左移"
          @click="moveL"
        >
          <template #icon>
            <ArrowLeftOutlined />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'moveR'"
          :key="i + '-' + j + 'moveR'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="右移"
          @click="moveR"
        >
          <template #icon>
            <ArrowRightOutlined />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'moveT'"
          :key="i + '-' + j + 'moveT'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="上移"
          @click="moveT"
        >
          <template #icon>
            <ArrowUpOutlined />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'moveB'"
          :key="i + '-' + j + 'moveB'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="下移"
          @click="moveB"
        >
          <template #icon>
            <ArrowDownOutlined />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'scaleX'"
          :key="i + '-' + j + 'scaleX'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="左右翻转"
          @click="scaleX"
        >
          <template #icon>
            <SwapOutlined />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'scaleY'"
          :key="i + '-' + j + 'scaleY'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="上下翻转"
          @click="scaleY"
        >
          <template #icon>
            <SwapOutlined style="transform: rotate(90deg)" />
          </template>
        </a-button>
        <a-button
          v-else-if="name === 'reset'"
          :key="i + '-' + j + 'reset'"
          type="primary"
          class="guns-cropper-tool-btn"
          title="重新开始"
          @click="reset"
        >
          <template #icon>
            <SyncOutlined />
          </template>
        </a-button>
        <a-upload
          v-else-if="name === 'upload'"
          :key="i + '-' + j + 'upload'"
          :accept="accept"
          :custom-request="onUpload"
          :show-upload-list="false"
        >
          <a-button
            type="primary"
            class="guns-cropper-tool-btn"
            title="选择图片"
            style="border-top-right-radius: 2px; border-bottom-right-radius: 2px"
          >
            <template #icon>
              <UploadOutlined />
            </template>
          </a-button>
        </a-upload>
        <a-button v-else-if="name === 'crop'" :key="'crop' + j" type="primary" class="guns-cropper-tool-btn-ok" @click="crop">
          <template #icon>
            <CheckOutlined />
          </template>
          <span>{{ props.okText || '完成' }}</span>
        </a-button>
      </template>
    </a-button-group>
  </div>
</template>

<script setup name="CropperTools">
import { computed } from 'vue';
const props = defineProps({
  // 操作按钮布局
  tools: String,
  // 允许上传的图片类型
  accept: String,
  // 完成按钮文字
  okText: String
});
const emits = defineEmits([
  'crop',
  'move-b',
  'move-l',
  'move-r',
  'move-t',
  'reset',
  'rotate-l',
  'rotate-r',
  'scale-x',
  'scale-y',
  'replace',
  'zoom-in',
  'zoom-out'
]);
// 解析按钮布局
const groups = computed(() => {
  if (!props.tools) {
    return [];
  }
  return props.tools.split('|').map(g => {
    return g.split(',').map(t => t.trim());
  });
});

const zoomIn = () => {
  emits('zoom-in');
};

const zoomOut = () => {
  emits('zoom-out');
};

const rotateL = () => {
  emits('rotate-l');
};

const rotateR = () => {
  emits('rotate-r');
};

const moveL = () => {
  emits('move-l');
};

const moveR = () => {
  emits('move-r');
};

const moveT = () => {
  emits('move-t');
};

const moveB = () => {
  emits('move-b');
};

const scaleX = () => {
  emits('scale-x');
};

const scaleY = () => {
  emits('scale-y');
};

const reset = () => {
  emits('reset');
};

const crop = () => {
  emits('crop');
};

/* 图片上传处理 */
const onUpload = ({ file }) => {
  const reader = new FileReader();
  reader.onload = e => {
    emits('replace', {
      data: e.target?.result,
      type: file.type
    });
  };
  reader.readAsDataURL(file);
  return false;
};
</script>
