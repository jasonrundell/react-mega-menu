import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { MenuStateMachine } from '../../state-machines/menus'

import './index.scss'

const MegaMenu = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState('')
  const [isSubMenuOpen, setIsSubMenuOpen] = useState('')

  const toggleMegaMenu = (e) => {
    e.preventDefault()
    if (isMegaMenuOpen === '') {
      setIsMegaMenuOpen('open')
      setIsSubMenuOpen('closed')
    } else {
      setIsMegaMenuOpen(MenuStateMachine(isMegaMenuOpen))
      setIsSubMenuOpen('closed')
    }
  }

  const toggleSubMenu = (e) => {
    e.preventDefault()
    if (isSubMenuOpen === '') {
      setIsSubMenuOpen('open')
    } else {
      setIsSubMenuOpen(MenuStateMachine(isSubMenuOpen))
    }
  }

  return (
    <div role="navigation" className="nav__container">
      <button className="nav__button--toggle" onClick={toggleMegaMenu}>
        X
      </button>
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
              onClick={toggleSubMenu}
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
                  onClick={toggleSubMenu}
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
              onClick={toggleSubMenu}
              data-sub-menu-id="sub-menu-products"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Features
            </a>
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
