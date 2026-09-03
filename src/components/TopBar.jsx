import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../helpers/classNames'

const TopBar = ({ id = 'top', className, children, ...props }) => (
  <div id={id} className={classNames('rmm__topbar', className)} {...props}>
    {children}
  </div>
)
TopBar.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default TopBar
