<template>
  <div class="w-full flex flex-col gap-5">
    <div class="h-[148px] w-full grid grid-cols-4 gap-5">
      <a-card v-for="item in topCardGroupArray" :key="item.key" class="flex flex-col p-5 h-[148px] top-card-group-item">
        <div class=" flex flex-row justify-between">
          <a-typography-text class="font-medium text-base">{{ item.title }}</a-typography-text>
          <div :class="getDiffClass(item.key)">
            <component :is="iconMap[item.key]" />
          </div>
        </div>
        <div class="flex-1 flex flex-row gap-[20px]">
          <div class="flex flex-col justify-center">
            <a-typography-text class="text-3xl">{{ formatNumber(item.currentValue) }}</a-typography-text>
            <a-typography-text class="text-xl font-medium"
              :class="item.type === 'improve' ? 'text-green-500' : 'text-red-500'">{{ item.type === 'improve' ? '+' :
                '-' }}{{ item.percent }}%</a-typography-text>
          </div>
          <div class="flex-1">
            <SmoothLine :data="item.chartsData" :color="getColor(item.key)" />
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { topCardGroupArray } from './data';
import { formatNumber } from './utils';
import SmoothLine from './components/SmoothLine.vue';
import {
  UserOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
  SmileOutlined
} from '@ant-design/icons-vue'

const iconMap = {
  demand: UserOutlined,
  question: QuestionCircleOutlined,
  answer: MessageOutlined,
  userSatisfaction: SmileOutlined
}

// 返回不同的 Tailwind 类名组合
const getDiffClass = (key: string) => {
  const baseClass = 'p-2 rounded-md flex items-center justify-center'

  const classMap = {
    demand: `${baseClass} bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-500`,
    question: `${baseClass} bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-500`,
    answer: `${baseClass} bg-purple-100 dark:bg-purple-900 text-purple-500 dark:text-purple-500`,
    userSatisfaction: `${baseClass} bg-orange-100 dark:bg-orange-900 text-orange-500 dark:text-orange-500`
  }

  return classMap[key] || baseClass
}

const getColor = (key: string) => {
  const colorMap = {
    demand: '#1890ff',
    question: '#36d700',
    answer: '#9c27b0',
    userSatisfaction: '#ff9800'
  }
  return colorMap[key] || '#1890ff'
}


</script>


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
