<template>
  <main class="w-full h-full">
    <a-config-provider :local="zhCN">
      <Layout />
    </a-config-provider>
  </main>
</template>

<script lang="ts" setup>
import Layout from './layout/index.vue'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

dayjs.locale('zh-cn');
</script>
