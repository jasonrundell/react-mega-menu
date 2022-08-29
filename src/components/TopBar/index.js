import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const TopBar = ({ id, className, children }) => {
  const rootClasses = classNames('rmm__top-bar', className && className)

  return (
    <div id={id} className={rootClasses}>
      {children}
    </div>
  )
}

TopBar.defaultProps = {
  id: 'top'
}

TopBar.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default TopBar
