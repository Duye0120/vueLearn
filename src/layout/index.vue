<script lang="ts" setup>
import Logo from '@/assets/logo.svg'
import { HomeOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'
import { computed, inject, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ThemeSwitch from './components/ThemeSwitch/index.vue'

const router = useRouter()
const title = computed(() => router.currentRoute.value.name)

// 主题修改
const isDarkMode = inject<any>('isDarkMode')

const themeConfig = computed(() => ({
  algorithm: isDarkMode.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    // 自定义 token
  },
}))

const leftSelectKeys = ref<string[]>(['home'])
const leftOpenKeys = ref<string[]>(['sub1'])

// 当菜单选择改变时，更新路由
watch(leftSelectKeys, (newValue) => {
  router.push(newValue[0])
})

// 当路由改变时，更新菜单选择
watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    // 移除开头的斜杠
    const path = newPath.slice(1)
    // 如果路径为空，设置为home
    leftSelectKeys.value = [path || 'home']

    // 如果新路径属于某个子菜单，确保该子菜单是展开的
    if (path === 'print') {
      leftOpenKeys.value = ['sub1']
    }
  },
  { immediate: true }, // 立即执行一次，确保初始状态同步
)
</script>

<template>
  <a-config-provider :theme="themeConfig">
    <a-layout class="w-full h-full">
      <a-layout-sider width="200">
        <div class="flex flex-row items-center justify-center py-4 bg-white dark:!bg-[#141414]">
          <Logo class="h-fit w-fit items-center" />
        </div>
        <a-menu
          v-model:selected-keys="leftSelectKeys" v-model:open-keys="leftOpenKeys" mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item key="home">
            <HomeOutlined />
            首页
          </a-menu-item>
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <UserOutlined />
                杂七杂八
              </span>
            </template>
            <a-menu-item key="print">
              打字机
            </a-menu-item>
            <a-menu-item key="2">
              option2
            </a-menu-item>
            <a-menu-item key="3">
              option3
            </a-menu-item>
            <a-menu-item key="4">
              option4
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <LaptopOutlined />
                subnav 2
              </span>
            </template>
            <a-menu-item key="5">
              option5
            </a-menu-item>
            <a-menu-item key="6">
              option6
            </a-menu-item>
            <a-menu-item key="7">
              option7
            </a-menu-item>
            <a-menu-item key="8">
              option8
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <NotificationOutlined />
                subnav 3
              </span>
            </template>
            <a-menu-item key="9">
              option9
            </a-menu-item>
            <a-menu-item key="10">
              option10
            </a-menu-item>
            <a-menu-item key="11">
              option11
            </a-menu-item>
            <a-menu-item key="12">
              option12
            </a-menu-item>
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
        <a-layout-content
          class="p-5 bg-[#f5f5f5] dark:!bg-[#141414] overflow-y-auto scroll-smooth  h-[calc(100vh-64px)]"
        >
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<style scoped></style>
