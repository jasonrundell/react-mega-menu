import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages of the same app: `/` mounts the menu with the default
      // slideDirection ("left"); `/slide-right/` mounts it with "right".
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        slideRight: fileURLToPath(
          new URL('./slide-right/index.html', import.meta.url)
        )
      }
    }
  }
})
