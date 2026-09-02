import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Copies the source stylesheet (src/styles/style.css) to dist/style.css on
// every build, so it ships alongside the JS bundles at the path referenced
// by package.json's "./style.css" export. Plain copy, no CSS processing:
// the stylesheet is already hand-authored plain CSS.
const copyStylesheet = () => ({
  name: 'copy-rmm-stylesheet',
  closeBundle() {
    const src = path.resolve(__dirname, 'src/styles/style.css')
    const outDir = path.resolve(__dirname, 'dist')
    const dest = path.join(outDir, 'style.css')
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }
    fs.copyFileSync(src, dest)
  }
})

export default defineConfig({
  plugins: [react(), copyStylesheet()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: 'src/index.jsx',
      name: 'ReactMegaMenu',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled'
        },
        exports: 'named'
      }
    }
  }
})
