import { breakpoints as BreakPoints } from '../config/breakpoints'

// Root font-size assumption for converting the "large" breakpoint's rem
// value into a raw pixel number, for environments that don't implement
// window.matchMedia (e.g. jsdom in tests). 16px is the universal browser
// default and was already implicit in the pre-migration hardcoded
// `viewportLarge = 1024` (1024 / 16 = 64, matching breakpoints.large's
// 64rem exactly) — this just derives that same number from
// src/config/breakpoints.js instead of hardcoding it a second time.
const ROOT_FONT_SIZE_PX = 16

// The media query string used for both the matchMedia check below and (via
// src/config/breakpoints.js, its shared source) the __RMM_BP_LARGE__
// placeholder substitution in src/styles/style.css at build time — see
// vite.config.js.
export const largeBreakpointQuery = `(min-width: ${BreakPoints.large['min-width']})`

// Kept as a plain pixel number: some consumers may still import it, and it
// is the fallback comparison used by isLargeViewport() where
// window.matchMedia isn't available.
export const viewportLarge =
  parseFloat(BreakPoints.large['min-width']) * ROOT_FONT_SIZE_PX

/**
 * True when the viewport is at or above the "large" breakpoint. Prefers a
 * real matchMedia check (this also tracks browser zoom/user stylesheets the
 * way a raw innerWidth comparison can't); falls back to comparing
 * window.innerWidth against the pixel-equivalent breakpoint in
 * environments without window.matchMedia (e.g. jsdom in tests).
 */
export const isLargeViewport = () => {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function'
  ) {
    return window.matchMedia(largeBreakpointQuery).matches
  }
  return typeof window !== 'undefined' && window.innerWidth >= viewportLarge
}
