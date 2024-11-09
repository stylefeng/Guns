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
                    <a-input v-model:value="where.llgName" placeholder="日志名称（回车搜索）" @pressEnter="reload" class="search-input">
                      <template #prefix>
                        <icon-font iconClass="icon-opt-search"></icon-font>
                      </template>
                    </a-input>
                    <a-range-picker v-model:value="dateRange" class="search-date" value-format="YYYY-MM-DD" @change="reload" />
                    <a-input v-model:value="where.userName" placeholder="请选择用户" class="search-date" @focus="selectUser"></a-input>
                    <a-button class="border-radius" @click="reload" type="primary">查询</a-button>
                    <a-button class="border-radius" @click="clear">重置</a-button>
                  </a-space>
                </div>
                <div class="header-content-right">
                  <a-space :size="16">
                    <a-popconfirm title="是否清空所有日志？" @confirm="cleanAllLoginLog">
                      <template #icon>
                        <question-circle-outlined />
                      </template>
                      <a-button danger>
                        <template #icon>
                          <delete-outlined />
                        </template>
                        <span>清空日志</span>
                      </a-button>
                    </a-popconfirm>

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
                  rowId="llgId"
                  size="default"
                  ref="tableRef"
                  :rowSelection="false"
                  url="/loginLog/page"
                >
                  <template #bodyCell></template>
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

    <!-- 选择用户 -->
    <Selection
      v-model:visible="visibleSelection"
      v-if="visibleSelection"
      :data="selectedData"
      :showTab="['user']"
      :changeHeight="true"
      title="人员选择"
      @done="closeSelection"
    ></Selection>
  </div>
</template>

<script setup name="LoginLog">
import { LoginLogApi } from './api/LoginLogApi';
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
    isShow: true
  },
  {
    dataIndex: 'userIdWrapper',
    title: '用户名',
    isShow: true,
    width: 100,
  },
  {
    dataIndex: 'account',
    title: '账号',
    isShow: true,
    width: 100,
  },
  {
    dataIndex: 'llgName',
    title: '日志名称',
    isShow: true
  },
  {
    dataIndex: 'llgSucceed',
    title: '执行结果',
    isShow: true
  },
  {
    dataIndex: 'createTime',
    title: '时间',
    isShow: true
  },
  {
    dataIndex: 'llgMessage',
    title: '具体消息',
    isShow: true
  },
  {
    title: 'IP',
    dataIndex: 'llgIpAddress',
    isShow: true
  }
]);
// ref
const tableRef = ref(null);
// 时间范围
const dateRange = ref(null);

// 搜索条件
const where = ref({
  beginTime: null,
  endTime: null,
  userId: '',
  userName: '',
  llgName: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('LOGIN_LOG_TABLE');

// 是否显示选择人员弹框
const visibleSelection = ref(false);

// 选择弹框总数据
const selectedData = ref({
  selectUserList: []
});

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
  const [beginTime, endTime] = dateRange.value || [null, null];
  where.value.beginTime = beginTime;
  where.value.endTime = endTime;
  tableRef.value.reload();
};

// 清除搜索条件
const clear = () => {
  dateRange.value = null;
  where.value = {
    beginTime: null,
    endTime: null,
    userId: '',
    userName: '',
    llgName: ''
  };
  reload();
};

/**
 * 清空所有日志
 *
 * @author luojie
 * @date 2021/4/13 14:32
 */
const cleanAllLoginLog = async () => {
  const result = await LoginLogApi.deleteAll(where.value);
  message.success(result.message);
  reload();
};

// 选择用户
const selectUser = () => {
  const { userName, userId } = where.value;
  if (userName && userId) {
    selectedData.value.selectUserList = [{ bizId: userId, name: userName }];
  }
  visibleSelection.value = true;
};

// 关闭选择用户
const closeSelection = data => {
  const { bizId, name } = data.selectUserList[0] || { bizId: '', name: '' };
  where.value.userName = name;
  where.value.userId = bizId;
  reload();
};
</script>

<style scoped lang="less"></style>
