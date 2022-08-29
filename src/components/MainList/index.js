import React from 'react'
import PropTypes from 'prop-types'

const MainList = ({ id, children, ariaLabel }) => {
  return (
    <ul
      id={id}
      role="menubar"
      aria-label={ariaLabel}
      className="rmm__main-list"
    >
      {children}
    </ul>
  )
}

MainList.defaultProps = {
  ariaLabel: 'Main menu'
}

MainList.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired
}

export default MainList
