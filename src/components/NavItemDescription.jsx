import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledItemDescription = styled.p`
  font-size: 0.75rem;
  margin-bottom: 1rem;
`

const NavItemDescription = ({ children, ...props }) => (
  <StyledItemDescription {...props}>{children}</StyledItemDescription>
)

NavItemDescription.propTypes = {
  children: PropTypes.node.isRequired
}

export default NavItemDescription
