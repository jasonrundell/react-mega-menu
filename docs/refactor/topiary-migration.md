# Refactor plan: migrate react-mega-menu to Topiary

**Status:** Proposed (this branch exists to review the plan, not code)
**Target release:** v3.0.0
**Branch:** `refactor/topiary-migration-plan`
**Date:** 2026-09-02

## Goal

Rebuild `@jasonrundell/react-mega-menu` on [`@jasonrundell/topiary`](https://github.com/jasonrundell/topiary)'s
components and design-token system, removing Emotion (`@emotion/react`, `@emotion/styled`)
entirely.

This refactor is also a **field test of Topiary's token contract** ("tokens drive
form, components drive function"). Any gap discovered between what a real,
accessibility-focused component package needs and what Topiary provides is a
first-class finding: it gets written up, filed as an issue in the Topiary repo,
and **fixed in Topiary before the menu adopts the affected piece** (see Gap
policy below).

> Note: the original request said "replace Dropship" — Dropship is not a
> dependency of this repo. The runtime styling library actually in use is
> Emotion, and that is what this plan replaces.

## Decisions (settled)

| # | Decision | Choice |
|---|----------|--------|
| 1 | Scope | Adopt Topiary's **components and tokens**; remove Emotion completely |
| 2 | Versioning | **v3.0.0**, peer deps move to **React 19 only**; React 18 users stay on v2.x |
| 3 | Dependency posture | Topiary is a **peerDependency**; consumers import `@jasonrundell/topiary/style.css` and set `data-theme` at their app root |
| 4 | Styling home | One shipped plain-CSS stylesheet: `@jasonrundell/react-mega-menu/style.css`, written against the existing `rmm__*` class names |
| 5 | Token contract | Stylesheet consumes only **`--rmm-*` component tokens**, each defaulting to a Topiary token with a hardcoded fallback |
| 6 | Component adoption | **Selective** — Topiary atoms only where they map 1:1 onto existing semantics and pass the audit; the `nav`/`ul`/`li` skeleton stays plain semantic HTML |
| 7 | Gap policy | **Topiary-first, blocking** — audit findings are fixed and released in Topiary before the menu adopts that piece |
| 8 | Demos | Both demos upgrade (Vite → React 19; next-demo → Next 15 + React 19), drop Emotion, add a four-theme switcher |
| 9 | Verification bar | Test parity **plus** `jest-axe` on open/closed states and a manual keyboard-walkthrough checklist |
| 10 | Plan artifact | This document; Topiary issues are filed from audit evidence, not speculation |
| 11 | Slide direction ([#64](https://github.com/jasonrundell/react-mega-menu/issues/64)) | New `slideDirection` prop (`'left' \| 'right'`, default `'left'` = current behavior) — the one additive API change in v3 |

## Current state (audited 2026-09-02)

- Styling: Emotion `styled.*` template literals in `src/Menu.jsx` and all 13
  components under `src/components/`; animation via Emotion `css` in
  `src/helpers/animationStyles.js`; responsive helpers in
  `src/helpers/responsive.js` + `src/config/breakpoints.js`.
- No ThemeProvider — all values are hardcoded. The Emotion version was never
  actually themeable; v3's token contract is a new capability, not a port.
- Markup already carries stable `rmm__*` ids/classes (`rmm__menu`,
  `rmm__topbar`, `rmm__hamburger`, `rmm__nav`, `rmm__main`, …), which become
  the selector surface for the shipped stylesheet.
- State/behavior (MenuContext, a11y helpers, outside-click/Escape handling,
  mobile detection) is styling-agnostic and carries over unchanged.
- Tests: Jest + Testing Library (`Menu.test.js`, `Nav.test.jsx`,
  `MenuContext.test.js`, helper tests). `animationStyles.test.js` asserts on
  Emotion `css` output and must be rewritten as state-class assertions.
- Demos install the library from a checked-in tarball
  (`file:../jasonrundell-react-mega-menu-2.2.2.tgz`). `demo/` is Vite + React
  18 + Emotion; `next-demo/` is Next 14 + React 18 (Next 14 caps at React 18;
  React 19 requires Next 15).
- Topiary (per its README): atoms Button, Card, Grid, Heading, Link, Box,
  Blockquote, Row, Spacer, Container; DTCG tokens compiled to
  `--topiary-*` CSS custom properties; themes `hangar` (default),
  `broadsheet`, `arcade`, `cascade` scoped via `data-theme`; peer deps React
  19 / React DOM 19; no runtime dependencies.

## Phases

Phases 1–2 live in the Topiary repo; 3–6 live here. Phase 3 must not adopt any
Topiary piece whose audit finding is still open (Decision 7).

### Phase 0 — Topiary audit (in this repo, produces the gap report)

Prove Topiary is in a state where the component token contract works; where it
isn't, produce the evidence to improve Topiary.

**0.1 Component contract audit.** For each candidate atom (`Link`, `Heading`,
`Button`, and any layout atom considered for TopBar), verify from Topiary
source — not docs:

- [ ] Renders the correct semantic element (`Link` → `<a>`, `Heading` →
      `<h1>`–`<h6>` with a level prop, `Button` → `<button>`).
- [ ] Forwards arbitrary props: `aria-*`, `role`, `id`, `className`,
      `data-*`, event handlers.
- [ ] Forwards `ref` (needed for focus management).
- [ ] `className` merging: consumer classes append rather than replace, so
      `rmm__*` classes can coexist with Topiary's own.
- [ ] Styling comes from tokens the `--rmm-*` layer can override (no inline
      styles or hardcoded values that beat custom properties).
- [ ] SSR-safe: no browser-only code at module scope.

**0.2 Token vocabulary audit.** Does `--topiary-*` cover what a fixed-position,
animated, responsive mega menu needs?

- [ ] Color: surface/background, text, link + hover/focus, borders.
- [ ] Space scale sufficient for menu padding/gaps.
- [ ] Typography: sizes/weights for title, nav items, item descriptions.
- [ ] Z-index / elevation scale (menu currently hardcodes `z-index: 9000`).
- [ ] Motion: durations/easings (currently hardcoded `0.75s`).
- [ ] Breakpoints: are Topiary's breakpoints exposed as usable values, and do
      they align with `src/config/breakpoints.js`? (Custom properties do not
      work in media queries — see Risks.)
- [ ] Focus ring: a visible-focus treatment that passes contrast in all four
      themes.
- [ ] Shadows/borders for the mega panel across all four themes.

**0.3 Theme robustness.** Render a static mockup of the menu markup under all
four themes; note any theme where menu-critical contrast, radius, or border
choices break usability.

**Deliverable:** `docs/refactor/topiary-gap-report.md` — one entry per gap:
what the menu needs, what Topiary does today, evidence (file/line in Topiary),
proposed fix. Each entry becomes a `jasonrundell/topiary` issue.

### Phase 1 — Topiary fixes (in `jasonrundell/topiary`, blocking)

- File issues from the gap report; fix; release.
- Menu migration (Phase 3) may begin for pieces with no open findings;
  affected pieces wait for the Topiary release that closes their finding.

### Phase 2 — Token contract draft (this repo, can start alongside Phase 1)

Define the `--rmm-*` surface in the new stylesheet, e.g.:

```css
.rmm__menu {
  --rmm-menu-bg: var(--topiary-color-surface, #fefefe);
  --rmm-menu-text: var(--topiary-color-text, #1a1a1a);
  --rmm-menu-z: var(--topiary-z-nav, 9000);
  --rmm-menu-height: 8rem;
  --rmm-menu-height-large: 4rem;
  --rmm-link-color: var(--topiary-color-primary, #0066cc);
  --rmm-link-hover-bg: var(--topiary-color-surface-alt, #f0f0f0);
  --rmm-focus-ring: var(--topiary-focus-ring, 2px solid currentColor);
  --rmm-panel-border: var(--topiary-border-md, 1px solid #ccc);
  --rmm-panel-shadow: var(--topiary-shadow-md, 0 4px 12px rgb(0 0 0 / 0.15));
  --rmm-motion-duration: var(--topiary-duration-slow, 0.75s);
  /* … finalized against the Phase 0 token audit */
}
```

Rules: every value in the stylesheet routes through a `--rmm-*` token; each
token defaults to a Topiary token; each Topiary reference carries a fallback so
the menu renders sanely without Topiary's stylesheet. Exact Topiary token names
above are placeholders until Phase 0 confirms the real vocabulary. This token
table (name, purpose, default) is the documented theming API in the v3 README.

### Phase 3 — Menu migration (this repo)

Translate each Emotion component to semantic markup + stylesheet rules, or a
Topiary atom where the audit passed:

| File | Emotion today | v3 plan |
|------|---------------|---------|
| `src/Menu.jsx` | `StyledMenu` (fixed shell) | plain `div.rmm__menu` + stylesheet |
| `components/TopBar.jsx`, `TopBarTitle.jsx` | styled divs | audit: Topiary layout atom / `Heading`; else plain + stylesheet |
| `components/Logo.jsx` | styled img/link | plain, stylesheet |
| `components/Hamburger.jsx` | styled button, state styles | Topiary `Button` if audit passes (ARIA + state classes); else plain `<button>` |
| `components/Nav.jsx` | styled nav + animation | plain `<nav>`; animation via `.rmm__nav--open/--closed` state classes, plus `.rmm__nav--slide-left/--slide-right` direction modifiers (issue #64) |
| `components/MainList.jsx`, `MegaList.jsx`, `NavList.jsx` | styled `ul` | plain `<ul>`, stylesheet |
| `components/MainNavItem.jsx`, `NavItem.jsx` | styled `li` | plain `<li>`, stylesheet |
| `components/MainNavItemLink.jsx`, `NavItemLink.jsx` | styled `a` | Topiary `Link` if audit passes; else plain `<a>` |
| `components/NavItemDescription.jsx` | styled div | plain, stylesheet |
| `helpers/animationStyles.js` | Emotion `css` keyframes | delete; `@keyframes` + `prefers-reduced-motion` in stylesheet; components toggle state classes |
| `helpers/responsive.js`, `config/breakpoints.js` | template-literal media queries | media queries live in the stylesheet; JS keeps only the `viewportLarge` number for `setIsMobile` (single source: see Risks) |

Also in this phase:

- `package.json`: remove Emotion peer deps; add `@jasonrundell/topiary` peer;
  React peer deps → `^19.0.0`; version → `3.0.0-alpha`.
- Vite config: emit `style.css` alongside the JS bundle; add
  `"./style.css"` to `exports`.
- **Configurable slide direction
  ([#64](https://github.com/jasonrundell/react-mega-menu/issues/64)):** new
  `Menu` prop `slideDirection: 'left' | 'right'`, default `'left'` (current
  behavior). Implemented as a `.rmm__nav--slide-left` / `--slide-right`
  modifier class selecting between two keyframe pairs in the stylesheet —
  possible now precisely because animation moves out of Emotion into state
  classes. Both directions honor `prefers-reduced-motion`.
- Public API held stable: `Menu` props, config shape, `rmm__*` class names.
  One additive prop: `slideDirection` (above). Breaking changes limited to:
  React 19, Emotion peer deps removed, Topiary peer dep added, stylesheet
  import required.

### Phase 4 — Demos

- `demo/` (Vite): React 19, remove Emotion, add Topiary peer + both
  stylesheets, add a four-theme switcher (`hangar` / `broadsheet` / `arcade` /
  `cascade`) toggling `data-theme`.
- `next-demo/`: upgrade Next 14 → 15, React 19; add Topiary + stylesheets
  (imported in the root layout); same theme switcher. This is the SSR proof
  for the compiled-CSS approach.
- Refresh the checked-in tarball workflow for the v3 package (or replace
  `file:` tarball installs with `npm pack` in a script — decide during
  implementation; not a plan-level decision).
- At least one demo exposes a `slideDirection` toggle so the #64 feature is
  visible and manually verifiable on mobile widths.
- Demo screenshots across the four themes are the "tokens drive form"
  evidence for Topiary.

### Phase 5 — Verification (release gate for v3.0.0)

- [ ] All existing Jest suites pass; `animationStyles.test.js` rewritten as
      state-class assertions covering both `slideDirection` values (default
      unchanged when the prop is omitted).
- [ ] `jest-axe` added: no violations on the rendered menu, open and closed,
      mobile and desktop widths.
- [ ] Manual keyboard walkthrough (documented as a checklist in the PR): Tab
      order through top-level items; Enter/Space opens a mega panel; Escape
      closes and returns focus; outside click closes; focus visible in all
      four themes.
- [ ] Both demos build and run; next-demo verified with SSR (no hydration
      warnings, no flash of unstyled menu).
- [x] README rewritten: install (peer deps), stylesheet imports, `data-theme`,
      the `--rmm-*` token table, v2 → v3 migration notes (#98; the token
      table is contract-tested in `src/readmeContract.test.js`).

### Phase 6 — Release

- v3.0.0-beta from this branch lineage → verify in both demos → tag v3.0.0.
- v2.x noted in README as the React 18 / Emotion line (maintenance only).

## Risks & watch items

- **Custom properties don't work in media queries.** Breakpoints cannot come
  from `--topiary-*` at runtime. Options: hardcode breakpoints in the
  stylesheet mirroring `src/config/breakpoints.js`, or build the stylesheet
  from Topiary's DTCG token source. Decide from Phase 0's breakpoint finding.
- **Duplicate breakpoint source of truth.** `setIsMobile` needs the breakpoint
  in JS; the stylesheet needs it in CSS. Keep both reading from one place
  (JS constant + build-time injection, or a documented "must match" pair).
- **Topiary theme coverage.** If a theme (e.g. `arcade`'s neo-brutalist
  borders) breaks menu usability, that's a Phase 0 finding for Topiary, not a
  menu workaround.
- **Timeline coupling.** The Topiary-first gap policy means this refactor's
  schedule depends on Topiary releases. Mitigation: Phases 2 and 3 (unaffected
  pieces) proceed in parallel with Phase 1.
- **Consumer break surface.** v3 requires consumers to add a peer dep, two
  stylesheet imports, and React 19. The migration notes must be explicit that
  no config/markup changes are needed beyond that.

## Future work (explicitly out of scope)

- Playwright visual regression across the four themes.
- Widening peer deps back to `^18 || ^19` if Topiary later relaxes its React
  requirement.
- TypeScript migration (unrelated to this refactor; don't bundle it in).
