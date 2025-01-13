<script lang="ts" setup>
import ProgressCard from './components/ProgressCard.vue'
import TopCardWithLine from './components/TopCardWithLine.vue'
import VerticalBar from './components/VerticalBar.vue'
import { topCardGroupArray } from './data'
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="h-[148px] w-full grid grid-cols-4 gap-4">
      <TopCardWithLine v-for="item in topCardGroupArray" :key="item.key" :data="item" />
    </div>
    <div class="h-[450px] w-full grid !grid-cols-4 gap-4">
      <VerticalBar />
      <ProgressCard />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
