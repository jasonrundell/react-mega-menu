import React from 'react'
import PropTypes from 'prop-types'

// CSS
import './index.scss'

const Hamburger = ({ label, state, onClick }) => {
  if (state === '') state = 'closed'
  return (
    <button
      className={`button--hamburger button--hamburger-${state}`}
      onClick={onClick}
    >
      <div className="button--hamburger-slice-container">
        <span className="button--hamburger-slice"></span>
        <span className="button--hamburger-slice"></span>
        <span className="button--hamburger-slice"></span>
        <span className="button--hamburger-slice"></span>
      </div>
      {label && (
        <div className="button--hamburger-label-container">
          <span className="button--hamburger-label">{label}</span>
        </div>
      )}
    </button>
  )
}

Hamburger.defaultProps = { label: null, state: 'closed' }
Hamburger.propTypes = {
  label: PropTypes.string,
  state: PropTypes.oneOf(['', 'open', 'closed']),
  onClick: PropTypes.func,
}

export default Hamburger
