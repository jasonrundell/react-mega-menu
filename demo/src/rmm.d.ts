/**
 * Minimal local type declaration for `@jasonrundell/react-mega-menu`.
 *
 * The v3 package.json declares "types": "dist/index.d.ts" but the package's
 * Vite build (root vite.config.js) has no dts step, so no declaration file
 * actually ships in the published tarball. Rather than generate types in
 * the root package here (that belongs in a follow-up ticket against the
 * package itself), this demo carries just enough of a shape to typecheck
 * its own usage: the `config`, `id`, `className`, and `slideDirection`
 * props consumed by demo/src/App.tsx, matching src/Menu.jsx's PropTypes.
 */
declare module '@jasonrundell/react-mega-menu' {
  import type { ComponentType, HTMLAttributes } from 'react'

  export interface MenuConfigItem {
    id: string
    label: string
    type: string
    url: string
    description?: string
    items?: MenuConfigItem[]
  }

  export interface MenuConfigShape {
    topbar: {
      id: string
      logo: {
        src: string
        alt?: string
        rel?: string
      }
      title: string
    }
    menu: {
      items: MenuConfigItem[]
    }
  }

  export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
    config?: MenuConfigShape
    id?: string
    className?: string
    /** Which side the off-canvas nav slides in from on mobile widths. */
    slideDirection?: 'left' | 'right'
  }

  export const Menu: ComponentType<MenuProps>
}

// '@jasonrundell/react-mega-menu/style.css' and '@jasonrundell/topiary/style.css'
// imports are already covered by vite/client's `declare module '*.css' {}`
// (see vite-env.d.ts), so no separate declaration is needed for them here.
