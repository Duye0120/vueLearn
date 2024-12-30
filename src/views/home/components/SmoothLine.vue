<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  data: number[]
  color?: string
}>()

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 获取图表配置
const getOptions = (data: number[], color: string = '#1890ff'): EChartsOption => ({
  animation: false, // 关闭动画以获得更好的性能
  grid: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  xAxis: {
    type: 'category',
    data: new Array(data.length).fill(''),
    show: false // 隐藏x轴
  },
  yAxis: {
    type: 'value',
    show: false // 隐藏y轴
  },
  series: [
    {
      type: 'line',
      data: data,
      smooth: true,
      symbol: 'none', // 不显示数据点
      lineStyle: {
        width: 2,
        color: color
      },
      // areaStyle: {
      //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //     {
      //       offset: 0,
      //       color: echarts.color.stringify(echarts.color.lerp(0.6, echarts.color.parse(color)!, { type: 'rgba', a: 0.3 }))
      //     },
      //     {
      //       offset: 1,
      //       color: echarts.color.stringify(echarts.color.lerp(0.6, echarts.color.parse(color)!, { type: 'rgba', a: 0 }))
      //     }
      //   ])
      // }
    }
  ]
})

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(getOptions(props.data, props.color))
  }
}

// 处理窗口大小变化
const handleResize = () => {
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
  { deep: true }
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
