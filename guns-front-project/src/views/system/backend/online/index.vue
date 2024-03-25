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
                    <a-input v-model:value="where.searchText" placeholder="用户账号（回车搜索）" @pressEnter="reload" class="search-input">
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
                  rowId="userId"
                  ref="tableRef"
                  :isPage="false"
                  :customData="customData"
                  url="/getOnlineUserList"
                >
                  <template #bodyCell="{ column, record }">
                    <!-- 操作 -->
                    <template v-if="column.key == 'action'">
                      <a-space :size="16">
                        <icon-font
                          iconClass="icon-opt-tixiaxian"
                          color="#60666b"
                          font-size="24px"
                          title="踢下线"
                          @click="kickOff(record)"
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
  </div>
</template>

<script setup name="Online">
import { OnlineApi } from './api/OnlineApi';
import { ref, onMounted } from 'vue';
import { CustomApi } from '@/components/common/Custom/api/CustomApi';
import { message } from 'ant-design-vue/es';

// 表格配置
const columns = ref([
  {
    key: 'index',
    title: '序号',
    width: 60,
    align: 'center',
    isShow: true,
    hideInSetting: true
  },
  {
    dataIndex: 'realName',
    title: '姓名',
    ellipsis: true,
    isShow: true
  },
  {
    dataIndex: 'account',
    title: '账号',
    isShow: true
  },
  {
    dataIndex: 'loginTime',
    title: '登录时间',
    ellipsis: true,
    isShow: true
  },
  {
    dataIndex: 'loginIp',
    title: '登录IP',
    isShow: true
  },
  {
    key: 'action',
    title: '操作',
    width: 60,
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
const fieldBusinessCode = ref('oNLINE_TABLE');

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

// 自定义数据
const customData = res => {
  res.data = res.data.onlineUserList;
  return res;
};

// 踢下线
const kickOff = record => {
  OnlineApi.offlineUser({ token: record.token }).then(res => {
    message.success(res.message);
    reload();
  });
};
</script>

<style scoped lang="less"></style>
