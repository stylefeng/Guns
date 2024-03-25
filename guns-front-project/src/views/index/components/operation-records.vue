<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        <span>最近操作记录</span>
      </div>
    </div>

    <div class="card-body">

      <a-spin :spinning="activitiesLoading">

        <a-empty v-if="activities.length === 0"/>

        <a-timeline v-else>
          <a-timeline-item v-for="(item, index) in activities" :key="index" :color="item.color">
            <em>{{ item.createTime }}</em>
            <em>{{ item.logName + '-' + item.logContent }}</em>
          </a-timeline-item>
        </a-timeline>

      </a-spin>

    </div>
  </div>
</template>

<script setup name="OperationRecordsComponents">
import {onMounted, ref} from "vue";
import {HomeApi} from "@/views/index/api/HomeApi";

// 操作记录列表
const activities = ref([]);

// 操作记录列表加载状态
const activitiesLoading = ref(false);

const getRecentLogs = () => {
  activitiesLoading.value = true;
  // 获取最近操作记录
  HomeApi.getRecentLogs().then(res => {
    activities.value = res;
  }).finally(() => {
    activitiesLoading.value = false;
  });
}

onMounted(() => {
  getRecentLogs();
})

</script>

<style scoped lang="less">
.card {
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 6px hsla(0,0%,80%,.5);
  border-radius: 4px;
  padding: 10px;
}

.card-header {
  width: 100%;
  height: 50px;
  border-bottom: 1px #999999 solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header-title {
  font-size: 18px;
  font-weight: 500;
}

.card-body {
  width: 100%;
  height: calc(100% - 50px);
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 30px;
}

</style>
