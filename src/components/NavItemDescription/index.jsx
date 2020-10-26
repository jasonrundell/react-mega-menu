import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

// CSS
import styles from './index.module.scss'

const NavItemDescription = ({ className, children }) => {
  const rootClasses = classNames(styles['root'], className && className)
  return <p className={rootClasses}>{children}</p>
}

NavItemDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default NavItemDescription
