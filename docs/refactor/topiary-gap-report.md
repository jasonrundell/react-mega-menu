# Topiary gap report (Phase 0 audit)

**Audited:** 2026-09-02
**Audited against:** `jasonrundell/topiary` `main`, commit resolved by `git clone --depth 1` on
2026-09-02, package version `4.0.1` (from `package.json`). Cloned read-only to a
scratch directory; built locally with `npm install && npm run build` so both
source (`src/`) and actual compiled output (`dist/style.css`, 18.53 kB) could be
inspected — findings below cite whichever is more precise for the claim.
**Method:** static source reading, `grep` across `src/`, a local production
build, two throwaway Vitest specs exercising real component output (deleted
after use, not part of the Topiary repo), one throwaway `tsc` type-check
snippet against the shipped `.tsx` sources (deleted after use), a WCAG
contrast calculation script run against the literal hex values in the compiled
`dist/style.css`, and a static HTML mockup of a top bar + mega panel styled
purely with `dist/style.css` custom properties, rendered under all four
`data-theme` values and screenshotted. This satisfies Phase 0's "render a
static mockup" instruction (0.3) with an actual rendering, not a description.
**Scope:** candidate atoms `Link`, `Heading`, `Button`, and layout atoms `Box`
and `Row` (the two structurally plausible candidates for `TopBar`, per the
migration plan). `Card`, `Grid`, `Spacer`, `Blockquote`, `Container` were read
enough to rule out as TopBar candidates but were not audited to the same depth
since the plan does not propose adopting them.

---

## 1. Summary table — component contract verdicts

| Atom | Verdict | Reason |
|---|---|---|
| `Link` | **ADOPT AFTER FIX** — fix the `className` override bug (§Gap 1); extend TS prop types (§Gap 6) | Correct semantic `<a>`, `ref` forwards fine under React 19, `aria-*`/`data-*` forward fine at runtime — but `className` silently **destroys** Topiary's own styling rather than merging, and the TS types reject `id`/`className`/`aria-*`/`data-*`/`ref` outright. Usable only for **leaf** nav links (`NavItemLink`) — see §Gap 7, it cannot host `MainNavItemLink`'s conditional icon `<span>`. |
| `Heading` | **ADOPT AFTER FIX** — fix the `className` override bug (§Gap 1); extend TS prop types (§Gap 6) | Correct semantic `<h1>`–`<h6>` via a `level` prop, accepts arbitrary `children` (unlike `Link`/`Button`), good fit for `TopBarTitle`. Same `className`-destroys-styling bug as `Link`. |
| `Button` | **DO NOT ADOPT** for `Hamburger` as currently shaped; **ADOPT AFTER FIX** for a plain text button elsewhere | `ButtonProps` has no `children` slot — only `label: string` — so it structurally cannot render `Hamburger`'s nested icon markup (a slice container + 4 `<span>`s, optionally plus a text label; see §Gap 2). Also has the same `className` override bug. Two separate Topiary fixes are needed before `Button` is viable for the hamburger toggle specifically. |
| `Row` (layout atom for `TopBar`) | **ADOPT AFTER FIX** — fix `className`/`style` override bug (§Gap 1); expose a `wrap` control (§Gap 3) | Pure flex-layout div (`display:flex`, token-driven `gap`/`justify`/`align`), no baked-in surface/border/shadow — a much closer structural match to `TopBar`'s current `flex-direction:row` shell than `Box`. But it hardcodes `flex-wrap: wrap` with no override path, while `TopBar` needs `nowrap`, and its `style` prop (used internally for CSS-var assignment) has the same override bug as `className`. |
| `Box` (layout atom, alternative) | **DO NOT ADOPT** for `TopBar` | Bakes in `background-color`, `border`, `box-shadow` (card styling) that `TopBar` doesn't have today — wrong semantic fit even after the `className` fix. Keep as plain `div` + stylesheet. |

