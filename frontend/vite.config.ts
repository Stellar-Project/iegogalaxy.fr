import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/rss.xml": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/sitemap.xml": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/robots.txt": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
