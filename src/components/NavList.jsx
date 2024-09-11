import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'
import { getAnimationStyles } from '../helpers/animationStyles'

import {
  MENU_ITEM_TYPE_LINK,
  MENU_ITEM_TYPE_SUB,
  MENU_ITEM_TYPES
} from '../config/menuItemTypes'

const StyledNavList = styled.ul`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 4rem);

  ${respondTo('large')} {
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
    }
  `}

  ${({ activeState }) => getAnimationStyles(activeState)}
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
