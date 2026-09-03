/**
 * Public type surface of @jasonrundell/react-mega-menu.
 *
 * Hand-written and copied to dist/index.d.ts by the build (vite.config.js),
 * alongside style.css. Kept in sync with the runtime by
 * src/typesContract.test.js, which typechecks test/types/menu.fixture.tsx
 * (a consumer of this file) and the real default config in
 * src/config/defaultMenuConfig.js against these types.
 */
import type { ComponentType, HTMLAttributes } from 'react'

/**
 * The four item `type` values the rendering helpers switch on
 * (src/config/menuItemTypes.js).
 */
export type MenuItemType = 'main' | 'link' | 'mega' | 'sub'

export interface MenuConfigItem {
  id: string
  label: string
  type: MenuItemType
  url: string
  description?: string
  /** Child items of a `mega` or `sub` item. */
  items?: MenuConfigItem[]
}

export interface MenuConfigTopbar {
  id: string
  logo: {
    src: string
    alt?: string
    rel?: string
  }
  title: string
}

/** The `config` prop: top bar plus the menu item tree. */
export interface MenuConfigShape {
  topbar: MenuConfigTopbar
  menu: {
    items: MenuConfigItem[]
  }
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Defaults to the built-in sample config. */
  config?: MenuConfigShape
  /**
   * Id of the menu shell. Defaults to `rmm__menu`, with the Nav and main
   * list defaulting to `rmm__nav` and `rmm__main`. A custom id is applied to
   * the shell only; the inner regions derive theirs from it as `<id>__nav`
   * and `<id>__main`.
   */
  id?: string
  className?: string
  /**
   * Which side the off-canvas nav slides in from on mobile widths.
   * Defaults to `'left'`.
   */
  slideDirection?: 'left' | 'right'
}

/** The menu, already wrapped in its context provider. */
export const Menu: ComponentType<MenuProps>

export default Menu
