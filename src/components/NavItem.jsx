import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'

const StyledNavItem = styled.li`
  list-style: none;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 1rem;
  margin-left: 0;

  ${respondTo('large')} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: auto;
    margin-top: 0;
    margin-bottom: 0;
  }
`

const NavItem = ({ id, role = 'none', children, ...props }) => (
  <StyledNavItem id={id} role={role} {...props}>
    {children}
  </StyledNavItem>
)

NavItem.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default NavItem
