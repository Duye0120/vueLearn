<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{}>()
const selectedRadio = ref('last')
const chartsRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

function getOption(selectedRadio: string): echarts.EChartsOption {
  const defaultOption: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['需求人数', '提问数量'],
      bottom: 0,
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: [{
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    }],
    yAxis: [
      {
        type: 'value',
      },
    ],
  }

  const seriesData = {
    last: [
      { name: '需求人数', data: [120, 200, 150, 80, 70, 110, 130] },
      { name: '提问数量', data: [100, 180, 130, 70, 60, 100, 120] },
    ],
    current: [
      { name: '需求人数', data: [100, 180, 130, 70, 60, 100, 120] },
      { name: '提问数量', data: [120, 200, 150, 80, 70, 110, 130] },
    ],
  }

  return {
    ...defaultOption,
    series: seriesData[selectedRadio].map(item => ({
      ...item,
      type: 'bar',
      barWidth: 20,
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
        color: item.name === '需求人数' ? '#1890ff' : '#f5222d',
      },
    })),
  }
}

onMounted(() => {
  if (!chartsRef.value)
    return
  chartInstance = echarts.init(chartsRef.value)
  chartInstance.setOption(getOption(selectedRadio.value))
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
})

watch(selectedRadio, (newVal) => {
  if (chartInstance) {
    chartInstance.setOption(getOption(newVal))
  }
})
</script>

<template>
  <a-card class="col-span-3 p-5 flex flex-col">
    <div class="w-full flex items-center justify-between">
      <a-typography-text class="font-medium text-base">
        分析概览
      </a-typography-text>
      <a-radio-group v-model:value="selectedRadio" button-style="solid" size="small">
        <a-radio-button value="last">
          上周
        </a-radio-button>
        <a-radio-button value="current">
          本周
        </a-radio-button>
      </a-radio-group>
    </div>
    <div ref="chartsRef" class="flex flex-1 w-full mt-4" />
  </a-card>
</template>

<style scoped lang="scss"></style>
