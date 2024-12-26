import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
       // 方式 1: 简单的键值对形式
      '@': path.resolve(__dirname, './src'),
    }
  }
})
