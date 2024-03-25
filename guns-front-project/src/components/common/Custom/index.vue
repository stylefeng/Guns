<template>
  <a-modal
    :width="526"
    :visible="props.visible"
    :confirm-loading="loading"
    :title="'自定义显示列'"
    :body-style="{ padding: '16px 24px' }"
    @ok="save"
    wrapClassName="custom-modal"
    :maskClosable="false"
    @cancel="cancel"
  >
    <div class="box">
      <draggable
        tag="tbody"
        item-key="id"
        v-model="columns"
        :component-data="{ class: 'ant-table-tbody' }"
        handle=".icon-opt-zidingyilie"
        style="width: 100px"
        :animation="300"
      >
        <template #item="{ element }">
          <tr class="row">
            <!-- 拖动按钮 -->
            <td style="text-align: left" class="outlined">
              <icon-font iconClass="icon-opt-zidingyilie" color="#60666b" fontSize="20px"></icon-font>
            </td>
            <!-- 名称 -->
            <td style="text-align: left; width: 260px" class="">
              {{ element.title }}
            </td>
            <!-- 是否显示 -->
            <td style="text-align: center; padding: 8px" class="">
              <a-switch v-model:checked="element.isShow" :disabled="element.title == '序号'" />
            </td>
            <!-- 是否显示 -->
            <td style="text-align: center; padding: 8px 8px 8px 32px" class="">
              <a-input v-model:value="element.width"></a-input>
            </td>
          </tr>
        </template>
      </draggable>
    </div>
    <template #footer>
      <div class="footer">
        <div>
          <vxe-switch v-model="fieldType" :open-value="1" :close-value="2" :disabled="isDisabled"></vxe-switch>是否同步全体员工
          <a-tooltip>
            <template #title>只有管理员才能操作</template>
            <question-circle-outlined />
          </a-tooltip>
        </div>
        <a-space>
          <a-button @click="cancel" :loading="loading">取消</a-button>
          <a-button type="primary" @click="save" :loading="loading">确定</a-button>
        </a-space>
      </div>
    </template>
  </a-modal>
</template>

<script setup name="Custom">
import draggable from 'vuedraggable';
import { CustomApi } from './api/CustomApi';
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '@/store/modules/user';

const props = defineProps({
  // 弹窗是否打开
  visible: Boolean,
  data: {
    type: Array,
    default: []
  },
  // 业务标识的编码
  fieldBusinessCode: {
    type: String,
    default: 'PROJECT_TABLE'
  }
});
const emits = defineEmits(['update:visible', 'done']);

// store
const userStore = useUserStore();
// 是否禁用同步全体员工
const isDisabled = computed(() => {
  if (userStore.authorities && userStore.authorities.find(item => item == 'SYS_CONFIG')) {
    return false;
  }
  return true;
});

// 提交状态
const loading = ref(false);
// 配置项
const columns = ref([]);
// 是否同步全体员工
const fieldType = ref(2);

onMounted(() => {
  if (props.data) {
    columns.value = deepClone(props.data);
  }
});

const deepClone = obj => {
  let result;
  if (Array.isArray(obj)) {
    result = [];
  } else if (typeof obj === 'object' && obj !== null) {
    result = {};
  } else {
    return obj;
  }
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = deepClone(obj[key]);
    } else {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * 保存和编辑
 *
 * @author lipengteng
 * @date 2021/11/05 14:55
 */
const save = () => {
  // 修改加载框为正在加载
  loading.value = true;
  columns.value.forEach(item => {
    if (item.width) item.width = Number(item.width);
  });

  let params = {
    fieldBusinessCode: props.fieldBusinessCode,
    fieldType: fieldType.value,
    tableWidthJson: JSON.stringify(columns.value)
  };
  CustomApi.setTableWidth(params)
    .then(res => {
      // 移除加载框
      loading.value = false;

      // 关闭弹框，通过控制visible的值，传递给父组件
      updateVisible(false);
      // 触发父组件done事件
      emits('done', columns.value);
    })
    .catch(() => {
      loading.value = false;
    });
};

const updateVisible = value => {
  emits('update:visible', value);
};

// 关闭弹框
const cancel = () => {
  updateVisible(false);
};
</script>
<style scoped lang="less">
.box {
  width: 100%;
  max-height: 400px;
  overflow: auto;
  border-bottom: 1px solid #eee;
  min-height: 200px;
  .row:hover {
    background: #eee;
  }
  .ant-input {
    border-radius: 5px;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
}
:deep(.ant-input) {
  background: rgba(197, 207, 209, 0.2) !important;
}
</style>
<style lang="less">
.custom-modal {
  .ant-modal-title {
    color: #262626;
    font-size: 18px !important;
    font-style: normal;
    font-weight: 500;
  }
  .ant-modal-close-icon {
    width: 20px;
    height: 20px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .ant-modal-header {
    border-bottom: 0px !important;
    padding: 16px 24px 0px 24px !important;
  }
  .ant-modal-footer {
    padding: 0px 16px 16px 16px !important;
    border-top: 0px !important;
  }
}
.outlined {
  .iconfont {
    cursor: move !important;
  }
}
</style>
<style scoped>
.ant-btn {
  border-radius: 4px !important;
}
</style>
