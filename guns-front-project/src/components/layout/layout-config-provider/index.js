/** 全局配置组件 */
import { defineComponent, reactive, watch } from 'vue';

export default defineComponent({
  name: 'LayoutConfigProvider',
  props: {
    // 表格全局 request
    request: Object,
    // 表格全局 response
    response: Object,
    // 表格全局配置
    table: Object,
    // 国际化配置
    locale: Object,
    // 是否开启 keep-alive
    keepAlive: Boolean
  },
  setup(props, { slots }) {
    const config = reactive({ ...props });

    watch(
      () => props.request,
      () => {
        config.request = props.request;
      },
      { deep: true }
    );

    watch(
      () => props.response,
      () => {
        config.response = props.response;
      },
      { deep: true }
    );

    watch(
      () => props.table,
      () => {
        config.table = props.table;
      },
      { deep: true }
    );

    watch(
      () => props.locale,
      () => {
        config.locale = props.locale;
      }
    );

    watch(
      () => props.keepAlive,
      () => {
        config.keepAlive = props.keepAlive;
      }
    );

    return () => slots.default?.();
  }
});
