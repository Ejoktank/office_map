import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/workplaces': "http://127.0.0.1:8000",
      '/plans': "http://127.0.0.1:8000",
    },
  },
})
