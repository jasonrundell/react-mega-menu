import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const NavItemDescription = ({ children, ...props }) => {
  const StyledItemDescription = styled.p`
    color: #000;
    font-size: 0.75rem;
    margin-bottom: 1rem;
  `
  return <StyledItemDescription {...props}>{children}</StyledItemDescription>
}

NavItemDescription.propTypes = {
  children: PropTypes.node.isRequired
}

export default NavItemDescription
