/**
 * 国际化配置
 */
import { createI18n } from 'vue-i18n';
import { I18N_CACHE_NAME } from '@/config/setting';
import zh_CN from './lang/zh_CN';
import zh_TW from './lang/zh_TW';
import en from './lang/en';

const messages = { zh_CN, zh_TW, en };

const i18n = createI18n({
  messages,
  legacy: false,
  silentTranslationWarn: true,
  // 默认语言
  locale: localStorage.getItem(I18N_CACHE_NAME) || 'zh_CN'
});

export default i18n;
