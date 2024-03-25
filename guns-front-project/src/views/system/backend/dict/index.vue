<template>
  <div class="guns-layout">
    <div class="guns-layout-sidebar p-t-12 bgColor" style="width: 292px">
      <div class="sidebar-content">
        <dict-type @defaultSelect="defaultSelect" @treeSelect="treeSelect"></dict-type>
      </div>
    </div>
    <div class="guns-layout-content" style="width: calc(100% - 292px)">
      <div class="guns-layout">
        <div class="guns-layout-content-application">
          <div class="content-mian">
            <div class="content-mian-header">
              <div class="header-content">
                <div class="header-content-left">
                  <a-space :size="16">
                    <a-input
                      v-model:value="where.searchText"
                      placeholder="名称、编码（回车搜索）"
                      @pressEnter="reload"
                      class="search-input"
                    >
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>
                    <a-button class="border-radius" @click="clear">重置</a-button>
                  </a-space>
                </div>
                <div class="header-content-right">
                  <a-space :size="16">
                    <a-button type="primary" class="border-radius" @click="openAddEdit()" v-permission="['ADD_DICT']"
                      ><plus-outlined />新建</a-button
                    >
                    <a-button class="border-radius flex" @click="updateStructure">
                      <icon-font iconClass="icon-opt-bianji" title="编辑" color="#000" :style="{ paddingRight: '8px' }"></icon-font>
                      修改上下结构</a-button
                    >
                    <a-dropdown>
                      <template #overlay>
                        <a-menu @click="moreClick">
                          <a-menu-item key="1">
                            <icon-font iconClass="icon-opt-zidingyilie" color="#60666b"></icon-font>
                            <span>自定义列</span>
                          </a-menu-item>
                          <div v-permission="['DELETE_DICT']">
                            <a-menu-item key="2">
                              <icon-font iconClass="icon-opt-shanchu" color="#60666b"></icon-font>
                              <span>批量删除</span>
                            </a-menu-item>
                          </div>
                        </a-menu>
                      </template>
                      <a-button class="border-radius">
                        更多
                        <small-dash-outlined />
                      </a-button>
                    </a-dropdown>
                  </a-space>
                </div>
              </div>
            </div>
            <div class="content-mian-body">
              <div class="table-content">
                <common-table
                  :columns="columns"
                  :where="where"
                  :isInit="false"
                  rowId="dictId"
                  ref="tableRef"
                  :isPage="false"
                  url="/dict/getDictTreeList"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex == 'dictName'">
                      <a @click="openAddEdit(record)">{{ record.dictName }}</a>
                    </template>
                    <!-- 操作 -->
                    <template v-if="column.key == 'action'">
                      <a-space :size="16">
                        <icon-font
                          iconClass="icon-opt-bianji"
                          font-size="24px"
                          title="编辑"
                          color="#60666b"
                          v-permission="['EDIT_DICT']"
                          @click="openAddEdit(record)"
                        ></icon-font>
                        <icon-font
                          iconClass="icon-opt-shanchu"
                          font-size="24px"
                          title="删除"
                          color="#60666b"
                          v-permission="['DELETE_DICT']"
                          @click="remove(record)"
                        ></icon-font>
                      </a-space>
                    </template>
                  </template>
                </common-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义列 -->
    <Custom
      v-model:visible="isShowCustom"
      v-if="isShowCustom"
      :data="columns"
      @done="val => (columns = val)"
      :fieldBusinessCode="fieldBusinessCode"
    />

    <!-- 新增编辑弹框 -->
    <DictAddEdit
      v-model:visible="showEdit"
      v-if="showEdit"
      :data="current"
      @done="reload"
      :dictTypeId="where.dictTypeId"
      :dictTypeName="where.dictTypeName"
    />

    <!-- 修改上下结构 -->
    <UpdateStructure
      v-model:visible="showUpdate"
      v-if="showUpdate"
      :dictTypeId="where.dictTypeId"
      :dictTypeName="where.dictTypeName"
      @done="reload"
    />
  </div>
</template>

<script setup name="SysDict">
import { SysDictApi } from './api/SysDictApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import DictType from './components/dict-type/dict-type.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';
import DictAddEdit from './components/dict/dict-add-edit.vue';
import UpdateStructure from './components/update-structure.vue';

// 表格配置
const columns = ref([
  {
    key: 'index',
    title: '序号',
    width: 48,
    align: 'center',
    isShow: true,
    hideInSetting: true
  },
  {
    dataIndex: 'dictName',
    title: '字典名称',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'dictCode',
    title: '字典值(字典编码)',
    width: 200,
    isShow: true
  },
  {
    dataIndex: 'dictSort',
    title: '排序',
    ellipsis: true,
    width: 200,
    isShow: true
  },
  {
    key: 'action',
    title: '操作',
    width: 80,
    isShow: true
  }
]);
// ref
const tableRef = ref(null);
// 搜索条件
const where = ref({
  searchText: '',
  dictTypeId: '',
  dictTypeName: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示新增编辑弹框
const showEdit = ref(false);
// 是否显示修改上下结构弹框
const showUpdate = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('SYS_DICT_TABLE');

onMounted(() => {
  getColumnData();
});

// 获取表格配置
const getColumnData = () => {
  CustomApi.getUserConfig({ fieldBusinessCode: fieldBusinessCode.value }).then(res => {
    if (res.tableWidthJson) {
      columns.value = JSON.parse(res.tableWidthJson);
    }
  });
};

// 默认选中分类
const defaultSelect = data => {
  where.value.dictTypeId = data.dictTypeId;
  where.value.dictTypeName = data.dictTypeName;
  reload();
};

// 左侧树选中
const treeSelect = (selectedKeys, metadata) => {
  where.value.dictTypeId = selectedKeys[0];
  where.value.dictTypeName = metadata.node.dictTypeName;
  reload();
};

// 更多点击
const moreClick = ({ key }) => {
  if (key == '1') {
    isShowCustom.value = true;
  } else if (key == '2') {
    batchDelete();
  }
};

// 点击搜索
const reload = () => {
  tableRef.value.reload();
};

// 清除搜索条件
const clear = () => {
  where.value.searchText = '';
  reload();
};

// 新增编辑点击
const openAddEdit = record => {
  current.value = record;
  showEdit.value = true;
};

// 删除单个
const remove = record => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的字典吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await SysDictApi.delete({ dictId: record.dictId });
      message.success(res.message);
      reload();
    }
  });
};

// 批量删除
const batchDelete = () => {
  if (tableRef.value.selectedRowList && tableRef.value.selectedRowList.length == 0) {
    return message.warning('请选择需要删除的字典');
  }
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的字典吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await SysDictApi.batchDelete({ dictIdList: tableRef.value.selectedRowList });
      message.success(res.message);
      reload();
    }
  });
};

// 修改上下结构
const updateStructure = () => {
  showUpdate.value = true;
};
</script>

<style scoped lang="less"></style>
