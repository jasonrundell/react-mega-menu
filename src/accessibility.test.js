import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import Menu from './index'
import { viewportLarge } from './helpers/responsive'

/**
 * Tab-order walk over a root element.
 *
 * jsdom does not implement the focus semantics of the `inert` attribute, so
 * this emulates what a browser does when the user presses Tab: every
 * keyboard-focusable element in DOM order, minus anything inside an `inert`
 * subtree. Note `display: none` from the emotion stylesheet is not evaluated
 * by jsdom, so at desktop width links inside closed mega panels still show
 * up here; that path is covered by asserting `inert` is never applied on
 * desktop, where the nav bar itself is always visible.
 */
const TABBABLE = 'a[href], button, input, select, textarea, [tabindex]'
const focusWalk = (root) =>
  Array.from(root.querySelectorAll(TABBABLE)).filter(
    (el) => !el.closest('[inert]') && el.getAttribute('tabindex') !== '-1'
  )

const setViewportWidth = (width) => {
  global.innerWidth = width
  act(() => {
    fireEvent.resize(window)
  })
}

const renderMenu = (width) => {
  global.innerWidth = width
  const utils = render(<Menu />)
  const nav = utils.container.querySelector('#rmm__nav')
  const hamburger = utils.container.querySelector('#rmm__hamburger')
  return { ...utils, nav, hamburger }
}

const MOBILE_WIDTH = viewportLarge - 1
const DESKTOP_WIDTH = viewportLarge

expect.extend(toHaveNoViolations)

describe('jest-axe gate: the rendered Menu has no axe violations', () => {
  afterEach(() => {
    global.innerWidth = 1024
  })

  test.each([
    ['mobile', MOBILE_WIDTH, 'closed'],
    ['mobile', MOBILE_WIDTH, 'open'],
    ['desktop', DESKTOP_WIDTH, 'closed'],
    ['desktop', DESKTOP_WIDTH, 'open']
  ])('%s width (%ipx), nav %s', async (_, width, state) => {
    const { container, hamburger } = renderMenu(width)
    if (state === 'open') fireEvent.click(hamburger)

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('closed off-canvas nav leaves the tab order at mobile width (#100)', () => {
  afterEach(() => {
    global.innerWidth = 1024
  })

  test('nothing inside .rmm__nav is tabbable while the nav is closed', () => {
    const { nav } = renderMenu(MOBILE_WIDTH)

    expect(nav).toHaveAttribute('inert')
    expect(focusWalk(nav)).toHaveLength(0)
  })

  test('opening the nav restores its links to the tab order; closing removes them again', () => {
    const { nav, hamburger } = renderMenu(MOBILE_WIDTH)

    fireEvent.click(hamburger)
    expect(nav).not.toHaveAttribute('inert')
    expect(focusWalk(nav).length).toBeGreaterThan(0)

    fireEvent.click(hamburger)
    expect(nav).toHaveAttribute('inert')
    expect(focusWalk(nav)).toHaveLength(0)
  })

  test('the hamburger itself stays tabbable while the nav is closed', () => {
    const { container, hamburger } = renderMenu(MOBILE_WIDTH)

    expect(focusWalk(container)).toContain(hamburger)
  })

  test('desktop width never applies inert, open or closed', () => {
    const { nav, hamburger } = renderMenu(DESKTOP_WIDTH)

    expect(nav).not.toHaveAttribute('inert')
    expect(focusWalk(nav).length).toBeGreaterThan(0)

    fireEvent.click(hamburger)
    expect(nav).not.toHaveAttribute('inert')
  })

  test('resizing across the breakpoint updates inert without reopening the nav', () => {
    const { nav } = renderMenu(DESKTOP_WIDTH)
    expect(nav).not.toHaveAttribute('inert')

    setViewportWidth(MOBILE_WIDTH)
    expect(nav).toHaveAttribute('inert')

    setViewportWidth(DESKTOP_WIDTH)
    expect(nav).not.toHaveAttribute('inert')
  })

  describe('prefers-reduced-motion', () => {
    const originalMatchMedia = window.matchMedia

    beforeEach(() => {
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn()
      }))
    })

    afterEach(() => {
      window.matchMedia = originalMatchMedia
    })

    test('behaves the same as the animated path', () => {
      const { nav, hamburger } = renderMenu(MOBILE_WIDTH)

      expect(nav).toHaveAttribute('inert')
      expect(focusWalk(nav)).toHaveLength(0)

      fireEvent.click(hamburger)
      expect(nav).not.toHaveAttribute('inert')
      expect(focusWalk(nav).length).toBeGreaterThan(0)

      fireEvent.click(hamburger)
      expect(nav).toHaveAttribute('inert')
    })
  })
})
