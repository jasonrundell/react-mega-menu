import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const StyledTopBarTitle = styled.h1`
  font-size: 1.5rem;
`

const TopBarTitle = ({ id, children, ...props }) => (
  <StyledTopBarTitle id={id} {...props}>
    {children}
  </StyledTopBarTitle>
)

TopBarTitle.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default TopBarTitle
