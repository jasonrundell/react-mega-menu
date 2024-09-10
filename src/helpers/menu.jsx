import React from 'react'
import { v4 as uuidv4 } from 'uuid'

// Components
import MegaList from '../components/MegaList'
import MainNavItem from '../components/MainNavItem'
import MainNavItemLink from '../components/MainNavItemLink'
import NavItem from '../components/NavItem'
import NavItemLink from '../components/NavItemLink'
import NavList from '../components/NavList'
import NavItemDescription from '../components/NavItemDescription'

import {
  MENU_ITEM_TYPE_LINK,
  MENU_ITEM_TYPE_MEGA,
  MENU_ITEM_TYPE_SUB
} from '../config/menuItemTypes'

export const renderMainMenuItem = (item, index) => {
  return (
    <MainNavItem
      role="none"
      id={`rmm-main-nav-item-${item.id}`}
      key={index}
      className="rmm__main-nav-item"
    >
      <MainNavItemLink
        id={`rmm-main-nav-item-link-${item.id}`}
        role="menuitem"
        type={item.type}
        href={item.url}
        className="rmm__main-nav-item-link"
      >
        {item.label}
      </MainNavItemLink>
    </MainNavItem>
  )
}

export const renderLinkMenuItem = (item, index) => {
  return (
    <NavItem
      id={`rmm-nav-item-${item.id}`}
      role="none"
      key={index}
      className="rmm__nav-item"
    >
      <NavItemLink
        id={`rmm-nav-item-link-${item.id}`}
        role="menuitem"
        href={item.url}
        className="rmm__nav-item-link"
      >
        {item.label}
      </NavItemLink>
      {item.description && (
        <NavItemDescription className="rmm__nav-item-description">
          {item.description}
        </NavItemDescription>
      )}
    </NavItem>
  )
}

export const renderMegaMenuItem = (
  item,
  index,
  activeMenus,
  toggleSubMenu,
  toggleSubSubMenu,
  a11yClick,
  renderLinkMenuItem,
  renderSubMenuItem
) => {
  return (
    <MainNavItem
      id={`rmm-main-nav-item-${item.id} `}
      role="none"
      isChildren
      key={index}
      className="rmm__main-nav-item"
    >
      <MainNavItemLink
        id={`rmm-main-nav-item-link-${item.id}`}
        role="menuitem"
        type={item.type}
        href={item.url}
        isActive={!!activeMenus.includes(`rmm-mega-list-id-${item.id}`)}
        onClick={(e) => toggleSubMenu(e, `rmm-mega-list-id-${item.id}`)}
        onKeyDown={(e) =>
          a11yClick(e) && toggleSubMenu(e, `rmm-mega-list-id-${item.id}`)
        }
        ariaHaspopup="true"
        ariaControls={`rmm-mega-list-id-${item.id}`}
        className="rmm__main-nav-item-link rmm__main-nav-item-link--forward"
      >
        {item.label}
      </MainNavItemLink>
      <MegaList
        id={`rmm-mega-list-id-${item.id}`}
        activeState={
          activeMenus.includes(`rmm-mega-list-id-${item.id}`)
            ? 'open'
            : 'closed'
        }
        className="rmm__mega-list"
      >
        <NavItem
          id={`rmm-nav-item-${item.id}`}
          className="rmm__nav-item rmm__nav-item--heading"
        >
          <NavItemLink
            id={`rmm-nav-item-link-${item.id}`}
            href={item.url}
            onClick={(e) => toggleSubMenu(e, `rmm-mega-list-id-${item.id}`)}
            onKeyDown={(e) =>
              a11yClick(e) && toggleSubMenu(e, `rmm-mega-list-id-${item.id}`)
            }
            ariaHaspopup="true"
            ariaControls={`rmm-mega-list-id-${item.id}`}
            className="rmm__nav-item-link rmm__nav-item-link--back"
          >
            {item.label}
          </NavItemLink>
        </NavItem>
        {item.items.map((item, index) => {
          switch (item.type) {
            case MENU_ITEM_TYPE_LINK:
              return renderLinkMenuItem(item, index)
            case MENU_ITEM_TYPE_MEGA:
              return renderMegaMenuItem(
                item,
                index,
                activeMenus,
                toggleSubMenu,
                toggleSubSubMenu,
                a11yClick,
                renderLinkMenuItem,
                renderSubMenuItem
              )
            case MENU_ITEM_TYPE_SUB:
              return renderSubMenuItem(
                item,
                index,
                activeMenus,
                toggleSubMenu,
                toggleSubSubMenu,
                a11yClick,
                renderLinkMenuItem
              )
            default:
              return null
          }
        })}
      </MegaList>
    </MainNavItem>
  )
}

