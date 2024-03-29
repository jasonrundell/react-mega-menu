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
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  width: 100%;
  height: calc(100vh - 4rem);
  z-index: 1;

  ${respondTo('large')} {
    flex-direction: row;
    height: 4rem;
  }
`

const MainList = ({ id, ariaLabel, children, ...props }) => (
  <StyledList id={id} role="menubar" aria-label={ariaLabel} {...props}>
    {children}
  </StyledList>
)

MainList.defaultProps = {
  ariaLabel: 'Main menu'
}

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
