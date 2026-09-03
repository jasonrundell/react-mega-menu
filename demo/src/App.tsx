import { useEffect, useState } from 'react'
import { Menu } from '@jasonrundell/react-mega-menu'
import type { MenuConfigShape } from '@jasonrundell/react-mega-menu'
import './App.css'
// The five legacy (pre-v3) demo themes, rewritten as --rmm-* token-override
// examples — see demo/src/themes/light.css for the conversion note that
// applies to all five.
import './themes/light.css'
import './themes/dark.css'
import './themes/monokai.css'
import './themes/retro.css'
import './themes/synthwave.css'

/**
 * The four Topiary themes this package's stylesheet is built against (see
 * src/styles/style.css in the package root — every --rmm-* token there
 * falls back to var(--topiary-*, ...)). Applying one via `data-theme` on an
 * ancestor re-skins both the menu and this page's own chrome (App.css
 * reads the same --topiary-* tokens directly), since custom properties
 * inherit down the DOM tree from wherever `data-theme` is set.
 */
const TOPIARY_THEMES = ['hangar', 'broadsheet', 'arcade', 'cascade'] as const
type TopiaryTheme = (typeof TOPIARY_THEMES)[number]

function isTopiaryTheme(value: string | null): value is TopiaryTheme {
  return value !== null && (TOPIARY_THEMES as readonly string[]).includes(value)
}

/**
 * The five legacy demo themes (now --rmm-* token overrides — see
 * themes/light.css), applied as `.rmm__theme--<name>` on top of whichever
 * Topiary theme is current, the same way the pre-v3 demo layered a custom
 * theme class over the base Emotion styles.
 */
const OVERRIDE_THEMES = [
  'light',
  'dark',
  'monokai',
  'retro',
  'synthwave'
] as const
type OverrideTheme = (typeof OVERRIDE_THEMES)[number]

/** "arcade" -> "Arcade", for the theme button labels below. */
function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * Static configuration example of a menu configuration object. If
 * menuConfig doesn't depend on any state or props of App, hoisting it can
 * help improve performance and code clarity. Otherwise, move it to App's
 * state.
 */
