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
                    <a-input
                      v-model:value="where.searchText"
                      placeholder="资源名称、路径、类名（回车搜索）"
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
                  rowId="resourceId"
                  ref="tableRef"
                  :rowSelection="false"
                  url="resource/pageList"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex == 'requiredLoginFlag'">
                      <a-tag color="blue" v-if="record.requiredLoginFlag == 'Y'">是</a-tag>
                      <a-tag color="orange" v-if="record.requiredLoginFlag == 'N'">否</a-tag>
                    </template>
                    <template v-if="column.dataIndex == 'requiredPermissionFlag'">
                      <a-tag color="blue" v-if="record.requiredPermissionFlag == 'Y'">是</a-tag>
                      <a-tag color="orange" v-if="record.requiredPermissionFlag == 'N'">否</a-tag>
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
  </div>
</template>

<script setup name="AuthResource">
import { ref, onMounted } from 'vue';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';

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
    dataIndex: 'resourceName',
    title: '资源名称',
    ellipsis: true,
    width: 200,
    isShow: true
  },
  {
    dataIndex: 'url',
    title: '请求地址',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'className',
    title: '控制器类',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'httpMethod',
    title: 'HTTP请求',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'requiredLoginFlag',
    title: '需要登录',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'requiredPermissionFlag',
    title: '需要鉴权',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'ipAddress',
    title: '上次汇报IP',
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'createTime',
    title: '创建时间',
    width: 150,
    isShow: true
  }
]);
// ref
const tableRef = ref(null);

// 搜索条件
const where = ref({
  searchText: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('RESOURCE_TABLE');

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
  where.value.searchText = '';
  reload();
};
</script>

<style scoped lang="less"></style>
