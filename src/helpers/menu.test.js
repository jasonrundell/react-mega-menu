import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  renderMainMenuItem,
  renderLinkMenuItem,
  renderMegaMenuItem,
  renderSubMenuItem,
  stateMachine,
  generateMenuIds
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

  beforeEach(() => {
    useMenu.mockReturnValue({
      toggleMegaMenu: toggleMegaMenuMock,
      activeMenus: [],
      toggleSubMenu: jest.fn(),
      toggleSubSubMenu: jest.fn()
    })
  })

  test('renders MainNavItem correctly', () => {
    const item = { id: '1', type: 'link', url: '/home', label: 'Home' }
    const { getByRole } = render(renderMainMenuItem(item, 0))
    const mainNavItem = getByRole('none')
    expect(mainNavItem).toBeInTheDocument()
    expect(mainNavItem).toHaveClass('rmm__main-nav-item')
  })

  test('renders NavItem correctly', () => {
    const item = { id: '2', type: 'link', url: '/about', label: 'About' }
    const { getByRole } = render(renderLinkMenuItem(item, 0))
    const navItem = getByRole('none')
    expect(navItem).toBeInTheDocument()
    expect(navItem).toHaveClass('rmm__nav-item')
  })

  test('renders NavItemLink correctly', () => {
    const item = { id: '2', type: 'link', url: '/about', label: 'About' }
    const { getByRole } = render(renderLinkMenuItem(item, 0))
    const navItemLink = getByRole('menuitem')
    expect(navItemLink).toBeInTheDocument()
    expect(navItemLink).toHaveAttribute('href', '/about')
  })

  test('renders MegaList correctly', () => {
    const { getByTestId } = render(<MegaList data-testid="mega-list" />)
    const megaList = getByTestId('mega-list')
    expect(megaList).toBeInTheDocument()
  })

  test('renders NavItemDescription correctly', () => {
    const { getByText } = render(
      <NavItemDescription>Description</NavItemDescription>
    )
    const description = getByText('Description')
    expect(description).toBeInTheDocument()
  })

  test('handleUrl function works correctly', () => {
    const item = { id: '1', type: 'link', url: '/home', label: 'Home' }
    const { getByRole } = render(renderMainMenuItem(item, 0))
    const mainNavItemLink = getByRole('menuitem')
    fireEvent.click(mainNavItemLink)
    expect(toggleMegaMenuMock).toHaveBeenCalled()
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
