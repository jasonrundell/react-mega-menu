import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const MainNavItemLink = ({
  id,
  role,
  href,
  isBack,
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
    'rmm__main-nav-item-link',
    isBack && 'rmm__main-nav-item-link--back',
    isForward && 'rmm__main-nav-item-link--forward',
    isActive && 'rmm__main-nav-item-link--active',
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

MainNavItemLink.defaultProps = {
  role: 'menuitem',
  isBack: false,
  isForward: false,
  isActive: false
}

MainNavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  href: PropTypes.string.isRequired,
  isBack: PropTypes.bool,
  isForward: PropTypes.bool,
  isActive: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaHaspopup: PropTypes.string,
  ariaControls: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default MainNavItemLink
