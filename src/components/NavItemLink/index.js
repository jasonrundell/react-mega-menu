import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const NavItemLink = ({
  id,
  role,
  href,
  isBack,
  isHeading,
  isForward,
  isActive,
  className,
  onClick,
  onKeyDown,
  ariaHaspopup,
  ariaControls,
  children
}) => {
  const rootClasses = classNames(
    'rmm__nav-item-link',
    isBack && 'rmm__nav-item-link--back',
    isHeading && 'rmm__nav-item-link--heading',
    isForward && 'rmm__nav-item-link--forward',
    isActive && 'rmm__nav-item-link--active',
    className && className
  )
  return (
    <a
      id={id}
      role={role}
      href={href}
      className={rootClasses}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-haspopup={ariaHaspopup}
      aria-controls={ariaControls}
    >
      {children}
    </a>
  )
}

NavItemLink.defaultProps = {
  role: 'menuitem',
  isBack: false,
  isHeading: false,
  isForward: false,
  isActive: false
}

NavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  href: PropTypes.string.isRequired,
  isBack: PropTypes.bool,
  isHeading: PropTypes.bool,
  isForward: PropTypes.bool,
  isActive: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaHaspopup: PropTypes.string,
  ariaControls: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default NavItemLink
