import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../../utils/css'

// CSS
import styles from './index.module.scss'

const NavList = ({
  id,
  children,
  isSub,
  isSubSub,
  isDropdown,
  isOpen,
  ariaLabelledby,
}) => {
  const rootClasses = classNames(
    styles['root'],
    isOpen && styles['open'],
    !isOpen && styles['closed'],
    isSub && styles['sub'],
    isSubSub && styles['sub-sub'],
    isDropdown && styles['dropdown']
  )
  return (
    <ul
      id={id}
      role="menubar"
      aria-labelledby={ariaLabelledby}
      className={rootClasses}
    >
      {children}
    </ul>
  )
}

NavList.defaultProps = {
  role: 'menubar',
  ariaLabel: 'Main menu',
  isOpen: false,
  isSub: false,
  isSubSub: false,
  isDropdown: false,
}

NavList.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  isSub: PropTypes.bool,
  isSubSub: PropTypes.bool,
  isDropdown: PropTypes.bool,
  ariaLabelledby: PropTypes.string.isRequired,
}

export default NavList
