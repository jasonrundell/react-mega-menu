import { breakpoints as BreakPoints } from '../config/breakpoints'

export const respondTo = (breakpoint) => {
  const breakpoints = {
    large: `@media (min-width: ${BreakPoints.large['min-width']})`
  }
  return breakpoints[breakpoint] || null
}

export const viewportLarge = 1024
