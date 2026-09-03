# React Mega Menu

An accessible, responsive top navigation menu for React with a "Mega Menu",
styled by a shipped stylesheet and design tokens rather than CSS-in-JS.

**v3** runs on React 19 and [Topiary](https://github.com/jasonrundell/topiary)
design tokens. If you are on React 18, stay on the **v2.x** line (see
[Migrating from v2](#migrating-from-v2)).

## Features

- WCAG 2.1 AA compliant, W3C valid markup
- Fly-out mega panels and nested sub-panels from a single config object
- Full keyboard support: Tab order, Enter / Space to open, Escape to close and
  return focus, outside click to close
- Responsive: an off-canvas nav with a hamburger toggle below the `large`
  breakpoint, a horizontal bar above it
- Plain CSS, no runtime styling library: one stylesheet, every value routed
  through a documented `--rmm-*` token layer that defaults to Topiary tokens
  with hardcoded fallbacks
- Re-skins with `data-theme` across all four Topiary themes from identical
  markup
- Configurable slide-in side for the mobile nav (`slideDirection`)
- Animations respect
  [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- Ships its own TypeScript declarations
- Automated axe gate and a recorded keyboard walkthrough in the test suite
- Two demos: a Vite SPA and a Next.js App Router app proving server-side
  rendering with no unstyled flash

## Install

```sh
npm install @jasonrundell/react-mega-menu @jasonrundell/topiary react react-dom
```

Peer dependencies (not bundled, you install them):

| Package                 | Range     |
| ----------------------- | --------- |
| `react`                 | `^19.0.0` |
| `react-dom`             | `^19.0.0` |
| `@jasonrundell/topiary` | `^4.1.0`  |

## Setup

Import both stylesheets **once**, at your app root, in this order: Topiary's
tokens first, then the menu's stylesheet, which reads those tokens. Then set
`data-theme` on an ancestor of the menu to pick a Topiary theme (`hangar`,
`broadsheet`, `arcade` or `cascade`).

```tsx
// main.tsx (Vite) or app/layout.js (Next.js App Router)
import '@jasonrundell/topiary/style.css'
import '@jasonrundell/react-mega-menu/style.css'
```

```tsx
import { Menu } from '@jasonrundell/react-mega-menu'

export const App = () => (
  <div data-theme="hangar">
    <Menu config={config} />
    {/* page content */}
  </div>
)
```

The menu never imports CSS as a side effect of its JavaScript, so it renders
styled on the very first server-rendered paint in Next.js. Without Topiary's
stylesheet every token falls back to a hardcoded value, so the menu still
renders correctly; it just will not follow your theme.

## Usage

`Menu` takes a `config` describing the top bar and the item tree. Items are one
of four types: `main` (a top-level link), `mega` (a top-level item that opens a
panel of child items), `link` (a plain item inside a panel) and `sub` (a panel
item that opens a nested panel of its own).

```tsx
import { Menu } from '@jasonrundell/react-mega-menu'
import type { MenuConfigShape } from '@jasonrundell/react-mega-menu'

const config: MenuConfigShape = {
  topbar: {
    id: 'topbar',
    logo: { src: '/logo.svg', alt: 'Acme', rel: 'home' },
    title: 'Acme'
  },
  menu: {
    items: [
      { id: 'home', label: 'Home', type: 'main', url: '/' },
      {
        id: 'store',
        label: 'Store',
        type: 'mega',
        url: '/store/',
        items: [
          {
            id: 'deals',
            label: 'Deals',
            type: 'link',
            url: '/store/deals/',
            description: 'Optional one-line description'
          },
          {
            id: 'outdoors',
            label: 'Outdoors',
            type: 'sub',
            url: '/store/outdoors/',
            items: [
              {
                id: 'tools',
                label: 'Tools',
                type: 'link',
                url: '/store/outdoors/tools/'
              }
            ]
          }
        ]
      }
    ]
  }
}

export const Header = () => <Menu config={config} slideDirection="right" />
```

### Props

| Prop             | Type                | Default                  | Description                                                                                  |
| ---------------- | ------------------- | ------------------------ | -------------------------------------------------------------------------------------------- |
| `config`         | `MenuConfigShape`   | a built-in sample config | The top bar and item tree (above).                                                           |
| `slideDirection` | `'left' \| 'right'` | `'left'`                 | Which side the off-canvas mobile nav slides in from. Both directions honor reduced motion.   |
| `id`             | `string`            | `'rmm__menu'`            | Id of the menu shell; inner regions derive theirs from it (see [Element ids](#element-ids)). |
| `className`      | `string`            |                          | Appended to the shell's `rmm__menu` class. Use it to scope token overrides.                  |

Any other `div` attribute (`data-*`, `aria-*`, event handlers) is passed through
to the shell.

## Theming

All of the menu's styling lives in the shipped stylesheet and consumes only the
`--rmm-*` custom properties below. Each one defaults to a Topiary token and
carries a hardcoded fallback, so you can restyle the menu on its own without
touching the Topiary tokens that drive the rest of your app.

Override tokens on the shell (or any ancestor). Scope them with `className`:

```css
.site-menu {
  --rmm-link-color: hotpink;
  --rmm-menu-height-large: 3rem;
}
```

```tsx
<Menu config={config} className="site-menu" />
```

The `rmm__*` class names on every element are stable public API too, so
selector-level overrides keep working across releases.

**Color**

| Token                 | Purpose                                                 | Default                                                                                |
| --------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `--rmm-menu-bg`       | Menu shell background                                   | `var(--topiary-color-surface, #fefefe)`                                                |
| `--rmm-menu-text`     | Primary text color                                      | `var(--topiary-color-text, #1a1a1a)`                                                   |
| `--rmm-link-color`    | Nav item link color                                     | `var(--topiary-color-primary, #0066cc)`                                                |
| `--rmm-link-hover-bg` | Nav item link `:hover` / `:focus-visible` background    | `var(--topiary-color-surfaceAlt, #f0f0f0)`                                             |
| `--rmm-text-muted`    | Item description text color                             | `var(--topiary-color-textMuted, #666666)`                                              |
| `--rmm-focus-ring`    | Composed `:focus-visible` outline (width, style, color) | `var(--topiary-borderWidth-thick, 2px) solid var(--topiary-color-focus, currentColor)` |

**Panel chrome**

| Token                 | Purpose                                                       | Default                                                                               |
| --------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `--rmm-panel-bg`      | Off-canvas nav, mega and sub panel background                 | `var(--topiary-color-surface, #fefefe)`                                               |
| `--rmm-panel-border`  | Composed border on the shell bottom, panel edges and headings | `var(--topiary-borderWidth-hairline, 1px) solid var(--topiary-color-border, #d9d9d9)` |
| `--rmm-panel-shadow`  | Mega panel drop shadow at the `large` breakpoint              | `var(--topiary-shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.12))`                            |
| `--rmm-panel-padding` | Mega panel inner padding at the `large` breakpoint            | `var(--topiary-space-lg, 1.5rem)`                                                     |
| `--rmm-link-radius`   | Link hover pill and hamburger slice corner radius             | `var(--topiary-radius-md, 3px)`                                                       |
| `--rmm-icon-stroke`   | Chevron stroke width                                          | `var(--topiary-borderWidth-thin, 2px)`                                                |

**Stacking order**

| Token           | Purpose                               | Default                            |
| --------------- | ------------------------------------- | ---------------------------------- |
| `--rmm-menu-z`  | Fixed menu shell                      | `var(--topiary-zIndex-nav, 9000)`  |
| `--rmm-panel-z` | Mega / sub panel, above sibling lists | `var(--topiary-zIndex-overlay, 2)` |
| `--rmm-list-z`  | Base nav list layer                   | `var(--topiary-zIndex-base, 1)`    |

**Structural sizing**

| Token                     | Purpose                                                   | Default                                    |
| ------------------------- | --------------------------------------------------------- | ------------------------------------------ |
| `--rmm-menu-height`       | Mobile menu shell height                                  | `var(--rmm-topbar-height)`                 |
| `--rmm-menu-height-large` | Menu shell height at the `large` breakpoint               | `var(--topiary-space-3xl, 4rem)`           |
| `--rmm-topbar-height`     | Top bar height                                            | `var(--topiary-space-3xl, 4rem)`           |
| `--rmm-gutter`            | Horizontal padding of the shell and every panel           | `var(--topiary-space-lg, 1.5rem)`          |
| `--rmm-column-min-width`  | Minimum mega panel column width at the `large` breakpoint | `calc(var(--topiary-space-3xl, 4rem) * 3)` |
| `--rmm-logo-height`       | Logo image height                                         | `var(--topiary-space-xl, 2rem)`            |
| `--rmm-hamburger-width`   | Hamburger slice container width                           | `var(--topiary-space-xl, 2rem)`            |
| `--rmm-hamburger-height`  | Hamburger slice container height                          | `var(--topiary-space-lg, 1.25rem)`         |

**Spacing scale**

| Token            | Purpose                               | Default                             |
| ---------------- | ------------------------------------- | ----------------------------------- |
| `--rmm-space-xs` | Extra-small margins, gaps and padding | `var(--topiary-space-2xs, 0.25rem)` |
| `--rmm-space-sm` | Small margins, gaps and padding       | `var(--topiary-space-xs, 0.5rem)`   |
| `--rmm-space-md` | Medium margins, gaps and padding      | `var(--topiary-space-md, 1rem)`     |
| `--rmm-space-xl` | Extra-large margins, gaps and padding | `var(--topiary-space-xl, 2rem)`     |

**Typography**

| Token                             | Purpose                          | Default                                 |
| --------------------------------- | -------------------------------- | --------------------------------------- |
| `--rmm-font-family`               | Body font stack                  | `var(--topiary-font-body, inherit)`     |
| `--rmm-line-height`               | Link and description line height | `var(--topiary-lineHeight-normal, 1.5)` |
| `--rmm-title-font-size`           | Top bar title                    | `var(--topiary-fontSize-xl, 1.5rem)`    |
| `--rmm-nav-item-font-size`        | Nav, mega and sub item link text | `var(--topiary-fontSize-md, 1rem)`      |
| `--rmm-description-font-size`     | Item description                 | `var(--topiary-fontSize-xs, 0.75rem)`   |
| `--rmm-hamburger-label-font-size` | Hamburger visible label          | `var(--topiary-fontSize-md, 1rem)`      |
| `--rmm-font-weight-bold`          | Hamburger label weight           | `var(--topiary-fontWeight-bold, 700)`   |

**Motion**

| Token                                       | Purpose                               | Default                                       |
| ------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| `--rmm-motion-duration`                     | Slide open / close animation duration | `var(--topiary-duration-slow, 0.75s)`         |
| `--rmm-motion-easing`                       | General transition easing             | `var(--topiary-easing-standard, ease-in-out)` |
| `--rmm-hamburger-transition-duration`       | Hamburger icon morph duration         | `var(--topiary-duration-normal, 0.5s)`        |
| `--rmm-hamburger-slice-transition-duration` | Individual hamburger slice transition | `var(--topiary-duration-fast, 0.25s)`         |

The source of truth for this table is `src/styles/style.css`; the test suite
fails if the two drift.

## Element ids

Every element the menu renders carries a stable `rmm__*` id and class name, so
existing stylesheets and tests keep working. Passing your own `id` to `Menu`
changes the ids of the shell and its two inner regions only, and never puts the
same id on more than one element:

| Element                         | Default id       | With `id="site-menu"` |
| ------------------------------- | ---------------- | --------------------- |
| Menu shell (`div.rmm__menu`)    | `rmm__menu`      | `site-menu`           |
| Off-canvas nav (`nav.rmm__nav`) | `rmm__nav`       | `site-menu__nav`      |
| Main list (`ul.rmm__nav-list`)  | `rmm__main`      | `site-menu__main`     |
| Hamburger button                | `rmm__hamburger` | `rmm__hamburger`      |

The Hamburger's `aria-controls` always points at the nav's rendered id, custom
or default. The top bar, title, Hamburger and menu items keep their fixed
`rmm__*` ids, so do not reuse one of those as the custom `id`.

## TypeScript

The package ships its own declaration file (`dist/index.d.ts`), so
`import { Menu } from '@jasonrundell/react-mega-menu'` typechecks with no extra
`@types` package or local shim. `Menu`'s props are typed, and the config shape
is exported so you can annotate your own config object:

```tsx
import { Menu } from '@jasonrundell/react-mega-menu'
import type { MenuConfigShape } from '@jasonrundell/react-mega-menu'

const config: MenuConfigShape = {
  topbar: {
    id: 'topbar',
    logo: { src: '/logo.svg', alt: 'Logo' },
    title: 'Site'
  },
  menu: { items: [{ id: 'home', label: 'Home', type: 'main', url: '/' }] }
}

export const Header = () => <Menu config={config} slideDirection="right" />
```

Also exported: `MenuProps`, `MenuConfigItem`, `MenuConfigTopbar` and the
`MenuItemType` union (`'main' | 'link' | 'mega' | 'sub'`).

## Migrating from v2

v3 is a styling-architecture release. Your `Menu` usage stays the same; what
changes is what you install and import.

**What you must change**

1. Upgrade to React 19: the peer dependency is `react` / `react-dom` `^19.0.0`.
2. Remove `@emotion/react` and `@emotion/styled` from your dependencies. v3 does
   not use them.
3. Add `@jasonrundell/topiary` (`^4.1.0`) as a dependency.
4. Import the two stylesheets once at your app root, Topiary's first (see
   [Setup](#setup)), and set `data-theme` on an ancestor of the menu.
5. If you had custom CSS targeting Emotion's generated class names, move it to
   `--rmm-*` token overrides or to the stable `rmm__*` classes (see
   [Theming](#theming)).

**What stays the same**

- The `Menu` component, its `config` shape and the `id` / `className` props. No
  config or markup changes are required beyond dependencies, stylesheets and
  React 19.
- Every `rmm__*` id and class name, so existing selectors and tests keep
  working.
- Keyboard behavior, Escape and outside-click handling, the hamburger and
  off-canvas nav on mobile, and `prefers-reduced-motion` support.

**What is new**

- `slideDirection` (`'left'` by default, matching v2's behavior).
- Shipped TypeScript declarations.
- A custom `id` no longer lands on three elements; inner regions derive unique
  ids from it. If you passed a custom `id` in v2 and targeted it on the nav or
  main list, point those selectors at `<id>__nav` and `<id>__main` instead.
- At mobile width the closed off-canvas nav is `inert`, so keyboard users no
  longer tab through hidden links.

**Staying on v2**

The v2.x line is the React 18 / Emotion line and is in maintenance only: it
receives no new features. Pin `@jasonrundell/react-mega-menu@^2` if you are not
ready for React 19.

## Accessibility

The rendered menu is scanned with [axe](https://github.com/dequelabs/axe-core)
in every state (closed, open, sub-panel open, mobile and desktop) as part of
`npm test`, and a manual keyboard walkthrough is recorded in
[docs/accessibility/keyboard-walkthrough.md](docs/accessibility/keyboard-walkthrough.md)
with a re-runnable browser harness. See that document before each release.

### Reduced motion

The slide open / close animation is suppressed under
`prefers-reduced-motion: reduce`. Learn more:

- ["Your Interactive Makes Me Sick"](https://source.opennews.org/articles/motion-sick/)
- ["An Introduction to the Reduced Motion Media Query"](https://css-tricks.com/introduction-reduced-motion-media-query/)
- [W3C: Understanding Success Criterion 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

### How to Test prefers-reduced-motion on macOS

1. Open settings for **Accessibility**
2. Toggle **Reduce Motion** On/Off

### How to Test prefers-reduced-motion on iOS

1. Open settings for **Accessibility**
2. Toggle **Reduce Motion** On/Off

### How to Test prefers-reduced-motion on Windows 10

1. Press the Win+R keys to open Run, type `SystemPropertiesPerformance.exe` into
   Run, and click/tap on OK to directly open to the Visual Effects tab in
   Performance Options.
2. Check (enable - default) or uncheck (disable)
   `Animate controls and elements inside windows`.
3. If you don't see an immediate change, then you can restart the explorer
   process or sign out and sign in to apply instead.

### How to Test prefers-reduced-motion on Android

1. Search in your system settings for **Remove Animations** and toggle On/Off,
   or
2. Go to your system settings > **Accessibility** and look for a toggle to
   reduce motion or turn off animations
3. If you have a browser app already open, you'll have to force quit it to have
   the setting take effect

## Demos

- Live:
  [https://jasonrundell-react-mega-menu.vercel.app/](https://jasonrundell-react-mega-menu.vercel.app)
- [`demo/`](demo/README.md): Vite + React 19 + TypeScript, with a four-theme
  switcher and a `slideDirection` toggle.
- [`next-demo/`](next-demo/README.md): Next.js 15 App Router, the server-side
  rendering proof.

Both demos install the package from the tarball committed at the repo root
(`npm run pack:demo` rebuilds it).

### Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/jasonrundell/react-mega-menu)

## Development

```sh
npm install
npm test            # builds, then runs the Jest suite (axe, contracts, fixtures)
npm run build       # dist/index.es.js, dist/index.cjs, dist/style.css, dist/index.d.ts, dist/index.d.cts
npm run pack:demo   # rebuilds the tarball both demos install from
```

The design notes for v3 live in
[docs/refactor/topiary-migration.md](docs/refactor/topiary-migration.md) and the
Topiary audit in
[docs/refactor/topiary-gap-report.md](docs/refactor/topiary-gap-report.md).

## Special Thanks

[Donna Vitan for the accessibility consultation](https://donnavitan.com)

## Resources

- [Web Accessibility Tutorials (WCAG) Menu Structure](https://www.w3.org/WAI/tutorials/menus/structure/)
- [Web Accessibility Tutorials (WCAG) Fly-out Menus](https://www.w3.org/WAI/tutorials/menus/flyout/)
- ["Building Accessible Menu Systems" by Heydon Pickering](https://www.smashingmagazine.com/2017/11/building-accessible-menu-systems/)
- [Deque University](https://dequeuniversity.com/)
- [a11y Project: Resources](https://www.a11yproject.com/resources/)
- [Supporting the Keyboard for Mobile](http://simplyaccessible.com/article/mobile-keyboard-support/)

## Icons

Icons from the **Free for Web** download pack by
[Font Awesome](https://fontawesome.com/download)
