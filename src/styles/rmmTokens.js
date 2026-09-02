/**
 * Canonical list of the --rmm-* component tokens documented for v3's shipped
 * stylesheet (src/styles/style.css). This is the single place that lists
 * "what tokens are documented" — src/styleContract.test.js reads it so the
 * contract between this list and the actual stylesheet can't drift silently
 * (add/rename a token in one place without the other and the test fails).
 *
 * Values are intentionally not included here: the stylesheet is the only
 * source of truth for a token's fallback value. This module only names the
 * tokens that must exist.
 */

export const rmmTokens = [
  // Color
  '--rmm-menu-bg', // menu shell + panel background
  '--rmm-menu-text', // primary text color
  '--rmm-menu-border', // hairline divider
  '--rmm-panel-bg', // mega/sub panel background
  '--rmm-link-color', // nav item link color
  '--rmm-link-hover-bg', // nav item link :hover/:focus-visible background
  '--rmm-text-muted', // item description text color
  '--rmm-focus-ring', // composed :focus-visible outline (width + style + color)

  // Panel chrome
  '--rmm-panel-border', // composed mega/sub panel border (width + style + color)
  '--rmm-panel-shadow', // mega/sub panel elevation
  '--rmm-panel-radius', // mega/sub panel corner radius

  // Stacking order
  '--rmm-menu-z', // fixed menu shell
  '--rmm-panel-z', // mega/sub panel, above sibling lists
  '--rmm-list-z', // base nav list layer

  // Structural sizing (chrome dimensions; no 1:1 Topiary analog, so these
  // route through the space scale via calc() to stay token-driven while
  // preserving today's exact pixel geometry as the fallback)
  '--rmm-menu-height', // mobile menu shell height
  '--rmm-menu-height-large', // large-breakpoint menu shell height
  '--rmm-topbar-height', // TopBar height
  '--rmm-logo-height', // Logo image height
  '--rmm-hamburger-width', // hamburger slice container width
  '--rmm-hamburger-height', // hamburger slice container height
  '--rmm-hamburger-top', // hamburger fixed top offset
  '--rmm-hamburger-left', // hamburger fixed left offset

  // Generic spacing scale (margins/gaps/padding across components)
  '--rmm-space-xs',
  '--rmm-space-sm',
  '--rmm-space-md',
  '--rmm-space-lg',
  '--rmm-space-xl',

  // Typography
  '--rmm-font-family', // body font stack
  '--rmm-title-font-size', // TopBarTitle
  '--rmm-nav-item-font-size', // nav/mega/sub item link text
  '--rmm-description-font-size', // NavItemDescription
  '--rmm-hamburger-label-font-size', // Hamburger visible label
  '--rmm-font-weight-bold', // Hamburger label weight
  '--rmm-font-weight-regular', // default body weight

  // Motion
  '--rmm-motion-duration', // slide open/close animation duration
  '--rmm-motion-easing', // general transition easing
  '--rmm-hamburger-transition-duration', // hamburger icon morph duration
  '--rmm-hamburger-slice-transition-duration' // individual slice transition
]

export default rmmTokens
