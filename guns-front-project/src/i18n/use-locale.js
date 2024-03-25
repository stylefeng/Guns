/**
 * AntDesignVue、Dayjs 国际化配置
 */
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
// AntDesignVue
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import zh_TW from 'ant-design-vue/es/locale/zh_TW';
import en from 'ant-design-vue/es/locale/en_US';
// 
import gunsZh_CN from './lang/zh_CN';
import gunsZh_TW from './lang/zh_TW';
import gunsEn from './lang/en';
// Dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
const antLocales = { zh_CN, zh_TW, en };
const eleLocales = { zh_CN: gunsZh_CN, zh_TW: gunsZh_TW, en: gunsEn };

export function useLocale() {
  const { locale } = useI18n();
  const antLocale = ref();
  const eleLocale = ref();

  watch(
    locale,
    () => {
      antLocale.value = antLocales[locale.value];
      eleLocale.value = eleLocales[locale.value];
      dayjs.locale(locale.value.toLowerCase().replace(/_/g, '-'));
    },
    { immediate: true }
  );
  return { antLocale, eleLocale };
}
