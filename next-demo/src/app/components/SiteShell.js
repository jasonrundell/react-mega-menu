'use client'

import { useState } from 'react'
import { Menu } from '@jasonrundell/react-mega-menu'
import { menuConfig } from '../menuConfig'
import { TOPIARY_THEMES } from '../topiaryThemes'

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * The client boundary for this demo. Everything above this component
 * (layout.js, page.js) is server-rendered — this is where interactivity
 * (theme + slideDirection state) starts.
 *
 * `initialTheme` comes from the server (page.js reads it from the
 * `?theme=` search param), so the very first HTML the server sends already
 * carries `data-theme="<initialTheme>"` on this wrapper and the menu's
 * fully-rendered, fully-styled markup inside it — no flash of unstyled
 * content, no client-side theme flip after hydration.
 */
export default function SiteShell({ initialTheme, children }) {
  const [theme, setTheme] = useState(initialTheme)
  const [slideDirection, setSlideDirection] = useState('left')

  const toggleSlideDirection = () => {
    setSlideDirection((direction) => (direction === 'left' ? 'right' : 'left'))
  }

  return (
    <div data-theme={theme} className="site-shell">
      <Menu config={menuConfig} slideDirection={slideDirection} />
      <main className="site-content">
        <p className="demo-status">
          data-theme=&quot;{theme}&quot;, slideDirection=&quot;
          {slideDirection}&quot;
        </p>

        <div className="demo-section">
          <h2>Topiary theme</h2>
          <p>
            Four Topiary themes — <code>hangar</code>, <code>broadsheet</code>
            , <code>arcade</code>, <code>cascade</code> — are toggled by
            setting <code>data-theme</code> on the wrapper around the menu{' '}
            <em>and</em> this page&apos;s own content, the same convention
            used by the Vite demo. Sharable via <code>?theme=</code>, e.g.{' '}
            <code>?theme=arcade</code> — the server reads that param and
            renders the matching theme on first paint, so reloading a themed
            URL never shows a flash of the default theme first.
          </p>
          <ul className="demo-button-group">
            {TOPIARY_THEMES.map((themeName) => (
              <li key={themeName}>
                <button
                  onClick={() => setTheme(themeName)}
                  aria-pressed={theme === themeName}
                >
                  {capitalize(themeName)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="demo-section">
          <h2>Slide direction (issue #64)</h2>
          <p>
            The <code>slideDirection</code> prop controls which side the
            off-canvas nav slides in from at mobile widths (below the{' '}
            <code>large</code> breakpoint). Resize the window below ~64rem
            and open the hamburger menu to see it.
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
        </div>

        {children}
      </main>
    </div>
  )
}
