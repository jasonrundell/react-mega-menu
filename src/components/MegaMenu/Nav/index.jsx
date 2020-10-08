import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../../utils/css'

// CSS
import styles from './index.module.scss'

const Nav = ({ id, children, ariaLabel, activeState }) => {
  const rootClasses = classNames(
    styles['root'],
    activeState && styles[activeState]
  )

  return (
    <nav id={id} className={rootClasses} aria-label={ariaLabel}>
      {children}
    </nav>
  )
}

Nav.defaultProps = {
  ariaLabel: 'Main Navigation',
  activeState: 'closed',
}

Nav.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  activeState: PropTypes.oneOf(['open', 'closed']).isRequired,
}

export default Nav
