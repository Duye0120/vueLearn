import { theme } from 'ant-design-vue';
import { ref, watch, computed } from 'vue';

export const initTheme = (app) => {
  // 创建主题切换状态
  const isDarkMode = ref(localStorage.getItem('theme') === 'dark');
  
  // 提供全局状态
  app.provide('isDarkMode', isDarkMode);
  
  // 监听主题变化并保存到本地存储
  watch(isDarkMode, (val) => {
    localStorage.setItem('theme', val ? 'dark' : 'light');
    // 设置 antd-vue 的主题
    document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light');
    // 设置 Tailwind 的深色模式
    if (val) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, { immediate: true });
  
  // 配置 Ant Design Vue
  app.use(theme, {
    algorithm: computed(() => 
      isDarkMode.value ? theme.darkAlgorithm : theme.defaultAlgorithm
    ),
  });
  
  // 返回切换函数供组件使用
  return {
    toggleTheme: () => {
      isDarkMode.value = !isDarkMode.value;
    },
    isDarkMode
  };
};
