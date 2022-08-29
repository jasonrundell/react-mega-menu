import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const NavItem = ({ id, role, isHeading, isForward, className, children }) => {
  const rootClasses = classNames(
    'rmm__nav-item',
    isHeading && 'rmm__nav-item--heading',
    isForward && 'rmm__nav-item--forward',
    className && className
  )
  return (
    <li id={id} role={role} className={rootClasses}>
      {children}
    </li>
  )
}

NavItem.defaultProps = {
  role: 'none',
  isHeading: false,
  hasChildren: false,
  isForward: false
}

NavItem.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  isHeading: PropTypes.bool,
  isForward: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default NavItem
