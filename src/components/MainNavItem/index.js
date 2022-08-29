import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const MainNavItem = ({
  id,
  role,
  isHeading,
  isChildren,
  isForward,
  className,
  children
}) => {
  const rootClasses = classNames(
    'rmm__main-nav-item',
    isHeading && 'rmm__main-nav-item--heading',
    isChildren && 'rmm__main-nav-item--children',
    isForward && 'rmm__main-nav-item--forward',
    className && className
  )
  return (
    <li id={id} role={role} className={rootClasses}>
      {children}
    </li>
  )
}

MainNavItem.defaultProps = {
  role: 'none',
  isHeading: false,
  hasChildren: false,
  isForward: false
}

MainNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  isHeading: PropTypes.bool,
  isChildren: PropTypes.bool,
  isForward: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default MainNavItem
