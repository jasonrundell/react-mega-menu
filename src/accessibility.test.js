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

  // The "closed" and "open" cases above render byte-identical DOM at
  // mobile vs desktop widths in jsdom today: isLargeViewport() does
  // correctly flip with the width (verified via its innerWidth fallback,
  // since jsdom has no window.matchMedia), but isMobile is consumed only
  // by MenuContext's toggleSubMenu, and neither of those two states ever
  // calls it. That makes those four scans width-blind re-validations of
  // the same markup until #100 lands (which will add a width-dependent
  // `inert` attribute to the closed off-canvas nav — see the Escalations
  // section of docs/accessibility/keyboard-walkthrough.md), at which point
  // they start being genuinely meaningful too. They're kept anyway: they're
  // cheap, and "sub-open" below already proves the harness is capable of
  // catching a real width-dependent regression when one exists.
  //
  // This test pins that "sub-open" is such a state, directly, so a future
  // change that accidentally makes the mobile/desktop branches of
  // toggleSubMenu equivalent gets caught here — rather than this test file
  // silently degrading into four more width-blind scans without anyone
  // noticing.
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
