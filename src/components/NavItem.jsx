import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { breakpoints as BreakPoints } from '../config/styles'

const respondTo = (breakpoint) => {
  const breakpoints = {
    large: `@media (min-width: ${BreakPoints.large['min-width']})`
  }
  return breakpoints[breakpoint] || null
}

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
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ${({ isHeading }) =>
    isHeading &&
    `
    ${respondTo('large')} {
      display: none;
    }
  `}

  ${({ isForward }) =>
    isForward &&
    `
    ${respondTo('large')} {
      margin-right: 1rem;
    }

    &::after {
      content: url('../../images/icons/angle-right.svg');
      position: absolute;
      right: 2rem;
      bottom: -30%;
      width: 1rem;
      height: 2rem;
  
      ${respondTo('large')} {
        content: url('../../images/icons/angle-up.svg');
        top: 1.25rem;
        right: -1.5rem;
        width: 1rem;
      }
    }
  `}
`

const NavItem = ({ id, role, isHeading, isForward, children, ...props }) => (
  <StyledNavItem
    isHeading={isHeading}
    isForward={isForward}
    id={id}
    role={role}
    {...props}
  >
    {children}
  </StyledNavItem>
)

NavItem.defaultProps = {
  role: 'none',
  isHeading: false,
  hasChildren: false,
  isForward: false
}

NavItem.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  isHeading: PropTypes.bool,
  isForward: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default NavItem
