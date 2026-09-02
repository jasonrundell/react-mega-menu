/**
 * Joins any number of class-name fragments, dropping falsy values
 * (undefined, null, '', false). Centralizes the
 * `[...].filter(Boolean).join(' ')` idiom that was previously repeated
 * verbatim across every component that composes a stable rmm__* class with
 * an optional consumer-supplied `className` and/or a state modifier class —
 * behavior is unchanged from that idiom, this is a pure extraction.
 */
export const classNames = (...parts) => parts.filter(Boolean).join(' ')

/**
 * Builds a BEM-ish state modifier class name from a base class and a state
 * value, e.g. stateClass('rmm__nav', 'open') -> 'rmm__nav--open'.
 *
 * Every call site this replaces treats its state prop as binary — 'open'
 * selects the "--open" modifier, and any other value (typically 'closed',
 * but also '' for Hamburger's `state` prop, per its PropTypes) selects
 * "--closed". That binary collapse is preserved here rather than
 * interpolating the raw state value, so a state of '' still produces
 * "<base>--closed" instead of a malformed "<base>--" class.
 */
export const stateClass = (base, state) =>
  `${base}--${state === 'open' ? 'open' : 'closed'}`
