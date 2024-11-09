<!-- 表头工具栏按钮 -->
<template>
  <div class="guns-tool-item" @click="onClick">
    <ATooltip :title="title" :visible="visible" :placement="placement" @update:visible="updateVisible">
      <slot></slot>
    </ATooltip>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Tooltip as ATooltip } from 'ant-design-vue/es';

const props = defineProps({
  title: String,
  placement: String,
  disabled: Boolean
});
const emits = defineEmits(['click']);
const visible = ref(false);

const updateVisible = value => {
  if (!props.disabled) {
    visible.value = value;
  }
};

const onClick = e => {
  visible.value = false;
  emits('click', e);
};

watch(
  () => props.disabled,
  value => {
    if (!value) {
      visible.value = false;
    }
  }
);
</script>

<style scoped>
.guns-tool-item {
  font-size: 16px;
}
</style>
