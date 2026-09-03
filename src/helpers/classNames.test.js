import { classNames, stateClass } from './classNames'

describe('classNames', () => {
  it('joins truthy fragments with a single space', () => {
    expect(classNames('a', 'b', 'c')).toBe('a b c')
  })

  it('drops falsy fragments (undefined, null, empty string, false)', () => {
    expect(classNames('a', undefined, 'b', null, '', false, 'c')).toBe('a b c')
  })

  it('returns an empty string when every fragment is falsy', () => {
    expect(classNames(undefined, null, '', false)).toBe('')
  })

  it('returns a single fragment unchanged', () => {
    expect(classNames('rmm__menu')).toBe('rmm__menu')
  })

  it('matches the pre-extraction [..].filter(Boolean).join(" ") idiom exactly', () => {
    const parts = ['rmm__menu', undefined]
    expect(classNames(...parts)).toBe(parts.filter(Boolean).join(' '))
  })
})

describe('stateClass', () => {
  it('appends --open when state is "open"', () => {
    expect(stateClass('rmm__nav', 'open')).toBe('rmm__nav--open')
  })

  it('appends --closed when state is "closed"', () => {
    expect(stateClass('rmm__nav', 'closed')).toBe('rmm__nav--closed')
  })

  it('appends --closed for any non-"open" state, e.g. Hamburger\'s "" state', () => {
    expect(stateClass('rmm__hamburger', '')).toBe('rmm__hamburger--closed')
  })

  it('appends --closed for an undefined state', () => {
    expect(stateClass('rmm__mega-list', undefined)).toBe(
      'rmm__mega-list--closed'
    )
  })
})
