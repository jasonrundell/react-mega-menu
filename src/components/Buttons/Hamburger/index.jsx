import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './index.scss'

const Hamburger = ({ state, onClick }) => {
  if (state === '') state = 'closed'
  return (
    <button
      className={`button--hamburger button--hamburger-${state}`}
      onClick={onClick}
    >
      <span className="button--hamburger-slice"></span>
      <span className="button--hamburger-slice"></span>
      <span className="button--hamburger-slice"></span>
      <span className="button--hamburger-slice"></span>
    </button>
  )
}

Hamburger.defaultProps = { state: 'closed' }
Hamburger.propTypes = {
  state: PropTypes.oneOf(['', 'open', 'closed']),
  onClick: PropTypes.func,
}

export default Hamburger
