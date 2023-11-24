import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { respondTo } from '../helpers/responsive'

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
  /**
   * The id of the logo.
   */
  id: PropTypes.string.isRequired,
  /**
   * The src of the logo.
   */
  src: PropTypes.string.isRequired,
  /**
   * The rel of the logo.
   */
  rel: PropTypes.string,
  /**
   * The alt of the logo.
   */
  alt: PropTypes.string
}

export default Logo
