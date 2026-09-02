import React from 'react'
import PropTypes from 'prop-types'

const TopBar = ({ id = 'top', className, children, ...props }) => (
  <div
    id={id}
    className={['rmm__topbar', className].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
  </div>
)
TopBar.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default TopBar
