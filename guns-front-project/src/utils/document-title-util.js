import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  routeI18nKey,
  findTabByPath
} from '@/components/layout/util';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/modules/theme';
import { PROJECT_NAME, REDIRECT_PATH, I18N_ENABLE } from '@/config/setting';

/**
 * 修改浏览器标题
 * @param title 标题
 */
export function setDocumentTitle(title) {
  const names = [];
  if (title) {
    names.push(title);
  }
  if (PROJECT_NAME) {
    names.push(PROJECT_NAME);
  }
  document.title = names.join(' - ');
}

/**
 * 路由切换更新浏览器标题
 */
export function useSetDocumentTitle() {
  const { currentRoute } = useRouter();
  const { t, locale } = useI18n();
  const themeStore = useThemeStore();
  const { tabs } = storeToRefs(themeStore);

  const updateTitle = (route) => {
    const { path, meta, fullPath } = route;
    if (path.includes(REDIRECT_PATH)) {
      return;
    }
    const pathKey = routeI18nKey(path);
    if (!pathKey) {
      return;
    }
    const tab = findTabByPath(fullPath, tabs.value);
    const title = tab?.title || meta?.title;
    if (!I18N_ENABLE) {
      setDocumentTitle(title);
      return;
    }
    const k = `route.${pathKey}._name`;
    const v = t(k);
    setDocumentTitle(v === k || !v ? title : v);
  };

  watch(
    currentRoute,
    (route) => {
      updateTitle(route);
    },
    { immediate: true }
  );

  watch(locale, () => {
    updateTitle(currentRoute.value);
  });
}
