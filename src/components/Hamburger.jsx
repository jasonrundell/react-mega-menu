import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { breakpoints as BreakPoints } from '../config/styles'

const respondTo = (breakpoint) => {
  const breakpoints = {
    large: `@media (min-width: ${BreakPoints.large['min-width']})`
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

  ${({ state }) =>
    state === 'closed' &&
    `
      display: flex;
      ${respondTo('large')} {
        display: none;
      }
    `}

  ${({ state }) =>
    state === '' ||
    (state === 'open' &&
      `
      span:nth-child(1) {
        top: 1rem;
        width: 0%;
        left: 50%;
      }
      span:nth-child(2) {
        transform: rotate(45deg);
      }
      span:nth-child(3) {
        transform: rotate(-45deg);
      }
      span:nth-child(4) {
        top: 1rem;
        width: 0%;
        left: 50%;
      }
    `)}
  
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

const Hamburger = ({ label, state, onClick, ...props }) => (
  <StyledHamburger state={state} onClick={onClick} {...props}>
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

Hamburger.defaultProps = { label: null, state: 'closed' }
Hamburger.propTypes = {
  /**
   * The text label to display next to the hamburger icon
   */
  label: PropTypes.string,
  /**
   * The current state of the hamburger icon
   */
  state: PropTypes.oneOf(['', 'open', 'closed']),
  /**
   * The function to call when the hamburger icon is clicked
   */
  onClick: PropTypes.func
}

export default Hamburger
