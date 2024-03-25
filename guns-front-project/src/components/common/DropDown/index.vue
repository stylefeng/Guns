<template>
  <div class="work-down">
    <!-- dropdown类型 -->
    <a-dropdown
      :getPopupContainer="
        triggerNode => {
          return triggerNode.parentNode || document.body;
        }
      "
      :trigger="['click']"
    >
      <a @click.prevent class="down-title">
        {{ downName ? downName : dropName }}
        <DownOutlined style="color: #898E91; margin-left: 8px;" />
      </a>
      <template #overlay>
        <a-menu @click="dropClick" v-show="list?.length > 0">
          <a-menu-item :key="item[keyValue]" v-for="item in list">{{ item[keyName] }}</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  name: 'DropDown',
  props: {
    //  需遍历的数组
    list: {
      type: Array,
      default: () => []
    },
    //  下拉的名字
    dropName: {
      type: String,
      default: ''
    },
    //key绑定的值
    keyValue: {
      type: String,
      default: ''
    },
    //下拉显示的名字
    keyName: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const data = reactive({
      downName: ''
    });

    // 下拉点击
    const dropClick = ({ key }) => {
      data.downName = props.list.filter(item => item[props.keyValue] == key)[0].name;
      context.emit('dropClick', key);
    };

    // 改变名称
    const changeDropname = (val) => {
      data.downName = val
    }

    return {
      ...toRefs(data),
      changeDropname,
      dropClick
    };
  }
});
</script>

<style lang="less" scoped>
.work-down {
  display: inline-block;
}
.ant-dropdown-link {
  color: #000 !important;
}
:deep(.tree-drop .ant-dropdown-menu-item:hover) {
  background-color: #fff !important;
}
.down-title {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  color: #60666B;
  font-size: 16px;
  border: 1px solid rgba(197, 207, 209, 0.60);
}
:deep(.ant-dropdown-content) {
  min-width: 240px;
  border-radius: 4px;
}
</style>
