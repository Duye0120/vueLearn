<template>
  <a-config-provider :theme="themeConfig">
    <a-layout class="w-full h-full">
      <a-layout-header class="!bg-white dark:!bg-[#141414] flex flex-row items-center justify-between !px-5 ">
        <div class="flex flex-row items-center">
          <Logo class="h-fit w-fit items-center" />
          <a-menu v-model:selectedKeys="selectedKeys1" mode="horizontal" class="h-[64px] pl-5 border-b-0 z-50">
            <a-menu-item key="1">nav 1</a-menu-item>
            <a-menu-item key="2">nav 2</a-menu-item>
            <a-menu-item key="3">nav 3</a-menu-item>
          </a-menu>
        </div>
        <div>
          <ThemeSwitch />
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200">
          <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline"
            :style="{ height: '100%', borderRight: 0 }">
            <a-sub-menu key="sub1">
              <template #title>
                <span>
                  <user-outlined />
                  subnav 1
                </span>
              </template>
              <a-menu-item key="1">option1</a-menu-item>
              <a-menu-item key="2">option2</a-menu-item>
              <a-menu-item key="3">option3</a-menu-item>
              <a-menu-item key="4">option4</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <span>
                  <laptop-outlined />
                  subnav 2
                </span>
              </template>
              <a-menu-item key="5">option5</a-menu-item>
              <a-menu-item key="6">option6</a-menu-item>
              <a-menu-item key="7">option7</a-menu-item>
              <a-menu-item key="8">option8</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <notification-outlined />
                  subnav 3
                </span>
              </template>
              <a-menu-item key="9">option9</a-menu-item>
              <a-menu-item key="10">option10</a-menu-item>
              <a-menu-item key="11">option11</a-menu-item>
              <a-menu-item key="12">option12</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout class="p-5">
          <a-layout-content>
            <RouterView />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import Logo from '@/assets/logo.svg'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import { theme } from 'ant-design-vue';

const isDarkMode = inject<any>('isDarkMode');

const themeConfig = computed(() => ({
  algorithm: isDarkMode.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  // 可以在这里添加其他主题配置
  token: {
    // 自定义 token
  }
}));


const selectedKeys1 = ref<string[]>(['2']);
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
</script>
<style scoped></style>
