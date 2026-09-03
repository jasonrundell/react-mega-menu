import React from 'react'

// Context
import { useMenu } from '../context/MenuContext'

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
import { config } from '../config/defaultMenuConfig'

export const handleUrl = (e, url, toggleMegaMenu) => {
  if (!url.includes('http')) {
    toggleMegaMenu(e)
  }
  window.location.href = url
}

export const formatIdString = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const renderMainMenuItem = (item) => {
  const { toggleMegaMenu } = useMenu()

  return (
    <MainNavItem
      role="none"
      id={`rmm-main-nav-item-${formatIdString(item.id)}`}
      key={`rmm-main-nav-item-${formatIdString(item.id)}`}
      className="rmm__main-nav-item"
    >
      <MainNavItemLink
        id={`rmm-main-nav-item-link-${formatIdString(item.id)}`}
        role="menuitem"
        type={item.type}
        href={item.url}
        onClick={(e) => handleUrl(e, item.url, toggleMegaMenu)}
        className="rmm__main-nav-item-link"
      >
        {item.label}
      </MainNavItemLink>
    </MainNavItem>
  )
}

export const renderLinkMenuItem = (item) => {
  const { toggleMegaMenu } = useMenu()

  return (
    <NavItem
      id={`rmm-nav-item-${formatIdString(item.id)}`}
      role="none"
      key={`rmm-nav-item-${formatIdString(item.id)}`}
      className="rmm__nav-item"
    >
      <NavItemLink
        id={`rmm-nav-item-link-${formatIdString(item.id)}`}
        role="menuitem"
        href={item.url}
        onClick={(e) => handleUrl(e, item.url, toggleMegaMenu)}
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
  a11yClick,
  renderLinkMenuItem,
  renderSubMenuItem
) => {
  const { activeMenus, toggleSubMenu } = useMenu()

  return (
    <MainNavItem
      id={`rmm-main-nav-item-${formatIdString(item.id)}`}
      role="none"
      key={`rmm-main-nav-item-${formatIdString(item.id)}`}
      className="rmm__main-nav-item"
    >
      <MainNavItemLink
        id={`rmm-main-nav-item-link-${formatIdString(item.id)}`}
        role="menuitem"
        type={item.type}
        href={item.url}
        isActive={
          !!activeMenus.includes(`rmm-mega-list-id-${formatIdString(item.id)}`)
        }
        onClick={(e) =>
          toggleSubMenu(e, `rmm-mega-list-id-${formatIdString(item.id)}`)
        }
        onKeyDown={(e) =>
          a11yClick(e) &&
          toggleSubMenu(e, `rmm-mega-list-id-${formatIdString(item.id)}`)
        }
        ariaHaspopup="true"
        ariaControls={`rmm-mega-list-id-${formatIdString(item.id)}`}
        className="rmm__main-nav-item-link rmm__main-nav-item-link--forward"
      >
        {item.label}
      </MainNavItemLink>
      <MegaList
        id={`rmm-mega-list-id-${formatIdString(item.id)}`}
        activeState={
          activeMenus.includes(`rmm-mega-list-id-${formatIdString(item.id)}`)
            ? 'open'
            : 'closed'
        }
        className="rmm__mega-list"
      >
        <NavItem
          id={`rmm-nav-item-${formatIdString(item.id)}`}
          className="rmm__nav-item rmm__nav-item--heading"
        >
          <NavItemLink
            id={`rmm-nav-item-link-${formatIdString(item.id)}`}
            href={item.url}
            onClick={(e) =>
              toggleSubMenu(e, `rmm-mega-list-id-${formatIdString(item.id)}`)
            }
            onKeyDown={(e) =>
              a11yClick(e) &&
              toggleSubMenu(e, `rmm-mega-list-id-${formatIdString(item.id)}`)
            }
            ariaHaspopup="true"
            ariaControls={`rmm-mega-list-id-${formatIdString(item.id)}`}
            className="rmm__nav-item-link rmm__nav-item-link--back"
          >
            {item.label}
          </NavItemLink>
        </NavItem>
        {item.items.map((item) => {
          switch (item.type) {
            case MENU_ITEM_TYPE_MEGA:
              return renderMegaMenuItem(
                item,
                a11yClick,
                renderLinkMenuItem,
                renderSubMenuItem
              )
            case MENU_ITEM_TYPE_SUB:
              return renderSubMenuItem(item, a11yClick, renderLinkMenuItem)
            default:
              return renderLinkMenuItem(item)
          }
        })}
      </MegaList>
    </MainNavItem>
  )
}

export const renderSubMenuItem = (item, a11yClick, renderLinkMenuItem) => {
  const { activeMenus, toggleSubMenu, toggleSubSubMenu } = useMenu()

  return (
    <NavItem
      id={`rmm-nav-item-${formatIdString(item.id)}`}
      key={`rmm-nav-item-${formatIdString(item.id)}`}
      className="rmm__nav-item"
    >
      <NavItemLink
        id={`rmm-nav-item-link-${formatIdString(item.id)}`}
        role="menuitem"
        href={item.url}
        onClick={(e) =>
          toggleSubSubMenu(e, `rmm-nav-list-id-${formatIdString(item.id)}`)
        }
        onKeyDown={(e) =>
          a11yClick(e) &&
          toggleSubSubMenu(e, `rmm-nav-list-id-${formatIdString(item.id)}`)
        }
        ariaHaspopup="true"
        ariaControls={`rmm-nav-list-id-${formatIdString(item.id)}`}
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
        id={`rmm-nav-list-id-${formatIdString(item.id)}`}
        role="menu"
        type={item.type}
        activeState={
          activeMenus.includes(`rmm-nav-list-id-${formatIdString(item.id)}`)
            ? 'open'
            : 'closed'
        }
        ariaLabelledby={`rmm-nav-item-link-${formatIdString(item.id)}`}
        className={`rmm__nav-list rmm__nav-list--${formatIdString(item.type)} ${
          item.type === MENU_ITEM_TYPE_SUB ? 'rmm__nav-list--dropdown' : ''
        }`}
      >
        <NavItem
          id={`rmm-nav-item-sub-${formatIdString(item.id)}`}
          role="none"
          className="rmm__nav-item rmm__nav-item--heading"
        >
          <NavItemLink
            id={`rmm-nav-item-link-sub-${formatIdString(item.id)}`}
            role="menuitem"
            href={item.url}
            onClick={(e) =>
              toggleSubMenu(e, `rmm-nav-list-id-${formatIdString(item.id)}`)
            }
            onKeyDown={(e) =>
              a11yClick(e) &&
              toggleSubMenu(e, `rmm-nav-list-id-${formatIdString(item.id)}`)
            }
            ariaHaspopup="true"
            ariaControls={`rmm-nav-list-id-${formatIdString(item.id)}`}
            className="rmm__nav-item-link rmm__nav-item-link--back"
          >
            {item.label}
          </NavItemLink>
        </NavItem>
        {item.items.map((item) => {
          switch (item.type) {
            case MENU_ITEM_TYPE_LINK:
              return renderLinkMenuItem(item)
            default:
              return null
          }
        })}
      </NavList>
    </NavItem>
  )
}

export const stateMachine = (state) => {
  const defaultState = 'closed'

  switch (state) {
    case 'closed':
      return 'open'
    case 'open':
      return 'closed'
    default:
      return defaultState
  }
}

// The default config lives in its own JSDoc-typed module (see #102); it is
// re-exported here so existing imports of `config` keep working.
export { config }
