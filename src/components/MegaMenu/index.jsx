import React, { useState, useEffect } from 'react'

// Components
import HamburgerButton from '../Buttons/Hamburger'

// State Machines
import { MenuStateMachine } from '../../state-machines/menus'

// CSS
import './index.scss'

const MegaMenu = () => {
  const [megaMenuState, setMegaMenuState] = useState('')
  const [subMenuState, setSubMenuState] = useState('')
  const [subSubMenuState, setSubSubMenuState] = useState('')
  const [activeMenus, setActiveMenus] = useState([]) // array that captures the ids of active menus
  const [isMobile, setIsMobile] = useState(true) // array that captures the ids of active menus

  const viewportLarge = 1024

  const resetMenus = () => {
    setActiveMenus([])
    setSubMenuState('closed')
    setSubSubMenuState('closed')
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
      // hide all menus for large screens, show the menu clicked
      setActiveMenus([menuId])
    } else {
      // remove menuId from activeMenus
      updateActiveMenus(nextState, menuId)
    }
  }

  const showSubMenu = (e, menuId) => {
    if (!isMobile) {
      e.preventDefault()

      setActiveMenus([menuId])
      setSubMenuState('open')
    }
  }

  const hideSubMenu = (e, menuId) => {
    if (!isMobile) {
      e.preventDefault()

      setActiveMenus([])
      setSubMenuState('closed')
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
    console.log(`activeMenus = ${activeMenus}`)
  }, [activeMenus, isMobile])

  return (
    <div role="navigation" className="nav__container">
      <HamburgerButton
        label="Menu"
        state={megaMenuState}
        onClick={(e) => toggleMegaMenu(e, 'nav-main')}
      />
      <nav
        className={`nav__menu-container ${`nav--${megaMenuState}`}`}
        aria-label="Main Navigation"
      >
        <ul
          role="menubar"
          aria-label="Main Menu"
          className="nav__list"
          id="menubar-main"
        >
          <li role="none" id="nav-home" className="nav__item">
            <a
              role="menuitem"
              id="menuitem-home"
              href="/#home"
              className="nav__item--link"
            >
              Home
            </a>
          </li>
          <li
            role="none"
            id="nav-Mega-Menu"
            className="nav__item nav__item--has-children"
          >
            <a
              role="menuitem"
              id="menuitem-Mega-Menu"
              href="/#mega-menu"
              className={`nav__item--link nav__item--link-forward ${
                (activeMenus.includes('menu-Mega-Menu') && `nav--active`) || ``
              }`}
              onClick={(e) => toggleSubMenu(e, 'menu-Mega-Menu')}
              onFocus={(e) => showSubMenu(e, 'menu-Mega-Menu')}
              onMouseOver={(e) => showSubMenu(e, 'menu-Mega-Menu')}
              // onMouseOut={(e) => hideSubMenu(e, 'menu-Mega-Menu')}
              aria-haspopup="true"
              aria-controls="menu-Mega-Menu"
            >
              Mega Menu
            </a>
            <ul
              role="menu"
              className={`nav__list nav__sub nav__mega nav__dropdown ${
                (activeMenus.includes('menu-Mega-Menu') && `nav--open`) ||
                `nav--closed`
              }`}
              id="menu-Mega-Menu"
              aria-labelledby="menu-Mega-Menu"
              onFocus={(e) => showSubMenu(e, 'menu-Mega-Menu')}
              onMouseOver={(e) => showSubMenu(e, 'menu-Mega-Menu')}
              onMouseOut={(e) => hideSubMenu(e, 'menu-Mega-Menu')}
            >
              <li
                role="none"
                id="nav-Mega-Menu-back"
                className="nav__item nav__item--heading"
              >
                <a
                  role="menuitem"
                  id="menuitem-Mega-Menu-back"
                  href="/#mega-menu"
                  className="nav__item--link nav__item--link-back"
                  onClick={(e) => toggleSubMenu(e, 'menu-Mega-Menu')}
                  aria-haspopup="true"
                  aria-controls="nav-main-Mega-Menu"
                >
                  Mega Menu
                </a>
              </li>
              <li
                role="none"
                id="nav-Mega-Menu-Sub-menu-item-1"
                className="nav__item"
              >
                <a
                  role="menuitem"
                  id="menuitem-Mega-Menu-Sub-menu-item-1"
                  href="/#sub-menu-item-1"
                  className="nav__item--link"
                >
                  Sub menu item 1
                </a>
                <p className="nav__item--description">
                  Single line description that accompanies link
                </p>
              </li>
              <li
                role="none"
                id="nav-Mega-Menu-Sub-menu-item-2"
                className="nav__item"
              >
                <a
                  role="menuitem"
                  id="menuitem-Mega-Menu-Sub-menu-item-2"
                  href="/#sub-menu-item-2"
                  className="nav__item--link"
                >
                  Sub menu item 2
                </a>
                <p className="nav__item--description">
                  Double lined small description that accompanies link in the
                  React Mega Menu project
                </p>
              </li>
              <li
                role="none"
                id="nav-Mega-Menu-Sub-menu-item-3"
                className="nav__item nav__item--has-children"
              >
                <a
                  role="menuitem"
                  id="menuitem-Mega-Menu-Sub-menu-item-3"
                  href="/#sub-menu-item-3"
                  className="nav__item--link nav__item--link-forward"
                  onClick={(e) =>
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
                  <li
                    role="none"
                    id="nav-Mega-Menu-Sub-menu-item-3-back"
                    className="nav__item nav__item--heading"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-Mega-Menu-Sub-menu-item-3-back"
                      href="/#sub-menu-item-3"
                      className="nav__item--link nav__item--link-back"
                      onClick={(e) =>
                        toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-3')
                      }
                      aria-haspopup="true"
                      aria-controls="menu-Mega-Menu-Sub-menu-item-3"
                    >
                      Sub menu item 3
                    </a>
                  </li>
                  <li
                    role="none"
                    id="nav-Mega-Menu-Sub-menu-item-3.1"
                    className="nav__item"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-Mega-Menu-Sub-menu-item-3.1"
                      href="/#sub-menu-item-3.1"
                      className="nav__item--link"
                    >
                      Sub menu item 3.1
                    </a>
                    <p className="nav__item--description">
                      Single line description that accompanies link
                    </p>
                  </li>
                  <li
                    role="none"
                    id="nav-Mega-Menu-Sub-menu-item-3.2"
                    className="nav__item"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-Mega-Menu-Sub-menu-item-3.2"
                      href="/#sub-menu-item-3.2"
                      className="nav__item--link"
                    >
                      Sub menu item 3.2
                    </a>
                    <p className="nav__item--description">
                      Double lined small description that accompanies link in
                      the React Mega Menu project
                    </p>
                  </li>
                  <li
                    role="none"
                    id="nav-Mega-Menu-Sub-menu-item-3.3"
                    className="nav__item nav__item--has-children"
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
                  </li>
                </ul>
              </li>

              <li
                role="none"
                id="nav-Mega-Menu-Sub-menu-item-4"
                className="nav__item nav__item--has-children"
              >
                <a
                  role="menuitem"
                  id="menuitem-Mega-Menu-Sub-menu-item-4"
                  href="/#sub-menu-item-4"
                  className="nav__item--link nav__item--link-forward"
                  onClick={(e) =>
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
                  <li
                    role="none"
                    id="nav-Mega-Menu-Sub-menu-item-4-back"
                    className="nav__item nav__item--heading"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-Mega-Menu-Sub-menu-item-4-back"
                      href="/#sub-menu-item-4"
                      className="nav__item--link nav__item--link-back"
                      onClick={(e) =>
                        toggleSubSubMenu(e, 'menu-Mega-Menu-Sub-menu-item-4')
                      }
                      aria-haspopup="true"
                      aria-controls="menu-Mega-Menu-Sub-menu-item-4"
                    >
                      Sub menu item 4
                    </a>
                  </li>
                  <li
                    role="none"
                    id="nav-Mega-Menu-Sub-menu-item-4.1"
                    className="nav__item"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-Mega-Menu-Sub-menu-item-4.1"
                      href="/#sub-menu-item-4.1"
                      className="nav__item--link"
                    >
                      Sub menu item 4.1
                    </a>
                    <p className="nav__item--description">
                      Single line description that accompanies link
                    </p>
                  </li>
                  <li
                    role="none"
                    id="nav-Mega-Menu-Sub-menu-item-4.2"
                    className="nav__item"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-Mega-Menu-Sub-menu-item-4.2"
                      href="/#sub-menu-item-4.2"
                      className="nav__item--link"
                    >
                      Sub menu item 4.2
                    </a>
                    <p className="nav__item--description">
                      Double lined small description that accompanies link in
                      the React Mega Menu project
                    </p>
                  </li>
                  <li
                    role="none"
                    id="nav-Mega-Menu-Sub-menu-item-4.3"
                    className="nav__item"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-Mega-Menu-Sub-menu-item-4.3"
                      href="/#sub-menu-item-4.3"
                      className="nav__item--link"
                    >
                      Sub menu item 4.3
                    </a>
                  </li>
                  <li
                    role="none"
                    id="nav-Mega-Menu-Sub-menu-item-4.4"
                    className="nav__item"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-Mega-Menu-Sub-menu-item-4.4"
                      href="/#sub-menu-item-4.4"
                      className="nav__item--link"
                    >
                      Sub menu item 4.4
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li
            role="none"
            id="nav-Simple-Menu"
            className="nav__item nav__item--has-children"
          >
            <a
              role="menuitem"
              id="menuitem-Simple-Menu"
              href="/#simple-menu"
              className={`nav__item--link nav__item--link-forward ${
                (activeMenus.includes('menu-Simple-Menu') && `nav--active`) ||
                ``
              }`}
              onClick={(e) => toggleSubMenu(e, 'menu-Simple-Menu')}
              onFocus={(e) => showSubMenu(e, 'menu-Simple-Menu')}
              onMouseOver={(e) => showSubMenu(e, 'menu-Simple-Menu')}
              onMouseOut={(e) => hideSubMenu(e, 'menu-Simple-Menu')}
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
              onFocus={(e) => showSubMenu(e, 'menu-Simple-Menu')}
              onMouseOver={(e) => showSubMenu(e, 'menu-Simple-Menu')}
              onMouseOut={(e) => hideSubMenu(e, 'menu-Simple-Menu')}
            >
              <li
                role="none"
                id="nav-Simple-Menu-back"
                className="nav__item nav__item--heading"
              >
                <a
                  role="menuitem"
                  id="menuitem-Simple-Menu-back"
                  href="/#simple-menu"
                  className="nav__item--link nav__item--link-back"
                  onClick={(e) => toggleSubMenu(e, 'menu-Simple-Menu')}
                  aria-haspopup="true"
                  aria-controls="nav-main-Simple-Menu"
                >
                  Simple Menu
                </a>
              </li>
              <li
                role="none"
                id="nav-Simple-Menu-Sub-menu-item-1"
                className="nav__item"
              >
                <a
                  role="menuitem"
                  id="menuitem-Simple-Menu-Sub-menu-item-1"
                  href="/#sub-menu-item-1"
                  className="nav__item--link"
                >
                  Sub menu item 1
                </a>
              </li>
              <li
                role="none"
                id="nav-Simple-Menu-Sub-menu-item-2"
                className="nav__item"
              >
                <a
                  role="menuitem"
                  id="menuitem-Simple-Menu-Sub-menu-item-2"
                  href="/#sub-menu-item-2"
                  className="nav__item--link"
                >
                  Sub menu item 2
                </a>
              </li>
              <li
                role="none"
                id="nav-Simple-Menu-Sub-menu-item-3"
                className="nav__item"
              >
                <a
                  role="menuitem"
                  id="menuitem-Simple-Menu-Sub-menu-item-3"
                  href="/#sub-menu-item-3"
                  className="nav__item--link"
                >
                  Sub menu item 3
                </a>
              </li>
            </ul>
          </li>
          <li role="none" id="nav-contact" className="nav__item">
            <a
              role="menuitem"
              id="menuitem-contact"
              href="/#contact"
              className="nav__item--link"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MegaMenu
