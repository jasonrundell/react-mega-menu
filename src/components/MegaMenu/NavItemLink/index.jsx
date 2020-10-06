import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../../utils/css'

// CSS
import styles from './index.module.scss'

const NavItemLink = ({
  id,
  role,
  href,
  isBack,
  className,
  onClick,
  onKeyDown,
  ariaHaspopup,
  ariaControls,
  children,
}) => {
  const rootClasses = classNames(
    styles.root,
    isBack && styles['back'],
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
}

NavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  href: PropTypes.string.isRequired,
  isBack: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaHaspopup: PropTypes.string,
  ariaControls: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default NavItemLink
