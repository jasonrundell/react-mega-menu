import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@jasonrundell/topiary'
import { classNames, stateClass } from '../helpers/classNames'

const Hamburger = ({
  label = null,
  state = 'closed',
  onClick,
  className,
  ariaControls,
  ...props
}) => (
  <Button
    primary={false}
    label=""
    onClick={onClick}
    aria-expanded={state === 'open'}
    aria-controls={ariaControls}
    // Falls back to a non-visual "Menu" name only when no visible label is
    // rendered (the default when a consumer omits `label`) — when a label
    // is rendered, the button's own text content already supplies its
    // accessible name, so an aria-label here would just duplicate it.
    aria-label={label ? undefined : 'Menu'}
    className={classNames(
      'rmm__hamburger',
      stateClass('rmm__hamburger', state),
      className
    )}
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
  className: PropTypes.string,
  /**
   * The id of the element this button expands/collapses (typically the
   * Nav), exposed as aria-controls so assistive tech can relate the toggle
   * to the region it operates.
   */
  ariaControls: PropTypes.string
}

export default Hamburger
