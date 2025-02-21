import Home from '@/views/home/index.vue'
import Print from '@/views/print/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: '首页',
    component: Home,
  },
  {
    path: '/print',
    name: '打印',
    component: Print,
  },
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
  if (to.path === '/') {
    next('/home')
  }
  else {
    next()
  }
})

export default router
