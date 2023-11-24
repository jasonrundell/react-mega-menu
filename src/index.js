import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { v4 as uuidv4 } from 'uuid'
import { click as a11yClick, escape as a11yEscape } from './helpers/a11y'
import { respondTo } from './helpers/responsive'
import {
  renderMainMenuItem,
  renderLinkMenuItem,
  renderMegaMenuItem,
  renderSubMenuItem,
  stateMachine
} from './helpers/menu'

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
  background-color: #fff;
  width: 100%;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  border-bottom: 0.0625rem solid #000;
  z-index: 9000;

  ${respondTo('large')} {
    height: 4rem;
  }
`

// function that will use uuidv4 to generate unique ids for each menu item in menuConfig
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

const Menu = ({ menuConfig, ...props }) => {
  const [megaMenuState, setMegaMenuState] = useState('')
  const [subMenuState, setSubMenuState] = useState('')
  const [subSubMenuState, setSubSubMenuState] = useState('')
  const [activeMenus, setActiveMenus] = useState([]) // array that captures the ids of active menus
  const [isMobile, setIsMobile] = useState(true) // array that captures the ids of active menus
  const wrapperRef = useRef(null) // used to detect clicks outside of component

  const viewportLarge = 1024

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
    // generate unique ids for each menu item in menuConfig
    menuConfig = generateMenuIds(menuConfig)
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
    <StyledMenu role="navigation" ref={wrapperRef} {...props}>
      <TopBar>
        <Logo
          id={menuConfig.topbar.id}
          src={menuConfig.topbar.logo.src}
          alt={menuConfig.topbar.logo.alt}
          rel={menuConfig.topbar.logo.rel}
        />
        <TopBarTitle>{menuConfig.topbar.title}</TopBarTitle>
      </TopBar>
      <Hamburger
        label="Menu"
        state={megaMenuState}
        onClick={(e) => toggleMegaMenu(e, 'nav-main')}
      />
      <Nav
        id="site-nav"
        activeState={megaMenuState}
        ariaLabel="Main Navigation"
      >
        <MainList id="rmm-main" ariaLabel="Main Menu">
          {menuConfig.menu.items.map((item, index) => {
            switch (item.type) {
              case 'main':
                return renderMainMenuItem(item, index)
              case 'link':
                return renderLinkMenuItem(item, index)
              case 'mega':
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
              case 'sub':
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

Menu.defaultProps = {
  menuConfig: {
    topbar: {
      id: 'topbar',
      logo: {
        src: 'https://via.placeholder.com/150x50',
        alt: 'Placeholder Logo',
        rel: 'home'
      },
      title: 'Menu'
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
          url: '/about'
        },
        {
          label: 'Contact',
          type: 'main',
          url: '/contact'
        }
      ]
    }
  }
}

Menu.propTypes = {
  menuConfig: PropTypes.shape({
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
  }).isRequired
}

export default Menu
