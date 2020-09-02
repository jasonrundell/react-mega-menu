import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../../../utils/css'

// CSS
import styles from './index.module.scss'

const ReturnItem = ({ children, isHeading, id }) => {
  const rootClasses = classNames(styles.root, isHeading && styles[isHeading])

  return (
    <li role="none" id={id} className={rootClasses}>
      {children}
    </li>
  )
}

ReturnItem.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ReturnItem
