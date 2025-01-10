<script setup lang="ts">
import { MessageOutlined, QuestionCircleOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons-vue'
import { formatNumber } from '../utils'
import SmoothLine from './SmoothLine.vue'

const props = defineProps<{
  data: any
}>()

const iconMap = {
  demand: UserOutlined,
  question: QuestionCircleOutlined,
  answer: MessageOutlined,
  userSatisfaction: SmileOutlined,
}

// 返回不同的 Tailwind 类名组合
function getDiffClass(key: string) {
  const baseClass = 'p-2 rounded-md flex items-center justify-center'

  const classMap = {
    demand: `${baseClass} bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-500`,
    question: `${baseClass} bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-500`,
    answer: `${baseClass} bg-purple-100 dark:bg-purple-900 text-purple-500 dark:text-purple-500`,
    userSatisfaction: `${baseClass} bg-orange-100 dark:bg-orange-900 text-orange-500 dark:text-orange-500`,
  }

  return classMap[key] || baseClass
}

function getColor(key: string) {
  const colorMap = {
    demand: '#1890ff',
    question: '#36d700',
    answer: '#9c27b0',
    userSatisfaction: '#ff9800',
  }
  return colorMap[key] || '#1890ff'
}
</script>

<template>
  <a-card class="flex flex-col p-5 h-[148px] top-card-group-item">
    <div class=" flex flex-row justify-between">
      <a-typography-text class="font-medium text-base">
        {{ props.data.title }}
      </a-typography-text>
      <div :class="getDiffClass(props.data.key)">
        <component :is="iconMap[props.data.key]" />
      </div>
    </div>
    <div class="flex-1 flex flex-row gap-[20px]">
      <div class="flex flex-col justify-center">
        <a-typography-text class="text-3xl">
          {{ formatNumber(props.data.currentValue) }}
        </a-typography-text>
        <a-typography-text
          class="text-xl font-medium"
          :class="props.data.type === 'improve' ? 'text-green-500' : 'text-red-500'"
        >
          {{
            props.data.type === 'improve' ? '+'
            : '-'
          }}{{ props.data.percent }}%
        </a-typography-text>
      </div>
      <div class="flex-1">
        <SmoothLine :data="props.data.chartsData" :color="getColor(props.data.key)" />
      </div>
    </div>
  </a-card>
</template>

<style scoped lang="scss"></style>
