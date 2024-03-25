<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        <span v-if="type === 'system'">系统公司概况</span>
        <span v-if="type === 'current'">当前公司概况</span>
      </div>
    </div>

    <div class="card-body">
      <a-card :bordered="false" class="function" :body-style="{ padding: '1em' }">
        <a-row :gutter="16">
          <a-col :lg="8" :md="12" :sm="12" :xs="12">
            <a-card hoverable :body-style="{ padding: 0 }" class="statistic card-bg1">
              <div>
                <ApartmentOutlined class="app-link-icon"/>&nbsp;&nbsp;&nbsp;<span>组织机构：{{ orgInfo.organizationNum }}</span>
              </div>
            </a-card>
          </a-col>
          <a-col :lg="8" :md="12" :sm="12" :xs="12">
            <a-card hoverable :body-style="{ padding: 0 }" class="statistic card-bg2">
              <div>
                <TeamOutlined class="app-link-icon"/>&nbsp;&nbsp;&nbsp;<span>人员总数：{{ orgInfo.enterprisePersonNum }}</span>
              </div>
            </a-card>
          </a-col>
          <a-col :lg="8" :md="12" :sm="12" :xs="12" v-if="type === 'system'">
            <a-card hoverable :body-style="{ padding: 0 }" class="statistic card-bg3">
              <div>
                <AuditOutlined class="app-link-icon"/>&nbsp;&nbsp;&nbsp;<span>职位总数：{{ orgInfo.positionNum }}</span>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script setup name="CompanyOverviewComponents">
import {onMounted, ref} from "vue";
import {OrgApi} from "@/views/index/api/OrgApi";

const props = defineProps({
  // 类型  system：系统   current：当前
  type: {
    type: String,
    default: 'system',
    required: true
  }
});

// 企业概况数据
const orgInfo = ref({
  organizationNum: 0,
  enterprisePersonNum: 0,
  positionNum: 0
});

const orgInfoStat = () => {
  // 获取企业概况数据
  OrgApi.orgInfoStat().then(res => {
    if (props.type === 'system') {
      orgInfo.value.organizationNum = res.organizationNum;
      orgInfo.value.enterprisePersonNum = res.enterprisePersonNum;
      orgInfo.value.positionNum = res.positionNum;
    } else if (props.type === 'current') {
      orgInfo.value.organizationNum = res.currentDeptNum;
      orgInfo.value.enterprisePersonNum = res.currentCompanyPersonNum;
    }

  });
}

onMounted(() => {
  orgInfoStat();
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
}


.statistic {
  padding: 1.5em;
  color: white;
  font-size: 1.5em;
  background-size: cover;
}

.card-bg1 {
  background-image: url('../../../assets/card-background/1.png');
}

.card-bg2 {
  background-image: url('../../../assets/card-background/2.png');
}

.card-bg3 {
  background-image: url('../../../assets/card-background/3.png');
}

</style>
