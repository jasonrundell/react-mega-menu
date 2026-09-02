import React from 'react'
import PropTypes from 'prop-types'

const NavItemDescription = ({ children, ...props }) => (
  <p {...props}>{children}</p>
)

NavItemDescription.propTypes = {
  children: PropTypes.node.isRequired
}

export default NavItemDescription
