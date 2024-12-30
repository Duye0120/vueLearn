<template>
  <a-config-provider :theme="themeConfig">
    <a-layout class="w-full h-full">
      <a-layout-sider width="200">
        <div class="flex flex-row items-center justify-center py-4 bg-white dark:!bg-[#141414]">
          <Logo class="h-fit w-fit items-center" />
        </div>
        <a-menu v-model:selectedKeys="leftSelectKeys" v-model:openKeys="leftOpenKeys" mode="inline"
          :style="{ height: '100%', borderRight: 0 }">
          <a-menu-item key="home">
            <template #icon>
              <home-outlined />
            </template>
            首页
          </a-menu-item>
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
      <a-layout>
        <a-layout-header class="!bg-white dark:!bg-[#141414] flex flex-row items-center justify-between !px-5 ">
          <a-breadcrumb>
            <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
          </a-breadcrumb>
          <ThemeSwitch />
        </a-layout-header>
        <a-layout-content class="p-5">
          <RouterView />
        </a-layout-content>
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
import { useRouter } from 'vue-router';
import { watch } from 'fs';
const router = useRouter();
const title = computed(() => router.currentRoute.value.name);
console.log('🚀 ~ title:', title);

// 监听路由变化，如果是根路径则重定向到 home 页面
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/home')
  } else {
    next()
  }
})



const isDarkMode = inject<any>('isDarkMode');

const themeConfig = computed(() => ({
  algorithm: isDarkMode.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  // 可以在这里添加其他主题配置
  token: {
    // 自定义 token
  }
}));


const selectedKeys1 = ref<string[]>(['2']);
const leftSelectKeys = ref<string[]>(['home']);
const leftOpenKeys = ref<string[]>(['sub1']);
</script>
<style scoped></style>
