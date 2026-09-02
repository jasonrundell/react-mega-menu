import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@jasonrundell/topiary'
import { classNames } from '../helpers/classNames'

const NavItemLink = ({
  id,
  role = 'menuitem',
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
    className={classNames(
      className,
      isActive ? 'rmm__nav-item-link--active' : ''
    )}
    {...props}
  />
)

NavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaHaspopup: PropTypes.string,
  ariaControls: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default NavItemLink
