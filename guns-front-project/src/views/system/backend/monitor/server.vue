<template>
  <div class="guns-layout">
    <div class="guns-layout-content">
      <div class="guns-layout">
        <div class="guns-layout-content-application">
          <div class="content-mian">
            <div class="content-mian-body">
              <div class="table-content">
                <a-row class="bottom-1">
                  <a-col :span="12" class="block-space-right">
                    <a-card title="CPU信息" class="card-width" :bordered="false">
                      <a-table row-key="key" :columns="data.cpuColumns" :data-source="data.cpuData" :pagination="false" />
                    </a-card>
                  </a-col>
                  <a-col :span="12" class="block-space-left">
                    <a-card title="内存信息" class="card-width" :bordered="false">
                      <a-table row-key="key" :columns="data.memoryColumns" :data-source="data.memoryData" :pagination="false" />
                    </a-card>
                  </a-col>
                </a-row>
                <a-row class="bottom-1">
                  <a-col :span="24" class="block-space-top">
                    <a-card title="JAVA虚拟机信息" class="card-width" :bordered="false">
                      <a-descriptions :column="2">
                        <a-descriptions-item label="jvm名称" class="b-r-1">{{ data.systemInfo.jvm.name }}</a-descriptions-item>
                        <a-descriptions-item label="java版本">{{ data.systemInfo.jvm.version }}</a-descriptions-item>
                        <a-descriptions-item label="启动时间" class="b-r-1">{{ data.systemInfo.jvm.startTime }}</a-descriptions-item>
                        <a-descriptions-item label="运行时长">{{ data.systemInfo.jvm.runTime }}</a-descriptions-item>
                        <a-descriptions-item label="安装路径" :span="2">{{ data.systemInfo.jvm.home }}</a-descriptions-item>
                        <a-descriptions-item label="项目路径">{{ data.systemInfo.sys.userDir }}</a-descriptions-item>
                      </a-descriptions>
                    </a-card>
                  </a-col>
                </a-row>
                <a-row class="bottom-1">
                  <a-col :span="24" class="block-space-top">
                    <a-card title="服务器信息" class="card-width" :bordered="false">
                      <a-descriptions :column="2">
                        <a-descriptions-item label="服务器名称" class="b-r-1">{{ data.systemInfo.sys.computerName }}</a-descriptions-item>
                        <a-descriptions-item label="操作系统">{{ data.systemInfo.sys.osName }}</a-descriptions-item>
                        <a-descriptions-item label="服务器IP" class="b-r-1">{{ data.systemInfo.sys.computerIp }}</a-descriptions-item>
                        <a-descriptions-item label="系统架构">{{ data.systemInfo.sys.osArch }}</a-descriptions-item>
                      </a-descriptions>
                    </a-card>
                  </a-col>
                </a-row>
                <a-row class="bottom-1">
                  <a-col :span="24" class="block-space-top">
                    <a-card title="磁盘信息" class="card-width" :bordered="false">
                      <a-table row-key="dirName" :columns="data.diskColumns" :data-source="data.systemInfo.sysFiles" :pagination="false" />
                    </a-card>
                  </a-col>
                </a-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Server">
import { MonitorApi } from './api/MonitorApi';
import { onMounted, reactive } from 'vue';

const data = reactive({
  cpuColumns: [
    {
      title: '属性',
      dataIndex: 'key'
    },
    {
      title: '值',
      dataIndex: 'value'
    }
  ],
  memoryColumns: [
    {
      title: '属性',
      dataIndex: 'key'
    },
    {
      title: '内存',
      dataIndex: 'value'
    },
    {
      title: 'jvm',
      dataIndex: 'jvm'
    }
  ],
  diskColumns: [
    {
      title: '盘符路径',
      dataIndex: 'dirName'
    },
    {
      title: '文件系统',
      dataIndex: 'sysTypeName'
    },
    {
      title: '盘符类型',
      dataIndex: 'typeName'
    },
    {
      title: '总大小',
      dataIndex: 'total'
    },
    {
      title: '可用大小',
      dataIndex: 'free'
    },
    {
      title: '已用大小',
      dataIndex: 'used'
    },
    {
      title: '已用百分比',
      dataIndex: 'usage'
    }
  ],
  cpuData: [],
  memoryData: [],
  diskData: [],
  systemInfo: {
    cpu: {},
    mem: {},
    jvm: {},
    sys: {},
    sysFiles: []
  }
});

onMounted(async () => {
  let systemInfo = await MonitorApi.getSystemInfo();
  data.systemInfo = systemInfo;
  data.cpuData[0] = { key: '核心数', value: systemInfo.cpu.cpuNum };
  data.cpuData[1] = { key: '用户使用率', value: systemInfo.cpu.used };
  data.cpuData[2] = { key: '系统使用率', value: systemInfo.cpu.sys };
  data.cpuData[3] = { key: '当前空闲率', value: systemInfo.cpu.free };

  data.memoryData[0] = { key: '总内存', value: systemInfo.mem.total, jvm: systemInfo.jvm.total };
  data.memoryData[1] = { key: '已用内存', value: systemInfo.mem.used, jvm: systemInfo.jvm.used };
  data.memoryData[2] = { key: '剩余内存', value: systemInfo.mem.free, jvm: systemInfo.jvm.free };
  data.memoryData[3] = { key: '使用率', value: systemInfo.mem.usage, jvm: systemInfo.jvm.usage };
});
</script>

<style scoped lang="less">
:deep(.ant-card-head) {
  border-bottom: 0px;
}
.bottom-1 {
  border-bottom: 1px solid rgba(197, 207, 209, 0.6);
}
.block-space-top {
  /*上右下左*/
  padding: 10px 0 0 0;
}

.block-space-right {
  border-right: 1px solid rgba(197, 207, 209, 0.6);
  padding: 0 5px 0 0;
}
:deep(.ant-card-body) {
  padding: 12px 24px 0 24px;
}

.block-space-left {
  padding: 0 0 0 5px;
}

.card-width {
  width: 100%;
}
.guns-body {
  overflow-y: auto;
  .ant-row {
    height: auto;
  }
  .ant-col {
    height: auto;
  }
}
:deep(.ant-descriptions-item) {
  padding: 0;
}
:deep(.ant-descriptions-item-container) {
  padding: 16px 0;
  margin: 0 16px;
  border-bottom: 1px solid rgba(197, 207, 209, 0.6);
}
:deep(.ant-descriptions-item-label) {
  width: 172px;
}
:deep(.b-r-1) {
  border-right: 1px solid rgba(197, 207, 209, 0.6) !important;
}
</style>
