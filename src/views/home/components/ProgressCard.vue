<script lang="ts" setup>
import { ref } from 'vue'

const weepMap = new Map([
  ['1', '周一'],
  ['2', '周二'],
  ['3', '周三'],
  ['4', '周四'],
  ['5', '周五'],
  ['6', '周六'],
  ['7', '周日'],
])
</script>

<template>
  <a-card class="p-4 flex flex-col gap-4">
    <a-typography-text class="font-medium text-base">
      解决概率
    </a-typography-text>
    <div class="grid grid-rows-7 flex-1 mt-4">
      <div v-for="item in 7" :key="item" class="flex items-center gap-4">
        <a-progress
          :key="item"
          :percent="item * 10"
          :status="item < 4 ? 'exception' : item < 6 ? 'active' : 'success'" :show-info="false" :size="[300, 20]"
        />
        <a-typography-text class="text-sm text-nowrap">
          {{ weepMap.get(item.toString()) }}
        </a-typography-text>
      </div>
    </div>
  </a-card>
</template>

<style scoped lang="scss"></style>
