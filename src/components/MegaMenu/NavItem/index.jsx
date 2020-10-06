import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../../utils/css'

// CSS
import styles from './index.module.scss'

const NavItem = ({ id, role, isHeading, hasChildren, className, children }) => {
  const rootClasses = classNames(
    styles.root,
    isHeading && styles['heading'],
    hasChildren && styles['has-children'],
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
}

NavItem.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  isHeading: PropTypes.bool,
  hasChildren: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default NavItem
