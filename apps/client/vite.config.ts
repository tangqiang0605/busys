import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        // 这里可以添加 Less 编译选项，如果不需要可以留空
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // 确保目标地址正确
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉 `/api` 前缀
        // secure: false, // 如果后端使用自签名证书
      },
    },
  },
})
