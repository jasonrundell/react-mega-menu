import React from 'react'
import PropTypes from 'prop-types'

// CSS
import styles from './index.module.scss'

const MainList = ({ id, children, ariaLabel }) => {
  return (
    <ul
      id={id}
      role="menubar"
      aria-label={ariaLabel}
      className={styles['root']}
    >
      {children}
    </ul>
  )
}

MainList.defaultProps = {
  ariaLabel: 'Main menu',
}

MainList.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
}

export default MainList
