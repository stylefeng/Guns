<template>
  <HomeLayout>
    <div class='main'>
      <a-row :gutter='10' style='margin-bottom: 10px'>
        <a-col :xs='12' :sm='12' :md='12' :lg='12' :xl='12' style='height: 300px;'>
          <common-functions></common-functions>
        </a-col>
        <a-col :xs='12' :sm='12' :md='12' :lg='12' :xl='12' style='height: 300px'>
          <userinfo></userinfo>
        </a-col>
      </a-row>
      <a-row :gutter='10' style='margin-bottom: 10px' v-permission="['COMPANY_STAT_INFO']">
        <a-col :xs='12' :sm='12' :md='12' :lg='12' :xl='12'>
          <company-overview type='system'></company-overview>
        </a-col>
        <a-col :xs='12' :sm='12' :md='12' :lg='12' :xl='12'>
          <company-overview type='current'></company-overview>
        </a-col>
      </a-row>
      <a-row :gutter='10'>
        <a-col :xs='12' :sm='12' :md='12' :lg='12' :xl='12' style='height: 300px;'>
          <operation-records></operation-records>
        </a-col>
        <a-col :xs='12' :sm='12' :md='12' :lg='12' :xl='12'></a-col>
      </a-row>
    </div>
  </HomeLayout>
</template>

<script setup name='HomeIndex'>
import Userinfo from '@/views/index/components/userinfo.vue';
import CompanyOverview from '@/views/index/components/company-overview.vue';
import OperationRecords from '@/views/index/components/operation-records.vue';
import CommonFunctions from '@/views/index/components/common-functions.vue';
import HomeLayout from '@/homeLayout/index.vue';
</script>

<style scoped lang='less'>
.main {
  width: 100%;
  height: 100%;
  background-color: #f4f5f6;
  padding: 10px;
}
</style>
