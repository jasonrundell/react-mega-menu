import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../helpers/classNames'

const Logo = ({ id, src, rel = '', alt = '', className, ...props }) => (
  <img
    id={id}
    src={src}
    rel={rel}
    alt={alt}
    className={classNames('rmm__logo', className)}
    {...props}
  />
)

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
  alt: PropTypes.string,
  /**
   * Additional class name(s) to append.
   */
  className: PropTypes.string
}

export default Logo
