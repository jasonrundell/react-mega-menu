import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { breakpoints as BP } from '../../config/styles'

const Hamburger = ({ label, state, onClick }) => {
  const respondTo = (breakpoint) => {
    const breakpoints = {
      large: `@media (min-width: ${BP.large['min-width']})` // Example breakpoint for 'large'. You can adjust this value.
      // Add other breakpoints as needed
    }
    return breakpoints[breakpoint] || null
  }

  const StyledHamburger = styled.button`
    border: none;
    background: none;
    transition: 0.5s ease-in-out;
    position: absolute;
    top: 5.25rem;
    left: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 1000;

    ${respondTo('large')} {
      display: none;
    }
  `

  const StyledHamburgerSliceContainer = styled.div`
    width: 2rem;
    position: relative;
    display: block;
    height: 1.25rem;
  `

  const StyledHamburgerSlice = styled.span`
    display: block;
    position: absolute;
    height: 0.25rem;
    width: 100%;
    background: #000;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    &:nth-child(1) {
      top: 0;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 0.5rem;
    }

    &:nth-child(4) {
      top: 1rem;
    }
  `

  const StyledHamburgerLabelContainer = styled.div`
    margin-left: 1rem;
  `

  const StyledHamburgerLabel = styled.span`
    font-size: 1rem;
    font-weight: 700;
  `

  if (state === '') {
    state = 'rmm__hamburger--closed'
  } else if (state === 'open') {
    state = 'rmm__hamburger--open'
  }
  return (
    <StyledHamburger className={`${state}`} onClick={onClick}>
      <StyledHamburgerSliceContainer>
        <StyledHamburgerSlice />
        <StyledHamburgerSlice />
        <StyledHamburgerSlice />
        <StyledHamburgerSlice />
      </StyledHamburgerSliceContainer>
      {label && (
        <StyledHamburgerLabelContainer>
          <StyledHamburgerLabel>{label}</StyledHamburgerLabel>
        </StyledHamburgerLabelContainer>
      )}
    </StyledHamburger>
  )
}

Hamburger.defaultProps = { label: null }
Hamburger.propTypes = {
  label: PropTypes.string,
  state: PropTypes.oneOf(['', 'open', 'closed']),
  onClick: PropTypes.func
}

export default Hamburger
