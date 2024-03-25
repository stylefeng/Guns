import {
  defineComponent,
  h,
  ref,
  watch,
  inject,
  computed,
  onMounted,
  onActivated,
  onDeactivated,
  onBeforeUnmount,
  nextTick
} from 'vue';
import { PROVIDE_KEY } from '@/components/layout/util'

/**
 * 创建 iframe 组件
 * @param name 组件名称
 * @param url 链接地址
 */
export function createIframeComponent(name, url) {
  return defineComponent({
    name,
    setup() {
      const config = useReceiver();

      const rootRef = ref(null);

      const iframeEl = ref(null);

      const keepAlive = computed(() => config.keepAlive);

      /* 创建自定义 iframe dom */
      const createIframe = () => {
        const el = document.createElement('iframe');
        el.classList.add('guns-admin-iframe');
        el.src = url;
        const parentNode = rootRef.value?.parentNode;
        if (parentNode) {
          parentNode.insertBefore(el, rootRef.value);
          iframeEl.value = el;
        }
      };

      onMounted(() => {
        if (keepAlive.value) {
          createIframe();
        }
      });

      onActivated(() => {
        if (iframeEl.value) {
          iframeEl.value.style.display = '';
        }
      });

      onDeactivated(() => {
        if (iframeEl.value) {
          iframeEl.value.style.display = 'none';
        }
      });

      onBeforeUnmount(() => {
        if (iframeEl.value) {
          iframeEl.value.parentNode?.removeChild(iframeEl.value);
          iframeEl.value = null;
        }
      });

      watch(keepAlive, (keepAlive) => {
        if (keepAlive && !iframeEl.value) {
          nextTick(() => {
            createIframe();
          });
        }
      });

      return () => {
        if (config.keepAlive || iframeEl.value) {
          return h('div', {
            ref: rootRef,
            style: { display: 'none' }
          });
        }
        return h('iframe', {
          ref: rootRef,
          src: url,
          class: 'guns-admin-iframe'
        });
      };
    }
  });
}

/**
 * 全局配置 hook
 */
export function useReceiver() {
  return inject(PROVIDE_KEY, {});
}
