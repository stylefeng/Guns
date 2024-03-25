<!-- 全局页脚 -->
<template>
  <div class="guns-text-center" style="padding: 16px 0">
    <a-space size="large">
      <a class="guns-text-secondary" href="https://www.javaguns.com" target="_blank">
        {{ t('layout.footer.website') }}
      </a>
      <a class="guns-text-secondary" href="https://www.javaguns.com" target="_blank">
        {{ t('layout.footer.document') }}
      </a>
      <a class="guns-text-secondary" href="https://www.javaguns.com" target="_blank">
        {{ t('layout.footer.authorization') }}
      </a>
    </a-space>
    <div class="guns-text-secondary" style="margin-top: 8px">
      {{ themeInfo.gunsMgrFooterText }}&nbsp;&nbsp;<a :href="themeInfo.gunsMgrBeiUrl" target="_blank">{{ themeInfo.gunsMgrBeiNo }}</a>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import { useSystemStore } from '@/store/modules/system';

const { t } = useI18n();
const themeInfo = ref({});

onMounted(async () => {
  // 从store获取数据
  let systemStore = useSystemStore();
  let result = await systemStore.loadThemeInfo();
  themeInfo.value = result;
});
</script>