const menuConfig: MenuConfigShape = {
  topbar: {
    id: 'topbar',
    logo: {
      src: '/images/logos/logo.svg',
      alt: 'React Mega Menu logo',
      rel: 'home'
    },
    title: 'React Mega Menu'
  },
  menu: {
    items: [
      {
        id: 'home',
        label: 'Home',
        type: 'main',
        url: '/'
      },
      {
        id: 'about',
        label: 'About',
        type: 'main',
        url: '/about/'
      },
      {
        id: 'store',
        label: 'Store',
        type: 'mega',
        url: '/store/',
        items: [
          {
            id: 'store-deals',
            label: 'Deals',
            type: 'link',
            url: '/store/deals/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            id: 'store-kitchen',
            label: 'Kitchen',
            type: 'link',
            url: '/store/kitchen/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            id: 'store-outdoors',
            label: 'Outdoors',
            type: 'sub',
            url: '/store/outdoors/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                id: 'store-outdoors-tools',
                label: 'Tools',
                type: 'link',
                url: '/store/outdoors/tools/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-outdoors-plants',
                label: 'Plants',
                type: 'link',
                url: '/store/outdoors/plants/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-outdoors-patio',
                label: 'Patio',
                type: 'link',
                url: '/store/outdoors/patio/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-outdoors-decking',
                label: 'Decking',
                type: 'link',
                url: '/store/outdoors/decking/',
                description: 'Single line description that accompanies link'
              }
            ]
          },
          {
            id: 'store-bedroom',
            label: 'Bedroom',
            type: 'sub',
            url: '/store/bedroom/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                id: 'store-bedroom-beds',
                label: 'Beds',
                type: 'link',
                url: '/store/bedroom/beds/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-bedroom-dressers',
                label: 'Dressers',
                type: 'link',
                url: '/store/bedroom/dressers/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                id: 'store-bedroom-nightstands',
                label: 'Nightstands',
                type: 'link',
                url: '/store/bedroom/nightstands/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                id: 'store-bedroom-benches',
                label: 'Benches',
                type: 'link',
                url: '/store/bedroom/benches/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              }
            ]
          }
        ]
      },
      {
        id: 'blog',
        label: 'Blog',
        type: 'mega',
        url: '/blog/',
        items: [
          {
            id: 'blog-latest-post-title',
            label: 'Latest Post Title',
            type: 'link',
            url: '/blog/posts/latest-post-title/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          },
          {
            id: 'blog-categories',
            label: 'Categories',
            type: 'sub',
            url: '/blog/categories/',
            items: [
              {
                id: 'blog-news',
                label: 'News',
                type: 'link',
                url: '/blog/news/'
              },
              {
                id: 'blog-recipes',
                label: 'Recipes',
                type: 'link',
                url: '/blog/recipes/'
              },
              {
                id: 'blog-health',
                label: 'Health',
                type: 'link',
                url: '/blog/health/'
              },
              {
                id: 'blog-diet',
                label: 'Diet',
                type: 'link',
                url: '/blog/diet/'
              }
            ]
          }
        ]
      },
      {
        id: 'help',
        label: 'Help',
        type: 'mega',
        url: '/help/',
        items: [
          {
            id: 'help-react-mega-menu',
            label: 'React Mega Menu',
            type: 'link',
            url: 'https://github.com/jasonrundell/react-mega-menu',
            description:
              'A React project which aims to be an accessible, responsive, boilerplate top navigation menu with a "Mega Menu"!'
          },
          {
            id: 'help-faq',
            label: 'FAQ',
            type: 'link',
            url: '/help/faq/',
            description: 'Single line description that accompanies link'
          },
          {
            id: 'help-knowledge-base',
            label: 'Knowledge Base',
            type: 'link',
            url: '/help/knowledge-base/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          }
        ]
      },
      {
        id: 'settings',
        label: 'Settings',
        type: 'mega',
        url: '/settings/',
        items: [
          {
            id: 'settings-profile',
            label: 'Profile',
            type: 'link',
            url: '/settings/profile/',
            description: 'Single line description that accompanies link'
          },
          {
            id: 'settings-billing',
            label: 'Billing',
            type: 'link',
            url: '/settings/billing/',
            description: 'Single line description that accompanies link'
          },
          {
            id: 'settings-theme',
            label: 'Theme',
            type: 'sub',
            url: '#',
            description: 'Change the Topiary theme via the ?theme= param',
            items: [
              {
                id: 'settings-theme-hangar',
                label: 'Hangar',
                type: 'link',
                url: '/?theme=hangar'
              },
              {
                id: 'settings-theme-broadsheet',
                label: 'Broadsheet',
                type: 'link',
                url: '/?theme=broadsheet'
              },
              {
                id: 'settings-theme-arcade',
                label: 'Arcade',
                type: 'link',
                url: '/?theme=arcade'
              },
              {
                id: 'settings-theme-cascade',
                label: 'Cascade',
                type: 'link',
                url: '/?theme=cascade'
              }
            ]
          },
          {
            id: 'settings-logout',
            label: 'Logout',
            type: 'link',
            url: '/settings/logout/',
            description: 'Single line description that accompanies link'
          }
        ]
      },
      {
        id: 'contact',
        label: 'Contact',
        type: 'main',
        url: '#contact'
      }
    ]
  }
}

type SlideDirection = 'left' | 'right'

type AppProps = {
  /**
   * The slideDirection the page starts on. `/` starts on 'left' (the prop's
   * default) and `/slide-right/` starts on 'right' — two entries of the same
   * app (see vite.config.ts) so each side has a sharable page.
   */
  defaultSlideDirection?: SlideDirection
}

