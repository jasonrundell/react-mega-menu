import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { breakpoints as BreakPoints } from '../config/styles'

const respondTo = (breakpoint) => {
  const breakpoints = {
    large: `@media (min-width: ${BreakPoints.large['min-width']})`
  }
  return breakpoints[breakpoint] || null
}

const StyledMainNavItemLink = styled.a`
  width: 100%;
  display: flex;
  position: relative;

  ${respondTo('large')} {
    align-items: center;
    height: 4rem;

    &::after {
      content: ${({ isForward }) =>
        isForward ? "url('../../images/icons/angle-up.svg')" : 'none'};
      right: ${({ isForward }) => (isForward ? '-0.5rem' : 'initial')};
      bottom: initial;
    }
  }

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
        content: url('../../images/icons/angle-up.svg');
        top: 0.25rem;
        right: -0.5rem;
        bottom: initial;
        width: 1rem;
      }
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

const MainNavItemLink = ({
  id,
  role,
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
  </StyledMainNavItemLink>
)

MainNavItemLink.defaultProps = {
  role: 'menuitem',
  isBack: false,
  isForward: false,
  isActive: false
}

MainNavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
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
