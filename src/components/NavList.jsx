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

const StyledNavList = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  width: 100%;
  height: calc(100vh - 4rem);
  z-index: 1;

  ${respondTo('large')} {
    padding-top: 0;
    flex-direction: row;
    height: 4rem;
  }

  ${({ isSub }) =>
    isSub &&
    `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    z-index: 2;
    border-right: 0.25rem solid #999;
  
    ${respondTo('large')} {
      animation: none;
      display: block;
      position: static;
      top: 0;
      left: 0;
      opacity: 1;
      height: auto;
      padding-left: 0;
    }
  `}

  ${({ isSubSub }) =>
    isSubSub &&
    `
    border-right: 0.25rem solid #ccc;
    ${respondTo('large')} {
      border-right: none;
    }
  `}

  ${({ isDropdown }) =>
    isDropdown &&
    `
    ${respondTo('large')} {
      border-right: 0.25rem solid #666;
      border-bottom: 0.25rem solid #333;
      border-left: 0.25rem solid #666;
    }
  `}

  ${({ activeState }) =>
    activeState === 'open' &&
    `
    animation-duration: 0.75s;
    animation-fill-mode: both;
    animation-name: slideOpen;
    animation-iteration-count: 1;
    @media (prefers-reduced-motion: reduce) {
      transform: translate3d(100%, 0, 0);
    }

    @keyframes slideOpen {
      from {
        transform: translate3d(-100%, 0, 0);
      }
    
      to {
        transform: translate3d(100%, 0, 0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transform: translate3d(100%, 0, 0);
    }

    ${respondTo('large')} {
      animation: none;
      @media (prefers-reduced-motion: reduce) {
        transform: none;
      }
    }
  `}

  ${({ activeState }) =>
    activeState === 'closed' &&
    `
    animation-duration: 0.75s;
    animation-fill-mode: both;
    animation-name: slideClosed;
    animation-iteration-count: 1;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }

    @keyframes slideClosed {
      from {
        transform: translate3d(100%, 0, 0);
      }
    
      to {
        transform: translate3d(-100%, 0, 0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transform: translate3d(-100%, 0, 0);
    }

    ${respondTo('large')} {
      animation: none;
      @media (prefers-reduced-motion: reduce) {
        transform: none;
      }
    }
  `}
`

const NavList = ({
  id,
  role,
  isSub,
  isSubSub,
  isDropdown,
  activeState,
  ariaLabelledby,
  children,
  ...props
}) => (
  <StyledNavList
    id={id}
    role={role}
    aria-labelledby={ariaLabelledby}
    isSub={isSub}
    isSubSub={isSubSub}
    isDropdown={isDropdown}
    activeState={activeState}
    {...props}
  >
    {children}
  </StyledNavList>
)

NavList.defaultProps = {
  role: 'menubar',
  isSub: false,
  isSubSub: false,
  isDropdown: false,
  activeState: ''
}

NavList.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  isSub: PropTypes.bool,
  isSubSub: PropTypes.bool,
  isDropdown: PropTypes.bool,
  activeState: PropTypes.oneOf(['', 'open', 'closed']).isRequired,
  ariaLabelledby: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default NavList
