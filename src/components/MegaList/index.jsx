import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

// CSS
import styles from './index.module.scss'

const MegaList = ({ children, activeState, id }) => {
  const rootClasses = classNames(
    styles['root'],
    activeState && styles[activeState]
  )
  return (
    <ul role="menu" className={rootClasses} id={id} aria-labelledby={id}>
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
