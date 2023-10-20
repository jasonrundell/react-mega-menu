import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { breakpoints as BreakPoints } from '../../config/styles'

const MainList = ({ id, children, ariaLabel, ...props }) => {
  const respondTo = (breakpoint) => {
    const breakpoints = {
      large: `@media (min-width: ${BreakPoints.large['min-width']})` // Example breakpoint for 'large'. You can adjust this value.
      // Add other breakpoints as needed
    }
    return breakpoints[breakpoint] || null
  }

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

  return (
    <StyledList id={id} role="menubar" aria-label={ariaLabel} {...props}>
      {children}
    </StyledList>
  )
}

MainList.defaultProps = {
  ariaLabel: 'Main menu'
}

MainList.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired
}

export default MainList