function App({ defaultSlideDirection = 'left' }: AppProps) {
  const [topiaryTheme, setTopiaryTheme] = useState<TopiaryTheme>('hangar')
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(
    defaultSlideDirection
  )
  const [overrideTheme, setOverrideTheme] = useState<OverrideTheme | ''>('')

  // states for toggling head styling, preserved from the pre-v3 demo: it
  // removes/restores <head> (and everything Vite injected into it,
  // stylesheets included) to demonstrate the menu's semantic HTML holds up
  // with no styling applied at all.
  const [headEnabled, setHeadEnabled] = useState(true)
  const [headElement] = useState<HTMLElement | null>(document.head)

  useEffect(() => {
    if (headEnabled) {
      if (headElement && !document.documentElement.contains(headElement)) {
        document.documentElement.insertBefore(headElement, document.body)
      }
    } else {
      if (headElement && document.documentElement.contains(headElement)) {
        headElement.remove()
      }
    }
  }, [headEnabled, headElement])

  /**
   * Check the URL query string for a `theme` parameter and apply it if it
   * names one of the four Topiary themes. Useful for sharing a specific
   * theme with others, e.g. https://example.com?theme=arcade.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme')
    if (isTopiaryTheme(themeParam)) {
      setTopiaryTheme(themeParam)
    }
  }, [])

  const toggleHead = () => {
    setHeadEnabled(!headEnabled)
  }

  const toggleSlideDirection = () => {
    setSlideDirection((direction) => (direction === 'left' ? 'right' : 'left'))
  }

  const menuClassName = overrideTheme
    ? `rmm__theme--${overrideTheme}`
    : undefined

  return (
    <div data-theme={topiaryTheme} className="demo-page">
      <Menu
        config={menuConfig}
        slideDirection={slideDirection}
        className={menuClassName}
      />
      <main className="demo-content">
        <header className="demo-hero">
          <h1>React Mega Menu</h1>
          <p className="demo-lead">
            An accessible, responsive top navigation with a &quot;Mega
            Menu&quot;, styled entirely through CSS custom properties. Open the
            Store, Blog, Help or Settings items above to see it work.
          </p>
          <p className="demo-status">
            data-theme=&quot;{topiaryTheme}&quot;, slideDirection=&quot;
            {slideDirection}&quot;
            {overrideTheme && (
              <>, className=&quot;rmm__theme--{overrideTheme}&quot;</>
            )}
          </p>
        </header>

        <section className="demo-section">
          <h2>Features</h2>
          <ul className="demo-features">
            <li>WCAG 2.1 AA compliant</li>
            <li>W3C valid markup</li>
            <li>Fly-out menus</li>
            <li>Supports keyboard navigation and screen readers</li>
            <li>
              Responsively designed to adapt to modern mobile and desktop screen
              sizes
            </li>
            <li>
              Styled entirely through CSS custom properties: a documented{' '}
              <code>--rmm-*</code> token contract (
              <a href="https://github.com/jasonrundell/react-mega-menu">
                see rmmTokens.js
              </a>
              ) that resolves from{' '}
              <a href="https://github.com/jasonrundell/topiary">
                Topiary&apos;s <code>--topiary-*</code> tokens
              </a>{' '}
              with a hardcoded fallback — no Emotion, no runtime CSS-in-JS.
            </li>
            <li>
              Off-canvas nav on mobile widths with a configurable{' '}
              <code>slideDirection</code> (&apos;left&apos; or
              &apos;right&apos;, see below).
            </li>
            <li>
              Supports and tested against Edge, Safari, FireFox, and Chrome
            </li>
            <li>
              CSS animations that respect the{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion">
                prefers-reduced-motion
              </a>{' '}
              media query
            </li>
            <li>
              Includes a demo project using Next.js, showcasing how to integrate
              the menu with a Next.js application
            </li>
          </ul>
        </section>

        <section className="demo-section">
          <h2>Semantically designed structure</h2>
          <p>
            The menu is designed to be as semantically correct as possible. The
            top-level menu items are <code>nav</code> elements, and the submenus
            are <code>ul</code> elements. The menu items are <code>li</code>{' '}
            elements, and the links are <code>a</code> elements. The menu is
            accessible through keyboard navigation and screen readers.
          </p>
          <button className="demo-button" onClick={toggleHead}>
            {headEnabled ? 'Disable styling to view' : 'Re-enable styling'}
          </button>
        </section>

        <section className="demo-section">
          <h2>Topiary theme</h2>
          <p>
            Four Topiary themes — <code>hangar</code>, <code>broadsheet</code>,{' '}
            <code>arcade</code>, <code>cascade</code> — are toggled by setting{' '}
            <code>data-theme</code> on the wrapper around the menu <em>and</em>{' '}
            this page&apos;s own content. Both read the same{' '}
            <code>--topiary-*</code> tokens, so switching themes re-skins the
            whole page from identical markup — &quot;tokens drive form&quot;.
            Sharable via <code>?theme=</code>, e.g. <code>?theme=arcade</code>.
          </p>
          <ul className="demo-button-group">
            {TOPIARY_THEMES.map((theme) => (
              <li key={theme}>
                <button
                  onClick={() => setTopiaryTheme(theme)}
                  aria-pressed={topiaryTheme === theme}
                >
                  {capitalize(theme)}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="demo-section">
          <h2>Slide direction</h2>
          <p>
            The <code>slideDirection</code> prop controls which side the
            off-canvas nav slides in from at mobile widths (below the{' '}
            <code>large</code> breakpoint). Resize the window below ~64rem and
            open the hamburger menu to see it.
          </p>
          <p>
            This page starts on{' '}
            <code>slideDirection=&quot;{defaultSlideDirection}&quot;</code>.{' '}
            {defaultSlideDirection === 'left' ? (
              <>
                For a page that mounts the menu with{' '}
                <code>slideDirection=&quot;right&quot;</code> from the first
                render, open <a href="/slide-right/">/slide-right/</a>.
              </>
            ) : (
              <>
                The default page, which mounts the menu with{' '}
                <code>slideDirection=&quot;left&quot;</code>, is at{' '}
                <a href="/">/</a>.
              </>
            )}
          </p>
          <ul className="demo-button-group">
            <li>
              <button
                onClick={() => setSlideDirection('left')}
                aria-pressed={slideDirection === 'left'}
              >
                Left (default)
              </button>
            </li>
            <li>
              <button
                onClick={() => setSlideDirection('right')}
                aria-pressed={slideDirection === 'right'}
              >
                Right
              </button>
            </li>
            <li>
              <button onClick={toggleSlideDirection}>Toggle</button>
            </li>
          </ul>
        </section>

        <section className="demo-section">
          <h2>Custom token overrides</h2>
          <p>
            Beyond a Topiary theme, the menu can be restyled further by
            overriding its own <code>--rmm-*</code> tokens on a class layered
            onto{' '}
            <code>
              &lt;Menu className=&quot;rmm__theme--your-theme&quot; /&gt;
            </code>
            . The five examples below are the pre-v3 demo themes, rewritten to
            go through that documented token contract instead of reaching into
            the menu&apos;s internal selectors (see{' '}
            <code>demo/src/themes/*.css</code> for the full conversion note —
            each theme file explains what it kept and what it dropped).
          </p>
          <ul className="demo-button-group">
            {OVERRIDE_THEMES.map((theme) => (
              <li key={theme}>
                <button
                  onClick={() => setOverrideTheme(theme)}
                  aria-pressed={overrideTheme === theme}
                >
                  {capitalize(theme)}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setOverrideTheme('')}
                aria-pressed={overrideTheme === ''}
              >
                None
              </button>
            </li>
          </ul>
          <p className="demo-note">
            Note how the token overrides only affect the mega menu, not the rest
            of the page — unlike the Topiary theme switcher above, which
            re-skins both from the same tokens.
          </p>
        </section>

        <section className="demo-section">
          <h2 id="contact">Showcase your theme</h2>
          <p>
            Submit a{' '}
            <a
              href="https://github.com/jasonrundell/react-mega-menu/compare"
              target="_blank"
              rel="noreferrer"
            >
              pull request
            </a>{' '}
            to add your theme to the demo!
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
