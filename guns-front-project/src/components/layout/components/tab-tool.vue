<template>
  <div :class="['guns-tab-tool', { 'is-tab': tab }, { 'is-active': active }]">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabTool',
  props: {
    // 是否为模拟页签
    tab: Boolean,
    // 为模拟页签时是否选中
    active: Boolean
  }
});
</script>
