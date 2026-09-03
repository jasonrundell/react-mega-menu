import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@jasonrundell/topiary'

import {
  MENU_ITEM_TYPE_LINK,
  MENU_ITEM_TYPE_MEGA,
  MENU_ITEM_TYPES
} from '../config/menuItemTypes'

const MainNavItemLink = ({
  id,
  role = 'menuItem',
  type = MENU_ITEM_TYPE_LINK,
  href,
  isActive = false,
  onClick,
  onKeyDown,
  ariaHaspopup,
  ariaControls,
  className,
  children,
  ...props
}) => (
  <Link
    id={id}
    role={role}
    href={href}
    label={children}
    onClick={onClick}
    onKeyDown={onKeyDown}
    aria-haspopup={ariaHaspopup}
    aria-controls={ariaControls}
    className={className}
    {...props}
  >
    {type === MENU_ITEM_TYPE_MEGA && (
      <span
        className={`rmm__main-nav-item-link--icon ${isActive ? 'active' : ''}`}
      />
    )}
  </Link>
)

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
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default MainNavItemLink
