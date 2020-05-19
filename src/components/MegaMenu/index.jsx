import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Components
import HamburgerButton from '../Buttons/Hamburger'

// State Machines
import { MenuStateMachine } from '../../state-machines/menus'

// CSS
import './index.scss'

const MegaMenu = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState('closed')
  const [isSubMenuOpen, setIsSubMenuOpen] = useState('closed')
  const [isSubSubMenuOpen, setIsSubSubMenuOpen] = useState('closed')
  const [activeMenus, setActiveMenus] = useState([]) // array that captures the ids of active menus

  const updateActiveMenus = (state, menuId) => {
    console.log(`updateActiveMenus(${state},${menuId})`)
    if (state === 'open') {
      // add menuId from activeMenus
      setActiveMenus([...activeMenus, menuId])
      // set menuId
    } else if (state === 'closed') {
      // remove menuId from activeMenus
      setActiveMenus(activeMenus.filter((item) => item !== menuId))
    }
  }

  const toggleMegaMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = MenuStateMachine(isMegaMenuOpen)

    setIsMegaMenuOpen(nextState)
    setActiveMenus([])

    updateActiveMenus(nextState, menuId)
  }

  const toggleSubMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = MenuStateMachine(isSubMenuOpen)

    setIsSubMenuOpen(MenuStateMachine(isSubMenuOpen))

    updateActiveMenus(nextState, menuId)
  }

  const toggleSubSubMenu = (e, menuId) => {
    e.preventDefault()

    const nextState = MenuStateMachine(isSubSubMenuOpen)

    setIsSubSubMenuOpen(MenuStateMachine(isSubSubMenuOpen))

    updateActiveMenus(nextState, menuId)
  }

  useEffect(() => {
    console.log(`activeMenus = ${activeMenus}`)
  })

  return (
    <div role="navigation" className="nav__container">
      <HamburgerButton
        label="Menu"
        state={isMegaMenuOpen}
        onClick={(e) => toggleMegaMenu(e, 'nav-main')}
      />
      <nav
        className={`nav__menu-container ${`nav--${isMegaMenuOpen}`}`}
        aria-label="Main Navigation"
      >
        <ul
          role="menubar"
          aria-hidden="false"
          aria-label="Main Menu"
          className="nav__list"
          id="menubar-main"
        >
          <li role="none" id="nav-home" className="nav__item">
            <a
              role="menuitem"
              id="menuitem-home"
              href="/"
              className="nav__item--link"
            >
              Home
            </a>
          </li>
          <li
            role="none"
            id="nav-products"
            className="nav__item nav__item--has-children"
          >
            <a
              role="menuitem"
              id="menuitem-products"
              href="/"
              className="nav__item--link nav__item--link-forward"
              onClick={(e) => toggleSubMenu(e, 'menu-products')}
              aria-haspopup="true"
              aria-controls="menu-products"
            >
              Products
            </a>
            <ul
              role="menu"
              className={`nav__list nav__sub ${
                (activeMenus.includes('menu-products') && `nav--open`) ||
                `nav--closed`
              }`}
              id="menu-products"
              aria-hidden="true"
              aria-labelledby="menu-products"
            >
              <li role="none" id="nav-products-back" className="nav__item">
                <a
                  role="menuitem"
                  id="menuitem-products-back"
                  href="/"
                  className="nav__item--link nav__item--link-back"
                  onClick={(e) => toggleSubMenu(e, 'menu-products')}
                  aria-haspopup="true"
                  aria-controls="nav-main-products"
                >
                  Products
                </a>
              </li>
              <li role="none" id="nav-products-tvs" className="nav__item">
                <a
                  role="menuitem"
                  id="menuitem-products-tvs"
                  href="/"
                  className="nav__item--link"
                >
                  TVs
                </a>
              </li>
              <li role="none" id="nav-products-phones" className="nav__item">
                <a
                  role="menuitem"
                  id="menuitem-products-phones"
                  href="/"
                  className="nav__item--link"
                >
                  Phones
                </a>
              </li>
              <li
                role="none"
                id="nav-products-computers"
                className="nav__item nav__item--has-children"
              >
                <a
                  role="menuitem"
                  id="menuitem-products-computers"
                  href="/"
                  className="nav__item--link nav__item--link-forward"
                  onClick={(e) =>
                    toggleSubSubMenu(e, 'menu-products-computers')
                  }
                  aria-haspopup="true"
                  aria-controls="menu-products-computers"
                >
                  Computers
                </a>
                <ul
                  role="menu"
                  id="menu-products-computers"
                  className={`nav__list nav__sub ${
                    (activeMenus.includes('menu-products-computers') &&
                      `nav--open`) ||
                    `nav--closed`
                  }`}
                  aria-hidden="true"
                  aria-labelledby="menuitem-products-computers"
                >
                  <li
                    role="none"
                    id="nav-products-computers-back"
                    className="nav__item"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-products-computers-back"
                      href="/"
                      className="nav__item--link nav__item--link-back"
                      onClick={(e) =>
                        toggleSubSubMenu(e, 'menu-products-computers')
                      }
                      aria-haspopup="true"
                      aria-controls="menu-products-computers"
                    >
                      Computers
                    </a>
                  </li>
                  <li
                    role="none"
                    id="nav-products-computers-pc"
                    className="nav__item"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-products-computers-pc"
                      href="/"
                      className="nav__item--link"
                    >
                      PC
                    </a>
                  </li>
                  <li
                    role="none"
                    id="nav-products-computers-mac"
                    className="nav__item"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-products-computers-mac"
                      href="/"
                      className="nav__item--link"
                    >
                      Mac
                    </a>
                  </li>
                  <li
                    role="none"
                    id="nav-products-computers-chromebook"
                    className="nav__item nav__item--has-children"
                  >
                    <a
                      role="menuitem"
                      id="menuitem-products-computers-chromebook"
                      href="/"
                      className="nav__item--link"
                    >
                      Chromebook
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li
            role="none"
            id="nav-features"
            className="nav__item nav__item--has-children"
          >
            <a
              role="menuitem"
              id="menuitem-features"
              href="/"
              className="nav__item--link nav__item--link-forward"
              onClick={(e) => toggleSubMenu(e, 'menu-features')}
              aria-haspopup="true"
              aria-controls="menu-features"
            >
              Features
            </a>
            <ul
              role="menu"
              className={`nav__list nav__sub ${
                (activeMenus.includes('menu-features') && `nav--open`) ||
                `nav--closed`
              }`}
              id="menu-features"
              aria-hidden="true"
              aria-labelledby="menu-features"
            >
              <li role="none" id="nav-features-back" className="nav__item">
                <a
                  role="menuitem"
                  id="menuitem-features-back"
                  href="/"
                  className="nav__item--link nav__item--link-back"
                  onClick={(e) => toggleSubMenu(e, 'menu-features')}
                  aria-haspopup="true"
                  aria-controls="nav-main-features"
                >
                  Features
                </a>
              </li>
              <li role="none" id="nav-features-speed" className="nav__item">
                <a
                  role="menuitem"
                  id="menuitem-features-speed"
                  href="/"
                  className="nav__item--link"
                >
                  Speed
                </a>
              </li>
              <li
                role="none"
                id="nav-features-autonomous"
                className="nav__item"
              >
                <a
                  role="menuitem"
                  id="menuitem-features-autonomous"
                  href="/"
                  className="nav__item--link"
                >
                  Autonomous
                </a>
              </li>
              <li role="none" id="nav-features-scalable" className="nav__item">
                <a
                  role="menuitem"
                  id="menuitem-features-scalable"
                  href="/"
                  className="nav__item--link"
                >
                  Scalable
                </a>
              </li>
            </ul>
          </li>
          <li role="none" id="nav-contact" className="nav__item">
            <a
              role="menuitem"
              id="menuitem-contact"
              href="/"
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

MegaMenu.propTypes = {
  data: PropTypes.any.isRequired,
}

export default MegaMenu
