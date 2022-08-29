import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const NavItemDescription = ({ className, children }) => {
  const rootClasses = classNames(
    'rmm__nav-item-description',
    className && className
  )
  return <p className={rootClasses}>{children}</p>
}

NavItemDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default NavItemDescription
