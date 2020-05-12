import React, { useState } from "react";
import PropTypes from "prop-types";

import { MenuStateMachine } from "../../state-machines/menus";

import "./index.css";

const MegaMenu = ({ data }) => {
  console.log(MenuStateMachine("hidden"));
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(MenuStateMachine);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(MenuStateMachine);

  const toggleMegaMenuVisible = (e) => {
    e.preventDefault();
    setIsMegaMenuOpen(MenuStateMachine(isMegaMenuOpen));
  };

  const doShowSubMenu = (e) => {
    e.preventDefault();
    setIsSubMenuOpen(true);
  };

  const doHideSubMenu = (e) => {
    e.preventDefault();
    setIsSubMenuOpen(false);
  };

  return (
    <div role="navigation" className="nav__container">
      <button className="nav__button--toggle" onClick={toggleMegaMenuVisible}>
        X
      </button>
      <nav
        className={`nav__menu-container ${isMegaMenuOpen}`}
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
              onClick={doShowSubMenu}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Products
            </a>
            <ul
              className={`nav__list nav__sub ${isSubMenuOpen}`}
              id="nav-sub-products"
            >
              <li className="nav__item">
                <a
                  href="/"
                  className="nav__item--link nav__item--link-back"
                  onClick={doHideSubMenu}
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
              onClick={doShowSubMenu}
              data-sub-menu-id="sub-menu-products"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Features
            </a>
            {/* <ul
              className={`nav__list nav__sub ${isSubMenuOpen ? "" : "hidden"}`}
            >
              <li className="nav__item">
                <a href="/" className="nav__item--link">
                  Speed
                </a>
              </li>
              <li className="nav__item">
                <a href="/" className="nav__item--link">
                  Power
                </a>
              </li>
              <li className="nav__item nav__item--has-children">
                <a href="/" className="nav__item--link">
                  Agility
                </a>
              </li>
            </ul> */}
          </li>
          <li className="nav__item">
            <a href="/" className="nav__item--link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

MegaMenu.propTypes = {
  data: PropTypes.any.isRequired,
};

export default MegaMenu;
