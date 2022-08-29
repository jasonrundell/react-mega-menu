import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const NavList = ({
  id,
  role,
  isSub,
  isSubSub,
  isDropdown,
  activeState,
  ariaLabelledby,
  children
}) => {
  const rootClasses = classNames(
    'rmm__nav-list',
    `rmm__nav-list--${activeState}`,
    isSub && 'rmm__nav-list--sub',
    isSubSub && 'rmm__nav-list--sub-sub',
    isDropdown && 'rmm__nav-list--dropdown'
  )
  return (
    <ul
      id={id}
      role={role}
      aria-labelledby={ariaLabelledby}
      className={rootClasses}
    >
      {children}
    </ul>
  )
}

NavList.defaultProps = {
  role: 'menubar',
  isSub: false,
  isSubSub: false,
  isDropdown: false,
  activeState: ''
}

NavList.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  isSub: PropTypes.bool,
  isSubSub: PropTypes.bool,
  isDropdown: PropTypes.bool,
  activeState: PropTypes.oneOf(['', 'open', 'closed']).isRequired,
  ariaLabelledby: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default NavList
