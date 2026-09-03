import React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe } from 'jest-axe'

// Rendered-Menu seam: the default export wraps MenuProvider around Menu, so
// this is the same tree a consumer gets from `import Menu from
// '@jasonrundell/react-mega-menu'`. Deliberately NOT mocked (unlike
// Menu.test.js / Nav.test.jsx), so axe sees real ARIA wiring end to end.
import Menu from './index'

// Axe rules disabled at this seam, with justification. Empty by design —
// any rule added here must also be justified in the "Escalations" section
// of the ticket report, per #95 Part A step 3.
const axeRules = {}

const MOBILE_WIDTH = 375
const DESKTOP_WIDTH = 1280

const setViewportWidth = (width) => {
  global.innerWidth = width
  fireEvent.resize(window)
}

const renderMenuAt = (width) => {
  setViewportWidth(width)
  return render(<Menu />)
}

// Located by its accessible name rather than #rmm__hamburger so this test
// exercises the same aria-label/visible-text contract a screen reader user
// relies on (see src/components/Hamburger.jsx), not just the DOM id.
const openMenu = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
}

// Opens Store's mega panel, then clicks the "back" link inside its
// Outdoors sub-item's NavList (helpers/menu.jsx renderSubMenuItem) — a
// *second* call to MenuContext's toggleSubMenu, with a different menuId
// than the first. toggleSubMenu is the only MenuContext action gated on
// isMobile: at desktop it replaces activeMenus outright with [menuId]
// whenever the target isn't already active (a de-facto accordion — opening
// this second panel evicts the first); at mobile it goes through
// updateActiveMenus, which only ever adds/removes that one id. This is the
// one interaction reachable from the render tree that actually depends on
// width — see the comment above the width-divergence test below.
//
// Each fireEvent.click is its own statement rather than being folded into
// one shared act() — fireEvent already flushes/commits per call, and since
// each of these three clicks depends on state the previous one just wrote
// (toggleSubMenu reads the current subMenuState/activeMenus), batching them
// under one outer act() defers all three commits to the same instant, so
// the 2nd and 3rd calls both read the pre-click closure and clobber each
// other — verified by reproducing exactly that (mobile and desktop
// collapsing to the same end state) while iterating on this test.
const openSubState = (container) => {
  openMenu()
  fireEvent.click(container.querySelector('#rmm-main-nav-item-link-store'))
  fireEvent.click(
    container.querySelector('#rmm-nav-item-link-sub-store-outdoors')
  )
}

const STATE_SETUPS = {
  closed: () => {},
  open: () => openMenu(),
  'sub-open': (container) => openSubState(container)
}

const WIDTHS = [
  ['mobile', MOBILE_WIDTH],
  ['desktop', DESKTOP_WIDTH]
]
const STATES = ['closed', 'open', 'sub-open']

const cases = WIDTHS.flatMap(([widthLabel, width]) =>
  STATES.map((state) => [widthLabel, width, state])
)

describe('accessibility (jest-axe)', () => {
  afterEach(cleanup)

  test.each(cases)(
    '%s %ipx — %s state has no axe violations',
    async (_widthLabel, width, state) => {
      const { container } = renderMenuAt(width)
      STATE_SETUPS[state](container)
      const results = await axe(container, { rules: axeRules })
      expect(results).toHaveNoViolations()
    }
  )

  // Since #100 the closed nav carries a width-dependent `inert` attribute,
  // so the "closed" scans above differ between mobile and desktop (see the
  // focus-walk suite below). The "open" cases are still byte-identical
  // across widths in jsdom: isMobile is otherwise consumed only by
  // MenuContext's toggleSubMenu, which the open state never calls. They're
  // kept anyway: they're cheap, and "sub-open" below already proves the
  // harness is capable of catching a real width-dependent regression.
  //
  // This test pins that "sub-open" is such a state, directly, so a future
  // change that accidentally makes the mobile/desktop branches of
  // toggleSubMenu equivalent gets caught here — rather than this test file
  // silently degrading into width-blind scans without anyone noticing.
  test('sub-open state genuinely differs between mobile and desktop widths', () => {
    const mobile = renderMenuAt(MOBILE_WIDTH)
    STATE_SETUPS['sub-open'](mobile.container)
    const mobileHtml = mobile.container.innerHTML
    cleanup()

    const desktop = renderMenuAt(DESKTOP_WIDTH)
    STATE_SETUPS['sub-open'](desktop.container)
    const desktopHtml = desktop.container.innerHTML

    expect(mobileHtml).not.toBe(desktopHtml)
  })
})

