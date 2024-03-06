import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'

const StylesNavItemLink = styled.a`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  margin-bottom: 1rem;

  ${({ isHeading }) =>
    isHeading &&
    `
    ${respondTo('large')} {
      height: 1rem;
    }
  `}

  ${({ isActive }) =>
    isActive &&
    `
    &::after {
      ${respondTo('large')} {
        transform: rotate(180deg);
        top: 0;
      }
    }
  `}
`

const NavItemLink = ({
  id,
  role,
  href,
  isHeading,
  isActive,
  onClick,
  onKeyDown,
  ariaHaspopup,
  ariaControls,
  children,
  ...props
}) => (
  <StylesNavItemLink
    id={id}
    role={role}
    href={href}
    isHeading={isHeading}
    isActive={isActive}
    onClick={onClick}
    onKeyDown={onKeyDown}
    aria-haspopup={ariaHaspopup}
    aria-controls={ariaControls}
    {...props}
  >
    {children}
  </StylesNavItemLink>
)

NavItemLink.defaultProps = {
  role: 'menuitem',
  isHeading: false,
  isActive: false
}

NavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  href: PropTypes.string.isRequired,
  isHeading: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaHaspopup: PropTypes.string,
  ariaControls: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default NavItemLink
