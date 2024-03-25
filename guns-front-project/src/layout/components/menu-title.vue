<template>
  <span>{{ item.meta.title }}</span>
  <div v-if="item.meta && item.meta.badge" class="guns-menu-badge">
    <a-badge
      :count="item.meta.badge"
      :number-style="{ background: item.meta.badgeColor }"
    />
  </div>
</template>

<script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    }
  });
</script>
