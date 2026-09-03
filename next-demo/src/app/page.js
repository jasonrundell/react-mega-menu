import SiteShell from './components/SiteShell'
import { DEFAULT_TOPIARY_THEME, isTopiaryTheme } from './topiaryThemes'

/**
 * Server component. Next 15 passes `searchParams` as a Promise, so it must
 * be awaited before use. The `theme` param is validated against the four
 * Topiary theme names and defaulted to `hangar` — this is what lets the
 * server render the correct `data-theme` and fully-styled menu markup on
 * the very first paint, rather than applying the theme after the client
 * boundary (SiteShell) hydrates.
 */
export default async function Home({ searchParams }) {
  const { theme } = await searchParams
  const initialTheme = isTopiaryTheme(theme) ? theme : DEFAULT_TOPIARY_THEME

  return (
    <SiteShell initialTheme={initialTheme}>
      <hr />
      <h1>React Mega Menu — Next.js demo</h1>
      <p>
        This page is the SSR proof for{' '}
        <code>@jasonrundell/react-mega-menu</code> v3&apos;s compiled-CSS
        architecture: the App Router, a server component root layout, and a
        thin client boundary around the menu&apos;s interactive state.
      </p>

      <h2>What&apos;s server vs. client here</h2>
      <ul>
        <li>
          <code>src/app/layout.js</code> is a server component. It imports
          both stylesheets — <code>@jasonrundell/topiary/style.css</code>,
          then <code>@jasonrundell/react-mega-menu/style.css</code> — once,
          at the root, in that order. The menu&apos;s stylesheet reads
          Topiary&apos;s <code>--topiary-*</code> tokens through its own
          documented <code>--rmm-*</code> contract, with a hardcoded
          fallback for every token, so nothing here depends on client-side
          style injection.
        </li>
        <li>
          <code>src/app/page.js</code> (this file) is also a server
          component. It reads the <code>?theme=</code> search param —
          a Promise under Next 15 — validates it against the four Topiary
          theme names, and passes the initial theme down as a plain prop.
        </li>
        <li>
          <code>src/app/components/SiteShell.js</code> is the client
          boundary (<code>&apos;use client&apos;</code>). It owns the{' '}
          <code>theme</code> and <code>slideDirection</code> state and
          renders the <code>&lt;Menu /&gt;</code>, the theme and direction
          buttons below, and this content — all under one{' '}
          <code>data-theme</code> wrapper, so the server-selected theme
          already applies to the first HTML the server sends, before any
          JavaScript runs.
        </li>
      </ul>

      <h2 id="contact">Contact</h2>
      <p>
        This anchor is the target of the menu&apos;s &quot;Contact&quot; top
        level link, configured in <code>src/app/menuConfig.js</code>.
      </p>
    </SiteShell>
  )
}
