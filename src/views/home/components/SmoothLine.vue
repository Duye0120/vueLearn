<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  data: number[]
  color?: string
}>()

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 获取图表配置
function getOptions(data: number[], color: string = '#1890ff'): EChartsOption {
  return {
    animation: false, // 关闭动画以获得更好的性能
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: data.length }).fill(''),
      show: false, // 隐藏x轴
    },
    yAxis: {
      type: 'value',
      show: false, // 隐藏y轴
    },
    series: [
      {
        type: 'line',
        data,
        smooth: true,
        symbol: 'none', // 不显示数据点
        lineStyle: {
          width: 2,
          color,
        },
      },
    ],
  }
}

// 初始化图表
function initChart() {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(getOptions(props.data, props.color))
  }
}

// 处理窗口大小变化
function handleResize() {
  chartInstance?.resize()
}

// 监听数据变化
watch(
  () => [props.data, props.color],
  ([newData, newColor]) => {
    if (chartInstance) {
      chartInstance.setOption(getOptions(newData as number[], newColor as string))
    }
  },
  { deep: true },
)

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<template>
  <div ref="chartRef" class="w-full h-full" />
</template>
