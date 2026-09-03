import React from 'react'
import PropTypes from 'prop-types'
import { classNames, stateClass } from '../helpers/classNames'

/**
 * At mobile width the closed nav is only moved off-screen with a transform,
 * so its links would otherwise stay in the tab order. Marking it `inert`
 * removes the whole subtree from keyboard focus and the accessibility tree.
 * At desktop width the nav is the always-visible horizontal bar (only the
 * closed mega panels are `display: none`), so `inert` must never apply there.
 */
export const isNavInert = (isMobile, activeState) =>
  Boolean(isMobile) && activeState === 'closed'

const Nav = ({
  id,
  ariaLabel = 'Main Navigation',
  activeState = 'closed',
  slideDirection = 'left',
  isMobile = false,
  className,
  children,
  ...props
}) => (
  <nav
    id={id}
    aria-label={ariaLabel}
    role="navigation"
    // React 19 treats `inert` as a boolean attribute: true renders `inert=""`.
    inert={isNavInert(isMobile, activeState) || undefined}
    className={classNames(
      'rmm__nav',
      stateClass('rmm__nav', activeState),
      slideDirection === 'right'
        ? 'rmm__nav--slide-right'
        : 'rmm__nav--slide-left',
      className
    )}
    {...props}
  >
    {children}
  </nav>
)

Nav.propTypes = {
  /**
   * The id of the element.
   */
  id: PropTypes.string.isRequired,
  /**
   * The aria-label of the element.
   */
  ariaLabel: PropTypes.string,
  /**
   * The state of the mega list.
   */
  activeState: PropTypes.oneOf(['', 'open', 'closed']),
  /**
   * Which side the off-canvas nav slides in from on mobile widths.
   */
  slideDirection: PropTypes.oneOf(['left', 'right']),
  /**
   * Whether the viewport is below the `large` breakpoint. When true and the
   * nav is closed, the nav is rendered `inert` so its off-screen content is
   * removed from the tab order.
   */
  isMobile: PropTypes.bool,
  /**
   * Additional class name(s) to append.
   */
  className: PropTypes.string,
  /**
   * The content of the mega list.
   */
  children: PropTypes.node.isRequired
}

export default Nav
