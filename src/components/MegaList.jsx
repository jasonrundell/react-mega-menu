import React from 'react'
import PropTypes from 'prop-types'

const MegaList = ({
  id,
  activeState = 'closed',
  className,
  children,
  ...props
}) => (
  <ul
    role="menu"
    id={id}
    aria-labelledby={id}
    className={[
      className,
      activeState === 'open' ? 'rmm__mega-list--open' : 'rmm__mega-list--closed'
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </ul>
)

MegaList.propTypes = {
  /**
   * The id of the element that labels the mega list.
   */
  id: PropTypes.string.isRequired,
  /**
   * The state of the mega list.
   */
  activeState: PropTypes.oneOf(['open', 'closed']).isRequired,
  /**
   * Additional class name(s) to append.
   */
  className: PropTypes.string,
  /**
   * The content of the mega list.
   */
  children: PropTypes.node.isRequired
}

export default MegaList
