import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // ← THIS allows access from other devices or IP
    port: 5175,
  },
  base: '/',
  plugins: [
    react(),
    tailwindcss()
  ],
  css: {
    postcss: './postcss.config.mjs',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': process.env, // makes process.env available in code
  },
})
