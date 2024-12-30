<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import Layout from './layout/index.vue'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
</script>

<template>
  <main class="w-full h-full">
    <a-config-provider :local="zhCN">
      <Layout />
    </a-config-provider>
  </main>
</template>
