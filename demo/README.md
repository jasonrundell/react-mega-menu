# React Mega Menu demo (v3 / Topiary)

A Vite + React 19 + TypeScript app that shows `@jasonrundell/react-mega-menu`
v3 running on [Topiary](https://github.com/jasonrundell/topiary) tokens, with
no Emotion or other CSS-in-JS anywhere. It's the "tokens drive form" evidence
for the v3 migration: the same menu (and page) markup re-skins across four
Topiary themes just by swapping which token set is active.

## What this demo shows

- **Both stylesheets, imported once at the app root** (`src/main.tsx`):
  `@jasonrundell/topiary/style.css`, then `@jasonrundell/react-mega-menu/style.css`.
  The menu's stylesheet reads Topiary's `--topiary-*` tokens through its own
  documented `--rmm-*` custom property contract (see `rmmTokens.js` and
  `styles/style.css` in the package root) — every `--rmm-*` token falls back
  to a hardcoded value, so the menu still renders correctly even if Topiary's
  stylesheet were absent.
- **A four-theme Topiary switcher** (`hangar` / `broadsheet` / `arcade` /
  `cascade`), toggling `data-theme` on a wrapper that contains *both* the
  `<Menu />` and this page's own content. Because CSS custom properties
  inherit, one attribute re-skins everything below it from identical markup.
  Sharable via a `?theme=` query parameter, e.g. `?theme=arcade`.
- **A `slideDirection` toggle** (`left` / `right`) demonstrating the
  off-canvas mobile nav's configurable slide-in side (issue #64). Resize the
  window below the `large` breakpoint (~64rem) and open the hamburger menu to
  see it.
- **Five legacy token-override examples** (`light`, `dark`, `monokai`,
  `retro`, `synthwave` — the pre-v3 demo's themes), rewritten to go through
  the same `--rmm-*` contract instead of the old selector-level overrides
  they used against Emotion's generated classes. See `src/themes/*.css` for
  what each one kept and what it dropped (mostly per-theme icon assets and
  chrome geometry that has no `--rmm-*` token to route through anymore —
  that's Topiary's job now). These layer on top of the current Topiary
  theme, via a `className="rmm__theme--<name>"` passed to `<Menu />`.

## Running it

The package isn't published to npm; the demo installs it from a tarball
committed at the repo root, the same way the site's Vercel deploy does.

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

Other scripts: `npm run build` (typecheck + production build via Vite),
`npm run lint`, `npm run preview`.

## Project structure

- `src/main.tsx` — stylesheet imports, in the required order (Topiary, then
  the menu).
- `src/App.tsx` — the menu config, the Topiary theme switcher, the
  `slideDirection` toggle, and the token-override theme buttons.
- `src/App.css` / `src/index.css` — the page's own chrome, styled directly
  from `--topiary-*` tokens so it re-skins alongside the menu.
- `src/themes/*.css` — the five legacy `--rmm-*` token-override examples.
- `src/rmm.d.ts` — a minimal local type declaration for
  `@jasonrundell/react-mega-menu`. The package's `package.json` points
  `types` at `dist/index.d.ts`, but its build has no `.d.ts` generation step
  yet, so nothing actually ships there; this shim covers just the props this
  demo uses (`config`, `id`, `className`, `slideDirection`) until that's
  fixed upstream in the package itself.
