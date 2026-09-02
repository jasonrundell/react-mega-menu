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
  '--rmm-menu-bg',
  '--rmm-menu-text',
  '--rmm-menu-z',
  '--rmm-menu-height',
  '--rmm-menu-height-large',
  '--rmm-link-color',
  '--rmm-link-hover-bg',
  '--rmm-focus-ring',
  '--rmm-panel-border',
  '--rmm-panel-shadow',
  '--rmm-motion-duration'
]

export default rmmTokens
