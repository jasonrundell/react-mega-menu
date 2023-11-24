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
  background-color: #000;
  border-top: 0.0625rem solid grey;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  border-right: 0.25rem solid #000;
  overflow: hidden;

  ${respondTo('large')} {
    left: 0;
    border-top: none;
    flex-direction: row;
    border-right: none;
    border-bottom: 0.0625rem solid #000;
  }
`

const TopBar = ({ id, children, ...props }) => (
  <StyledTopBar id={id} {...props}>
    {children}
  </StyledTopBar>
)

TopBar.defaultProps = {
  id: 'top'
}

TopBar.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default TopBar
