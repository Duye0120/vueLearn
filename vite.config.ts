import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium'
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
    cesium(),
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
  build: {
    chunkSizeWarningLimit: 2000, // 增加块大小警告限制，因为 Cesium 很大
  },
})
