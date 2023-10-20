import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { breakpoints as BreakPoints } from '../../config/styles'

const respondTo = (breakpoint) => {
  const breakpoints = {
    large: `@media (min-width: ${BreakPoints.large['min-width']})`
  }
  return breakpoints[breakpoint] || null
}

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

  ${({ isBack }) =>
    isBack &&
    `
    padding-left: 2rem;
    &::before {
      content: url('../../images/icons/angle-left.svg');
      position: absolute;
      left: 0;
      bottom: -30%;
      width: 1rem;
      height: 2rem;
    }
    `}

  ${({ isForward }) =>
    isForward &&
    `
    ${respondTo('large')} {
      margin-right: 1rem;
    }

    &::after {
      content: url('../../images/icons/angle-right.svg');
      position: absolute;
      right: 2rem;
      bottom: -30%;
      width: 1rem;
      height: 2rem;
    
        ${respondTo('large')} {
          content: '';
        }
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
  isBack,
  isHeading,
  isForward,
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
    isBack={isBack}
    isHeading={isHeading}
    isForward={isForward}
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
  isBack: false,
  isHeading: false,
  isForward: false,
  isActive: false
}

NavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  href: PropTypes.string.isRequired,
  isBack: PropTypes.bool,
  isHeading: PropTypes.bool,
  isForward: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaHaspopup: PropTypes.string,
  ariaControls: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default NavItemLink
