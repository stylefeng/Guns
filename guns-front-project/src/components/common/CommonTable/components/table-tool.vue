<template>
  <a-space :size="16">
    <template v-for="(tool, index) in tools">
      <!-- 刷新 -->
      <CommonToolItem v-if="tool === 'reload'" :key="'reload' + index" :placement="tipsPlacement" title="刷新" @click="reload">
        <ReloadOutlined />
      </CommonToolItem>
      <!-- 密度设置 -->
      <CommonToolItem v-if="tool === 'size'" :key="'size' + index" :placement="tipsPlacement" title="密度">
        <a-dropdown :trigger="['click']" :overlay-style="{ minWidth: '80px' }" placement="bottomRight">
          <ColumnHeightOutlined />
          <template #overlay>
            <a-menu :selected-keys="selectedKeys" @click="updateSize">
              <a-menu-item key="default">默认</a-menu-item>
              <a-menu-item key="middle">中等</a-menu-item>
              <a-menu-item key="small">紧凑</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </CommonToolItem>
      <!-- 列设置 -->
      <CommonToolItem v-if="tool === 'columns'" :key="'columns' + index" :placement="tipsPlacement" title="列设置" @click="columnConfig">
        <SettingOutlined />
      </CommonToolItem>
      <!-- 全屏切换 -->
      <CommonToolItem
        v-if="tool === 'fullscreen'"
        :key="'fullscreen' + index"
        :placement="tipsPlacement"
        :title="props.fullscreen ? '取消全屏' : '全屏'"
        @click="toggleFullscreen"
      >
        <FullscreenExitOutlined v-if="props.fullscreen" />
        <FullscreenOutlined v-else />
      </CommonToolItem>
    </template>

    <!-- 自定义列 -->
    <Custom
      v-model:visible="isShowCustom"
      v-if="isShowCustom"
      :data="props.columns"
      @done="updateColumns"
      :fieldBusinessCode="fieldBusinessCode"
    />
  </a-space>
</template>

<script setup name="TableTool">
import { computed, ref } from 'vue';
import { getSizeCacheKey } from '../util';

const props = defineProps({
  // 工具按钮布局
  tools: {
    type: Array,
    default: () => {
      return ['reload', 'size', 'columns', 'fullscreen'];
    }
  },
  // 表格尺寸
  size: {
    type: String,
    default: 'small'
  },
  // 表格列配置
  columns: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 业务编码
  fieldBusinessCode: String,
  // 是否是全屏状态
  fullscreen: Boolean,
  // 列配置缓存本地的 key
  cacheKey: String
});

const emits = defineEmits(['reload', 'update:size', 'update:columns', 'update:fullscreen']);

// 是否显示自定义列
const isShowCustom = ref(false);

// tooltip 的方向
const tipsPlacement = computed(() => {
  return props.fullscreen ? 'bottom' : 'top';
});

// 表格尺寸下拉选中
const selectedKeys = computed(() => {
  return [props.size];
});

/* 刷新表格 */
const reload = () => {
  emits('reload');
};

/* 修改表格尺寸 */
const updateSize = ({ key }) => {
  if (props.cacheKey) {
    localStorage.setItem(getSizeCacheKey(props.cacheKey), JSON.stringify(key));
  }
  emits('update:size', key);
};

// 列配置
const columnConfig = () => {
  isShowCustom.value = true;
};

// 关闭自定义列
const updateColumns = columns => {
  emits('update:columns', columns);
};

/* 全屏切换 */
const toggleFullscreen = () => {
  emits('update:fullscreen', !props.fullscreen);
};
</script>

<style scoped lang="less"></style>
