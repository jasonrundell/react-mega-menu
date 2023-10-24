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
  align-items: ${({ isLarge }) => (isLarge ? 'center' : 'initial')};
  height: ${({ isLarge }) => (isLarge ? '4rem' : 'auto')};
  margin-right: ${({ isForward, isLarge }) =>
    isForward && isLarge ? '1rem' : '0'};
  padding-left: ${({ isBack }) => (isBack ? '2rem' : '0')};

  &::after {
    content: ${({ isForward }) =>
      isForward ? "url('../../images/icons/angle-right.svg')" : 'none'};
    position: absolute;
    right: ${({ isForward, isLarge }) =>
      isForward && !isLarge ? '2rem' : 'initial'};
    bottom: ${({ isForward, isLarge }) =>
      isForward && !isLarge ? '-30%' : 'initial'};
    top: ${({ isForward, isLarge }) =>
      isForward && isLarge ? '0.25rem' : 'initial'};
    width: 1rem;
    height: 2rem;
    transform: ${({ isActive, isLarge }) =>
      isActive && isLarge ? 'rotate(180deg)' : 'none'};
  }

  &::before {
    content: ${({ isBack }) =>
      isBack ? "url('../../images/icons/angle-left.svg')" : 'none'};
    position: absolute;
    left: 0;
    bottom: -30%;
    width: 1rem;
    height: 2rem;
  }

  ${respondTo('large')} {
    &::after {
      content: ${({ isForward }) =>
        isForward ? "url('../../images/icons/angle-up.svg')" : 'none'};
      right: ${({ isForward }) => (isForward ? '-0.5rem' : 'initial')};
      bottom: initial;
    }
  }
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
