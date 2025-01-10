<script lang="ts" setup>
import TopCardWithLine from './components/TopCardWithLine.vue'
import { topCardGroupArray } from './data'
</script>

<template>
  <div class="w-full flex flex-col gap-5">
    <div class="h-[148px] w-full grid grid-cols-4 gap-5">
      <TopCardWithLine v-for="item in topCardGroupArray" :key="item.key" :data="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-card-group-item {
  :global(.ant-card-body) {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 !important;
  }
}
</style>
