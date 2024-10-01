import React from 'react'
import { v4 as uuidv4 } from 'uuid'

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

const handleUrl = (e, url, toggleMegaMenu) => {
  if (!url.includes('http')) {
    toggleMegaMenu(e)
  }
  window.location.href = url
}

export const renderMainMenuItem = (item, index) => {
  const { toggleMegaMenu } = useMenu()

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
        onClick={(e) => handleUrl(e, item.url, toggleMegaMenu)}
        className="rmm__main-nav-item-link"
      >
        {item.label}
      </MainNavItemLink>
    </MainNavItem>
  )
}

export const renderLinkMenuItem = (item, index) => {
  const { toggleMegaMenu } = useMenu()

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
  index,
  a11yClick,
  renderLinkMenuItem,
  renderSubMenuItem
) => {
  const { activeMenus, toggleSubMenu } = useMenu()

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
                a11yClick,
                renderLinkMenuItem,
                renderSubMenuItem
              )
            case MENU_ITEM_TYPE_SUB:
              return renderSubMenuItem(
                item,
                index,
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
  a11yClick,
  renderLinkMenuItem
) => {
  const { activeMenus, toggleSubMenu, toggleSubSubMenu } = useMenu()

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

// function that will use uuidv4 to generate unique ids for each menu item in menuConfig
export const generateMenuIds = (menuConfig) => {
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

export const config = {
  topbar: {
    id: 'topbar',
    logo: {
      src: 'https://via.placeholder.com/150x50',
      alt: 'Placeholder Logo',
      rel: 'home'
    },
    title: 'React Mega Menu'
  },
  menu: {
    items: [
      {
        label: 'Home',
        type: 'main',
        url: '/'
      },
      {
        label: 'About',
        type: 'main',
        url: '/about/'
      },
      {
        label: 'Store',
        type: 'mega',
        url: '/store/',
        items: [
          {
            label: 'Deals',
            type: 'link',
            url: '/store/deals/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            label: 'Kitchen',
            type: 'link',
            url: '/store/kitchen/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            label: 'Outdoors',
            type: 'sub',
            url: '/store/outdoors/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                label: 'Tools',
                type: 'link',
                url: '/store/outdoors/tools/',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Plants',
                type: 'link',
                url: '/store/outdoors/plants/',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Patio',
                type: 'link',
                url: '/store/outdoors/patio/',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Decking',
                type: 'link',
                url: '/store/outdoors/decking/',
                description: 'Single line description that accompanies link'
              }
            ]
          },
          {
            label: 'Bedroom',
            type: 'sub',
            url: '/store/bedroom/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                label: 'Beds',
                type: 'link',
                url: '/store/bedroom/beds/',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Dressers',
                type: 'link',
                url: '/store/bedroom/dressers/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                label: 'Nightstands',
                type: 'link',
                url: '/store/bedroom/nightstands/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                label: 'Benches',
                type: 'link',
                url: '/store/bedroom/benches/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              }
            ]
          }
        ]
      },
      {
        label: 'Blog',
        type: 'mega',
        url: '/blog/',
        items: [
          {
            label: 'Latest Post Title',
            type: 'link',
            url: '/blog/posts/latest-post-title/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          },
          {
            label: 'Categories',
            type: 'sub',
            url: '/blog/categories/',
            items: [
              {
                label: 'News',
                type: 'link',
                url: '/blog/news/'
              },
              {
                label: 'Recipes',
                type: 'link',
                url: '/blog/recipes/'
              },
              {
                label: 'Health',
                type: 'link',
                url: '/blog/health/'
              },
              {
                label: 'Diet',
                type: 'link',
                url: '/blog/diet/'
              }
            ]
          }
        ]
      },
      {
        label: 'Help',
        type: 'mega',
        url: '/help/',
        items: [
          {
            label: 'FAQ',
            type: 'link',
            url: '/help/faq/',
            description: 'Single line description that accompanies link'
          },
          {
            label: 'Knowledge Base',
            type: 'link',
            url: '/help/knowledge-base/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          }
        ]
      },
      {
        label: 'Settings',
        type: 'mega',
        url: '/settings/',
        items: [
          {
            label: 'Profile',
            type: 'link',
            url: '/settings/profile/',
            description: 'Single line description that accompanies link'
          },
          {
            label: 'Billing',
            type: 'link',
            url: '/settings/billing/',
            description: 'Single line description that accompanies link'
          },
          {
            label: 'Theme',
            type: 'sub',
            url: '#',
            description: 'Change the React Mega Menu theme',
            items: [
              {
                label: 'Light',
                type: 'link',
                url: '/?theme=light'
              },
              {
                label: 'Dark',
                type: 'link',
                url: '/?theme=dark'
              },
              {
                label: 'Monokai',
                type: 'link',
                url: '/?theme=monokai'
              },
              {
                label: 'Retro',
                type: 'link',
                url: '/?theme=retro'
              },
              {
                label: 'Synthwave',
                type: 'link',
                url: '/?theme=synthwave'
              }
            ]
          },
          {
            label: 'Logout',
            type: 'link',
            url: '/settings/logout/',
            description: 'Single line description that accompanies link'
          }
        ]
      },
      {
        label: 'Contact',
        type: 'main',
        url: '#contact'
      }
    ]
  }
}
