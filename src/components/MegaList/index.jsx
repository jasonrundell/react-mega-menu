import React from 'react'
import PropTypes from 'prop-types'

// CSS
import styles from './index.module.scss'

const MegaList = ({ children, activeState, id }) => {
  return (
    <ul
      role="menu"
      className={`${styles['root']} ${styles['sub']} ${styles['mega']} ${styles['dropdown']} ${styles[activeState]}`}
      id={id}
      aria-labelledby={id}
    >
      {children}
    </ul>
  )
}

MegaList.propTypes = {
  children: PropTypes.node.isRequired,
  activeState: PropTypes.oneOf(['open', 'closed']).isRequired,
  id: PropTypes.string.isRequired,
}

export default MegaList
