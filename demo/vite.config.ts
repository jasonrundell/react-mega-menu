import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages of the same app: `/` mounts the menu with the default
      // slideDirection ("left"); `/slide-right/` mounts it with "right".
      // Relative paths resolve against the Vite root (this directory), so
      // no Node-only imports are needed — the Vercel build installs only
      // this directory and has no @types/node to resolve them with.
      input: {
        main: 'index.html',
        slideRight: 'slide-right/index.html'
      }
    }
  }
})
