import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/workplaces": { target: "http://127.0.0.1:8000", changeOrigin: true, secure: false},
      "/plans": "http://127.0.0.1:8000",
    },
  },
});
