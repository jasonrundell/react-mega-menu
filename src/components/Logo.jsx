import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { breakpoints as BreakPoints } from '../../config/styles'

const respondTo = (breakpoint) => {
  const breakpoints = {
    large: `@media (min-width: ${BreakPoints.large['min-width']})` // Example breakpoint for 'large'. You can adjust this value.
    // Add other breakpoints as needed
  }
  return breakpoints[breakpoint] || null
}

const StyledLogo = styled.img`
  display: flex;
  position: relative;
  height: 2rem;
  margin-right: 1rem;

  ${respondTo('large')} {
    align-items: center;
  }
`

const Logo = ({ id, src, rel, alt, ...props }) => (
  <StyledLogo id={id} src={src} rel={rel} alt={alt} {...props} />
)

Logo.defaultProps = {
  alt: '',
  rel: ''
}

Logo.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  rel: PropTypes.string,
  alt: PropTypes.string
}

export default Logo
