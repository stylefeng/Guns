<template>
  <!-- 模板配置 -->
  <a-modal
    :width="700"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    title="模板配置"
    :body-style="{ paddingBottom: '8px', height: '500px', overflowY: 'auto' }"
    @update:visible="updateVisible"
    :footer="null"
    @close="updateVisible(false)"
  >
    <ConfigData ref="ConfigRef" />
  </a-modal>
</template>

<script setup name="TemplateConfig">
import { ref, onMounted } from 'vue';
import ConfigData from './config-data.vue';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// ref
const ConfigRef = ref(null);

onMounted(() => {
  if (props.data) {
    ConfigRef.value.openConfig(props.data.templateId);
  }
});

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};
</script>
