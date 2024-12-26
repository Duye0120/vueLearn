import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import './main.css'
import router from './router'
// import { createPinia } from 'pinia'
import { initTheme } from './utils/theme'


// 注册根store，暂时用不到，可能会考虑用ref存储，然后主要是放在了service上面，后续如果有需要我在修改
// const pinia = createPinia()
const app = createApp(App);
app.use(Antd)
app.use(router)
// app.use(pinia)
const { toggleTheme } = initTheme(app);

// 全局提供切换函数
app.provide('toggleTheme', toggleTheme);

app.mount('#app')

