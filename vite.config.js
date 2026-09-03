import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { breakpoints } from './src/config/breakpoints.js'

const LARGE_BREAKPOINT_PLACEHOLDER = '__RMM_BP_LARGE__'

// Copies the source stylesheet (src/styles/style.css) to dist/style.css on
// every build, so it ships alongside the JS bundles at the path referenced
// by package.json's "./style.css" export. The only processing applied:
// substituting the __RMM_BP_LARGE__ placeholder used by the stylesheet's
// large-breakpoint @media rules with the real value from
// src/config/breakpoints.js — the single source of truth this shares with
// the JS mobile-detection check in src/helpers/responsive.js. Custom
// properties can't drive @media conditions, so the value has to be
// substituted as a literal at build time rather than read from a --rmm-*
// token like everything else in the stylesheet.
const copyStylesheet = () => ({
  name: 'copy-rmm-stylesheet',
  closeBundle() {
    const src = path.resolve(__dirname, 'src/styles/style.css')
    const outDir = path.resolve(__dirname, 'dist')
    const dest = path.join(outDir, 'style.css')
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }
    const css = fs.readFileSync(src, 'utf8')
    const large = breakpoints.large['min-width']
    const substituted = css.split(LARGE_BREAKPOINT_PLACEHOLDER).join(large)
    if (substituted.includes(LARGE_BREAKPOINT_PLACEHOLDER)) {
      throw new Error(
        `dist/style.css still contains an unreplaced ${LARGE_BREAKPOINT_PLACEHOLDER} placeholder`
      )
    }
    fs.writeFileSync(dest, substituted)
  }
})

// Copies the hand-written declaration (src/index.d.ts) to dist/index.d.ts,
// the path package.json's "types" field and the "." export's "types"
// condition point at. The source is JSX + PropTypes, so there is nothing for
// tsc to emit; src/typesContract.test.js keeps the declaration honest.
const copyDeclaration = () => ({
  name: 'copy-rmm-declaration',
  closeBundle() {
    const src = path.resolve(__dirname, 'src/index.d.ts')
    const outDir = path.resolve(__dirname, 'dist')
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }
    fs.copyFileSync(src, path.join(outDir, 'index.d.ts'))
  }
})

export default defineConfig({
  plugins: [react(), copyStylesheet(), copyDeclaration()],
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
      external: ['react', 'react-dom', '@jasonrundell/topiary'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@jasonrundell/topiary': 'Topiary'
        },
        exports: 'named'
      }
    }
  }
})
