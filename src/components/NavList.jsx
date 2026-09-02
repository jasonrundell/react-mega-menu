import React from 'react'
import PropTypes from 'prop-types'

import { MENU_ITEM_TYPE_LINK, MENU_ITEM_TYPES } from '../config/menuItemTypes'
import { classNames, stateClass } from '../helpers/classNames'

const NavList = ({
  id,
  role = 'menubar',
  type = MENU_ITEM_TYPE_LINK,
  activeState = 'closed',
  ariaLabelledby,
  className,
  children,
  ...props
}) => (
  <ul
    id={id}
    role={role}
    aria-labelledby={ariaLabelledby}
    className={classNames(className, stateClass('rmm__nav-list', activeState))}
    {...props}
  >
    {children}
  </ul>
)

NavList.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  type: PropTypes.oneOf(MENU_ITEM_TYPES),
  activeState: PropTypes.oneOf(['open', 'closed']).isRequired,
  ariaLabelledby: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default NavList
