import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@jasonrundell/topiary'

const Hamburger = ({
  label = null,
  state = 'closed',
  onClick,
  className,
  ...props
}) => (
  <Button
    primary={false}
    label=""
    onClick={onClick}
    className={[
      'rmm__hamburger',
      state === 'open' ? 'rmm__hamburger--open' : 'rmm__hamburger--closed',
      className
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    <div id="rmm__hamburger-slices">
      <span className="rmm__hamburger--slice" />
      <span className="rmm__hamburger--slice" />
      <span className="rmm__hamburger--slice" />
      <span className="rmm__hamburger--slice" />
    </div>
    {label && (
      <div id="rmm__hamburger--label--container">
        <span id="rmm__hamburger--label">{label}</span>
      </div>
    )}
  </Button>
)

Hamburger.propTypes = {
  /**
   * The text label to display next to the hamburger icon
   */
  label: PropTypes.string,
  /**
   * The current state of the hamburger icon
   */
  state: PropTypes.oneOf(['', 'open', 'closed']),
  /**
   * The function to call when the hamburger icon is clicked
   */
  onClick: PropTypes.func,
  /**
   * Additional class name(s) to append.
   */
  className: PropTypes.string
}

export default Hamburger
