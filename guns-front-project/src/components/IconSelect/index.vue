<template>
  <a-dropdown v-model:visible="visible" :placement="placement" :trigger="trigger" :disabled="props.disabled">
    <div :class="['guns-icon-picker', { disabled: props.disabled }]">
      <a-form-item-rest>
        <a-input :value="props.value" :placeholder="placeholder" :disabled="disabled" :size="size" readonly>
          <template #prefix>
            <svg class="icon" aria-hidden="true"><use :xlink:href="'#' + props.value" v-if="props.value"></use></svg>
          </template>
          <template #suffix>
            <div class="guns-text-placeholder guns-icon-picker-arrow">
              <close-circle-filled v-if="props.allowClear && props.value && !props.disabled" @click.stop="onClear" />
              <down-outlined />
            </div>
          </template>
        </a-input>
      </a-form-item-rest>
    </div>
    <template #overlay>
      <div class="ant-dropdown-menu guns-icon-picker-popper">
        <div @click.stop="">
          <a-tabs v-model:active-key="activeKey">
            <a-tab-pane v-for="(d, i) in result" :key="i" :tab="d.title" />
            <template #rightExtra>
              <div v-if="allowSearch" class="guns-icon-picker-search">
                <a-input-search v-model:value="keywords" :placeholder="searchPlaceholder" @search="onSearch" />
              </div>
            </template>
          </a-tabs>
          <div class="guns-icon-picker-pane">
            <div class="guns-icon-picker-list">
              <div class="guns-icon-picker-item" v-for="(d, i) in currentList" :key="i">
                <a-card hoverable>
                  <div class="guns-icon-picker-item-icon" :title="d" @click="onChoose(d)">
                    <svg class="icon" aria-hidden="true"><use :xlink:href="'#' + d"></use></svg>
                  </div>
                </a-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </a-dropdown>
</template>

<script setup name="IconSelect">
import { computed, onMounted, ref } from 'vue';
import iconfontData from '@/assets/iconfont/iconfont.json';

const iconData = computed(() => {
  let arr = [{ title: '默认风格', children: [iconfontData] }];
  arr[0].children.forEach(item => {
    item.title = '基础图标';
    const glyphs = item.glyphs.filter(item => item.font_class.substr(item.font_class.length - 2).indexOf('-p') == '-1');
    item.icons = glyphs.map(gItem => item.css_prefix_text + gItem.font_class);
  });
  return arr;
});

const props = defineProps({
  // dropdown属性
  trigger: {
    type: Array,
    default() {
      return ['click'];
    }
  },
  placement: {
    type: String,
    default: 'bottomLeft'
  },
  // 选中图标
  value: String,
  // 提示文本
  placeholder: String,
  // 尺寸
  size: String,
  // 是否禁用
  disabled: Boolean,
  // 是否显示清除
  allowClear: {
    type: Boolean,
    default: true
  },
  // 是否显示搜索框
  allowSearch: {
    type: Boolean,
    default: true
  },
  // 搜索框提示文本
  searchPlaceholder: {
    type: String,
    default: '搜索..'
  }
});

const emits = defineEmits(['update:value']);
// popper是否显示
const visible = ref(false);
// tab选中
const activeKey = ref(0);
// menu选中
const selectedKeys = ref([0]);
// 搜索关键字
const keywords = ref('');
// 搜索后的数据
const result = ref(null);

onMounted(() => {
  result.value = iconData.value;
});

/* 当前tab数据 */
const activeList = computed(() => {
  if (!result.value.length) {
    return [];
  }
  const temp = result.value[activeKey.value];
  return temp ? temp.children : [];
});

/* 当前显示图标数据 */
const currentList = computed(() => {
  if (!activeList.value.length) {
    return [];
  }
  if (!selectedKeys.value.length) {
    return [];
  }
  const temp = activeList.value[selectedKeys.value[0]];
  return temp ? temp.icons : [];
});

/* 选择图标 */
const onChoose = value => {
  visible.value = false;
  emits('update:value', value);
};