export const renderSubMenuItem = (
  item,
  index,
  activeMenus,
  toggleSubMenu,
  toggleSubSubMenu,
  a11yClick,
  renderLinkMenuItem
) => {
  return (
    <NavItem
      id={`rmm-nav-tem-${item.id}`}
      key={index}
      className="rmm__nav-item"
    >
      <NavItemLink
        id={`rmm-nav-item-link-${item.id}`}
        role="menuitem"
        href={item.url}
        onClick={(e) => toggleSubSubMenu(e, `rmm-nav-list-id-${item.id}`)}
        onKeyDown={(e) =>
          a11yClick(e) && toggleSubSubMenu(e, `rmm-nav-list-id-${item.id}`)
        }
        ariaHaspopup="true"
        ariaControls={`rmm-nav-list-id-${item.id}`}
        className="rmm__nav-item-link rmm__nav-item-link--forward"
      >
        {item.label}
      </NavItemLink>
      {item.description && (
        <NavItemDescription className="rmm__nav-item-description">
          {item.description}
        </NavItemDescription>
      )}
      <NavList
        id={`rmm-nav-list-id-${item.id}`}
        role="menu"
        type={item.type}
        activeState={
          activeMenus.includes(`rmm-nav-list-id-${item.id}`) ? 'open' : 'closed'
        }
        ariaLabelledby={`rmm-nav-item-link-${item.id}`}
        className={`rmm__nav-list rmm__nav-list--${item.type} ${
          item.type === MENU_ITEM_TYPE_SUB ? 'rmm__nav-list--dropdown' : ''
        }`}
      >
        <NavItem
          id={`rmm-nav-item-sub-${item.id}`}
          role="none"
          className="rmm__nav-item rmm__nav-item--heading"
        >
          <NavItemLink
            id={`rmm-nav-item-link-sub-${item.id}`}
            role="menuitem"
            href={item.url}
            onClick={(e) => toggleSubMenu(e, `rmm-nav-list-id-${item.id}`)}
            onKeyDown={(e) =>
              a11yClick(e) && toggleSubMenu(e, `rmm-nav-list-id-${item.id}`)
            }
            ariaHaspopup="true"
            ariaControls={`rmm-nav-list-id-${item.id}`}
            className="rmm__nav-item-link rmm__nav-item-link--back"
          >
            {item.label}
          </NavItemLink>
        </NavItem>
        {item.items.map((item, index) => {
          switch (item.type) {
            case MENU_ITEM_TYPE_LINK:
              return renderLinkMenuItem(item, index)
            default:
              return null
          }
        })}
      </NavList>
    </NavItem>
  )
}

export const stateMachine = (state) => {
  const validStates = ['closed', 'open']
  const defaultState = 'open'
  let stateChangedTo = defaultState

  if (validStates.includes(state)) {
    switch (state) {
      case validStates[0]:
        stateChangedTo = validStates[1]
        break
      case validStates[1]:
        stateChangedTo = validStates[0]
        break
      default:
        stateChangedTo = validStates[0]
    }
  }
  return stateChangedTo
}

export // function that will use uuidv4 to generate unique ids for each menu item in menuConfig
const generateMenuIds = (menuConfig) => {
  const newMenuConfig = { ...menuConfig }
  newMenuConfig.menu.items.forEach((item) => {
    item.id = uuidv4()
    if (item.items) {
      item.items.forEach((subItem) => {
        subItem.id = uuidv4()
        if (subItem.items) {
          subItem.items.forEach((subSubItem) => {
            subSubItem.id = uuidv4()
          })
        }
      })
    }
  })
  return newMenuConfig
}
