import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'

import {
  MENU_ITEM_TYPE_LINK,
  MENU_ITEM_TYPE_SUB,
  MENU_ITEM_TYPES
} from '../config/menuItemTypes'

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

  ${({ type }) =>
    type === MENU_ITEM_TYPE_SUB &&
    `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    z-index: 2;
  
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
  role = 'menubar',
  type = MENU_ITEM_TYPE_LINK,
  activeState = 'closed',
  ariaLabelledby,
  children,
  ...props
}) => (
  <StyledNavList
    id={id}
    role={role}
    aria-labelledby={ariaLabelledby}
    type={type}
    activeState={activeState}
    {...props}
  >
    {children}
  </StyledNavList>
)

NavList.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  type: PropTypes.oneOf(MENU_ITEM_TYPES),
  activeState: PropTypes.oneOf(['open', 'closed']).isRequired,
  ariaLabelledby: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default NavList
