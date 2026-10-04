import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 使用相對路徑，部署到 GitHub Pages 的子路徑（/repo-name/）也能正確載入資源
  base: './',
})
