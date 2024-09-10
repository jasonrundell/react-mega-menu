import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

// Helpers
import { click as a11yClick, escape as a11yEscape } from './helpers/a11y'
import { respondTo, viewportLarge } from './helpers/responsive'
import {
  renderMainMenuItem,
  renderLinkMenuItem,
  renderMegaMenuItem,
  renderSubMenuItem,
  stateMachine,
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
            url: '/?kitchen',
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
        url: '/?contact'
      }
    ]
  }
}

export const Menu = ({ config = defaultMenuConfig, className, ...props }) => {
  const [megaMenuState, setMegaMenuState] = useState('')
  const [subMenuState, setSubMenuState] = useState('')
  const [subSubMenuState, setSubSubMenuState] = useState('')
  const [activeMenus, setActiveMenus] = useState([]) // array that captures the ids of active menus
  const [isMobile, setIsMobile] = useState(true) // array that captures the ids of active menus
  const wrapperRef = useRef(null) // used to detect clicks outside of component

  const resetMenus = () => {
    // close all menus and empty activeMenus array
    setActiveMenus([])
    setSubMenuState('closed')
    setSubSubMenuState('closed')
  }

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      // Reset menu if clicked on outside of element
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          resetMenus()
        }
      }

      // Bind the event listener to both mouse and key events
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleClickOutside)
      return () => {
        // Unbind the event listener to clean up
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleClickOutside)
      }
    }, [ref])
  }

  const updateActiveMenus = (state, menuId) => {
    if (state === 'open') {
      // add menuId from activeMenus
      setActiveMenus([...activeMenus, menuId])
    } else if (state === 'closed') {
      // remove menuId from activeMenus
      setActiveMenus(activeMenus.filter((item) => item !== menuId))
    }
  }

  const toggleMegaMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = stateMachine(megaMenuState)

    setMegaMenuState(nextState)

    updateActiveMenus(nextState, menuId)

    if (megaMenuState === 'open') {
      resetMenus()
    }
  }

  const toggleSubMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = stateMachine(subMenuState)

    setSubMenuState(stateMachine(subMenuState))
    /*
      I haven't come up with single solution (yet) that takes care of
      opening and closing menus for both small and large screens, so for
      now I fork the logic based on viewport size.
      */
    if (!isMobile) {
      if (activeMenus.includes(menuId)) {
        // menu is already open, remove it from activeMenus to close it
        setActiveMenus([])
      } else {
        // menu is not yet active, add it to activeMenus to open it
        setActiveMenus([menuId])
      }
    } else {
      // remove menuId from activeMenus
      updateActiveMenus(nextState, menuId)
    }
  }

  const toggleSubSubMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = stateMachine(subSubMenuState)

    setSubSubMenuState(stateMachine(subSubMenuState))

    updateActiveMenus(nextState, menuId)
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
    if (window.innerWidth >= viewportLarge) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [activeMenus, isMobile])

  useOutsideAlerter(wrapperRef) // create bindings for closing menu from outside events

  return (
    <StyledMenu
      id={props.id || 'rmm__menu'}
      role="navigation"
      ref={wrapperRef}
      className={className ? 'rmm__menu ' + className : 'rmm__menu'}
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
        onClick={(e) => toggleMegaMenu(e, 'nav-main')}
        className="rmm__hamburger"
      />
      <Nav
        id={props.id || 'rmm__nav'}
        activeState={megaMenuState}
        ariaLabel="Main Navigation"
        className={className ? 'rmm__nav ' + className : 'rmm__menu'}
      >
        <MainList
          id={props.id || 'rmm__main'}
          ariaLabel="Main Menu"
          className="rmm__nav-list"
        >
          {config.menu.items.map((item, index) => {
            switch (item.type) {
              case MENU_ITEM_TYPE_MAIN:
                return renderMainMenuItem(item, index)
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
  id: PropTypes.string,
  className: PropTypes.string
}

export default Menu
