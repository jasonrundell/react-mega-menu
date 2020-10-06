import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../../utils/css'

// CSS
import styles from './index.module.scss'

const NavItemLink = ({ id, role, href, className, children }) => {
  const rootClasses = classNames(styles.root, className && className)
  return (
    <a id={id} role={role} href={href} className={rootClasses}>
      {children}
    </a>
  )
}

NavItemLink.defaultProps = {
  role: 'menuitem',
}

NavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default NavItemLink
