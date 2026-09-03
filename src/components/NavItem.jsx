import React from 'react'
import PropTypes from 'prop-types'

const NavItem = ({ id, role = 'none', children, ...props }) => (
  <li id={id} role={role} {...props}>
    {children}
  </li>
)

NavItem.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default NavItem
