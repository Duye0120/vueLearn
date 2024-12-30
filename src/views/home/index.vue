<template>
  <div class="w-full flex flex-col gap-5">
    <div class="h-[148px] w-full grid grid-cols-4 gap-5">
      <a-card v-for="item in topCardGroupArray" :key="item.title"></a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TopCardGroupArray } from './type';
import { formatNumber } from './utils';


const topCardGroupArray: TopCardGroupArray[] = [
  {
    title: '需求人数',
    key: 'demand',
    currentValue: 36000,
    type: 'improve',
    percent: 10,
    chartsData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100)
  },
  {
    title: '提问数量',
    key: 'demand',
    currentValue: 16580,
    type: 'improve',
    percent: 70,
    chartsData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100)
  },
  {
    title: '回答数量',
    key: 'answer',
    currentValue: 16580,
    type: 'reduce',
    percent: 70,
    chartsData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100)
  },
  {
    title: '用户满意度',
    key: 'userSatisfaction',
    currentValue: 100,
    type: 'improve',
    percent: 100,
    chartsData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 900) + 100)
  }
]


</script>


<style scoped></style>
