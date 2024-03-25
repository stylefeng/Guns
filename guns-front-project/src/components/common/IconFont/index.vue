<template>
  <span :style="style" class="icon-font-span">
    <i v-if="type === 'unicode'" :style="{ color: color, fontSize: fontSize, fontWeight: fontWeight }" class="iconfont">{{
        iconClass
      }}</i>

    <i v-if="type === 'class'" :style="{ color: color, fontSize: fontSize, fontWeight: fontWeight }"
       class="iconfont" :class="iconClass"></i>

    <svg v-if="type === 'svg'" :width="width" :height="height" aria-hidden="true" class="svg-icon">
      <use :fill="color" :xlink:href="`#${iconClass}`"></use>
    </svg>
  </span>
</template>

<script setup name="IconFont">
// props
defineProps({
  // 类型 svg unicode class
  type: {
    type: String,
    default: 'class'
  },
  // 颜色
  color: {
    type: String,
    default: '#a6a6a6'
  },
  // 图标类名
  iconClass: {
    type: String,
    default: ''
  },
  // 宽 svg
  width: {
    type: String,
    default: ''
  },
  // 高 svg
  height: {
    type: String,
    default: ''
  },
  // 大小  unicode
  fontSize: {
    type: String,
    default: '18px'
  },
  // 字体大小
  fontWeight: {
    type: String,
    default: ''
  },
  // 父级样式
  style: {
    type: Object,
    default: {}
  },
});
</script>

<style scoped lang="less">
.iconfont {
  cursor: pointer;
}
.icon-font-span {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
