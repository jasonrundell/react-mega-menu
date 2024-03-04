import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'

const StyledNav = styled.nav`
  position: absolute;
  top: 8rem;
  left: -100%;
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  border-top: 0.0625rem solid grey;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
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

  li:first-child {
    ${respondTo('large')} {
      margin-left: 0;
    }
  }
`

const Nav = ({ id, ariaLabel, activeState, children, ...props }) => (
  <StyledNav
    id={id}
    activeState={activeState}
    aria-label={ariaLabel}
    {...props}
  >
    {children}
  </StyledNav>
)

Nav.defaultProps = {
  ariaLabel: 'Main Navigation',
  activeState: 'closed'
}

Nav.propTypes = {
  /**
   * The id of the element.
   */
  id: PropTypes.string.isRequired,
  /**
   * The aria-label of the element.
   */
  ariaLabel: PropTypes.string.isRequired,
  /**
   * The state of the mega list.
   */
  activeState: PropTypes.oneOf(['', 'open', 'closed']).isRequired,
  /**
   * The content of the mega list.
   */
  children: PropTypes.node.isRequired
}

export default Nav
