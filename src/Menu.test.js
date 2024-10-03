import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Menu } from './Menu'
import { useMenu } from './context/MenuContext'
import { config } from './helpers/menu'

// Mock the useMenu hook
jest.mock('./context/MenuContext', () => ({
  useMenu: jest.fn()
}))

describe('Menu component', () => {
  const resetMenusMock = jest.fn()
  const toggleMegaMenuMock = jest.fn()
  const setIsMobileMock = jest.fn()

  beforeEach(() => {
    useMenu.mockReturnValue({
      resetMenus: resetMenusMock,
      megaMenuState: false,
      toggleMegaMenu: toggleMegaMenuMock,
      setIsMobile: setIsMobileMock,
      activeMenus: []
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const defaultConfig = config

  test('renders different components of Menu', () => {
    const { container, getByRole, getByText } = render(
      <Menu config={defaultConfig} />
    )

    // console.log(container.innerHTML)

    // Check if the TopBar component is rendered
    const menuComponent = container.querySelector('#rmm__menu')
    expect(menuComponent).toBeInTheDocument()

    // Check if the TopBar component is rendered
    const topBarComponent = container.querySelector('#rmm__topbar')
    expect(topBarComponent).toBeInTheDocument()
    expect(topBarComponent).toHaveTextContent('React Mega Menu')
    expect(getByRole('img', { name: 'Placeholder Logo' })).toBeInTheDocument()

    // Check if the TopBarTitle component is rendered
    const topBarTitleComponent = container.querySelector('#rmm__title')
    expect(topBarTitleComponent).toBeInTheDocument()

    // Check if the Hamburger component is rendered
    const hamburgerComponent = container.querySelector('#rmm__hamburger')
    expect(hamburgerComponent).toBeInTheDocument()

    // Check if the MainList component is rendered
    const mainListComponent = container.querySelector('#rmm__main')
    expect(mainListComponent).toBeInTheDocument()

    // Check if the Nav component is rendered
    const navComponent = container.querySelector('#rmm__nav')
    expect(navComponent).toBeInTheDocument()

    // Check if the export const renderSubMenuItem component is rendered
    const renderSubMenuItemComponent = container.querySelector(
      '#rmm-nav-item-store-outdoors'
    )
    expect(renderSubMenuItemComponent).toBeInTheDocument()
  })

  test('handles outside clicks to reset menus', () => {
    render(<Menu config={defaultConfig} />)
    fireEvent.mouseDown(document)
    expect(resetMenusMock).toHaveBeenCalled()
  })

  test('handles escape key to reset menus', () => {
    render(<Menu config={defaultConfig} />)
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape', keyCode: 27 })
    expect(resetMenusMock).toHaveBeenCalled()
  })

  test('updates mobile state based on window resize', () => {
    render(<Menu config={defaultConfig} />)
    global.innerWidth = 500
    fireEvent.resize(window)
    expect(setIsMobileMock).toHaveBeenCalledWith(true)

    global.innerWidth = 1200
    fireEvent.resize(window)
    expect(setIsMobileMock).toHaveBeenCalledWith(false)
  })

  test('onClick event fires for Hamburger', () => {
    const { container } = render(<Menu config={defaultConfig} />)
    const hamburger = container.querySelector('#rmm__hamburger')
    fireEvent.click(hamburger)
    expect(toggleMegaMenuMock).toHaveBeenCalled()
  })
})
