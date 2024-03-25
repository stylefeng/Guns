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
                      v-model:value="where.templateName"
                      placeholder="主题模板名称（回车搜索）"
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
                  rowId="templateId"
                  ref="tableRef"
                  :rowSelection="false"
                  url="/sysThemeTemplate/findPage"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex == 'templateName'">
                      <a @click="openDetail(record)">{{ record.templateName }}</a>
                    </template>

                    <!-- table列表状态栏 -->
                    <!-- Y是激活，N是禁用 -->
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
                          iconClass="icon-menu-peizhi"
                          color="#60666b"
                          font-size="24px"
                          title="配置"
                          @click="config(record)"
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
    <AttrAddEdit v-model:visible="showEdit" v-if="showEdit" :data="current" @done="reload" />
    <!-- 模板配置弹框 -->
    <TemplateConfig v-model:visible="showConfig" v-if="showConfig" :data="current" @done="reload" />
    <!-- 模板详情 -->
    <TemplateDetail v-model:visible="showDetail" v-if="showDetail" :data="current" />
  </div>
</template>

<script setup name="ThemeAttr">
import { ThemeTemplateApi } from './api/ThemeTemplateApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import TemplateDetail from './components/tamplate-detail.vue';
import AttrAddEdit from './components/template-add-edit.vue';
import TemplateConfig from './components/template-config.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
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
    title: '模板名称',
    dataIndex: 'templateName',
    width: 160,
    isShow: true
  },
  {
    title: '模板编码',
    isShow: true,
    dataIndex: 'templateCode',
    width: 160
  },
  {
    title: '模板类型',
    dataIndex: 'templateType',
    width: 160,
    isShow: true,
    customRender: function ({ text }) {
      return 1 === text ? '系统类型' : '业务类型';
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    isShow: true
  },
  {
    title: '启用状态',
    isShow: true,
    dataIndex: 'statusFlag',
    width: 100,
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
  templateName: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示新增编辑弹框
const showEdit = ref(false);
// 是否显示模板配置弹框
const showConfig = ref(false);
// 是否显示详情抽屉
const showDetail = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('THMEM_TEMPLATE_TABLE');

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
  where.value.templateName = '';
  reload();
};

// 新增编辑点击
const openAddEdit = record => {
  current.value = record;
  showEdit.value = true;
};

// 模板详情
const openDetail = record => {
  current.value = record;
  showDetail.value = true;
};

// 删除单个
const remove = record => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的模板吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await ThemeTemplateApi.del({ templateId: record.templateId });
      message.success(res.message);
      reload();
    }
  });
};

/**
 * 修改模板启用状态
 *
 * @author fengshuonan
 * @date 2021/12/21 11:30:07
 */
const editStatus = async (checked, row) => {
  const templateId = row.templateId;
  // 职位状态：Y-启用，N-禁用
  const statusFlag = checked ? 'Y' : 'N';
  const result = await ThemeTemplateApi.updateTemplateStatus({ templateId });
  message.success(result.message);
  row.statusFlag = statusFlag;
  reload();
};

// 配置
const config = record => {
  current.value = record;
  showConfig.value = true;
};
</script>

<style scoped lang="less"></style>
