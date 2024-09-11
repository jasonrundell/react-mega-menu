import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'

const StyledHamburger = styled.button`
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
      span:nth-of-type(1) {
        top: 1rem;
        width: 0%;
        left: 50%;
      }
      span:nth-of-type(2) {
        transform: rotate(45deg);
      }
      span:nth-of-type(3) {
        transform: rotate(-45deg);
      }
      span:nth-of-type(4) {
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
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;

  &:nth-of-type(1) {
    top: 0;
  }

  &:nth-of-type(2),
  &:nth-of-type(3) {
    top: 0.5rem;
  }

  &:nth-of-type(4) {
    top: 1rem;
  }
`

const StyledHamburgerLabel = styled.span`
  font-size: 1rem;
  font-weight: 700;
`

const Hamburger = ({ label = null, state = 'closed', onClick, ...props }) => (
  <StyledHamburger state={state} onClick={onClick} {...props}>
    <StyledHamburgerSliceContainer id="rmm__hamburger-slices">
      <StyledHamburgerSlice className="rmm__hamburger--slice" />
      <StyledHamburgerSlice className="rmm__hamburger--slice" />
      <StyledHamburgerSlice className="rmm__hamburger--slice" />
      <StyledHamburgerSlice className="rmm__hamburger--slice" />
    </StyledHamburgerSliceContainer>
    {label && (
      <div id="rmm__hamburger--label--container">
        <StyledHamburgerLabel id="rmm__hamburger--label">
          {label}
        </StyledHamburgerLabel>
      </div>
    )}
  </StyledHamburger>
)

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
