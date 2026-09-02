import React from 'react'
import PropTypes from 'prop-types'

const Nav = ({
  id,
  ariaLabel = 'Main Navigation',
  activeState = 'closed',
  slideDirection = 'left',
  className,
  children,
  ...props
}) => (
  <nav
    id={id}
    aria-label={ariaLabel}
    role="navigation"
    className={[
      'rmm__nav',
      activeState === 'open' ? 'rmm__nav--open' : 'rmm__nav--closed',
      slideDirection === 'right'
        ? 'rmm__nav--slide-right'
        : 'rmm__nav--slide-left',
      className
    ]
      .filter(Boolean)
      .join(' ')}
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
   * Additional class name(s) to append.
   */
  className: PropTypes.string,
  /**
   * The content of the mega list.
   */
  children: PropTypes.node.isRequired
}

export default Nav
