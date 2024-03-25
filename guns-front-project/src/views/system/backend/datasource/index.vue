<template>
  <div class="guns-layout">
    <div class="guns-layout-content">
      <div class="guns-layout">
        <div class="guns-layout-content-application">
          <div class="content-mian">
            <div class="content-mian-header">
              <div class="header-content">
                <div class="header-content-left">
                  <a-space :size="16">
                    <a-input v-model:value="where.dbName" placeholder="数据源名称（回车搜索）" @pressEnter="reload" class="search-input">
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>
                    <a-button class="border-radius" @click="clear">重置</a-button>
                  </a-space>
                </div>
                <div class="header-content-right">
                  <a-space :size="16">
                    <a-button type="primary" class="border-radius" @click="openAddEdit()"><plus-outlined />新建</a-button>
                    <a-dropdown>
                      <template #overlay>
                        <a-menu @click="moreClick">
                          <a-menu-item key="1">
                            <icon-font iconClass="icon-opt-zidingyilie" color="#60666b"></icon-font>
                            <span>自定义列</span>
                          </a-menu-item>
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
                  rowId="dbId"
                  ref="tableRef"
                  :rowSelection="false"
                  url="/databaseInfo/page"
                >
                  <template #bodyCell="{ column, record }">
                    <!-- table列表状态标识 -->
                    <template v-if="column.dataIndex === 'statusFlag'">
                      <a-tag color="success" v-if="record.statusFlag === 1">正常</a-tag>
                      <a-tag color="error" v-else>
                        <a-tooltip>
                          <template #title>{{ record.errorDescription }}</template>
                          连接错误
                        </a-tooltip>
                      </a-tag>
                    </template>

                    <!-- 操作 -->
                    <template v-if="column.key == 'action'">
                      <a-space>
                        <icon-font
                          iconClass="icon-opt-shanchu"
                          font-size="24px"
                          title="删除"
                          color="#60666b"
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
    <DatasourceAddEdit v-model:visible="showEdit" v-if="showEdit" :data="current" @done="reload" />
  </div>
</template>

<script setup name="Position">
import { DataSourceApi } from './api/DataSourceApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import DatasourceAddEdit from './components/datasource-add-edit.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';

// 表格配置
const columns = ref([
  {
    key: 'index',
    title: '序号',
    width: 60,
    align: 'center',
    isShow: true,
    fixed: 'left'
  },
  {
    dataIndex: 'dbName',
    title: '数据库名称',
    ellipsis: true,
    fixed: 'left',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'jdbcDriver',
    title: '驱动类型',
    width: 100,
    ellipsis: true,
    isShow: true
  },
  {
    dataIndex: 'username',
    title: '账号',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'jdbcUrl',
    title: 'jdbc的url',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'statusFlag',
    title: '状态',
    width: 60,
    isShow: true
  },
  {
    dataIndex: 'remarks',
    title: '备注',
    ellipsis: true,
    width: 150,
    isShow: true
  },
  {
    key: 'action',
    title: '操作',
    fixed: 'right',
    width: 60,
    isShow: true
  }
]);
// ref
const tableRef = ref(null);

// 搜索条件
const where = ref({
  dbName: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示新增编辑弹框
const showEdit = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('DATASOURCE_TABLE');

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

// 更多点击
const moreClick = ({ key }) => {
  if (key == '1') {
    isShowCustom.value = true;
  }
};

// 点击搜索
const reload = () => {
  tableRef.value.reload();
};

// 清除搜索条件
const clear = () => {
  where.value.dbName = '';
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
    content: '确定要删除选中的多数据源吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await DataSourceApi.delete({ dbId: record.dbId });
      message.success(res.message);
      reload();
    }
  });
};
</script>

<style scoped lang="less"></style>
