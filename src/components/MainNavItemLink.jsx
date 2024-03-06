import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

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
  isBack,
  isForward,
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
    isBack={isBack}
    isForward={isForward}
    isActive={isActive}
    {...props}
  >
    {children}
    {type === MENU_ITEM_TYPE_MEGA && (
      <FontAwesomeIcon
        className="rmm__icon--right"
        icon={isActive ? faChevronDown : faChevronUp}
        style={{ width: '1rem', marginLeft: '0.5rem' }}
      />
    )}
  </StyledMainNavItemLink>
)

MainNavItemLink.defaultProps = {
  role: 'menuitem',
  type: MENU_ITEM_TYPE_LINK,
  isBack: false,
  isForward: false,
  isActive: false
}

MainNavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  type: PropTypes.oneOf(MENU_ITEM_TYPES),
  href: PropTypes.string.isRequired,
  isBack: PropTypes.bool,
  isForward: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaHaspopup: PropTypes.string,
  ariaControls: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default MainNavItemLink
