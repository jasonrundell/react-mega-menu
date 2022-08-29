import React from 'react'
import PropTypes from 'prop-types'

const Hamburger = ({ label, state, onClick }) => {
  if (state === '') {
    state = 'rmm__hamburger--closed'
  } else if (state === 'open') {
    state = 'rmm__hamburger--open'
  }
  return (
    <button className={`rmm__hamburger ${state}`} onClick={onClick}>
      <div className="rmm_hamburger--slice-container">
        <span className="rmm_hamburger--slice"></span>
        <span className="rmm_hamburger--slice"></span>
        <span className="rmm_hamburger--slice"></span>
        <span className="rmm_hamburger--slice"></span>
      </div>
      {label && (
        <div className="rmm_hamburger--label-container">
          <span className="rmm_hamburger--label">{label}</span>
        </div>
      )}
    </button>
  )
}

Hamburger.defaultProps = { label: null }
Hamburger.propTypes = {
  label: PropTypes.string,
  state: PropTypes.oneOf(['', 'open', 'closed']),
  onClick: PropTypes.func
}

export default Hamburger
