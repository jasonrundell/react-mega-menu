import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  renderMainMenuItem,
  renderLinkMenuItem,
  renderMegaMenuItem,
  renderSubMenuItem,
  stateMachine,
  generateMenuIds,
  handleUrl
} from './menu'
import { useMenu } from '../context/MenuContext'
import MegaList from '../components/MegaList'
import NavItemDescription from '../components/NavItemDescription'

// Mock the useMenu hook
jest.mock('../context/MenuContext', () => ({
  useMenu: jest.fn()
}))

describe('Menu Functions', () => {
  const toggleMegaMenuMock = jest.fn()
  const toggleSubMenuMock = jest.fn()
  const a11yClickMock = jest.fn(() => true)

  beforeEach(() => {
    useMenu.mockReturnValue({
      toggleMegaMenu: toggleMegaMenuMock,
      activeMenus: [],
      toggleSubMenu: toggleSubMenuMock,
      toggleSubSubMenu: jest.fn()
    })
  })

  test('renders MainNavItem correctly', () => {
    const item = {
      id: '1',
      type: 'link',
      url: '/home',
      label: 'Home'
    }
    const { getByRole } = render(renderMainMenuItem(item, 0))
    const mainNavItem = getByRole('none')
    expect(mainNavItem).toBeInTheDocument()
    expect(mainNavItem).toHaveClass('rmm__main-nav-item')
  })

  test('renders NavItem correctly', () => {
    const item = {
      id: '1',
      type: 'link',
      url: '/home',
      label: 'Home',
      items: [{ id: '2', type: 'link', url: '/about', label: 'About' }]
    }
    const { container } = render(
      renderMegaMenuItem(
        item,
        0,
        a11yClickMock,
        renderLinkMenuItem,
        renderSubMenuItem
      )
    )
    const navItem = container.querySelector('#rmm-nav-item-1')
    const navItemLink = container.querySelector('#rmm-main-nav-item-link-1')

    // Simulate click event
    fireEvent.click(navItemLink) // covers line 104

    // Assertions for the first item
    expect(navItem).toBeInTheDocument()
    expect(navItem).toHaveClass('rmm__nav-item rmm__nav-item--heading')
    expect(navItem).toHaveAttribute('id', 'rmm-nav-item-1')

    // Assertions for the nested item
    expect(navItemLink).toBeInTheDocument()
    expect(navItemLink).toHaveClass('rmm__main-nav-item-link')
    expect(navItemLink).toHaveAttribute('id', 'rmm-main-nav-item-link-1')

    // Verify that toggleSubMenu is called with the correct arguments
    expect(toggleSubMenuMock).toHaveBeenCalledWith(
      expect.any(Object),
      'rmm-mega-list-id-1'
    )
  })

  test('renders NavItemLink correctly', () => {
    const item = {
      id: '2',
      type: 'link',
      url: '/about',
      label: 'About'
    }
    const { getByRole } = render(renderLinkMenuItem(item, 0))
    const navItemLink = getByRole('menuitem')
    expect(navItemLink).toBeInTheDocument()
    expect(navItemLink).toHaveAttribute('href', '/about')
  })

  test('renders MegaList correctly', () => {
    const { container } = render(
      <MegaList id="mega-list" activeState="closed">
        <div></div>
      </MegaList>
    )
    const megaList = container.querySelector('#mega-list')
    expect(megaList).toBeInTheDocument()
  })

  test('renders NavItemDescription correctly', () => {
    const { getByText } = render(
      <NavItemDescription>Description</NavItemDescription>
    )
    const description = getByText('Description')
    expect(description).toBeInTheDocument()
  })

  test('renderMainMenuItem renders correctly', () => {
    const item = { id: '1', label: 'Home', url: '/', type: 'main' }
    const { getByRole } = render(renderMainMenuItem(item, 0))
    expect(getByRole('menuitem')).toHaveTextContent('Home')
  })

  test('renderLinkMenuItem renders correctly', () => {
    const item = {
      id: '2',
      label: 'Deals',
      url: '/deals',
      type: 'link',
      description: 'Deals description'
    }
    const { getByRole, getByText } = render(renderLinkMenuItem(item, 0))
    expect(getByRole('menuitem')).toHaveTextContent('Deals')
    expect(getByText('Deals description')).toBeInTheDocument()
  })

  test('renderMegaMenuItem renders correctly', () => {
    const item = {
      id: '3',
      label: 'Store',
      url: '/store',
      type: 'mega',
      items: [{ id: '4', label: 'SubItem', url: '/subitem', type: 'link' }]
    }
    const { container } = render(
      renderMegaMenuItem(
        item,
        0,
        jest.fn(),
        renderLinkMenuItem,
        renderSubMenuItem
      )
    )
    const menuItem = container.querySelector('#rmm-main-nav-item-link-3')
    expect(menuItem).toHaveTextContent('Store')
  })

  test('calls toggleSubMenu onClick event for renderMegaMenuItem', () => {
    const item = {
      id: '1',
      type: 'link',
      url: '/home',
      label: 'Home',
      items: [{ id: '2', type: 'link', url: '/about', label: 'About' }]
    }

    const { container } = render(
      renderMegaMenuItem(
        item,
        0,
        a11yClickMock,
        renderLinkMenuItem,
        renderSubMenuItem
      )
    )

    const navItemLink = container.querySelector('#rmm-nav-item-link-1')

    fireEvent.click(navItemLink) // covers line 130

    // Verify that toggleSubMenu is called with the correct arguments
    expect(toggleSubMenuMock).toHaveBeenCalledWith(
      expect.any(Object),
      'rmm-mega-list-id-1'
    )
  })

  test('calls toggleSubMenu on keydown event for renderMegaMenuItem', () => {
    const item = {
      id: '1',
      type: 'link',
      url: '/home',
      label: 'Home',
      items: [{ id: '2', type: 'link', url: '/about', label: 'About' }]
    }

    const { container } = render(
      renderMegaMenuItem(
        item,
        0,
        a11yClickMock,
        renderLinkMenuItem,
        renderSubMenuItem
      )
    )

    const navItemLink = container.querySelector('#rmm-nav-item-link-1')

    // Simulate keydown event
    fireEvent.keyDown(navItemLink, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13
    })

    // Verify that toggleSubMenu is called with the correct arguments
    expect(toggleSubMenuMock).toHaveBeenCalledWith(
      expect.any(Object),
      'rmm-mega-list-id-1'
    )
  })

  test('renderSubMenuItem renders correctly', () => {
    const item = {
      id: '5',
      label: 'Outdoors',
      url: '/outdoors',
      type: 'sub',
      items: [{ id: '6', label: 'Tools', url: '/tools', type: 'link' }]
    }
    const { container } = render(
      renderSubMenuItem(item, 0, jest.fn(), renderLinkMenuItem)
    )

    const navItemLink = container.querySelector('#rmm-nav-item-link-sub-5')

    fireEvent.click(navItemLink) // covers line 221

    const menuItem = container.querySelector('#rmm-nav-item-link-5')
    expect(menuItem).toHaveTextContent('Outdoors')
  })

  test('stateMachine toggles state correctly', () => {
    expect(stateMachine('closed')).toBe('open')
    expect(stateMachine('open')).toBe('closed')
    expect(stateMachine('invalid')).toBe('open')
  })

  test('generateMenuIds generates unique ids', () => {
    const menuConfig = {
      menu: {
        items: [
          {
            label: 'Item1',
            items: [{ label: 'SubItem1', items: [{ label: 'SubSubItem1' }] }]
          },
          { label: 'Item2' }
        ]
      }
    }
    const newMenuConfig = generateMenuIds(menuConfig)
    expect(newMenuConfig.menu.items[0].id).toBeDefined()
    expect(newMenuConfig.menu.items[0].items[0].id).toBeDefined()
    expect(newMenuConfig.menu.items[0].items[0].items[0].id).toBeDefined()
    expect(newMenuConfig.menu.items[1].id).toBeDefined()
  })
})

describe('handleUrl function', () => {
  let originalLocation

  beforeAll(() => {
    // Save the original window.location
    originalLocation = window.location
    delete window.location
    window.location = { href: '' }
  })

  afterAll(() => {
    // Restore the original window.location
    window.location = originalLocation
  })

  test('calls toggleMegaMenu when URL does not include http', () => {
    const toggleMegaMenuMock = jest.fn()
    const eventMock = {}

    handleUrl(eventMock, '/internal-link', toggleMegaMenuMock)

    expect(toggleMegaMenuMock).toHaveBeenCalledWith(eventMock)
    expect(window.location.href).toBe('/internal-link')
  })

  test('does not call toggleMegaMenu when URL includes http', () => {
    const toggleMegaMenuMock = jest.fn()
    const eventMock = {}

    handleUrl(eventMock, 'http://external-link.com', toggleMegaMenuMock)

    expect(toggleMegaMenuMock).not.toHaveBeenCalled()
    expect(window.location.href).toBe('http://external-link.com')
  })
})
