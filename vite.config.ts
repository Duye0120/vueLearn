import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import express from './server/plugins/express-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    express(),
    svgLoader({
      defaultImport: 'component', // 可以是 'url', 'raw', 'component'
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@server': fileURLToPath(new URL('./server', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    // 如果需要，可以添加其他代理配置
    proxy: {
      '/api': {
        target: '/', // 因为我们的 Express 已经在处理 /api 路径了
        rewrite: path => path,
      },
    },
  },
})
