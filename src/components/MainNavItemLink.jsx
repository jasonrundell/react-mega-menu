import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { respondTo } from '../helpers/responsive'
import {
  MENU_ITEM_TYPE_LINK,
  MENU_ITEM_TYPE_MEGA,
  MENU_ITEM_TYPES
} from '../config/menuItemTypes'

const StyledMainNavItemLink = styled.a`
  width: 100%;
  display: flex;
  position: relative;

  ${respondTo('large')} {
    align-items: center;
    height: 4rem;
  }
`

const MainNavItemLink = ({
  id,
  role,
  type,
  href,
  isActive,
  onClick,
  onKeyDown,
  ariaHaspopup,
  ariaControls,
  children,
  ...props
}) => (
  <StyledMainNavItemLink
    id={id}
    role={role}
    href={href}
    onClick={onClick}
    onKeyDown={onKeyDown}
    aria-haspopup={ariaHaspopup}
    aria-controls={ariaControls}
    isActive={isActive}
    {...props}
  >
    {children}
    {type === MENU_ITEM_TYPE_MEGA && (
      <span
        className={`rmm__main-nav-item-link--icon ${isActive ? 'active' : ''}`}
      />
    )}
  </StyledMainNavItemLink>
)

MainNavItemLink.defaultProps = {
  role: 'menuitem',
  type: MENU_ITEM_TYPE_LINK,
  isActive: false
}

MainNavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  type: PropTypes.oneOf(MENU_ITEM_TYPES),
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaHaspopup: PropTypes.string,
  ariaControls: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default MainNavItemLink
