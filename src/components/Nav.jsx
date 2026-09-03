import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'
import { getAnimationStyles } from '../helpers/animationStyles'

const StyledNav = styled.nav`
  position: absolute;
  top: 8rem;
  left: -100%;
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow-y: scroll;

  ${respondTo('large')} {
    top: 4rem;
    left: 0;
    height: 4rem;
    flex-direction: row;
    overflow-y: initial;
  }

  ${({ activeState }) => getAnimationStyles(activeState)}

  li:first-of-type {
    ${respondTo('large')} {
      margin-left: 0;
    }
  }
`

/**
 * At mobile width the closed nav is only moved off-screen with a transform,
 * so its links would otherwise stay in the tab order. Marking it `inert`
 * removes the whole subtree from keyboard focus and the accessibility tree.
 * At desktop width the closed nav is already `display: none`, so `inert` is
 * never applied there.
 */
export const isNavInert = (isMobile, activeState) =>
  Boolean(isMobile) && activeState === 'closed'

const Nav = ({
  id,
  ariaLabel = 'Main Navigation',
  activeState = 'closed',
  isMobile = false,
  children,
  ...props
}) => (
  <StyledNav
    id={id}
    activeState={activeState}
    aria-label={ariaLabel}
    role="navigation"
    // React 18 drops boolean `inert`; an empty string renders the bare attribute.
    inert={isNavInert(isMobile, activeState) ? '' : undefined}
    {...props}
  >
    {children}
  </StyledNav>
)

Nav.propTypes = {
  /**
   * The id of the element.
   */
  id: PropTypes.string.isRequired,
  /**
   * The aria-label of the element.
   */
  ariaLabel: PropTypes.string,
  /**
   * The state of the mega list.
   */
  activeState: PropTypes.oneOf(['', 'open', 'closed']),
  /**
   * Whether the viewport is below the `large` breakpoint. When true and the
   * nav is closed, the nav is rendered `inert` so its off-screen content is
   * removed from the tab order.
   */
  isMobile: PropTypes.bool,
  /**
   * The content of the mega list.
   */
  children: PropTypes.node.isRequired
}

export default Nav
