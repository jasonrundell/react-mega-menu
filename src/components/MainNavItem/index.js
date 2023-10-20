import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { breakpoints as BreakPoints } from '../../config/styles'

const respondTo = (breakpoint) => {
  const breakpoints = {
    large: `@media (min-width: ${BreakPoints.large['min-width']})`
  }
  return breakpoints[breakpoint] || null
}

const StyledMainNavItem = styled.li`
  list-style: none;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 1rem;
  margin-left: 0;
  padding: 0;

  ${respondTo('large')} {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 2rem;
    align-items: center;
  }

  ${({ isHeading }) =>
    isHeading &&
    `
    font-weight: 700;
    ${respondTo('large')} {
      display: none;
    }
  `}

  ${({ isChildren }) => isChildren && respondTo('large')}

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

const MainNavItem = ({
  id,
  role,
  isHeading,
  isChildren,
  isForward,
  children,
  ...props
}) => {
  return (
    <StyledMainNavItem
      id={id}
      role={role}
      isHeading={isHeading}
      isChildren={isChildren}
      isForward={isForward}
      {...props}
    >
      {children}
    </StyledMainNavItem>
  )
}

MainNavItem.defaultProps = {
  role: 'none',
  isHeading: false,
  hasChildren: false,
  isForward: false
}

MainNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  isHeading: PropTypes.bool,
  isChildren: PropTypes.bool,
  isForward: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default MainNavItem
