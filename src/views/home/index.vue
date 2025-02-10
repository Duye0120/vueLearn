<script lang="ts" setup>
import ProgressCard from './components/ProgressCard.vue'
import TopCardWithLine from './components/TopCardWithLine.vue'
import VerticalBar from './components/VerticalBar.vue'
import { topCardGroupArray } from './data'

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '需求人数',
    dataIndex: 'demandCount',
    key: 'demandCount',
  },
  {
    title: '提问数量',
    dataIndex: 'questionCount',
    key: 'questionCount',
  },
  {
    title: '解决数量',
    dataIndex: 'solveCount',
    key: 'solveCount',
  },
  {
    title: '用户满意度',
    dataIndex: 'userSatisfaction',
    key: 'userSatisfaction',
  },
  {
    title: '统计时间',
    dataIndex: 'statisticsTime',
    key: 'statisticsTime',
  },
  {
    title: '操作',
  },
]
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
    <div class="grid !grid-cols-4 gap-4">
      <!-- 一个antd-vue-table的组件 -->
      <div class="col-span-3">
        <a-card title="数据统计" body-style="padding: 16px !important">
          <a-table :data-source="[]" :columns="columns" />
        </a-card>
      </div>
      <div class="col-span-1">
        <a-card class="p-5 h-full">
          anything
        </a-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
