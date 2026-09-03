/**
 * The four Topiary themes this package's stylesheet is built against (see
 * src/styles/style.css in the package root — every --rmm-* token there
 * falls back to var(--topiary-*, ...)). Shared between page.js (server —
 * validates the `?theme=` search param) and SiteShell.js (client — renders
 * the theme buttons), so the two never drift.
 */
export const TOPIARY_THEMES = ['hangar', 'broadsheet', 'arcade', 'cascade']

export const DEFAULT_TOPIARY_THEME = 'hangar'

export function isTopiaryTheme(value) {
  return typeof value === 'string' && TOPIARY_THEMES.includes(value)
}