/**
 * Tab-order walk over a root element.
 *
 * jsdom does not implement the focus semantics of the `inert` attribute, so
 * this emulates what a browser does when the user presses Tab: every
 * keyboard-focusable element in DOM order, minus anything inside an `inert`
 * subtree. `display: none` from the stylesheet is not evaluated by jsdom
 * either, so at desktop width links inside closed mega panels still show up
 * here; that path is covered by asserting `inert` is never applied on
 * desktop, where the nav bar itself is always visible. The real-browser
 * equivalent is scripts/a11y-walkthrough/walk.cjs (walkthrough row 13).
 */
const TABBABLE = 'a[href], button, input, select, textarea, [tabindex]'
const focusWalk = (root) =>
  Array.from(root.querySelectorAll(TABBABLE)).filter(
    (el) => !el.closest('[inert]') && el.getAttribute('tabindex') !== '-1'
  )

const getNav = (container) => container.querySelector('#rmm__nav')
const getHamburger = () => screen.getByRole('button', { name: 'Menu' })

describe('closed off-canvas nav leaves the tab order at mobile width (#100)', () => {
  afterEach(cleanup)

  test('nothing inside .rmm__nav is tabbable while the nav is closed', () => {
    const { container } = renderMenuAt(MOBILE_WIDTH)
    const nav = getNav(container)

    expect(nav).toHaveAttribute('inert')
    expect(focusWalk(nav)).toHaveLength(0)
  })

  test('opening the nav restores its links to the tab order; closing removes them again', () => {
    const { container } = renderMenuAt(MOBILE_WIDTH)
    const nav = getNav(container)

    openMenu()
    expect(nav).not.toHaveAttribute('inert')
    expect(focusWalk(nav).length).toBeGreaterThan(0)

    openMenu() // the Hamburger toggles, so a second click closes
    expect(nav).toHaveAttribute('inert')
    expect(focusWalk(nav)).toHaveLength(0)
  })

  test('the hamburger itself stays tabbable while the nav is closed', () => {
    const { container } = renderMenuAt(MOBILE_WIDTH)

    expect(focusWalk(container)).toContain(getHamburger())
  })

  test('desktop width never applies inert, open or closed', () => {
    const { container } = renderMenuAt(DESKTOP_WIDTH)
    const nav = getNav(container)

    expect(nav).not.toHaveAttribute('inert')
    expect(focusWalk(nav).length).toBeGreaterThan(0)

    openMenu()
    expect(nav).not.toHaveAttribute('inert')
  })

  test('resizing across the breakpoint updates inert without reopening the nav', () => {
    const { container } = renderMenuAt(DESKTOP_WIDTH)
    const nav = getNav(container)
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
        removeEventListener: jest.fn()
      }))
    })

    afterEach(() => {
      window.matchMedia = originalMatchMedia
    })

    test('behaves the same as the animated path', () => {
      const { container } = renderMenuAt(MOBILE_WIDTH)
      const nav = getNav(container)

      expect(nav).toHaveAttribute('inert')
      expect(focusWalk(nav)).toHaveLength(0)

      openMenu()
      expect(nav).not.toHaveAttribute('inert')
      expect(focusWalk(nav).length).toBeGreaterThan(0)

      openMenu()
      expect(nav).toHaveAttribute('inert')
    })
  })
})
