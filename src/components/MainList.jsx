import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'

const StyledList = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 4rem);
  z-index: 1;

  ${respondTo('large')} {
    flex-direction: row;
    height: 4rem;
  }
`

const MainList = ({ id, ariaLabel = 'Main menu', children, ...props }) => (
  <StyledList id={id} role="menubar" aria-label={ariaLabel} {...props}>
    {children}
  </StyledList>
)

MainList.propTypes = {
  /**
   * The id of the main list.
   */
  id: PropTypes.string.isRequired,
  /**
   * The aria-label of the main list.
   */
  ariaLabel: PropTypes.string.isRequired,
  /**
   * The children of the main list.
   */
  children: PropTypes.node.isRequired
}

export default MainList
