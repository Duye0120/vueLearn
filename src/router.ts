import { createWebHistory, createRouter } from 'vue-router'

import Layout from '@/layout/index.vue'

const routes = [
  { path: '/', component: Layout },
  // { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
