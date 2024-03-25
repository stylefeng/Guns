<template>
  <a-modal
    :visible="props.visible"
    title="切换公司"
    :maskClosable="false"
    @cancel="updateShowSwitchCompany(false)"
    :confirm-loading="switchCompanyBtnLoading"
    @ok="switchCompanyOk"
  >
    <p>当前用户任职信息列表：</p>
    <a-radio-group v-model:value="selectId" name="radioGroup">
      <a-radio
        style="display: flex; height: 30px; line-height: 30px"
        v-for="item in userStore.info.userOrgInfoList"
        :key="item.orgId"
        :value="item.orgId"
      >
        {{ item.companyName }}/{{ item.deptName }}/{{ item.positionName }}
      </a-radio>
    </a-radio-group>
  </a-modal>
</template>

<script setup name="SwitchCompany">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { SysConfigApi } from '@/views/system/backend/sys-config/api/SysConfigApi';
import { message } from 'ant-design-vue/es';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  // 当前选中的公司
  selectOrgId: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['update:visible']);

// store
const userStore = useUserStore();

// 切换公司确定按钮加载状态
const switchCompanyBtnLoading = ref(false);
// 选中的公司id
const selectId = ref('');

onMounted(() => {
  if (props.selectOrgId) {
    selectId.value = props.selectOrgId;
  }
});

/**
 * 切换公司确定按钮点击
 */
const switchCompanyOk = () => {
  switchCompanyBtnLoading.value = true;
  SysConfigApi.updateUserOrgOrApp({ newOrgId: selectId.value })
    .then(res => {
      if (res.success) {
        updateShowSwitchCompany(false);
        message.success('切换成功！', 0.5).then(() => {
          window.location.reload();
        });
      }
    })
    .finally(() => {
      switchCompanyBtnLoading.value = false;
    });
};

/**
 * 更新切换显示切换公司弹窗变量
 * @param val
 */
const updateShowSwitchCompany = val => {
  emits('update:visible', val);
};
</script>

<style></style>
