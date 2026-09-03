# Keyboard walkthrough

Manual/browser-driven keyboard checks for the Menu. Each row is re-run in a real
browser (Chromium via Playwright) against the built library (`dist/index.es.js`)
rendered between two page links (`#before`, `#after`).

Re-run it with the harness in `scripts/a11y-walkthrough/`:

```sh
npm run build
npx vite build --config scripts/a11y-walkthrough/vite.config.js
npm i --no-save playwright && npx playwright install chromium   # once
node scripts/a11y-walkthrough/walk.cjs
```

Set `CHROMIUM_PATH` to point the script at an existing Chromium binary. The same
commands work on Windows, macOS and Linux.

| Row | Check                                                                 | Width  | Result | Notes                                                                                                                                   |
| --- | --------------------------------------------------------------------- | ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| 13  | Closed off-canvas nav is out of the tab order (#100)                  | 400px  | PASS   | `#rmm__nav` carries `inert` while closed. Tab from `#rmm__hamburger` lands on `#after`; Shift+Tab lands on `#before`.                   |
| 13a | Opening the nav restores its links; closing removes them again (#100) | 400px  | PASS   | After Hamburger click, Tab from `#rmm__hamburger` lands on `#rmm-main-nav-item-link-home`. After a second click, Tab lands on `#after`. |
| 13b | Same behaviour under `prefers-reduced-motion: reduce` (#100)          | 400px  | PASS   | Identical results with `reducedMotion: 'reduce'` emulated.                                                                              |
| 13c | Desktop width never applies `inert` (#100)                            | 1280px | PASS   | `#rmm__nav` has no `inert` attribute open or closed; Tab from `#before` reaches `#rmm-main-nav-item-link-home`.                         |

The automated equivalent lives in `src/accessibility.test.js`: a jest-axe gate
over the four states (mobile/desktop x closed/open) and a focus-walk at the
rendered-Menu seam (jsdom does not implement `inert` focus semantics, so that
file walks the DOM and excludes `[inert]` subtrees itself).
