import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const TopBarTitle = ({ id, className, children }) => {
  const rootClasses = classNames('rmm__top-bar-title', className && className)

  return (
    <h1 id={id} className={rootClasses}>
      {children}
    </h1>
  )
}

TopBarTitle.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default TopBarTitle
