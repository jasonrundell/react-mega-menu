import React from 'react'
import { render, fireEvent, cleanup, act } from '@testing-library/react'
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

const openMenu = (container) => {
  const hamburger = container.querySelector('#rmm__hamburger')
  fireEvent.click(hamburger)
}

describe('accessibility (jest-axe)', () => {
  afterEach(cleanup)

  test('closed menu at mobile width has no axe violations', async () => {
    const { container } = renderMenuAt(MOBILE_WIDTH)
    const results = await axe(container, { rules: axeRules })
    expect(results).toHaveNoViolations()
  })

  test('open menu at mobile width has no axe violations', async () => {
    const { container } = renderMenuAt(MOBILE_WIDTH)
    act(() => openMenu(container))
    const results = await axe(container, { rules: axeRules })
    expect(results).toHaveNoViolations()
  })

  test('closed menu at desktop width has no axe violations', async () => {
    const { container } = renderMenuAt(DESKTOP_WIDTH)
    const results = await axe(container, { rules: axeRules })
    expect(results).toHaveNoViolations()
  })

  test('open menu at desktop width has no axe violations', async () => {
    const { container } = renderMenuAt(DESKTOP_WIDTH)
    act(() => openMenu(container))
    const results = await axe(container, { rules: axeRules })
    expect(results).toHaveNoViolations()
  })
})
