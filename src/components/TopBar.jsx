import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'

const StyledTopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  overflow: hidden;

  ${respondTo('large')} {
    left: 0;
    flex-direction: row;
  }
`

const TopBar = ({ id = 'top', children, ...props }) => (
  <StyledTopBar id={id} {...props}>
    {children}
  </StyledTopBar>
)
TopBar.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default TopBar
