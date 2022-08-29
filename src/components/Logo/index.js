import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const Logo = ({ id, src, rel, className, alt }) => {
  const rootClasses = classNames('rmm__logo', className && className)
  return <img id={id} src={src} className={rootClasses} rel={rel} alt={alt} />
}

Logo.defaultProps = {
  alt: '',
  rel: ''
}

Logo.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  rel: PropTypes.string,
  alt: PropTypes.string
}

export default Logo