All five verdicts assume React 19 (the plan's target peer dep) — the `ref`-forwarding finding below is React-19-specific and would not hold under React 18's `forwardRef` requirement.

---

## 2. Token vocabulary findings (against `TokenShape`, `src/lib/schema.ts`, confirmed compiled into `dist/style.css`)

| Category | Status | Detail |
|---|---|---|
| Color: surface/background/text/border | **COVERED** | `--topiary-color-background`, `-surface`, `-text`, `-textMuted`, `-border` all compiled (`dist/style.css` line 1 block). |
| Color: link | **COVERED** | `--topiary-color-primary` is the link color (`Link.css.ts:6`). |
| Color: link hover | **GAP** | See Gap 4 below — no hover/alt-surface color token exists anywhere in the schema. |
| Color: focus | **COVERED** | `--topiary-color-focus`, separate from `primary` (`schema.ts:35-36`). |
| Space scale | **COVERED** | `space.3xs`…`space.3xl`, 9 steps, `.125rem`–`5.5rem` depending on theme — sufficient for menu padding/gaps. |
| Typography (sizes/weights) | **COVERED** | `fontSize.xs`…`3xl` (7 steps) and `fontWeight.regular/medium/bold/heading` (4 steps) — enough to differentiate title vs. nav item vs. description. |
| Z-index / elevation scale | **GAP** | See Gap 2 below — no z-index token category exists at all, in schema or compiled CSS. Shadow (elevation-as-depth) exists but is a different axis and is itself inconsistent across themes (see §3). |
| Motion: durations/easings | **COVERED, with a value note** | `duration.fast/normal/slow` and `easing.standard/entrance/exit` exist per theme. Note: `duration.slow` ranges **0.18s (arcade) – 0.38s (cascade)** across themes — all well under the menu's current hardcoded `0.75s`. Not a gap (the token exists and is themeable), but Phase 2 should decide deliberately whether to consume it live (and accept per-theme duration changes) or keep the `--rmm-motion-duration` fallback pattern to preserve `0.75s` everywhere. |
| Breakpoints | **GAP** | See Gap 3 below — values exist in the compiled CSS as inert custom properties but are not exported from the public package entry (`src/index.ts`), and CSS custom properties cannot drive `@media` anyway. |
| Focus ring | **COVERED, with a naming caveat** | `color.focus` + `borderWidth.thick` compose into a real `:focus-visible` outline in both `Link.css.ts:20-23` and `Button.css.ts:33-36`, and it passes ≥3:1 contrast against both `background` and `surface` in all four themes (computed, see §3). There is **no single `--topiary-focus-ring` shorthand token** — the migration plan's Phase 2 draft names one that doesn't exist; a consumer must compose `var(--topiary-borderWidth-thick) solid var(--topiary-color-focus)` from two primitives instead of one fallback-able value. |
| Shadows/borders for the mega panel | **GAP** | See Gap 5 below — Topiary's own contrast test enforces no real floor on border-vs-surface contrast, and one theme (`broadsheet`) ships zero shadow at every level. |

---

## 3. Theme robustness findings (rendered mockup + computed WCAG contrast)

Method: a static HTML page styled only with `dist/style.css` custom properties
(fixed top bar + a mega panel with two links and a description, mirroring the
menu's real DOM shape), rendered under `data-theme="hangar|broadsheet|arcade|cascade"`
and screenshotted at 900px width. Contrast ratios computed with the standard
WCAG relative-luminance formula against the literal hex values in
`dist/style.css`.

| Theme | Text/link/focus contrast | Panel border vs. surface | Panel shadow | Verdict |
|---|---|---|---|---|
| **hangar** (default) | Pass AA comfortably: text 19.79:1, link (primary) 5.18:1, focus 5.93:1, all vs. surface | **1.49:1** — far under the 3:1 floor for a UI boundary (WCAG 1.4.11) | `shadow-md: 0px 1px 2px 0px #0a0a0b24` (~14% alpha, 2px blur) — present but subtle | **Flag.** In the rendered mockup the panel edge is barely perceptible; it's readable only because the page background (`#fafaf9`) is very slightly darker than the panel surface (`#fff`) plus the faint shadow. A theme this subtle is the **default**, i.e. what most consumers see out of the box. |
| **broadsheet** | Pass AA comfortably: text 17.49:1, link 9.37:1, focus 9.37:1 | 17.49:1 (near-black `#1c1917` border) — no issue | `shadow-sm/md/lg: none` at every level — **zero** shadow | **Flag (different axis).** The panel gets no elevation shadow in this theme at all; it happens to be fine here because the border is dark enough to define the edge on its own — but any `--rmm-panel-shadow` rule that assumes a shadow always renders something will silently no-op under `broadsheet`. |
| **arcade** | Pass AA comfortably: text 21:1, link 4.89:1, focus 7.10:1 | 21:1 (pure black) | `shadow-lg: 8px 8px 0px 0px #000` — hard offset, very visible | **No issue found.** Radius is `0` everywhere (fully square, consistent with the neo-brutalist design); doesn't harm a mega panel. |
| **cascade** | Pass AA comfortably: text 17.85:1, link 6.29:1, focus 6.29:1 | **1.23:1** — the lowest of all four themes, essentially invisible | `shadow-md: 0px 6px 16px -2px #0f172a1f` — soft, clearly visible in the rendering | **No functional break**, but the border cannot be relied on as a fallback edge indicator here; the panel's legibility depends entirely on the shadow rendering, which it does. |

All four themes pass AA (≥4.5:1) for body text, muted text, and link/focus
colors against both `background` and `surface` — text-level accessibility is
solid across themes. The finding is specifically about **non-text panel
boundary definition** (border contrast), which Topiary's own test suite does
not enforce (see Gap 5) and which is measurably weak in the default theme.

---

## 4. Gaps (evidence-backed, one Topiary issue each — filed 2026-09-02 as [topiary#151–#157](https://github.com/jasonrundell/topiary/issues))

### Gap 1 — `className`/`style` props replace the component's own styling instead of merging ([topiary#151](https://github.com/jasonrundell/topiary/issues/151))

**What the menu needs:** every markup element carries a stable `rmm__*` class
(per the migration plan's Decision 4/6) that must *coexist* with whatever
class a Topiary atom applies internally, so the shipped `style.css` can select
`.rmm__nav-item-link` regardless of what Topiary itself renders.

**What Topiary does today:** every audited component builds its own class (or
inline `style`, for `Row`/`Grid`) as an object/JSX property, then spreads
`...props` *after* it. Since JSX/object literal duplicate keys resolve to
"last wins," a consumer-supplied `className` (or `style`) does not append —
it **completely replaces** the component's own class, dropping all of that
component's styling (color, hover, `:focus-visible` outline, everything).

**Evidence:**
- `src/components/Link/Link.tsx:24-32` —
  ```tsx
  return (
    <a
      className={link}
      href={href}
      ...
      {...props}
    >
  ```
- `src/components/Heading/Heading.tsx:15-20` — `createElement('h'+level, { className: heading({level}), id, ...props }, children)`
- `src/components/Button/Button.tsx:29-30` — `<button type="button" className={button({primary, size})} {...props}>`
- `src/components/Box/Box.tsx:23-24`, `src/components/Container/Container.tsx:11-12`, `src/components/Grid/Grid.tsx:39-53` — identical pattern.
- `src/components/Row/Row.tsx:29-41` — same pattern, but for the `style` attribute (Row assigns its `justify`/`align`/`gap` as inline CSS custom properties via `assignInlineVars`, then spreads `...props` after — a consumer's own `style` prop would wipe those out too).
- **Empirically confirmed** (throwaway Vitest spec, deleted after the run):
  `render(<Link href="/x" label="hi" className="consumer-class" />)` → the
  rendered `<a>`'s `className` is **exactly** `"consumer-class"` — the
  component's own generated class (`Link_link__...`) is gone entirely, not
  appended to. Same result for `Heading` and `Button`.

**Proposed fix:** merge, don't replace, in every component: e.g.
`className={[componentClass, props.className].filter(Boolean).join(' ')}`
(and the equivalent object-merge for `Row`/`Grid`'s `style`), ideally
via one shared helper exported from `src/lib` so all components use it
consistently.

---

### Gap 2 — no `zIndex` token category ([topiary#152](https://github.com/jasonrundell/topiary/issues/152))

**What the menu needs:** a stacking-order scale. The menu currently hardcodes
`z-index: 9000` for the fixed shell and needs it (and likely a second value
for the mega panel above the nav) to survive the move to tokens.

**What Topiary does today:** `TokenShape` (`src/lib/schema.ts:15-155`) has no
`zIndex` key at all — color, space, radius, borderWidth, borderStyle, shadow,
font, fontSize, fontWeight, lineHeight, letterSpacing, duration, easing,
breakpoint, layout — and nothing else. Confirmed absent from the actual build:
`grep -n "z-index\|--topiary-z" dist/style.css` returns zero matches. The
migration plan's own Phase 2 draft (`docs/refactor/topiary-migration.md:129`)
provisionally names `--topiary-z-nav` as a fallback source — that token does
not exist.

**Proposed fix:** add a `zIndex` category to `TokenShape` (e.g.
`base`/`overlay`/`nav`/`modal`) and to all four theme JSON files.

---

### Gap 3 — breakpoints are compiled but not part of the public API, and don't fully cover the menu's tiers ([topiary#153](https://github.com/jasonrundell/topiary/issues/153))

**What the menu needs:** breakpoint values usable at the *consumer's own
build time*, because (per the plan's own Risks section) CSS custom properties
cannot drive `@media` queries — the menu's stylesheet must hardcode its
breakpoints, and ideally hardcode them *from the same source* Topiary uses so
the two don't drift.

**What Topiary does today:** `breakpoint.sm/md/lg` values (`30rem`/`48rem`/`64rem`)
are real and identical across all four themes (confirmed in
`dist/style.css`: `--topiary-breakpoint-sm:30rem` etc. appear in every
`[data-theme=...]` block). But `src/lib/theme.css.ts:62-66` only turns them
into a `media` object (`{ sm: '(min-width: 30rem)', ... }`) for **vanilla-extract's own internal use** — and `src/index.ts:1-10` exports only the ten
components, not `vars`, `media`, `THEME_NAMES`, `DEFAULT_THEME`, or `ThemeName`.
There is no public import path to these values in any form a consumer's own
build could read. Separately, react-mega-menu's own
`src/config/breakpoints.js` has **four** tiers (`small:23rem`,
`medium:48rem`, `large:64rem`, `xlarge:75rem`); Topiary's `md`/`lg` happen to
equal the menu's `medium`/`large` exactly (`48rem`, `64rem` — the value that
matters most, since it's what drives the hamburger/desktop-nav switch), but
Topiary has no analog of the menu's `small` or `xlarge` tiers, and its three
breakpoints are not themeable (identical in `hangar`/`broadsheet`/`arcade`/`cascade`).

**Proposed fix:** re-export the breakpoint values as plain literal strings
from the package's public entry (or a `@jasonrundell/topiary/tokens`
subpath) so a consumer can read them at its own build time, e.g.
`export { media, THEME_NAMES, DEFAULT_THEME } from './lib/theme.css'` plus a
non-vanilla-extract-coupled `export const breakpoints = { sm: '30rem', ... }`.

---

### Gap 4 — no hover/alt-surface color token (link/nav-item hover has nowhere to bind) ([topiary#154](https://github.com/jasonrundell/topiary/issues/154))

**What the menu needs:** the migration plan's own Phase 2 draft
(`docs/refactor/topiary-migration.md:133`) specifies
`--rmm-link-hover-bg: var(--topiary-color-surface-alt, #f0f0f0)` — a
hover-state background for nav items.

**What Topiary does today:** no such token exists. `TokenShape.color`
(`src/lib/schema.ts:16-42`) has `background`, `surface`, `text`, `textMuted`,
`border`, `primary`, `onPrimary`, `accent`, `onAccent`, `focus`, `success`,
`warning`, `error`, `onError` — no `surfaceAlt`/`surfaceHover`/anything
analogous. `Link.css.ts:17-19`'s own `:hover` rule only changes
`textDecorationThickness`, not any color — because there's no token to change
it to. Confirmed absent from compiled output (`grep -i surfacealt
dist/style.css` — zero matches).

**Proposed fix:** add `color.surfaceAlt` (or `surfaceHover`) to the schema
and all four theme JSON files; use it in `Link`/`Button` hover states for
consistency with what the plan already assumes exists.

---

### Gap 5 — panel border contrast is unenforced and measurably weak in two of four themes; shadow is entirely absent in one ([topiary#155](https://github.com/jasonrundell/topiary/issues/155))

**What the menu needs:** a mega panel that reads as a distinct, elevated
surface above the page in every theme (checklist item 0.2: "Shadows/borders
for the mega panel across all four themes").

**What Topiary does today:** its own accessibility test suite
(`src/lib/contrast.test.ts`) enforces WCAG AA/AA-large on almost every
foreground/background pairing components render — **except** border-vs-surface,
which is checked but given `minRatio: 1` (i.e., no real floor; any two
distinguishable colors pass):

```ts
// src/lib/contrast.ts:160-165
{
  foreground: 'border',
  background: 'surface',
  where: 'a card outline',
  minRatio: 1
}
```

Measured from the real shipped values (`dist/style.css`): `hangar` border
`#d6d3d1` on surface `#fff` = **1.49:1**; `cascade` border `#e2e8f0` on `#fff`
= **1.23:1** — both far under the 3:1 WCAG 1.4.11 floor for a UI-component
boundary, and both confirmed visually faint in the rendered mockup (§3).
Separately, `broadsheet`'s shadow tokens are all `none`
(`--topiary-shadow-sm/-md/-lg: none`, `dist/style.css` lines corresponding to
the `[data-theme=broadsheet]` block) — a theme can ship with **zero**
elevation shadow, so any menu stylesheet rule that assumes `--rmm-panel-shadow`
always paints something is wrong for that theme.

**Proposed fix:** raise `minRatio` for the `border`/`surface` pair to 3 in
`contrast.ts` (making it a real, enforced floor per WCAG 1.4.11) and adjust
`hangar`'s and `cascade`'s `color.border` values to comply; treat "the panel
has a discernible edge" as a themed guarantee (either real shadow or ≥3:1
border) rather than leaving it to chance per theme.

---

### Gap 6 — component TS prop types don't declare the props that actually forward at runtime ([topiary#156](https://github.com/jasonrundell/topiary/issues/156))

**What the menu needs:** to pass `id`, `className`, `aria-*`, `data-*`, and
`ref` to `Link`/`Heading`/`Button` — all of which the audit confirmed **do**
forward correctly at runtime via each component's `...props` spread (verified
empirically: `aria-haspopup`/`aria-controls`/`data-testid` all land on the
rendered `<a>`; a `ref` passed to `Link` under React 19 resolves to the real
`<a>` DOM node with no `forwardRef` needed, since React 19 treats `ref` as an
ordinary prop for function components).

**What Topiary does today:** none of `LinkProps`, `HeadingProps`,
`ButtonProps` extend the corresponding DOM attributes interface
(`React.AnchorHTMLAttributes<HTMLAnchorElement>`, etc.) or declare an index
signature, so TypeScript rejects these props at the call site even though
they work fine in plain JS. Confirmed with a throwaway `tsc` check (deleted
after the run) against the real shipped sources:

```
src/ts-audit-check.tsx(12,5): error TS2322: Type '{ ...; id: string; className: string; "aria-haspopup": string; ...; ref: RefObject<...> }' is not assignable to type 'IntrinsicAttributes & LinkProps'.
  Property 'id' does not exist on type 'IntrinsicAttributes & LinkProps'.
src/ts-audit-check.tsx(21,52): error TS2322: ... Property 'className' does not exist on type 'IntrinsicAttributes & HeadingProps'.
```

Evidence for the interfaces themselves: `src/components/Link/Link.tsx:3-14`,
`src/components/Heading/Heading.tsx:6-13`, `src/components/Button/Button.tsx:3-12`.

**Severity note:** `react-mega-menu` itself is currently plain JSX with
PropTypes (not `checkJs`-enabled TypeScript), so this doesn't block the menu's
own build today — but it blocks any TypeScript consumer of Topiary directly,
and would block a future TS migration of the menu.

**Proposed fix:** extend each `*Props` interface from the matching
`React.*HTMLAttributes<Element>` type (compatible with React 19's ref-as-prop
model) instead of hand-listing a subset of DOM attributes.

---

### Gap 7 — `Link` and `Button` only accept a single string (`label`), not `children` ([topiary#157](https://github.com/jasonrundell/topiary/issues/157))

**What the menu needs:** `MainNavItemLink` (`react-mega-menu`
`src/components/MainNavItemLink.jsx:46-53`) renders its label text *plus* a
conditional trailing `<span className="rmm__main-nav-item-link--icon">`
(the mega-panel chevron) inside the same `<a>`, when `item.type === 'mega'`.
`Hamburger` (`react-mega-menu` `src/components/Hamburger.jsx:87-103`) renders
a slice-container `<div>` wrapping four `<span class="rmm__hamburger--slice">`
elements, plus an optional text label, inside the `<button>`.

**What Topiary does today:** `LinkProps` (`src/components/Link/Link.tsx:3-14`)
and `ButtonProps` (`src/components/Button/Button.tsx:3-12`) both take only a
`label: string`, and both components render `{label}` as their sole child
(`Link.tsx:33`, `Button.tsx:32`) — there is no `children` prop on either.
(By contrast, `Heading`, `Box`, `Row`, `Container` all declare
`children: ReactNode` and render it.) This is fine for `NavItemLink`, which
in current usage (`react-mega-menu` `src/helpers/menu.jsx:70-78, 138-153`)
only ever passes a plain string as children — but it rules out `Link` for
`MainNavItemLink` and rules out `Button` for `Hamburger`, structurally, until
fixed.

**Proposed fix:** add an optional `children`/`icon` slot to both `Link` and
`Button` (rendered alongside `label`, or as an alternative to it), so callers
that need composed content aren't forced back to plain HTML.

---

## 5. Unverified items (honesty section)

- **Keyboard/focus behavior inside a real browser** (as opposed to
  `:focus-visible` CSS and jsdom-rendered attribute checks) was not tested —
  no full keyboard walkthrough (Tab order, Enter/Space, Escape) was run
  against Topiary components in a real browser event loop. The audit checked
  that `Link`/`Button` are `getByRole`-reachable and call `onClick`/`onKeyDown`
  handlers passed to them (per Topiary's own `Link.test.tsx`/`Button.test.tsx`,
  which the audit read but did not need to re-run), which is sufficient
  evidence for prop-forwarding correctness but not a substitute for Phase 5's
  planned manual keyboard walkthrough of the actual assembled menu.
- **`ref` forwarding was verified only for `Link`**, not `Heading` or `Button`
  individually — both share the identical `{...props}` spread pattern with no
  destructuring of `ref`, so the same React-19 behavior almost certainly
  applies, but this is inference from identical code shape, not a second
  empirical run.
- **`aria-*`/`data-*` runtime forwarding was verified only for `Link`**
  (empirically) — `Heading` and `Button` were confirmed only by reading the
  identical spread pattern, not by a dedicated render-and-inspect test.
- **Mobile-viewport rendering of the theme mockup** was not captured — the
  screenshot in §3 is at 900px desktop width only. The audit's contrast
  computations (which don't depend on viewport) are the primary evidence for
  §3's findings; the mockup is corroborating, not the sole source.
- **`layout.cardAreas`/`cardColumns` tokens** (used by `Card`) and the `Card`,
  `Spacer`, `Blockquote`, `Grid` components generally were read only far
  enough to confirm they are not better `TopBar` candidates than `Row`/`Box`;
  they were not audited to full Gap-report depth since the plan doesn't
  propose adopting them.
- **No visual regression / cross-browser check** was performed; the rendered
  mockup used one browser engine (the Claude Code browser pane) at one
  zoom level.
