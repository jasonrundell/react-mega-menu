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
      isChildren
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
        id: 'home',
        label: 'Home',
        type: 'main',
        url: '/'
      },
      {
        id: 'about',
        label: 'About',
        type: 'main',
        url: '/about/'
      },
      {
        id: 'store',
        label: 'Store',
        type: 'mega',
        url: '/store/',
        items: [
          {
            id: 'store-deals',
            label: 'Deals',
            type: 'link',
            url: '/store/deals/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            id: 'store-kitchen',
            label: 'Kitchen',
            type: 'link',
            url: '/store/kitchen/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            id: 'store-outdoors',
            label: 'Outdoors',
            type: 'sub',
            url: '/store/outdoors/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                id: 'store-outdoors-tools',
                label: 'Tools',
                type: 'link',
                url: '/store/outdoors/tools/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-outdoors-plants',
                label: 'Plants',
                type: 'link',
                url: '/store/outdoors/plants/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-outdoors-patio',
                label: 'Patio',
                type: 'link',
                url: '/store/outdoors/patio/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-outdoors-decking',
                label: 'Decking',
                type: 'link',
                url: '/store/outdoors/decking/',
                description: 'Single line description that accompanies link'
              }
            ]
          },
          {
            id: 'store-bedroom',
            label: 'Bedroom',
            type: 'sub',
            url: '/store/bedroom/',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                id: 'store-bedroom-beds',
                label: 'Beds',
                type: 'link',
                url: '/store/bedroom/beds/',
                description: 'Single line description that accompanies link'
              },
              {
                id: 'store-bedroom-dressers',
                label: 'Dressers',
                type: 'link',
                url: '/store/bedroom/dressers/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                id: 'store-bedroom-nightstands',
                label: 'Nightstands',
                type: 'link',
                url: '/store/bedroom/nightstands/',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                id: 'store-bedroom-benches',
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
        id: 'blog',
        label: 'Blog',
        type: 'mega',
        url: '/blog/',
        items: [
          {
            id: 'blog-latest-post-title',
            label: 'Latest Post Title',
            type: 'link',
            url: '/blog/posts/latest-post-title/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          },
          {
            id: 'blog-categories',
            label: 'Categories',
            type: 'sub',
            url: '/blog/categories/',
            items: [
              {
                id: 'blog-news',
                label: 'News',
                type: 'link',
                url: '/blog/news/'
              },
              {
                id: 'blog-recipes',
                label: 'Recipes',
                type: 'link',
                url: '/blog/recipes/'
              },
              {
                id: 'blog-health',
                label: 'Health',
                type: 'link',
                url: '/blog/health/'
              },
              {
                id: 'blog-diet',
                label: 'Diet',
                type: 'link',
                url: '/blog/diet/'
              }
            ]
          }
        ]
      },
      {
        id: 'help',
        label: 'Help',
        type: 'mega',
        url: '/help/',
        items: [
          {
            id: 'help-react-mega-menu',
            label: 'React Mega Menu',
            type: 'link',
            url: 'https://github.com/jasonrundell/react-mega-menu',
            description:
              'A React project which aims to be an accessible, responsive, boilerplate top navigation menu with a "Mega Menu"!'
          },
          {
            id: 'help-faq',
            label: 'FAQ',
            type: 'link',
            url: '/help/faq/',
            description: 'Single line description that accompanies link'
          },
          {
            id: 'help-knowledge-base',
            label: 'Knowledge Base',
            type: 'link',
            url: '/help/knowledge-base/',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          }
        ]
      },
      {
        id: 'settings',
        label: 'Settings',
        type: 'mega',
        url: '/settings/',
        items: [
          {
            id: 'settings-profile',
            label: 'Profile',
            type: 'link',
            url: '/settings/profile/',
            description: 'Single line description that accompanies link'
          },
          {
            id: 'settings-billing',
            label: 'Billing',
            type: 'link',
            url: '/settings/billing/',
            description: 'Single line description that accompanies link'
          },
          {
            id: 'settings-theme',
            label: 'Theme',
            type: 'sub',
            url: '#',
            description: 'Change the React Mega Menu theme',
            items: [
              {
                id: 'settings-theme-light',
                label: 'Light',
                type: 'link',
                url: '/?theme=light'
              },
              {
                id: 'settings-theme-dark',
                label: 'Dark',
                type: 'link',
                url: '/?theme=dark'
              },
              {
                id: 'settings-theme-monokai',
                label: 'Monokai',
                type: 'link',
                url: '/?theme=monokai'
              },
              {
                id: 'settings-theme-retro',
                label: 'Retro',
                type: 'link',
                url: '/?theme=retro'
              },
              {
                id: 'settings-theme-synthwave',
                label: 'Synthwave',
                type: 'link',
                url: '/?theme=synthwave'
              }
            ]
          },
          {
            id: 'settings-logout',
            label: 'Logout',
            type: 'link',
            url: '/settings/logout/',
            description: 'Single line description that accompanies link'
          }
        ]
      },
      {
        id: 'contact',
        label: 'Contact',
        type: 'main',
        url: '#contact'
      }
    ]
  }
}
