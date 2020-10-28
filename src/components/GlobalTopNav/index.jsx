import React, { useRef, useState, useEffect } from 'react'

// Components
import TopBar from '../TopBar'
import Logo from '../Logo'
import TopBarTitle from '../TopBarTitle'
import Hamburger from '../Hamburger'
import Nav from '../Nav'
import MainList from '../MainList'
import MegaList from '../MegaList'
import MainNavItem from '../MainNavItem'
import MainNavItemLink from '../MainNavItemLink'
import NavItem from '../NavItem'
import NavItemLink from '../NavItemLink'
import NavList from '../NavList'
import NavItemDescription from '../NavItemDescription'

// State Machines
import { MenuStateMachine } from '../../state-machines/menus'

// CSS
import styles from './index.module.scss'

// Images
import LogoImage from '../../images/logos/logo.svg'

const GlobalTopNav = () => {
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

    const nextState = MenuStateMachine(megaMenuState)

    setMegaMenuState(nextState)

    updateActiveMenus(nextState, menuId)

    if (megaMenuState === 'open') {
      resetMenus()
    }
  }

  const toggleSubMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = MenuStateMachine(subMenuState)

    setSubMenuState(MenuStateMachine(subMenuState))
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

    const nextState = MenuStateMachine(subSubMenuState)

    setSubSubMenuState(MenuStateMachine(subSubMenuState))

    updateActiveMenus(nextState, menuId)
  }

  useEffect(() => {
    if (window.innerWidth >= viewportLarge) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [activeMenus, isMobile])

  const escFunction = (e) => {
    if (e.keyCode === 27) {
      resetMenus()
    }
  }

  const a11yClick = (e) => {
    const code = e.charCode || e.keyCode
    if (code === 32 || code === 13) {
      return true
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  })

  useOutsideAlerter(wrapperRef) // create bindings for closing menu from outside events

  return (
    <div role="navigation" className={styles['root']} ref={wrapperRef}>
      <TopBar>
        <Logo
          id="menuitem-logo"
          src={LogoImage}
          alt="Your brand's logo"
          rel="home"
        />
        <TopBarTitle>Your Brand Name</TopBarTitle>
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
        <MainList id="menubar-main" ariaLabel="Main Menu">
          <MainNavItem role="none" id="nav-home">
            <MainNavItemLink id="menuitem-home" role="menuitem" href="/">
              Home
            </MainNavItemLink>
          </MainNavItem>

          <MainNavItem id="nav-Mega-Menu" role="none" isChildren>
            <MainNavItemLink
              role="menuitem"
              id="menuitem-Mega-Menu"
              href="/?page=mega-menu"
              isForward
              isActive={activeMenus.includes('menu-Mega-Menu') ? true : false}
              onClick={(e) => toggleSubMenu(e, 'menu-Mega-Menu')}
              onKeyDown={(e) =>
                a11yClick(e) && toggleSubMenu(e, 'menu-Mega-Menu')
              }
              ariaHaspopup="true"
              ariaControls="menu-Mega-Menu"
            >
              Mega Menu
            </MainNavItemLink>
            <MegaList
              id="menu-Mega-Menu"
              activeState={
                activeMenus.includes('menu-Mega-Menu') ? 'open' : 'closed'
              }
            >
              <NavItem id="nav-Mega-Menu-back" isHeading={true}>
                <NavItemLink
                  id="menuitem-Mega-Menu-back"
                  href="/?page=mega-menu"
                  onClick={(e) => toggleSubMenu(e, 'menu-Mega-Menu')}
                  onKeyDown={(e) =>
                    a11yClick(e) && toggleSubMenu(e, 'menu-Mega-Menu')
                  }
                  ariaControls="nav-main-Mega-Menu"
                  isBack
                >
                  Mega Menu
                </NavItemLink>
              </NavItem>
              <NavItem id="nav-Mega-Menu-Sub-menu-item-1" role="none">
                <NavItemLink
                  id="menuitem-Mega-Menu-Sub-menu-item-1"
                  role="menuitem"
                  href="/?page=sub-menu-item-1"
                  isHeading
                >
                  Sub menu item 1
                </NavItemLink>
                <NavItemDescription>
                  Single line description that accompanies link
                </NavItemDescription>
              </NavItem>
              <NavItem id="nav-Mega-Menu-Sub-menu-item-2" role="none">
                <NavItemLink
                  id="menuitem-Mega-Menu-Sub-menu-item-2"
                  role="menuitem"
                  href="/?page=sub-menu-item-2"
                  isHeading
                >
                  Sub menu item 2
                </NavItemLink>
                <NavItemDescription>
                  Double lined small description that accompanies link in the
                  React Mega Menu project
                </NavItemDescription>
              </NavItem>
              <NavItem id="nav-Mega-Menu-Sub-menu-item-3" role="none">
                <NavItemLink
                  id="menuitem-Mega-Menu-Sub-menu-item-3"
                  role="menuitem"
                  href="/?page=sub-menu-item-3"
                  isHeading
                  isForward
                  onClick={(e) =>
                    toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3')
                  }
                  onKeyDown={(e) =>
                    a11yClick(e) &&
                    toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3')
                  }
                  ariaHaspopup="true"
                  ariaControls="menu-Mega-Menu-Sub-menu-item-3"
                >
                  Sub menu item 3
                </NavItemLink>
                <NavItemDescription>
                  Three lined small description that accompanies link in the
                  React Mega Menu project. This maybe too much text? Who's to
                  say, really. We'll leave it to fate to decide.
                </NavItemDescription>
                <NavList
                  id="menu-Mega-Menu-Sub-menu-item-3"
                  role="menu"
                  isSub
                  isSubSub
                  activeState={
                    activeMenus.includes('menu-Mega-Menu-Sub-menu-item-3')
                      ? 'open'
                      : 'closed'
                  }
                  ariaLabelledby="menuitem-Mega-Menu-Sub-menu-item-3"
                >
                  <NavItem
                    id="nav-Mega-Menu-Sub-menu-item-3-back"
                    role="none"
                    isHeading
                  >
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-3-back"
                      role="menuitem"
                      href="/?page=sub-menu-item-3"
                      isBack
                      onClick={(e) =>
                        toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3')
                      }
                      onKeyDown={(e) =>
                        a11yClick(e) &&
                        toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3')
                      }
                      ariaHaspopup="true"
                      ariaControls="menu-Mega-Menu-Sub-menu-item-3"
                    >
                      Sub menu item 3
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-3.1" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-3.1"
                      role="menuitem"
                      href="/?page=sub-menu-item-3.1"
                    >
                      Sub menu item 3.1
                    </NavItemLink>
                    <NavItemDescription>
                      Single line description that accompanies link
                    </NavItemDescription>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-3.2" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-3.2"
                      role="menuitem"
                      href="/?page=sub-menu-item-3.2"
                    >
                      Sub menu item 3.2
                    </NavItemLink>
                    <NavItemDescription>
                      Double lined small description that accompanies link in
                      the React Mega Menu project
                    </NavItemDescription>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-3.3" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-3.3"
                      role="menuitem"
                      href="/?page=sub-menu-item-3.3"
                    >
                      Sub menu item 3.3
                    </NavItemLink>
                    <NavItemDescription>
                      Three lined small description that accompanies link in the
                      React Mega Menu project. This maybe too much text? Who's
                      to say, really. We'll leave it to fate to decide.
                    </NavItemDescription>
                  </NavItem>
                </NavList>
              </NavItem>

              <NavItem id="nav-Mega-Menu-Sub-menu-item-4" role="none">
                <NavItemLink
                  id="menuitem-Mega-Menu-Sub-menu-item-4"
                  role="menuitem"
                  href="/?page=sub-menu-item-4"
                  isHeading
                  isForward
                  onClick={(e) =>
                    toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4')
                  }
                  onKeyDown={(e) =>
                    a11yClick(e) &&
                    toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4')
                  }
                  ariaHaspopup="true"
                  ariaControls="menu-Mega-Menu-Sub-menu-item-4"
                >
                  Sub menu item 4
                </NavItemLink>
                <NavItemDescription>
                  Three lined small description that accompanies link in the
                  React Mega Menu project. This maybe too much text? Who's to
                  say, really. We'll leave it to fate to decide.
                </NavItemDescription>
                <NavList
                  id="menu-Mega-Menu-Sub-menu-item-4"
                  role="menu"
                  isSub
                  isSubSub
                  activeState={
                    activeMenus.includes('menu-Mega-Menu-Sub-menu-item-4')
                      ? 'open'
                      : 'closed'
                  }
                  ariaLabelledby="menuitem-Mega-Menu-Sub-menu-item-4"
                >
                  <NavItem
                    id="nav-Mega-Menu-Sub-menu-item-4-back"
                    role="none"
                    isHeading
                  >
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4-back"
                      role="menuitem"
                      href="/?page=sub-menu-item-4"
                      isBack
                      onClick={(e) =>
                        toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4')
                      }
                      onKeyDown={(e) =>
                        a11yClick(e) &&
                        toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4')
                      }
                      ariaHaspopup="true"
                      ariaControls="menu-Mega-Menu-Sub-menu-item-4"
                    >
                      Sub menu item 4
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-4.1" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4.1"
                      role="menuitem"
                      href="/?page=sub-menu-item-4.1"
                    >
                      Sub menu item 4.1
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-4.2" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4.2"
                      role="menuitem"
                      href="/?page=sub-menu-item-4.2"
                    >
                      Sub menu item 4.2
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-4.3" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4.3"
                      role="menuitem"
                      href="/?page=sub-menu-item-4.3"
                    >
                      Sub menu item 4.3
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-4.4" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4.4"
                      role="menuitem"
                      href="/?page=sub-menu-item-4.4"
                    >
                      Sub menu item 4.4
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-4.5" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4.5"
                      role="menuitem"
                      href="/?page=sub-menu-item-4.5"
                    >
                      Sub menu item 4.5
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-4.6" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4.6"
                      role="menuitem"
                      href="/?page=sub-menu-item-4.6"
                    >
                      Sub menu item 4.6
                    </NavItemLink>
                  </NavItem>
                </NavList>
              </NavItem>
            </MegaList>
          </MainNavItem>
          <MainNavItem id="nav-contact" role="none">
            <MainNavItemLink
              id="menuitem-contact"
              role="menuitem"
              href="/?page=contact"
            >
              Contact
            </MainNavItemLink>
          </MainNavItem>
        </MainList>
      </Nav>
    </div>
  )
}

export default GlobalTopNav
