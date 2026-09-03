import React from 'react'
import PropTypes from 'prop-types'

const MainList = ({ id, ariaLabel = 'Main menu', children, ...props }) => (
  <ul id={id} role="menubar" aria-label={ariaLabel} {...props}>
    {children}
  </ul>
)

MainList.propTypes = {
  /**
   * The id of the main list.
   */
  id: PropTypes.string.isRequired,
  /**
   * The aria-label of the main list.
   */
  ariaLabel: PropTypes.string.isRequired,
  /**
   * The children of the main list.
   */
  children: PropTypes.node.isRequired
}

export default MainList
