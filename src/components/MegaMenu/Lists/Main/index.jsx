import React from 'react'
import PropTypes from 'prop-types'

// CSS
import styles from './index.module.scss'

const MainList = ({ children, ariaLabel, id }) => {
  return (
    <ul
      role="menubar"
      aria-label={ariaLabel}
      className={styles['root']}
      id={id}
    >
      {children}
    </ul>
  )
}

MainList.defaultProps = {
  ariaLabel: 'Main menu',
}

MainList.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default MainList
