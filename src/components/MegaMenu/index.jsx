import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Components
import HamburgerButton from '../Buttons/Hamburger'

// State Machines
import { MenuStateMachine } from '../../state-machines/menus'

// CSS
import './index.scss'

const MegaMenu = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState('')
  const [isSubMenuOpen, setIsSubMenuOpen] = useState('')
  const [activeMenus, setActiveMenus] = useState([]) // array that captures the ids of active menus

  const toggleMegaMenu = (e, menuId) => {
    e.preventDefault()
    if (isMegaMenuOpen === '') {
      setIsMegaMenuOpen('open')
      setIsSubMenuOpen('closed')
    } else {
      setIsMegaMenuOpen(MenuStateMachine(isMegaMenuOpen))
      setIsSubMenuOpen('closed')
    }

    if (isMegaMenuOpen === 'open') {
      setActiveMenus((activeMenus) => [...activeMenus, menuId])
    } else if (isMegaMenuOpen === 'closed') {
    }
    console.log(`menuId = ${menuId}`)
  }

  const toggleSubMenu = (e, menuId) => {
    e.preventDefault()
    if (isSubMenuOpen === '') {
      setIsSubMenuOpen('open')
    } else {
      setIsSubMenuOpen(MenuStateMachine(isSubMenuOpen))
    }
    console.log(`menuId = ${menuId}`)
  }

  useEffect(() => {
    console.log(`activeMenus = ${activeMenus}`)
  })

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
              className="nav__item--link"
              data-sub-menu-id="sub-menu-products"
              onClick={(e) => toggleSubMenu(e, 'nav-sub-products')}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Products
            </a>
            <ul
              className={`nav__list nav__sub ${`nav--${isSubMenuOpen}`}`}
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
                <a href="/" className="nav__item--link">
                  Computers
                </a>
              </li>
            </ul>
          </li>
          <li className="nav__item nav__item--has-children">
            <a
              href="/"
              className="nav__item--link"
              data-sub-menu-id="sub-menu-products"
              onClick={(e) => toggleSubMenu(e, 'nav-sub-features')}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Features
            </a>
            <ul
              className={`nav__list nav__sub ${`nav--${isSubMenuOpen}`}`}
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
