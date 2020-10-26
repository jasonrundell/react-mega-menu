import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

// CSS
import styles from './index.module.scss'

const TopBar = ({ id, className, children }) => {
  const rootClasses = classNames(styles['root'], className && className)

  return (
    <div id={id} className={rootClasses}>
      {children}
    </div>
  )
}

TopBar.defaultProps = {
  id: 'top',
}

TopBar.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default TopBar
