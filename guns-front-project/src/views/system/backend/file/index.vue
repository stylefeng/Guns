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
                      v-model:value="where.fileOriginName"
                      placeholder="文件名称（回车搜索）"
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
                    <a-upload
                      name="file"
                      :multiple="true"
                      :action="FileUploadUrls"
                      :headers="headers"
                      @change="afterUpload"
                      :showUploadList="false"
                    >
                      <a-button type="primary" class="border-radius">
                        <template #icon>
                          <CloudUploadOutlined />
                        </template>
                        <span>上传文件</span>
                      </a-button>
                    </a-upload>
                    <a-upload
                      name="file"
                      :multiple="true"
                      :action="FileUploadUrlToDb"
                      :headers="headers"
                      :before-upload="beforeUpload"
                      @change="afterUpload"
                      :showUploadList="false"
                    >
                      <a-button class="border-radius">
                        <template #icon>
                          <CloudUploadOutlined />
                        </template>
                        <span>上传到数据库（1MB限制）</span>
                      </a-button>
                    </a-upload>
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
                  rowId="fileId"
                  ref="tableRef"
                  :rowSelection="false"
                  url="/sysFileInfo/fileInfoListPage"
                >
                  <template #bodyCell="{ column, record }">
                    <!-- 姓名 -->
                    <template v-if="column.dataIndex == 'fileOriginName'">
                      <a @click="openDetail(record)">{{ record.fileOriginName }}</a>
                    </template>
                    <!-- 图片预览 -->
                    <template v-if="column.dataIndex === 'fileUrl'">
                      <a-image :width="30" :src="record.fileUrl" />
                    </template>
                    <!-- table存储位置列 -->
                    <template v-if="column.dataIndex === 'fileLocation'">
                      <a-tag color="orange" v-if="record.fileLocation === 1">阿里云</a-tag>
                      <a-tag color="blue" v-if="record.fileLocation === 2">腾讯云</a-tag>
                      <a-tag color="red" v-if="record.fileLocation === 3">minio</a-tag>
                      <a-tag color="green" v-if="record.fileLocation === 4">本地</a-tag>
                      <a-tag color="cyan" v-if="record.fileLocation === 5">数据库</a-tag>
                    </template>
                    <!-- 是否机密 -->
                    <template v-if="column.dataIndex === 'secretFlag'">
                      <span v-if="record.secretFlag == 'Y'">是</span>
                      <span v-if="record.secretFlag == 'N'">否</span>
                    </template>
                    <!-- 操作 -->
                    <template v-if="column.key == 'action'">
                      <a-space :size="16">
                        <icon-font
                          iconClass="icon-opt-xiazai"
                          font-size="24px"
                          color="#60666b"
                          title="下载"
                          @click="download(record)"
                        ></icon-font>
                        <icon-font
                          iconClass="icon-opt-xiangqing"
                          font-size="24px"
                          color="#60666b"
                          title="详情"
                          @click="openDetail(record)"
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

    <!-- 文件详情弹框 -->
    <FileDetail v-model:visible="showDetail" v-if="showDetail" :data="current" />
  </div>
</template>

<script setup name="File">
import { getToken } from '@/utils/token-util';
import { FileApi, FileUploadUrl } from './api/FileApi';
import { ref, createVNode, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue/es';
import { API_BASE_PREFIX } from '@/config/setting';
import FileDetail from './components/file-detail.vue';
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
    fixed: 'left',
    hideInSetting: true
  },
  {
    dataIndex: 'fileId',
    title: '文件id',
    fixed: 'left',
    ellipsis: true,
    width: 150,
    isShow: true
  },
  {
    dataIndex: 'fileOriginName',
    title: '文件名称',
    width: 100,
    ellipsis: true,
    isShow: true
  },
  {
    dataIndex: 'fileUrl',
    title: '图片预览',
    ellipsis: true,
    width: 80,
    isShow: true
  },
  {
    dataIndex: 'fileLocation',
    title: '存储位置',
    ellipsis: true,
    width: 100,
    isShow: true
  },
  {
    dataIndex: 'secretFlag',
    title: '是否机密',
    width: 80,
    isShow: true
  },
  {
    title: '文件大小',
    width: 80,
    ellipsis: true,
    dataIndex: 'fileSizeInfo',
    isShow: true
  },
  {
    title: '文件后缀',
    width: 80,
    ellipsis: true,
    dataIndex: 'fileSuffix',
    isShow: true
  },
  {
    title: '创建时间',
    width: 120,
    dataIndex: 'createTime',
    isShow: true
  },
  {
    title: '创建人',
    isShow: true,
    ellipsis: true,
    width: 60,
    dataIndex: 'createUserName'
  },
  {
    key: 'action',
    title: '操作',
    width: 60,
    fixed: 'right',
    isShow: true
  }
]);
// ref
const tableRef = ref(null);

// 搜索条件
const where = ref({
  fileOriginName: ''
});
// 是否显示自定义列
const isShowCustom = ref(false);
// 当前行数据
const current = ref(null);
// 是否显示详情弹框
const showDetail = ref(false);
// 业务标识的编码
const fieldBusinessCode = ref('FILE_TABLE');
// 上传文件的url
const FileUploadUrls = ref(`${API_BASE_PREFIX}${FileUploadUrl}?secretFlag=N`);
// 上传文件的url（上传到数据库）
const FileUploadUrlToDb = ref(`${API_BASE_PREFIX}${FileUploadUrl}?secretFlag=N&fileLocation=5`);
// 上传文件时候要带header
const headers = ref({
  Authorization: getToken()
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
  tableRef.value.reload();
};

// 清除搜索条件
const clear = () => {
  where.value.fileOriginName = '';
  reload();
};

// 详情点击
const openDetail = record => {
  current.value = record;
  showDetail.value = true;
};

// 删除单个
const remove = record => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除选中的文件吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: async () => {
      const res = await FileApi.delete({ fileCode: record.fileCode });
      message.success(res.message);
      reload();
    }
  });
};

/**
 * 控制上传到数据库的图片不能超过1M
 *
 * @author fengshuonan
 * @date 2021/4/12 22:29
 */
const beforeUpload = file => {
  const isLt1M = file.size / 1024 / 1024 <= 1;
  if (!isLt1M) {
    message.error('上传图片不能超过1MB');
  }
  return isLt1M;
};

/**
 * 上传成功的回调
 *
 * @author fengshuonan
 * @date 2021/4/2 17:03
 */
const afterUpload = ({ file }) => {
  if (file.response) {
    message.success('上传成功');
    reload();
  }
};

/**
 * 下载文件
 *
 * @author fengshuonan
 * @date 2021/4/12 22:11
 */
const download = record => {
  FileApi.download({
    fileId: record.fileId,
    secretFlag: record.secretFlag,
    token: getToken()
  });
};
</script>

<style scoped lang="less"></style>
