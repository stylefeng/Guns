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
                    <a-input v-model:value="where.themeName" placeholder="主题名称（回车搜索）" @pressEnter="reload" class="search-input">
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
                  rowId="themeId"
                  ref="tableRef"
                  :rowSelection="false"
                  url="/sysTheme/findPage"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex == 'themeName'">
                      <a @click="openAddEdit(record)">{{ record.themeName }}</a>
                    </template>

                    <!-- table列表状态栏 -->
                    <!-- 1是激活，2是禁用 -->
                    <template v-if="column.dataIndex === 'statusFlag'">
                      <a-switch :checked="record.statusFlag === 'Y'" @change="checked => editStatus(checked, record)" />
                    </template>

                    <!-- 操作 -->
                    <template v-if="column.key == 'action'">
                      <a-space :size="16">
                        <icon-font
                          iconClass="icon-opt-bianji"
                          font-size="24px"
                          title="编辑"
                          color="#60666b"
                          @click="openAddEdit(record)"
                        ></icon-font>
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
    <ManagerAddEdit v-model:visible="showEdit" v-if="showEdit" :data="current" @done="reload" />
  </div>
</template>

<script setup name="ThemeManager">
import { ThemeApi } from './api/ThemeApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import ManagerAddEdit from './components/manager-add-edit.vue';
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
    hideInSetting: true
  },
  {
    title: '主题名称',
    dataIndex: 'themeName',
    isShow: true
  },
  {
    title: '主题模板',
    isShow: true,
    dataIndex: 'templateName'
  },
  {
    title: '创建时间',
    isShow: true,
    dataIndex: 'createTime'
  },
  {
    title: '启用状态',
    isShow: true,
    dataIndex: 'statusFlag',
  },
  {
    key: 'action',
    title: '操作',
    width: 100,
    isShow: true
  }
]);
// ref
const tableRef = ref(null);

// 搜索条件
const where = ref({
  themeName: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示新增编辑弹框
const showEdit = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('THMEM_MANAGER_TABLE');

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
  where.value.themeName = '';
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
    content: '确定要删除选中的主题吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await ThemeApi.del({ themeId: record.themeId });
      message.success(res.message);
      reload();
    }
  });
};

/**
 * 修改主题状态
 *
 * @author fengshuonan
 * @date 2021/12/20 15:48:14
 */
const editStatus = async (checked, row) => {
  const themeId = row.themeId;
  // 职位状态：Y-启用，N-禁用
  const statusFlag = checked ? 'Y' : 'N';
  const result = await ThemeApi.updateThemeStatus({ themeId });
  message.success(result.message);
  row.statusFlag = statusFlag;
  reload();
};
</script>

<style scoped lang="less"></style>
