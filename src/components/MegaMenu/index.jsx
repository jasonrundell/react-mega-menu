import React, { useRef, useState, useEffect } from 'react'

// Components
import HamburgerButton from './Buttons/Hamburger'
import Nav from './Nav'
import MainList from './Lists/Main'
import MegaList from './Lists/Mega'
import ReturnItem from './ListItems/Return'
import ReturnLink from './Links/Return'
import NavItem from './NavItem'
import NavItemLink from './NavItemLink'

// State Machines
import { MenuStateMachine } from '../../state-machines/menus'

// CSS
import './index.scss'

const MegaMenu = () => {
  const [megaMenuState, setMegaMenuState] = useState('closed')
  const [subMenuState, setSubMenuState] = useState('closed')
  const [subSubMenuState, setSubSubMenuState] = useState('closed')
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
    <div role="navigation" className="nav__container" ref={wrapperRef}>
      <HamburgerButton
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
          <NavItem role="none" id="nav-home">
            <NavItemLink id="menuitem-home" role="menuitem" href="/#home">
              Home
            </NavItemLink>
          </NavItem>

          <NavItem id="nav-Mega-Menu" role="none" isChildren>
            <a
              role="menuitem"
              id="menuitem-Mega-Menu"
              href="/#mega-menu"
              className={`nav__item--link nav__item--link-forward ${
                (activeMenus.includes('menu-Mega-Menu') && `nav--active`) || ``
              }`}
              onClick={(e) => toggleSubMenu(e, 'menu-Mega-Menu')}
              onKeyDown={(e) =>
                a11yClick(e) && toggleSubMenu(e, 'menu-Mega-Menu')
              }
              aria-haspopup="true"
              aria-controls="menu-Mega-Menu"
            >
              Mega Menu
            </a>
            <MegaList
              id="menu-Mega-Menu"
              activeState={
                activeMenus.includes('menu-Mega-Menu') ? 'open' : 'closed'
              }
            >
              <ReturnItem id="nav-Mega-Menu-back" isHeading={true}>
                <ReturnLink
                  id="menuitem-Mega-Menu-back"
                  url="/#mega-menu"
                  onClick={(e) => toggleSubMenu(e, 'menu-Mega-Menu')}
                  onKeyDown={(e) =>
                    a11yClick(e) && toggleSubMenu(e, 'menu-Mega-Menu')
                  }
                  ariaControls="nav-main-Mega-Menu"
                >
                  Mega Menu
                </ReturnLink>
              </ReturnItem>
              <NavItem id="nav-Mega-Menu-Sub-menu-item-1" role="none">
                <NavItemLink
                  id="menuitem-Mega-Menu-Sub-menu-item-1"
                  role="menuitem"
                  href="/#sub-menu-item-1"
                >
                  Sub menu item 1
                </NavItemLink>
                <p className="nav__item--description">
                  Single line description that accompanies link
                </p>
              </NavItem>
              <NavItem id="nav-Mega-Menu-Sub-menu-item-2" role="none">
                <NavItemLink
                  id="menuitem-Mega-Menu-Sub-menu-item-2"
                  role="menuitem"
                  href="/#sub-menu-item-2"
                >
                  Sub menu item 2
                </NavItemLink>
                <p className="nav__item--description">
                  Double lined small description that accompanies link in the
                  React Mega Menu project
                </p>
              </NavItem>
              <NavItem
                id="nav-Mega-Menu-Sub-menu-item-3"
                role="none"
                isChildren
              >
                <a
                  id="menuitem-Mega-Menu-Sub-menu-item-3"
                  role="menuitem"
                  href="/#sub-menu-item-3"
                  className="nav__item--link nav__item--link-forward"
                  onClick={(e) =>
                    toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3')
                  }
                  onKeyDown={(e) =>
                    a11yClick(e) &&
                    toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3')
                  }
                  aria-haspopup="true"
                  aria-controls="menu-Mega-Menu-Sub-menu-item-3"
                >
                  Sub menu item 3
                </a>
                <p className="nav__item--description">
                  Three lined small description that accompanies link in the
                  React Mega Menu project. This maybe too much text? Who's to
                  say, really. We'll leave it to fate to decide.
                </p>
                <ul
                  role="menu"
                  id="menu-Mega-Menu-Sub-menu-item-3"
                  className={`nav__list nav__sub nav__sub-sub ${
                    (activeMenus.includes('menu-Mega-Menu-Sub-menu-item-3') &&
                      `nav--open`) ||
                    `nav--closed`
                  }`}
                  aria-labelledby="menuitem-Mega-Menu-Sub-menu-item-3"
                >
                  <NavItem
                    id="nav-Mega-Menu-Sub-menu-item-3-back"
                    role="none"
                    isHeading
                  >
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-3-back"
                      role="menuitem"
                      href="/#sub-menu-item-3"
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
                      href="/#sub-menu-item-3.1"
                    >
                      Sub menu item 3.1
                    </NavItemLink>
                    <p className="nav__item--description">
                      Single line description that accompanies link
                    </p>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-3.2" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-3.2"
                      role="menuitem"
                      href="/#sub-menu-item-3.2"
                    >
                      Sub menu item 3.2
                    </NavItemLink>
                    <p className="nav__item--description">
                      Double lined small description that accompanies link in
                      the React Mega Menu project
                    </p>
                  </NavItem>
                  <NavItem
                    id="nav-Mega-Menu-Sub-menu-item-3.3"
                    role="none"
                    isChildren
                  >
                    <a
                      role="menuitem"
                      id="menuitem-Mega-Menu-Sub-menu-item-3.3"
                      href="/#sub-menu-item-3.3"
                      className="nav__item--link"
                    >
                      Sub menu item 3.3
                    </a>
                    <p className="nav__item--description">
                      Three lined small description that accompanies link in the
                      React Mega Menu project. This maybe too much text? Who's
                      to say, really. We'll leave it to fate to decide.
                    </p>
                  </NavItem>
                </ul>
              </NavItem>
              <NavItem
                id="nav-Mega-Menu-Sub-menu-item-4"
                role="none"
                isChildren
              >
                <a
                  role="menuitem"
                  id="menuitem-Mega-Menu-Sub-menu-item-4"
                  href="/#sub-menu-item-4"
                  className="nav__item--link nav__item--link-forward"
                  onClick={(e) =>
                    toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4')
                  }
                  onKeyDown={(e) =>
                    a11yClick(e) &&
                    toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4')
                  }
                  aria-haspopup="true"
                  aria-controls="menu-Mega-Menu-Sub-menu-item-4"
                >
                  Sub menu item 4
                </a>
                <p className="nav__item--description">
                  Three lined small description that accompanies link in the
                  React Mega Menu project. This maybe too much text? Who's to
                  say, really. We'll leave it to fate to decide.
                </p>
                <ul
                  role="menu"
                  id="menu-Mega-Menu-Sub-menu-item-4"
                  className={`nav__list nav__sub nav__sub-sub ${
                    (activeMenus.includes('menu-Mega-Menu-Sub-menu-item-4') &&
                      `nav--open`) ||
                    `nav--closed`
                  }`}
                  aria-labelledby="menuitem-Mega-Menu-Sub-menu-item-4"
                >
                  <NavItem
                    id="nav-Mega-Menu-Sub-menu-item-4-back"
                    role="none"
                    IsHeading
                  >
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4-back"
                      role="menuitem"
                      href="/#sub-menu-item-4"
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
                      href="/#sub-menu-item-4.1"
                    >
                      Sub menu item 4.1
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-4.2" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4.2"
                      role="menuitem"
                      href="/#sub-menu-item-4.2"
                    >
                      Sub menu item 4.2
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-4.3" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4.3"
                      role="menuitem"
                      href="/#sub-menu-item-4.3"
                    >
                      Sub menu item 4.3
                    </NavItemLink>
                  </NavItem>
                  <NavItem id="nav-Mega-Menu-Sub-menu-item-4.4" role="none">
                    <NavItemLink
                      id="menuitem-Mega-Menu-Sub-menu-item-4.4"
                      role="menuitem"
                      href="/#sub-menu-item-4.4"
                    >
                      Sub menu item 4.4
                    </NavItemLink>
                  </NavItem>
                </ul>
              </NavItem>
            </MegaList>
          </NavItem>
          <NavItem id="nav-Simple-Menu" role="none" isChildren>
            <a
              role="menuitem"
              id="menuitem-Simple-Menu"
              href="/#simple-menu"
              className={`nav__item--link nav__item--link-forward ${
                (activeMenus.includes('menu-Simple-Menu') && `nav--active`) ||
                ``
              }`}
              onClick={(e) => toggleSubMenu(e, 'menu-Simple-Menu')}
              onKeyDown={(e) =>
                a11yClick(e) && toggleSubMenu(e, 'menu-Simple-Menu')
              }
              aria-haspopup="true"
              aria-controls="menu-Simple-Menu"
            >
              Simple Menu
            </a>
            <ul
              role="menu"
              className={`nav__list nav__sub nav__dropdown ${
                (activeMenus.includes('menu-Simple-Menu') && `nav--open`) ||
                `nav--closed`
              }`}
              id="menu-Simple-Menu"
              aria-labelledby="menu-Simple-Menu"
            >
              <NavItem id="nav-Simple-Menu-back" role="none" isHeading>
                <NavItemLink
                  id="menuitem-Simple-Menu-back"
                  role="menuitem"
                  href="/#simple-menu"
                  isBack
                  onClick={(e) => toggleSubMenu(e, 'menu-Simple-Menu')}
                  onKeyDown={(e) =>
                    a11yClick(e) && toggleSubMenu(e, 'menu-Simple-Menu')
                  }
                  ariaHaspopup="true"
                  ariaControls="nav-main-Simple-Menu"
                >
                  Simple Menu
                </NavItemLink>
              </NavItem>
              <NavItem id="nav-Simple-Menu-Sub-menu-item-1" role="none">
                <NavItemLink
                  id="menuitem-Simple-Menu-Sub-menu-item-1"
                  role="menuitem"
                  href="/#sub-menu-item-1"
                >
                  Sub menu item 1
                </NavItemLink>
              </NavItem>
              <NavItem id="nav-Simple-Menu-Sub-menu-item-2" role="none">
                <NavItemLink
                  id="menuitem-Simple-Menu-Sub-menu-item-2"
                  role="menuitem"
                  href="/#sub-menu-item-2"
                >
                  Sub menu item 2
                </NavItemLink>
              </NavItem>
              <NavItem id="nav-Simple-Menu-Sub-menu-item-3" role="none">
                <NavItemLink
                  id="menuitem-Simple-Menu-Sub-menu-item-3"
                  role="menuitem"
                  href="/#sub-menu-item-3"
                >
                  Sub menu item 3
                </NavItemLink>
              </NavItem>
            </ul>
          </NavItem>
          <NavItem id="nav-contact" role="none">
            <NavItemLink id="menuitem-contact" role="menuitem" href="/#contact">
              Contact
            </NavItemLink>
          </NavItem>
        </MainList>
      </Nav>
    </div>
  )
}

export default MegaMenu
