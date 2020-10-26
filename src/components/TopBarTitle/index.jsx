import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

// CSS
import styles from './index.module.scss'

const TopBarTitle = ({ id, className, children }) => {
  const rootClasses = classNames(styles['root'], className && className)

  return (
    <h1 id={id} className={rootClasses}>
      {children}
    </h1>
  )
}

TopBarTitle.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default TopBarTitle
