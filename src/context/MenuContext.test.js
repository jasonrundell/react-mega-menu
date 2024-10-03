import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { MenuProvider, useMenu } from './MenuContext'

describe('MenuContext', () => {
  let result

  beforeEach(() => {
    const wrapper = ({ children }) => <MenuProvider>{children}</MenuProvider>
    result = renderHook(() => useMenu(), { wrapper }).result
  })

  test('resetMenus closes all menus and empties activeMenus array', () => {
    act(() => {
      result.current.setActiveMenus(['menu1', 'menu2'])
      result.current.setSubMenuState('open')
      result.current.setSubSubMenuState('open')
      result.current.resetMenus()
    })

    expect(result.current.activeMenus).toEqual([])
    expect(result.current.subMenuState).toBe('closed')
    expect(result.current.subSubMenuState).toBe('closed')
  })

  test('updateActiveMenus adds and removes menu IDs from activeMenus array', () => {
    act(() => {
      result.current.updateActiveMenus('open', 'menu1')
    })

    expect(result.current.activeMenus).toEqual(['menu1'])

    act(() => {
      result.current.updateActiveMenus('closed', 'menu1')
    })

    expect(result.current.activeMenus).toEqual([])
  })

  test('toggleMegaMenu toggles mega menu state and updates activeMenus array', () => {
    act(() => {
      result.current.toggleMegaMenu({ preventDefault: jest.fn() })
    })

    expect(result.current.megaMenuState).toBe('open')
    expect(result.current.activeMenus).toEqual(['nav-main'])

    act(() => {
      result.current.toggleMegaMenu({ preventDefault: jest.fn() })
    })

    expect(result.current.megaMenuState).toBe('closed')
    expect(result.current.activeMenus).toEqual([])
  })

  test('toggleSubMenu toggles sub-menu state and updates activeMenus array based on viewport size', () => {
    global.innerWidth = 1200 // Simulate desktop viewport
    act(() => {
      result.current.toggleSubMenu({ preventDefault: jest.fn() }, 'menu1')
    })

    expect(result.current.subMenuState).toBe('open')
    expect(result.current.activeMenus).toEqual(['menu1'])

    act(() => {
      result.current.toggleSubMenu({ preventDefault: jest.fn() }, 'menu1')
    })

    expect(result.current.subMenuState).toBe('closed')
    expect(result.current.activeMenus).toEqual([])

    global.innerWidth = 500 // Simulate mobile viewport
    act(() => {
      result.current.toggleSubMenu({ preventDefault: jest.fn() }, 'menu1')
    })

    expect(result.current.subMenuState).toBe('open')
    expect(result.current.activeMenus).toEqual(['menu1'])
  })

  test('toggleSubSubMenu toggles sub-sub-menu state', () => {
    act(() => {
      result.current.toggleSubSubMenu({ preventDefault: jest.fn() }, 'menu1')
    })

    expect(result.current.subSubMenuState).toBe('open')

    act(() => {
      result.current.toggleSubSubMenu({ preventDefault: jest.fn() }, 'menu1')
    })

    expect(result.current.subSubMenuState).toBe('closed')
  })
})
