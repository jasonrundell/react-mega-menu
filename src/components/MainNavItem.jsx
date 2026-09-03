import React from 'react'
import PropTypes from 'prop-types'

const MainNavItem = ({ id, role = 'none', children, ...props }) => (
  <li id={id} role={role} {...props}>
    {children}
  </li>
)

MainNavItem.propTypes = {
  /**
   * The id attribute of the list item.
   */
  id: PropTypes.string.isRequired,
  /**
   * The role attribute of the list item.
   */
  role: PropTypes.string,
  /**
   * The content of the list item.
   */
  children: PropTypes.node.isRequired
}

export default MainNavItem
