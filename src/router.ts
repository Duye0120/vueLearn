import { createWebHistory, createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'

const routes = [
  {
    path: '/home',
    name: '首页',
    component: Home,
  },
  // { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  // 基础标题
  const baseTitle = 'VueLearn'

  // 获取路由元信息中的标题
  const pageTitle = to.name

  document.title = pageTitle ? `${pageTitle as string} | ${baseTitle}` : baseTitle
  next()
})

export default router
