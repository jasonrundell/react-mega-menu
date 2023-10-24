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

const StyledMegaList = styled.ul`
  position: absolute;
  z-index: 2;
  top: 0;
  left: -100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  width: 100%;
  height: calc(100vh - 4rem);
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  border-right: 0.25rem solid #999;
  background-color: #fff;

  ${respondTo('large')} {
    position: absolute;
    left: 0;
    top: 4rem;
    display: flex;
    flex-direction: row;
    flex-direction: row;
    width: 100%;
    height: auto;
    opacity: 0;
    border-top: none;
    border-right: 0.25rem solid #666;
    border-bottom: 0.25rem solid #333;
    border-left: 0.25rem solid #666;
  }

  ${({ activeState }) =>
    activeState === 'open' &&
    `
    animation-duration: 0.75s;
    animation-fill-mode: both;
    animation-name: slideOpen;
    animation-iteration-count: 1;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
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
      display: none;
      opacity: 0;
      @media (prefers-reduced-motion: reduce) {
        transform: none;
      }
    }
  `}
`

const MegaList = ({ id, activeState, children, ...props }) => (
  <StyledMegaList
    activeState={activeState}
    role="menu"
    id={id}
    aria-labelledby={id}
    {...props}
  >
    {children}
  </StyledMegaList>
)

MegaList.defaultProps = {
  activeState: 'closed'
}

MegaList.propTypes = {
  /**
   * The id of the element that labels the mega list.
   */
  id: PropTypes.string.isRequired,
  /**
   * The state of the mega list.
   */
  activeState: PropTypes.oneOf(['open', 'closed']).isRequired,
  /**
   * The content of the mega list.
   */
  children: PropTypes.node.isRequired
}

export default MegaList
