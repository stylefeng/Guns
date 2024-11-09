<template>
  <common-modal
    :width="600"
    :visible="props.visible"
    :confirm-loading="loading"
    :title="'自定义显示列'"
    :body-style="{ padding: '16px 24px' }"
    @ok="save"
    wrapClassName="project-modal"
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
            <td style="text-align: left; width: 260px">
              {{ element.title }}
            </td>
            <!-- 是否显示 -->
            <td style="text-align: center; padding: 8px">
              <a-switch
                :checked="checkedIds.includes(element.id)"
                :disabled="element.title == '序号'"
                @change="showChange($event, element)"
              />
            </td>
            <!-- 是否显示 -->
            <td style="text-align: center; padding: 8px 8px 8px 32px; width: 150px">
              <a-input v-model:value="element.width"></a-input>
            </td>
            <td
              :class="[
                'table-tool-fixed-item',
                {
                  active: element.fixed === true || element.fixed === 'left'
                }
              ]"
              @click="onItemFixedLeft(element)"
            >
              <ATooltip title="固定在左侧">
                <VerticalRightOutlined />
              </ATooltip>
            </td>
            <td
              :class="[
                'table-tool-fixed-item',
                {
                  active: element.fixed === 'right'
                }
              ]"
              @click="onItemFixedRight(element)"
            >
              <ATooltip title="固定在右侧">
                <VerticalLeftOutlined />
              </ATooltip>
            </td>
          </tr>
        </template>
      </draggable>
    </div>
    <template #footer>
      <a-space>
        <a-button @click="cancel" class="border-radius grey" type="link" :loading="loading">取消</a-button>
        <a-button type="primary" @click="save" class="border-radius" :loading="loading">确定</a-button>
      </a-space>
    </template>
  </common-modal>
</template>

<script setup name="Custom">
import draggable from 'vuedraggable';
import { CustomApi } from './api/CustomApi';
import { onMounted, ref } from 'vue';
import { getSettingCols, getCheckedColumns, getInitColumnsAndCache } from '@/components/common/CommonTable/util';

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
    default: ''
  },
  cacheKey: String,
  untitledText: String
});
const emits = defineEmits(['update:visible', 'done']);

// 提交状态
const loading = ref(false);
// 配置项
const columns = ref([]);
// 是否同步全体员工
const fieldType = ref(2);
// 选中列表
const checkedIds = ref([]);

onMounted(() => {
  if (props.data) {
    let arr = props.data;
    const hasCheckedField = props.data.some(item => 'checked' in item);
    if (!hasCheckedField) {
      arr = getInitColumnsAndCache(props.data, props.cacheKey, true);
    }
    const result = getSettingCols(arr, props.untitledText, props.cacheKey);
    columns.value = result.data;
    checkedIds.value = result.checkedIds;
  }
});

const showChange = (e, element) => {
  if (e) {
    checkedIds.value.push(element.id);
  } else {
    checkedIds.value.splice(
      checkedIds.value.findIndex(c => c === element.id),
      1
    );
  }

  columns.value.forEach(d => {
    d.checked = checkedIds.value.includes(d.id);
  });
};

/* 固定列左侧 */
const onItemFixedLeft = col => {
  col.fixed = col.fixed === true || col.fixed === 'left' ? false : 'left';
  onColumnSortChange();
};

/* 固定列右侧 */
const onItemFixedRight = col => {
  col.fixed = col.fixed === 'right' ? false : 'right';
  onColumnSortChange();
};

/* 列配置拖动改变顺序 */
const onColumnSortChange = () => {
  const newColumns = getCheckedColumns(columns.value, columns.value, checkedIds.value, true);
  columns.value = newColumns;
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

  const newColumns = getCheckedColumns(columns.value, columns.value, checkedIds.value, false);

  if (props.fieldBusinessCode) {
    let params = {
      fieldBusinessCode: props.fieldBusinessCode,
      fieldType: fieldType.value,
      tableWidthJson: JSON.stringify(newColumns)
    };
    CustomApi.setTableWidth(params)
      .then(res => {
        loading.value = false;
        updateVisible(false);
        emits('done', columns.value);
      })
      .catch(() => {
        loading.value = false;
      });
  } else {
    updateVisible(false);
    emits('done', newColumns);
  }
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
:deep(.ant-input) {
  background: rgba(197, 207, 209, 0.2) !important;
}
.table-tool-fixed-item {
  text-align: center;
  padding: 8px;
  font-size: 13px;
  margin-left: 4px;
  color: var(--text-color-secondary);
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
  }

  &.active {
    color: var(--primary-color);
  }
}
</style>
<style lang="less">
.outlined {
  .iconfont {
    cursor: move !important;
  }
}
</style>
