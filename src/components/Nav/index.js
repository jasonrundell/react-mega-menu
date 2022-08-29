import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const Nav = ({ id, ariaLabel, activeState, children }) => {
  const rootClasses = classNames(
    'rmm__nav',
    activeState && `rmm__nav--${activeState}`
  )

  return (
    <nav id={id} className={rootClasses} aria-label={ariaLabel}>
      {children}
    </nav>
  )
}

Nav.defaultProps = {
  ariaLabel: 'Main Navigation',
  activeState: ''
}

Nav.propTypes = {
  id: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  activeState: PropTypes.oneOf(['', 'open', 'closed']).isRequired,
  children: PropTypes.node.isRequired
}

export default Nav