/* 清除 */
const onClear = () => {
  emits('update:value', '');
};

/* 搜索 */
const onSearch = () => {
  if (!keywords.value) {
    result.value = iconData.value;
    return;
  }
  let results = [],
    firstIndex = -1,
    activeHave = true;
  iconData.value.forEach((item, index) => {
    let children = [],
      haveIcon = false;
    item.children.forEach(child => {
      let icons = child.icons.filter(d => d.toLowerCase().indexOf(keywords.value.toLowerCase()) !== -1);
      if (icons.length) {
        haveIcon = true;
      } else if (index === activeKey.value) {
        activeHave = false;
      }
      children.push({ title: child.title, icons: icons });
    });
    if (firstIndex === -1 && haveIcon) {
      firstIndex = index;
    }
    results.push({ title: item.title, children: children });
  });
  result.value = results;
  if (!activeHave && firstIndex !== -1) {
    activeKey.value = firstIndex;
  }
};
</script>

<style lang="less">
/* iconfonts的图标css */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
/* 图标选择器popper */
.guns-icon-picker-popper {
  width: 520px;
  max-width: 90vw;
  padding: 0;
}

/* tab */
.guns-icon-picker-popper .ant-tabs-bar {
  margin: 0;
}

.guns-icon-picker-popper .ant-tabs-tab {
  padding: 10px 0 !important;
  margin: 0 12px !important;
}

.guns-icon-picker-popper .ant-tabs-extra-content {
  line-height: 41px;
}

/* 搜索框 */
.guns-icon-picker-popper .guns-icon-picker-search {
  padding-top: 10px;
  width: 200px;
  display: flex;
  align-items: center;
  margin-right: 14px;
}
.ant-input-search-button {
  height: 32px !important;
}

/* pane */
.guns-icon-picker-popper .guns-icon-picker-pane {
  display: flex;
  height: 360px;
}

.guns-icon-picker-popper .guns-icon-picker-pane > .ant-menu {
  width: 120px;
  height: 100%;
  flex-shrink: 0;
  overflow-x: hidden;
}

.guns-icon-picker-popper .guns-icon-picker-pane > .ant-menu .ant-menu-item {
  padding: 0 12px !important;
  margin: 12px 0 0 0 !important;
}

.guns-icon-picker-popper .guns-icon-picker-pane > .ant-menu .ant-menu-item-selected:after {
  right: 1px;
}

.guns-icon-picker-popper .guns-icon-picker-list {
  flex: 1;
  height: 100%;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 2px solid transparent;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 0;
}

/* item */
.guns-icon-picker-popper .guns-icon-picker-item {
  width: 25%;
  display: inline-block;
  padding: 6px 2px 6px 10px;
}

.guns-icon-picker-popper .ant-card-body {
  padding: 0;
}

.guns-icon-picker-popper .guns-icon-picker-item-icon {
  padding: 8px 0;
  font-size: 40px;
  height: 100%;
  text-align: center;
  transition: transform 0.1s;
}

.guns-icon-picker-popper .guns-icon-picker-item-icon:hover {
  transform: scale(1.6);
}

/* 默认风格 */
.guns-icon-picker {
  cursor: pointer;
}

.guns-icon-picker.disabled {
  cursor: not-allowed;
}

.guns-icon-picker:not(.disabled) .ant-input {
  cursor: pointer;
}

.guns-icon-picker.disabled .ant-input-prefix {
  opacity: 0.6;
}

.guns-icon-picker .guns-icon-picker-arrow {
  font-size: 12px;
}

.guns-icon-picker:not(:hover) .guns-icon-picker-arrow .anticon-close-circle {
  display: none;
}

.guns-icon-picker:hover .guns-icon-picker-arrow .anticon-close-circle + .anticon-down {
  display: none;
}

.ant-input-search > .ant-input-group > .ant-input-group-addon:last-child {
  top: -1px;
}

/* 自适应 */
@media screen and (max-width: 520px) {
  .guns-icon-picker-popper .guns-icon-picker-item {
    width: 33.3%;
  }
}
</style>
