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

  if (state === '') {
    state = 'rmm__hamburger--closed'
  } else if (state === 'open') {
    state = 'rmm__hamburger--open'
  }
  return (
    <StyledHamburger className={`rmm__hamburger ${state}`} onClick={onClick}>
      <div className="rmm_hamburger--slice-container">
        <span className="rmm_hamburger--slice"></span>
        <span className="rmm_hamburger--slice"></span>
        <span className="rmm_hamburger--slice"></span>
        <span className="rmm_hamburger--slice"></span>
      </div>
      {label && (
        <div className="rmm_hamburger--label-container">
          <span className="rmm_hamburger--label">{label}</span>
        </div>
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
