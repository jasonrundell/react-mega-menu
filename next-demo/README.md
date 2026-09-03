# React Mega Menu demo (Next.js / SSR proof)

A Next.js 15 (App Router) + React 19 app that demonstrates
`@jasonrundell/react-mega-menu` v3 rendering fully styled on the **server**,
under [Topiary](https://github.com/jasonrundell/topiary) tokens, with no
flash of unstyled content and no hydration warnings. It's the SSR
counterpart to the [Vite demo](../demo) — same v3 package, same four-theme
switcher, same `?theme=` convention — proving the compiled-CSS approach
works outside a client-only SPA.

## What this demo shows

- **Both stylesheets, imported once in the root layout**
  (`src/app/layout.js`, a server component):
  `@jasonrundell/topiary/style.css`, then
  `@jasonrundell/react-mega-menu/style.css`, in that order. Because the menu
  ships compiled CSS (no CSS-in-JS, no runtime style injection), the very
  first HTML the server sends is already fully styled.
- **A server-rendered `?theme=` param.** `src/app/page.js` is a server
  component that reads `searchParams` (a `Promise` under Next 15 — it's
  `await`ed) and validates it against the four Topiary theme names
  (`hangar`, `broadsheet`, `arcade`, `cascade`), defaulting to `hangar`.
  The result: `curl`ing `/?theme=arcade` returns HTML that already carries
  `data-theme="arcade"` and the arcade-colored menu markup — no client-side
  theme flip after the page loads.
- **One client boundary.** `src/app/components/SiteShell.js`
  (`'use client'`) is the only client component in the tree. It owns
  `theme` and `slideDirection` state (seeded from the server-selected
  theme) and renders `<Menu />`, the theme/direction buttons, and the page
  content under one `data-theme` wrapper — mirroring the Vite demo's
  switcher so the two stay consistent.
- **A `slideDirection` toggle** (`left` / `right`), the same
  off-canvas-nav-direction feature (issue #64) demonstrated in the Vite
  demo. Resize below the `large` breakpoint (~64rem) and open the hamburger
  menu to see it.

## Running it

The package isn't published to npm; this demo installs it from a tarball
committed at the repo root.

From the **repo root**:

```bash
npm install          # once, for the root package
npm run pack:demo     # builds the package and (re)writes the tarball at the repo root
```

Then, from **this directory**:

```bash
npm install
npm run dev
```

If you've just run `pack:demo` again after a package change, force a clean
reinstall so the refreshed tarball is actually picked up (npm otherwise
trusts the existing `node_modules` copy):

```bash
rm -rf node_modules package-lock.json
npm install
```

Other scripts: `npm run build` (production build; lint runs as part of it),
`npm start` (serve the production build — this is how to verify SSR for
real, since `next dev` skips some production-only optimizations), `npm run
lint`.

To check a themed URL is styled on first paint without a browser at all:

```bash
npm run build && npm start
curl -s http://localhost:3000/?theme=arcade | grep -o 'data-theme="[^"]*"'
```

## Project structure

- `src/app/layout.js` — server component; stylesheet imports, in the
  required order (Topiary, then the menu), plus the Geist fonts.
- `src/app/page.js` — server component; reads and validates the `?theme=`
  search param, passes it to `SiteShell` as the initial theme.
- `src/app/components/SiteShell.js` — the `'use client'` boundary; owns
  theme and `slideDirection` state, renders `<Menu />` and the page's own
  content under one `data-theme` wrapper.
- `src/app/menuConfig.js` — the menu configuration object, hoisted as a
  plain module so both the server and client sides can read it.
- `src/app/topiaryThemes.js` — the four Topiary theme names and the
  validator page.js uses against the `?theme=` param.
