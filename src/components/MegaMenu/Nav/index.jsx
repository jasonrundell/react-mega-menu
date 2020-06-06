import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../../utils/css'

// CSS
import styles from './index.module.scss'

const Nav = ({ children, ariaLabel, activeState }) => {
  const rootClasses = classNames(
    styles.root,
    activeState && styles[activeState]
  )

  return (
    <nav className={rootClasses} aria-label={ariaLabel}>
      {children}
    </nav>
  )
}

Nav.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Nav
