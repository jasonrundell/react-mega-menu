import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const TopBarTitle = ({ id, children, ...props }) => {
  const StyledTopBarTitle = styled.h1`
    color: #fff;
    font-size: 1.5rem;
  `

  return (
    <StyledTopBarTitle id={id} {...props}>
      {children}
    </StyledTopBarTitle>
  )
}

TopBarTitle.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default TopBarTitle
