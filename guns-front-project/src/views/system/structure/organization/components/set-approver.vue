<template>
  <div style="width: 100%; height: 100%">
    <a-card :bordered="false">
      <a-row class="row" v-if="state.approverList && state.approverList.length > 0">
        <ul class="role-ul">
          <li v-for="(roleItem, roleIndex) in state.approverList" :key="roleIndex">
            <div class="title">
              {{ roleItem.orgApproverTypeWrapper }}
            </div>
            <div class="content">
              <a-popover title="操作" v-for="(bindItem, bindIndex) in roleItem.bindUserItemList" :key="bindIndex">
                <template #content>
                  <a-button style="color: red" @click="remove(roleItem.orgApproverType, bindItem.userId)">删除</a-button>
                </template>
                <div class="content-item">
                  <div class="left">
                    <img :src="bindItem.avatarUrl" alt="" class="img" />
                  </div>
                  <div class="right">
                    <div class="username">{{ bindItem.name }}</div>
                    <div class="companyname">{{ bindItem.deptName }}</div>
                  </div>
                </div>
              </a-popover>
              <div class="box1" @click="addRole(roleItem)">
                <div class="add"><plus-outlined class="icon" /></div>
                <div class="addrole">添加成员</div>
              </div>
            </div>
          </li>
        </ul>
      </a-row>
      <a-row v-else class="empty">
        <a-empty></a-empty>
      </a-row>
    </a-card>

    <!-- 选择人员弹框 -->
    <Selection
      v-model:visible="state.isShowRole"
      v-if="state.isShowRole"
      title="选择审批人"
      :data="selectData"
      :showTab="['user']"
      @done="closeDialog"
      :isRadio="false"
    />
  </div>
</template>

<script setup name="SetApprover">
import { ApproverUserApi } from '../api/ApproverUserApi';
import { reactive, ref } from 'vue';
import { message, Modal } from 'ant-design-vue';

const props = defineProps({
  data: Object
});

const state = reactive({
  // 审批人列表
  approverList: [],
  //   是否显示选择人员弹框
  isShowRole: false,
  //   当前行数据
  current: null
});
// 当前选中的人
const selectData = ref({
  selectUserList: []
});

// 获取审批人列表
const getListData = () => {
  ApproverUserApi.getBindingList({ orgId: props.data.orgId }).then(res => {
    if (res.code == '00000') {
      state.approverList = res.data;
    }
  });
};

// 刪除
const remove = (orgApproverType, userId) => {
  let params = {
    orgId: props.data.orgId,
    orgApproverType: orgApproverType,
    userId: userId
  };
  Modal.confirm({
    title: '提示',
    content: '确定要删除吗?',
    icon: '',
    maskClosable: true,
    onOk: async () => {
      const result = await ApproverUserApi.delete(params);
      message.success(result.message);
      getListData();
    }
  });
};

// 添加
const addRole = item => {
  selectData.value.selectUserList = item.bindUserItemList.map(item => {
    return { bizId: item.userId, name: item.name };
  });
  state.current = item;
  state.isShowRole = true;
};

// 关闭选择人员弹框
const closeDialog = val => {
  let params = {
    orgApproverType: state.current.orgApproverType,
    orgId: props.data.orgId,
    userIdList: val.selectUserList.map(item => item.bizId)
  };
  // 添加人员
  ApproverUserApi.bindUserList(params).then(res => {
    if (res.code == '00000') {
      message.success(res.message);
      getListData();
    }
  });
};

// 导出方法
defineExpose({
  getListData
});
</script>

<style scoped lang="less">
.top {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  margin-bottom: 10px;
  padding: 0 10px;
  display: flex;
  color: var(--primary-6);
  .title {
    border-bottom: 2px solid var(--primary-6);
  }
  .button {
    height: 50px;
    line-height: 50px;
    margin-left: 30px;
  }
}
:deep(.ant-card-body) {
  padding: 0 !important;
}
.role-ul {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #ccc;
    min-height: 70px;
    padding-top: 10px;
    .title {
      width: 140px;
      font-size: 16px;
      font-weight: 700;
      margin-top: 10px;
    }
    .content {
      width: calc(100% - 140px);
      .content-item {
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
        min-width: 175px;
        height: 60px;
        padding-top: 10px;
        .left {
          margin-right: 10px;
          float: left;
        }
        .right {
          float: left;
          .companyname {
            color: #787878;
          }
        }
        .img {
          margin-left: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
      .content-item:hover {
        box-shadow: 1px 0 5px rgb(24 144 255 / 50%);
      }
      .box1 {
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
        min-width: 175px;
        height: 60px;
        padding-top: 10px;
        padding-left: 8px;
        .add {
          float: left;
          margin-right: 10px;
          .icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #ccc;
            color: #fff;
            line-height: 32px;
          }
        }
        .addrole {
          float: left;
          color: #787878;
          padding-top: 3px;
        }
      }
    }
  }
}
.empty {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>
