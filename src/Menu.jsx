import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

// Context
import { useMenu } from './context/MenuContext' // Adjust the path as necessary

// Helpers
import { click as a11yClick, escape as a11yEscape } from './helpers/a11y'
import { respondTo, viewportLarge } from './helpers/responsive'
import {
  config,
  renderMainMenuItem,
  renderLinkMenuItem,
  renderMegaMenuItem,
  renderSubMenuItem
} from './helpers/menu'
import {
  MENU_ITEM_TYPE_LINK,
  MENU_ITEM_TYPE_MEGA
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
const defaultMenuConfig = config

export const Menu = ({ config = defaultMenuConfig, ...props }) => {
  const { resetMenus, megaMenuState, toggleMegaMenu, setIsMobile } = useMenu()

  const wrapperRef = useRef(null) // used to detect clicks outside of component

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          resetMenus()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleClickOutside)
      }
    }, [ref, resetMenus])
  }

  useEffect(() => {
    const handleEscape = (e) => a11yEscape(e, resetMenus)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [resetMenus])

  useEffect(() => {
    const updateIsMobile = () => {
      if (window.innerWidth >= viewportLarge) {
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    }

    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)

    return () => {
      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  useOutsideAlerter(wrapperRef) // create bindings for closing menu from outside events

  return (
    <StyledMenu
      id={props.id || 'rmm__menu'}
      role="navigation"
      ref={wrapperRef}
      className={props.className ? 'rmm__menu ' + props.className : 'rmm__menu'}
      {...props}
    >
      <TopBar id="rmm__topbar">
        <Logo
          id={config.topbar.id}
          src={config.topbar.logo.src}
          alt={config.topbar.logo.alt}
          rel={config.topbar.logo.rel}
        />
        <TopBarTitle id="rmm__title">{config.topbar.title}</TopBarTitle>
      </TopBar>
      <Hamburger
        label="Menu"
        state={megaMenuState || 'closed'}
        onClick={(e) => toggleMegaMenu(e)}
        id="rmm__hamburger"
      />
      <Nav
        id={props.id || 'rmm__nav'}
        activeState={megaMenuState || 'closed'}
        ariaLabel="Main Navigation"
        className={
          props.className ? 'rmm__nav ' + props.className : 'rmm__menu'
        }
      >
        <MainList
          id={props.id || 'rmm__main'}
          ariaLabel="Main Menu"
          className="rmm__nav-list"
        >
          {config.menu.items.map((item) => {
            switch (item.type) {
              case MENU_ITEM_TYPE_LINK:
                return renderLinkMenuItem(item, toggleMegaMenu)
              case MENU_ITEM_TYPE_MEGA:
                return renderMegaMenuItem(
                  item,
                  a11yClick,
                  renderLinkMenuItem,
                  renderSubMenuItem,
                  toggleMegaMenu
                )
              default:
                return renderMainMenuItem(item, toggleMegaMenu)
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
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
          description: PropTypes.string
        })
      )
    })
  }),
  className: PropTypes.string,
  id: PropTypes.string
}

export default Menu
