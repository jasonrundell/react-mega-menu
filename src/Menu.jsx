import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

// Context
import { useMenu } from './context/MenuContext' // Adjust the path as necessary

// Helpers
import { click as a11yClick, escape as a11yEscape } from './helpers/a11y'
import { respondTo, viewportLarge } from './helpers/responsive'
import {
  renderMainMenuItem,
  renderLinkMenuItem,
  renderMegaMenuItem,
  renderSubMenuItem,
  generateMenuIds
} from './helpers/menu'
import {
  MENU_ITEM_TYPE_MAIN,
  MENU_ITEM_TYPE_LINK,
  MENU_ITEM_TYPE_MEGA,
  MENU_ITEM_TYPE_SUB
} from './config/menuItemTypes'

// Components
import TopBar from './components/TopBar'
import Logo from './components/Logo'
import TopBarTitle from './components/TopBarTitle'
import Hamburger from './components/Hamburger'
import Nav from './components/Nav'
import MainList from './components/MainList'

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 8rem;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-direction: row;
  width: 100%;
  z-index: 9000;

  ${respondTo('large')} {
    height: 4rem;
  }
`
const defaultMenuConfig = {
  topbar: {
    id: 'topbar',
    logo: {
      src: 'https://via.placeholder.com/150x50',
      alt: 'Placeholder Logo',
      rel: 'home'
    },
    title: 'Your Site Title'
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
        url: '/?about'
      },
      {
        label: 'Store',
        type: 'mega',
        url: '/?store',
        items: [
          {
            label: 'Deals',
            type: 'link',
            url: '/?deals',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            label: 'Kitchen',
            type: 'link',
            url: '#kitchen',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide."
          },
          {
            label: 'Outdoors',
            type: 'sub',
            url: '/?outdoors',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                label: 'Tools',
                type: 'link',
                url: '/?tools',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Plants',
                type: 'link',
                url: '/?plants',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Patio',
                type: 'link',
                url: '/?patio',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Decking',
                type: 'link',
                url: '/?decking',
                description: 'Single line description that accompanies link'
              }
            ]
          },
          {
            label: 'Bedroom',
            type: 'sub',
            url: '/?bedroom',
            description:
              "Three lined small description that accompanies link in the React Mega Menu project. This maybe too much text? Who's to say, really. We'll leave it to fate to decide.",
            items: [
              {
                label: 'Beds',
                type: 'link',
                url: '/?beds',
                description: 'Single line description that accompanies link'
              },
              {
                label: 'Dressers',
                type: 'link',
                url: '/?dressers',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                label: 'Nightstands',
                type: 'link',
                url: '/?nightstands',
                description:
                  'Double lined small description that accompanies link in the React Mega Menu project'
              },
              {
                label: 'Benches',
                type: 'link',
                url: '/?benches',
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
        url: '/?blog',
        items: [
          {
            label: 'Latest Post Title',
            type: 'link',
            url: '/?latest-post-title',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
          },
          {
            label: 'Categories',
            type: 'sub',
            url: '/?categories',
            items: [
              {
                label: 'News',
                type: 'link',
                url: '/?news'
              },
              {
                label: 'Recipes',
                type: 'link',
                url: '/?recipes'
              },
              {
                label: 'Health',
                type: 'link',
                url: '/?health'
              },
              {
                label: 'Diet',
                type: 'link',
                url: '/?diet'
              }
            ]
          }
        ]
      },
      {
        label: 'Help',
        type: 'mega',
        url: '/?help',
        items: [
          {
            label: 'FAQ',
            type: 'link',
            url: '/?faq',
            description: 'Single line description that accompanies link'
          },
          {
            label: 'Knowledge Base',
            type: 'link',
            url: '/?knowledge-base',
            description:
              'Double lined small description that accompanies link in the React Mega Menu project'
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

export const Menu = ({ config = defaultMenuConfig, ...props }) => {
  const {
    resetMenus,
    activeMenus,
    megaMenuState,
    toggleMegaMenu,
    toggleSubMenu,
    toggleSubSubMenu,
    setIsMobile
  } = useMenu()

  const wrapperRef = useRef(null) // used to detect clicks outside of component

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          resetMenus()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleClickOutside)
      }
    }, [ref, resetMenus])
  }

  useEffect(() => {
    // generate unique ids for each menu item in config
    config = generateMenuIds(config)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => a11yEscape(e, resetMenus)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [resetMenus])

  useEffect(() => {
    const updateIsMobile = () => {
      if (window.innerWidth >= viewportLarge) {
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    }

    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)

    return () => {
      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  useOutsideAlerter(wrapperRef) // create bindings for closing menu from outside events

  return (
    <StyledMenu
      id={props.id || 'rmm__menu'}
      role="navigation"
      ref={wrapperRef}
      className={props.className ? 'rmm__menu ' + props.className : 'rmm__menu'}
      {...props}
    >
      <TopBar className="rmm__topbar">
        <Logo
          id={config.topbar.id}
          src={config.topbar.logo.src}
          alt={config.topbar.logo.alt}
          rel={config.topbar.logo.rel}
        />
        <TopBarTitle className="rmm__title">{config.topbar.title}</TopBarTitle>
      </TopBar>
      <Hamburger
        label="Menu"
        state={megaMenuState}
        onClick={(e) => toggleMegaMenu(e)}
        id="rmm__hamburger"
      />
      <Nav
        id={props.id || 'rmm__nav'}
        activeState={megaMenuState}
        ariaLabel="Main Navigation"
        className={
          props.className ? 'rmm__nav ' + props.className : 'rmm__menu'
        }
      >
        <MainList
          id={props.id || 'rmm__main'}
          ariaLabel="Main Menu"
          className="rmm__nav-list"
        >
          {config.menu.items.map((item, index) => {
            switch (item.type) {
              case MENU_ITEM_TYPE_MAIN:
                return renderMainMenuItem(item, index, toggleMegaMenu)
              case MENU_ITEM_TYPE_LINK:
                return renderLinkMenuItem(item, index, toggleMegaMenu)
              case MENU_ITEM_TYPE_MEGA:
                return renderMegaMenuItem(
                  item,
                  index,
                  a11yClick,
                  renderLinkMenuItem,
                  renderSubMenuItem,
                  toggleMegaMenu
                )
              case MENU_ITEM_TYPE_SUB:
                return renderSubMenuItem(
                  item,
                  index,
                  a11yClick,
                  renderLinkMenuItem,
                  toggleMegaMenu
                )
              default:
                return null
            }
          })}
        </MainList>
      </Nav>
    </StyledMenu>
  )
}

Menu.propTypes = {
  config: PropTypes.shape({
    topbar: PropTypes.shape({
      id: PropTypes.string.isRequired,
      logo: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        rel: PropTypes.string
      }),
      title: PropTypes.string.isRequired
    }),
    menu: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
          description: PropTypes.string
        })
      )
    })
  }),
  className: PropTypes.string,
  id: PropTypes.string
}

export default Menu
