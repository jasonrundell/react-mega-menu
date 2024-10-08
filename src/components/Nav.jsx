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

const Nav = ({
  id,
  ariaLabel = 'Main Navigation',
  activeState = 'closed',
  children,
  ...props
}) => (
  <StyledNav
    id={id}
    activeState={activeState}
    aria-label={ariaLabel}
    role="navigation"
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
   * The content of the mega list.
   */
  children: PropTypes.node.isRequired
}

export default Nav
