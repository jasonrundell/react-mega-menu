import React, { useState } from 'react'
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
  const [activeMenus, setActiveMenus] = useState([]) // array that captures the ids of active menus

  const updateActiveMenus = (state, menuId) => {
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

  return (
    <div role="navigation" className="nav__container">
      <HamburgerButton
        state={isMegaMenuOpen}
        onClick={(e) => toggleMegaMenu(e, 'nav-main')}
      />
      <nav
        className={`nav__menu-container ${`nav--${isMegaMenuOpen}`}`}
        aria-label="Main Navigation"
      >
        <ul className="nav__list" id="nav-main">
          <li className="nav__item">
            <a href="/" className="nav__item--link">
              Home
            </a>
          </li>
          <li className="nav__item nav__item--has-children">
            <a
              href="/"
              className="nav__item--link nav__item--link-forward"
              data-sub-menu-id="sub-menu-products"
              onClick={(e) => toggleSubMenu(e, 'nav-sub-products')}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Products
            </a>
            <ul
              className={`nav__list nav__sub ${
                (activeMenus.includes('nav-sub-products') && `nav--open`) ||
                `nav--closed`
              }`}
              id="nav-sub-products"
            >
              <li className="nav__item">
                <a
                  href="/"
                  className="nav__item--link nav__item--link-back"
                  onClick={(e) => toggleSubMenu(e, 'nav-sub-products')}
                >
                  Products
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__item--link">
                  TVs
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__item--link">
                  Phones
                </a>
              </li>
              <li className="nav__item nav__item--has-children">
                <a
                  href="/"
                  className="nav__item--link nav__item--link-forward"
                  data-sub-menu-id="sub-menu-products-computers"
                  onClick={(e) =>
                    toggleSubMenu(e, 'nav-sub-products-computers')
                  }
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Computers
                </a>
                <ul
                  className={`nav__list nav__sub ${
                    (activeMenus.includes('nav-sub-products-computers') &&
                      `nav--open`) ||
                    `nav--closed`
                  }`}
                  id="nav-sub-products-computers"
                >
                  <li className="nav__item">
                    <a
                      href="/"
                      className="nav__item--link nav__item--link-back"
                      onClick={(e) =>
                        toggleSubMenu(e, 'nav-sub-products-computers')
                      }
                    >
                      Computers
                    </a>
                  </li>
                  <li className="nav__item">
                    <a href="/" className="nav__item--link">
                      PC
                    </a>
                  </li>
                  <li className="nav__item">
                    <a href="/" className="nav__item--link">
                      Mac
                    </a>
                  </li>
                  <li className="nav__item nav__item--has-children">
                    <a href="/" className="nav__item--link">
                      Chromebook
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="nav__item nav__item--has-children">
            <a
              href="/"
              className="nav__item--link nav__item--link-forward"
              data-sub-menu-id="sub-menu-products"
              onClick={(e) => toggleSubMenu(e, 'nav-sub-features')}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Features
            </a>
            <ul
              className={`nav__list nav__sub ${
                (activeMenus.includes('nav-sub-features') && `nav--open`) ||
                `nav--closed`
              }`}
              id="nav-sub-features"
            >
              <li className="nav__item">
                <a
                  href="/"
                  className="nav__item--link nav__item--link-back"
                  onClick={(e) => toggleSubMenu(e, 'nav-sub-features')}
                >
                  Speed
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__item--link">
                  Price
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__item--link">
                  Power
                </a>
              </li>
              <li className="nav__item nav__item--has-children">
                <a href="/" className="nav__item--link">
                  Synergy
                </a>
              </li>
            </ul>
          </li>
          <li className="nav__item">
            <a href="/" className="nav__item--link">
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
