import React from 'react'
import PropTypes from 'prop-types'

// Utils
import { classNames } from '../../utils/css'

const MegaList = ({ id, activeState, children }) => {
  const rootClasses = classNames(
    'rmm__mega-list',
    activeState && `rmm__mega-list--${activeState}`
  )
  return (
    <ul role="menu" className={rootClasses} id={id} aria-labelledby={id}>
      {children}
    </ul>
  )
}

MegaList.defaultProps = {
  activeState: ''
}

MegaList.propTypes = {
  id: PropTypes.string.isRequired,
  activeState: PropTypes.oneOf(['open', 'closed']).isRequired,
  children: PropTypes.node.isRequired
}

export default MegaList
