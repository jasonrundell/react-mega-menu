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

const StyledNav = styled.nav`
  position: absolute;
  top: 8rem;
  left: -100%;
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-top: 0.0625rem solid grey;
  padding: 1rem;
  border-right: 0.25rem solid #000;
  overflow-y: scroll;

  ${respondTo('large')} {
    top: 4rem;
    left: 0;
    border-top: none;
    height: 4rem;
    flex-direction: row;
    border-right: none;
    border-bottom: 0.0625rem solid #000;
    overflow-y: initial;
  }

  ${({ activeState }) =>
    activeState === 'open' &&
    `
    @media (prefers-reduced-motion: reduce) {
      transform: translate3d(100%, 0, 0);
    }

    ${respondTo('large')} {
      animation: none;
      display: flex;
      opacity: 1;

      @media (prefers-reduced-motion: reduce) {
        transform: none;
      }
    }
  `}

  ${({ activeState }) =>
    activeState === 'closed' &&
    `
    @media (prefers-reduced-motion: reduce) {
      transform: translate3d(-100%, 0, 0);
    }

    ${respondTo('large')} {
      animation: none;
      display: none;
      opacity: 0;

      @media (prefers-reduced-motion: reduce) {
        transform: none;
      }
    }
  `}

  li:first-child {
    ${respondTo('large')} {
      margin-left: 0;
    }
  }
`

const Nav = ({ id, ariaLabel, activeState, children, ...props }) => {
  return (
    <StyledNav
      id={id}
      activeState={activeState}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </StyledNav>
  )
}

Nav.defaultProps = {
  ariaLabel: 'Main Navigation',
  activeState: ''
}

Nav.propTypes = {
  id: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  activeState: PropTypes.oneOf(['', 'open', 'closed']).isRequired,
  children: PropTypes.node.isRequired
}

export default Nav
