import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'
import { getAnimationStyles } from '../helpers/animationStyles'

const StyledMegaList = styled.ul`
  position: absolute;
  z-index: 2;
  top: 0;
  left: -100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  width: 100%;
  height: calc(100vh - 4rem);

  ${respondTo('large')} {
    position: absolute;
    left: 0;
    top: 4rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    opacity: 0;
  }

  ${({ activeState }) => getAnimationStyles(activeState)}
`

const MegaList = ({ id, activeState = 'closed', children, ...props }) => (
  <StyledMegaList
    activeState={activeState}
    role="menu"
    id={id}
    aria-labelledby={id}
    {...props}
  >
    {children}
  </StyledMegaList>
)

MegaList.propTypes = {
  /**
   * The id of the element that labels the mega list.
   */
  id: PropTypes.string.isRequired,
  /**
   * The state of the mega list.
   */
  activeState: PropTypes.oneOf(['open', 'closed']).isRequired,
  /**
   * The content of the mega list.
   */
  children: PropTypes.node.isRequired
}

export default MegaList
