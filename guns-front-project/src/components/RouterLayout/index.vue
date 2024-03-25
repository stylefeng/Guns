<!-- router-view 结合 keep-alive 组件 -->
<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in" appear>
      <keep-alive :include="keepAliveInclude">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
  import { storeToRefs } from 'pinia';
  import { useThemeStore } from '@/store/modules/theme';

  export default {
    name: 'RouterLayout',
    setup() {
      const themeStore = useThemeStore();
      const { keepAliveInclude, transitionName } = storeToRefs(themeStore);

      return { keepAliveInclude, transitionName };
    }
  };
</script>
