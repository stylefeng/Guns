<template>
  <a-modal
    :width="800"
    :maskClosable="false"
    :visible="props.visible"
    :confirm-loading="loading"
    :forceRender="true"
    title="功能维护"
    :footer="null"
    :body-style="{ paddingBottom: '8px' }"
    @update:visible="updateVisible"
    @close="updateVisible(false)"
  >
    <div class="stand-box">
      <div class="stand-header">
        <span class="title">当前菜单：</span><span>{{ props.data.menuName }}</span>
      </div>
      <div class="search">
        <a-space :size="16">
          <a-input v-model:value="searchText" placeholder="菜单名称、菜单编码（回车搜索）" @pressEnter="getList" class="search-input">
            <template #prefix>
              <icon-font iconClass="icon-opt-search"></icon-font>
            </template>
          </a-input>
          <a-button class="border-radius" @click="clear">重置</a-button>
        </a-space>
        <a-button type="primary" class="border-radius" @click="openAdd"><plus-outlined />新建</a-button>
      </div>
      <div class="table">
        <vxe-table
          border
          show-overflow
          keep-source
          ref="xTableRef"
          :loading="loading"
          :data="tableData"
          height="500"
          :edit-config="{ trigger: 'manual', mode: 'row', autoClear: false, showStatus: true }"
        >
          <vxe-column type="seq" width="60" title="序号" align="center"></vxe-column>
          <vxe-column field="optionName" title="功能名称" :edit-render="{}" align="center">
            <template #edit="{ row }">
              <vxe-input v-model="row.optionName" type="text"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="optionCode" title="功能编码" :edit-render="{}" align="center">
            <template #edit="{ row }">
              <vxe-input v-model="row.optionCode" type="text"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column title="操作" align="center">
            <template #default="{ row }">
              <template v-if="isActiveStatus(row)">
                <a-space :size="16">
                  <save-outlined @click="saveRowEvent(row)" style="font-size: 20px" title="保存" />
                  <close-outlined @click="cancelRowEvent(row)" style="font-size: 20px" title="取消" />
                </a-space>
              </template>
              <template v-else>
                <a-space :size="16">
                  <icon-font
                    iconClass="icon-opt-bianji"
                    font-size="24px"
                    title="编辑"
                    color="#60666b"
                    @click="editRowEvent(row)"
                  ></icon-font>
                  <icon-font
                    iconClass="icon-opt-shanchu"
                    font-size="24px"
                    title="删除"
                    color="#60666b"
                    v-if="row.menuOptionId"
                    @click="remove(row)"
                  ></icon-font>
                </a-space>
              </template>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
    </div>
  </a-modal>
</template>

<script setup name="UseStand">
import { MenuApi } from '../api/MenuApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  visible: Boolean,
  data: Object
});

const emits = defineEmits(['update:visible', 'done']);
// 弹框加载
const loading = ref(false);
// 查询条件
const searchText = ref('');
// 表格数据
const tableData = ref([]);
// ref
const xTableRef = ref(null);

onMounted(() => {
  if (props.data) {
    getList();
  }
});

// 获取功能列表
const getList = () => {
  loading.value = true;
  MenuApi.optionList({ menuId: props.data.menuId, searchText: searchText.value })
    .then(res => {
      tableData.value = res;
    })
    .finally(() => (loading.value = false));
};

// 更改弹框状态
const updateVisible = value => {
  emits('update:visible', value);
};

// 清空条件
const clear = () => {
  searchText.value = '';
  getList();
};

// 新建
const openAdd = async () => {
  let obj = {
    optionName: '',
    optionCode: '',
    menuId: props.data.menuId
  };
  tableData.value.push(obj);
  const $table = xTableRef.value;
  if ($table) {
    await $table.setEditRow(obj);
  }
};

// 是否是激活状态
const isActiveStatus = row => {
  const $table = xTableRef.value;
  if ($table) {
    return $table.isEditByRow(row);
  }
};

// 点击编辑
const editRowEvent = async row => {
  const $table = xTableRef.value;
  if ($table) {
    await $table.setEditRow(row);
  }
};

// 保存
const saveRowEvent = row => {
  if (row.menuOptionId) {
    MenuApi.optionEdit(row).then(res => {
      message.success(res.message);
      getList();
    });
  } else {
    MenuApi.optionAdd(row).then(res => {
      message.success(res.message);
      getList();
    });
  }
  const $table = xTableRef.value;
  if ($table) {
    $table.clearEdit();
  }
};

// 取消
const cancelRowEvent = async row => {
  const $table = xTableRef.value;
  if ($table) {
    await $table.clearEdit();
    // 还原数据
    await $table.revertData(row);
  }
};

// 删除
const remove = row => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      loading.value = true;
      MenuApi.optionDelete({ menuOptionId: row.menuOptionId })
        .then(res => {
          message.success(res.message);
          getList();
        })
        .finally(() => (loading.value = false));
    }
  });
};
</script>

<style scoped lang="less">
.stand-box {
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
}
.stand-header {
  font-size: 16px;
}
.title {
  margin-right: 10px;
  font-size: 16px;
}
.search {
  width: 100%;
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
  .search-input {
    width: 300px;
    border-radius: 5px;
  }
}
:deep(.vxe-icon-edit) {
  display: none;
}
</style>
